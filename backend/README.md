### Installing depencencies:

#### Note: Node version that is compatible with this porject is `v18.18.2`

```sh
yarn
pnpm install
```

#### Note: Install typescript globally. Otherwise, follow your approach, instead of `ts-node`, to run typescript files.

#### Greenfield dependencies are not compatible with "yarn". This is the main reason we need to work with two package management.

### Create .env files

#### Create an enviroment files and name it ".env" and place it in root of the project. You can also rename .env.sample to .env and fill out the missing part!

### Start the server

Go to this path:

```sh
./src
```

Then run the server:

```sh
ts-node server.ts
```

- It is important to run the server from the path that we mentioned.

Go to this path:

```sh
./src/setup
```

Then, run the setup file:

```bash
ts-node setup.ts
```

- The setup file is responsible to create the necessarily folders and also register domain and the first NFT address with its attributes. Feel free to change it if you want!
- For example, the following function is for registering a new domain with its atrributes for a game:

```js
async function registerDomain(chainID: number) {
    const response = await client.mintAsset.registerDomain.mutate({
        domainInfo: "domainInfo",
        chainID
    });
    return (response);
}


async function registerCollectionGame(domainId: number, chainID: number) {
    const response = await client.mintAsset.registerCollection.mutate({
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
    console.log(response);
}
```

You can change the attributes, collection address, and even your chain id. The default chain IDs are base sepolia, arb sepolia, and Linea georli.

_please pay attention to send the correct chain id while you are sending an update!_

If you want to register multiple nft addresses, here is an example:

```JS
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
```

## Sending the first update

Start your server _again_ from its path! Your current server doesn't know about the created databases (levelDBs). You need to stop the current server and run it again in order to recognize the created databases.

- Go to this address:

```sh
./src
```

Then, run the server:

```bash
ts-node server.ts
```

### Send the First Request:

```sh
URL= http://0.0.0.0:4000/trpc/flow.flow
```

### JSON SAMPLE BODY

```JSON
{
  "chainID": 84532,
  "batch": [
    {
      "domainId": 46,
      "deltas": [
        {
          "collectionAddr": "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
          "matrix": [
            [172, 10, -20, 0, 8, 0, 7, -10],
            // You can have multiple NFTs like:
            // [100, 12, 0, 3, 9, 10, 7, -15]
            // [210, 19, -20, 0, 8, 0, 7, -18]
          ]
        },
        {
          "collectionAddr": "0x1059f25e02b15623cad1b2363dbc7666c7c5de5d",
          "matrix": [
            [180, 10, -20, 0, 8, 0, 7, -10]
          ]
        }
      ]
    },
    {
      "domainId": 19,
      "deltas": [
        {
          "collectionAddr": "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
          "matrix": [
            [172, 5, -15, 0, 3, 0, 2, -5]
          ]
        }
      ]
    }
  ]
}
```

Fetch the current and history data:

```sh
URL= http://0.0.0.0:4000/trpc/fetchNFTValuesRouter.fetchNFTValues
```

JSON SAMPLE BODY

```JSON
{
    "domainId": 19,
    "chainID": 84532,
    "collectionAddr": "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
    "tokenIds": [172],
    "attribute": [
            "Win Rate",
            "Critical Hit Rate",
            "League Points",
            "Games",
            "Proficiency",
            "Training Hours",
            "Likes"
        ],
    "numberOfHisotry": 10
}
```

#### Chain ID List

| Chain        | Chain ID |
| ------------ | -------- |
| ETH Sepolia  | 11155111 |
| ARB Sepolia  | 421614   |
| Base Sepolia | 84532    |
| Linea Georli | 59140    |

#### Sample .env Files:

```sh
# For development
PORT=4000
HOST=0.0.0.0

### You need an account with
# Arb sepolia
# Eth sepolia
# Base sepolia
# Linea goerli
# Greenfield BNB test

ZEROX_NODE_ACCOUNT_ADDRESS=
ZEROX_NODE_ACCOUNT_PRIVATEKEY=


ETHEREUM_SEPOLIA_NODE_URL=https://eth-sepolia.g.alchemy.com/v2/FTkfAAq8Dw5FUhrESSq54UdD_Tb0PeS7
CONTRACT_ADDRESS_ETH_SEP=0x73FCbe5625df8f367F1C610e122947aaBe3d6248


ARBITRUM_SEPOLIA_NODE_RPC_URL=https://sepolia-rollup.arbitrum.io/rpc
CONTRACT_ADDRESS_ARB_SEP=0xd3AbE71AAf321aaC00795173cEF710166B9e2A93


BASE_SEPOLIA_NODE_RPC_URL=https://base-sepolia.g.alchemy.com/v2/2sSh6AsAfOBkKSpbQ58seQuJE-VrYjac
CONTRACT_ADDRESS_BASE_SEP=0x0Be007e586bDba3EB6Da9f9a52A7ebaB76ca2B5c


LINEA_GEORLI_NODE_RPC_URL=https://linea-goerli.infura.io/v3/e190d575b5e44f5581399288ee757c9e
CONTRACT_ADDRESS_LIN_GOE=0xc0013C4c1C76a267c605aE04Be0553101e51d9da
```
