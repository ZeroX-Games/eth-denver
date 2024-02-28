import levelup from 'levelup';
import leveldown from 'leveldown';
import encode from 'encoding-down';


type DomainID = string;
type ChainID = string;
type CollectionAddress = string;
type AttributeId = number;
type TokenId = number;

class NFTCollectionManager {
    private db;
    private domainId: number;

    constructor(path, chainID, domainId) {
        this.domainId = domainId;
        this.db = levelup(encode(leveldown(path + "/" + chainID + "/" + domainId), { valueEncoding: 'json' }));
    }

    async registerCollection(domainID: DomainID, chainID: ChainID, collectionAddress: CollectionAddress): Promise<Boolean> {
        await this.db.put(`${domainID}:${chainID}:collectionAddress`, collectionAddress);
        return true;
    }

    async registerAttribute(domainID: DomainID, chainID: ChainID, attributeName: string): Promise<AttributeId> {
        let attributeId: AttributeId | null = await this.getAttributeId(domainID, chainID, attributeName);
        if (attributeId === null) {
            attributeId = await this.getNextAttributeId(domainID, chainID);
            await this.db.put(`${domainID}:${chainID}:attributeName:${attributeName}`, attributeId);
        }
        return attributeId;
    }

    async getAttributeId(domainID: DomainID, chainID: ChainID, attributeName: string): Promise<AttributeId | null> {
        try {
            return await this.db.get(`${domainID}:${chainID}:attributeName:${attributeName}`);
        } catch (error: any) {
            if (error.notFound) {
                return null;
            }
            throw error;
        }
    }

    async getNextAttributeId(domainID: DomainID, chainID: ChainID): Promise<AttributeId> {
        const nextAttributeIdKey = `${domainID}:${chainID}:nextAttributeIdKey`;
        try {
            const nextAttributeId = (await this.db.get(nextAttributeIdKey) as number) + 1;
            await this.db.put(nextAttributeIdKey, nextAttributeId);
            return nextAttributeId;
        } catch (error: any) {
            if (error.notFound) {
                await this.db.put(nextAttributeIdKey, 1);
                return 1;
            }
            throw error;
        }
    }




    async linkAttributeToCollection(domainID: DomainID, chainID: ChainID, collectionAddress: CollectionAddress, attributeId: number): Promise<void> {
        ;
        await this.db.put(`${domainID}:${chainID}:collectionAttribute:${collectionAddress}:${attributeId}`, true);
    }


    async getCollectionAttributes(domainID: DomainID, chainID: ChainID, collectionAddress: CollectionAddress): Promise<AttributeId[]> {
        return new Promise((resolve, reject) => {
            const attributeIds: AttributeId[] = [];
            this.db.createReadStream({
                gt: `${domainID}:${chainID}:collectionAttribute:${collectionAddress}:`,
                lt: `${domainID}:${chainID}:collectionAttribute:${collectionAddress};`,
            })
                .on('data', ({ key }) => {
                    const parts = key.split(':');
                    attributeIds.push(parseInt(parts[3], 10));
                })
                .on('error', (err) => reject(err))
                .on('end', () => resolve(attributeIds));
        });
    }

    async updateTokenAttributes(domainID: DomainID, chainID: ChainID, collectionAddress: CollectionAddress, tokenId: TokenId, attributes: Array<{ attributeId: AttributeId, value: number }>): Promise<void> {
        for (const { attributeId, value } of attributes) {
            await this.db.put(`${domainID}:${chainID}:tokenAttribute:${collectionAddress}:${tokenId}:${attributeId}`, value);
        }
    }

    async updateTokenAttributesBatch(domainID: DomainID, chainID: ChainID, collectionAddress: CollectionAddress, tokenUpdates: Array<{ tokenId: TokenId, attributes: Array<{ attributeId: AttributeId, value: number }> }>): Promise<void> {
        const batch = this.db.batch();

        for (const update of tokenUpdates) {
            for (const { attributeId, value } of update.attributes) {
                batch.put(`${domainID}:${chainID}:tokenAttribute:${collectionAddress}:${update.tokenId}:${attributeId}`, value);
            }
        }
        await batch.write();
    }

    async getTokenAttributeValue(domainID: DomainID, chainID: ChainID, collectionAddress: CollectionAddress, tokenId: TokenId, attributeId: AttributeId): Promise<number | null> {
        try {
            return await this.db.get(`${domainID}:${chainID}:tokenAttribute:${collectionAddress}:${tokenId}:${attributeId}`);
        } catch (error: any) {
            if (error.notFound) {
                return null;
            }
            throw error;
        }
    }

    async getAllTokenAttributes(domainID, chainID, collectionId, tokenIds, attributeIds) {
        const values = {};
        for (const tokenId of tokenIds) {
            values[tokenId] = {};
            for (const attributeId of attributeIds) {
                try {
                    values[tokenId][attributeId] = await this.getTokenAttributeValue(domainID, chainID, collectionId, tokenId, attributeId);
                } catch (error: any) {
                    if (!error.notFound) throw error;
                    values[tokenId][attributeId] = null;
                }
            }
        }
        return values;
    }

    async updateTokenHistory(domainID: DomainID, chainID: ChainID, collectionAddress: CollectionAddress, tokenId: TokenId, changes: number[]): Promise<void> {
        let history: number[][] = [];
        try {
            const existingHistoryJson = await this.db.get(`${domainID}:${chainID}:${collectionAddress}:tokenHistory:${tokenId}`);
            history = JSON.parse(existingHistoryJson);
        } catch (error: any) {
            if (!error.notFound) throw error;
        }
        history.push(changes);
        await this.db.put(`${domainID}:${chainID}:${collectionAddress}:tokenHistory:${tokenId}`, JSON.stringify(history));
    }

    async getTokenHistory(domainID: DomainID, chainID: ChainID, collectionAddress: CollectionAddress, tokenId: TokenId, numberOfChanges: number): Promise<number[][]> {
        try {
            const historyJson = await this.db.get(`${domainID}:${chainID}:${collectionAddress}:tokenHistory:${tokenId}`);
            const history = JSON.parse(historyJson);
            return history.slice(-numberOfChanges);
        } catch (error: any) {
            if (error.notFound) {
                return [];
            }
            throw error;
        }
    }


    async updateEventNumber() {
        let eventNumber = 0;
        try {
            eventNumber = (await this.db.get("eventNumber") as number) + 1;
            await this.db.put("eventNumber", eventNumber);
        } catch (error: any) {
            if (error.notFound) {
                await this.db.put("eventNumber", 1);
            }
        }
        return eventNumber;
    }

    async getEventNumber() {
        try {
            return await this.db.get("eventNumber");
        } catch (error: any) {
            if (error.notFound) {
                return 0;
            }
            throw error;
        }
    }

    async closeDb() {
        if (this.db) {
            await this.db.close();
        }
    }

}

export default NFTCollectionManager;