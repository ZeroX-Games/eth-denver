import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../routes/router";
import { promises as fs } from 'fs';
import path from 'path';


const client = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: "http://0.0.0.0:4000/trpc",
        }),
    ],
});

async function main() {
    let BASESEPchainID = 84532;
    let ARBSEPchainID = 421614;
    let ETHSEPchainID = 11155111;
    let LINEAGEOchainID = 59140;

    const ARB_SEPOLIA_FOLDER = path.resolve(__dirname, '../../DB', "421614");
    const ETH_SEPOLIA_FOLDER = path.resolve(__dirname, '../../DB', "11155111");
    const BASE_SEPOLIA_FOLDER = path.resolve(__dirname, '../../DB', "84532");
    const LINEA_GOERLI_FOLDER = path.resolve(__dirname, '../../DB', "59140");

    try {
        await fs.mkdir(ARB_SEPOLIA_FOLDER, { recursive: true });
        console.log(`Base directory ${ARB_SEPOLIA_FOLDER} ensured.`);
        await fs.mkdir(ETH_SEPOLIA_FOLDER, { recursive: true });
        console.log(`Base directory ${ETH_SEPOLIA_FOLDER} ensured.`);
        await fs.mkdir(BASE_SEPOLIA_FOLDER, { recursive: true });
        console.log(`Base directory ${BASE_SEPOLIA_FOLDER} ensured.`);
        await fs.mkdir(LINEA_GOERLI_FOLDER, { recursive: true });
        console.log(`Base directory ${LINEA_GOERLI_FOLDER} ensured.`);
    } catch (error) {
        console.error(`Error ensuring base directory: ${error}`);
        return;
    }


    /// Register Domain for Game - Base
    let domainId = await registerDomain(BASESEPchainID)
    if (domainId?.domainId) {
        console.log("Domain ID: ", domainId.domainId, "Base Sepolia ");
        await registerCollectionGame(domainId.domainId, BASESEPchainID)
    }

    /// Register Domain for Social - Linea Georli
    domainId = await registerDomain(LINEAGEOchainID)
    if (domainId?.domainId) {
        console.log("Domain ID: ", domainId.domainId, "Linea Sepolia");
        await registerCollectionSocial(domainId.domainId, LINEAGEOchainID)
    }

    /// Register Domain for PokeCard -  Arbitrum Sepolia
    domainId = await registerDomain(ARBSEPchainID)
    if (domainId?.domainId) {
        console.log("Domain ID: ", domainId.domainId, "Arbitrum Georli");
        await registerCollectionPokeCard(domainId.domainId, ARBSEPchainID)
    }

}

async function registerDomain(chainID: number) {
    const response = await client.mintAsset.registerDomain.mutate({
        domainInfo: "domainInfo",
        chainID
    });
    return (response);
}

async function registerCollectionGame(domainId: number, chainID: number) {
    const coll1 = await client.mintAsset.registerCollection.mutate({
        domainId,
        chainID,
        collectionAddress: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
        attributes: [
            "Win Rate",
            "Critical Hit Rate",
            "League Points",
            "Games",
            "Proficiency",
            "Training Hours",
            "Likes"
        ],
    });

    const coll2 = await client.mintAsset.registerCollection.mutate({
        domainId,
        chainID,
        collectionAddress: "0x1059f25e02b15623cad1b2363dbc7666c7c5de5d",
        attributes: [
            "Win Rate",
            "Critical Hit Rate",
            "League Points",
            "Games",
            "Proficiency",
            "Training Hours",
            "Likes"
        ],
    });
    console.log(coll1, coll2);
}

async function registerCollectionSocial(domainId: number, chainID: number) {
    const response = await client.mintAsset.registerCollection.mutate({
        domainId,
        chainID,
        collectionAddress: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
        attributes: [
            "Likes",
            "Level",
            "Badages",
            "Championships",
            "Pokedex",
            "Charm"
        ]
    });
    console.log(response);
}

async function registerCollectionPokeCard(domainId: number, chainID: number) {
    const response = await client.mintAsset.registerCollection.mutate({
        domainId,
        chainID,
        collectionAddress: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
        attributes: [
            "Games",
            "Win Rate",
            "HP",
            "Attack",
            "Defense",
            "Likes"
        ]
    });
    console.log(response);
}

main()