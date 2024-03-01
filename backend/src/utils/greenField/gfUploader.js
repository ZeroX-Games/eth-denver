const dotenv = require("dotenv");
const { getCheckSums } = require("@bnb-chain/greenfiled-file-handle");
const {
  NodeAdapterReedSolomon,
} = require("@bnb-chain/reed-solomon/node.adapter");
const { client, selectSp } = require("./gfClient");
const { Buffer } = require("buffer");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const ACCOUNT_ADDRESS = process.env.ZEROX_NODE_ACCOUNT_ADDRESS;
const ACCOUNT_PRIVATEKEY = process.env.ZEROX_NODE_ACCOUNT_PRIVATEKEY;

const eventBucketName = "event-denver";

async function createBucket(bucketName, creator, privateKey) {
  const spInfo = await selectSp();
  const createBucketTx = await client.bucket.createBucket(
    {
      bucketName,
      creator,
      visibility: "VISIBILITY_TYPE_PUBLIC_READ",
      chargedReadQuota: "0",
      spInfo: { primarySpAddress: spInfo.primarySpAddress },
      paymentAddress: creator,
      tags: { tags: [] },
    },
    { type: "ECDSA", privateKey }
  );

  return createBucketTx.broadcast({
    denom: "BNB",
    gasLimit: Number(
      (await createBucketTx.simulate({ denom: "BNB" })).gasLimit
    ),
    gasPrice: "5000000000",
    payer: creator,
    granter: "",
    privateKey,
  });
}

async function createObject(
  bucketName,
  objectName,
  jsonData,
  creator,
  privateKey
) {
  const fileBuffer = Buffer.from(JSON.stringify(jsonData, null, 2), "utf-8");
  const fileArray = new Uint8Array(fileBuffer);
  const rs = new NodeAdapterReedSolomon();
  const hashResult = await getCheckSums(fileArray);

  const createObjectTx = await client.object.createObject(
    {
      bucketName,
      objectName,
      creator,
      visibility: "VISIBILITY_TYPE_PUBLIC_READ",
      fileType: "application/json",
      redundancyType: "REDUNDANCY_EC_TYPE",
      contentLength: fileBuffer.length,
      expectCheckSums: JSON.parse(hashResult.expectCheckSums),
    },
    { type: "ECDSA", privateKey }
  );

  return createObjectTx.broadcast({
    denom: "BNB",
    gasLimit: Number(
      (await createObjectTx.simulate({ denom: "BNB" })).gasLimit
    ),
    gasPrice: "5000000000",
    payer: creator,
    granter: "",
    privateKey,
  });
}

async function uploadObject(
  bucketName,
  objectName,
  jsonData,
  txnHash,
  privateKey
) {
  const fileBuffer = Buffer.from(JSON.stringify(jsonData, null, 2), "utf-8");

  const uploadRes = await client.object.uploadObject(
    {
      bucketName,
      objectName,
      body: fileBuffer,
      txnHash,
    },
    { type: "ECDSA", privateKey }
  );
  console.log("Upload res:", uploadRes)
  return uploadRes.code === 0;
}

async function uploadCompressedDeltas(
  id,
  deltaArray
) {
  const creator = ACCOUNT_ADDRESS;
  const privateKey = ACCOUNT_PRIVATEKEY;
  try {
    await createBucket(eventBucketName, creator, privateKey);
  } catch (error) {
    if (error.message !== "repeated bucket") {
      throw error;
    }
    console.log(`Bucket already exists:, moving on...`);
  }

  const objectName = `eth_denver_${id}.json`;


  const createObjectRes = await createObject(
    eventBucketName,
    objectName,
    deltaArray,
    creator,
    privateKey
  );

  const uploadSuccess = await uploadObject(
    eventBucketName,
    objectName,
    deltaArray,
    createObjectRes.transactionHash,
    privateKey
  );

  console.log("Upload status:", uploadSuccess ? "Success" : "Failed");
  return uploadSuccess;
}

module.exports = {
  uploadCompressedDeltas
};
