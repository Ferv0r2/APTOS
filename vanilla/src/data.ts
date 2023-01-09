import {
  AptosClient,
  AptosAccount,
  FaucetClient,
  TokenClient,
  CoinClient,
} from "aptos";

const APTOS_NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const APTOS_FAUCET_URL = "https://faucet.devnet.aptoslabs.com";

// API 클라이언트 생성
const client = new AptosClient(APTOS_NODE_URL);

// 수도꼭지 클라이언트 생성
const faucetClient = new FaucetClient(APTOS_NODE_URL, APTOS_FAUCET_URL);

// 계정의 잔고 조회를 위해 생성
const coinClient = new CoinClient(client);

// 토큰 관련을 기능을 위해 생성
const tokenClient = new TokenClient(client);

(async () => {
  // 계정 생성
  const orbit = new AptosAccount();
  const ramp = new AptosAccount();
  console.log(`Account : ${orbit.address()}`);

  // 잔액 전후 조회
  await faucetClient.fundAccount(orbit.address(), 100_000_000);
  await faucetClient.fundAccount(ramp.address(), 100_000_000);
  console.log(`Balance : ${await coinClient.checkBalance(orbit)}`);

  // NFT 콜렉션 생성
  const collectionName = "Orbit's Collection";
  const collectionDesc = "Orbit's simple projects";
  const tokenName = "Orbit's first token";

  const createCollection = await tokenClient.createCollection(
    orbit,
    collectionName,
    collectionDesc,
    "https://wontae.site"
  );
  await client.waitForTransaction(createCollection, { checkSuccess: true });

  // NFT 토큰 생성
  const createNFT = await tokenClient.createToken(
    orbit,
    collectionName,
    tokenName,
    collectionDesc,
    1,
    "https://wontae.site/images/logo.jpg"
  ); // <:!:section_5
  await client.waitForTransaction(createNFT, { checkSuccess: true });

  // NFT 콜렉션 데이터 조회
  const collectionData = await tokenClient.getCollectionData(
    orbit.address(),
    collectionName
  );
  console.log(`Orbit's collection: ${JSON.stringify(collectionData, null, 4)}`);

  // NFT의 보유량 조회
  const orbitNFTBalance = await tokenClient.getToken(
    orbit.address(),
    collectionName,
    tokenName,
    "0"
  );
  console.log(`Orbit's token balance: ${orbitNFTBalance["amount"]}`); // <:!:section_7

  // NFT의 토큰 데이터 조회
  const tokenData = await tokenClient.getTokenData(
    orbit.address(),
    collectionName,
    tokenName
  );
  console.log(`Orbit's token data: ${JSON.stringify(tokenData, null, 4)}`); // <:!:section_8

  // 토큰 전송 ( Orbit -> Ramp )
  const tranferToken = await tokenClient.offerToken(
    orbit,
    ramp.address(),
    orbit.address(),
    collectionName,
    tokenName,
    1,
    0
  );
  await client.waitForTransaction(tranferToken, { checkSuccess: true });

  // 토큰 전송 수락
  const transferClaim = await tokenClient.claimToken(
    ramp,
    orbit.address(),
    orbit.address(),
    collectionName,
    tokenName,
    0
  );
  await client.waitForTransaction(transferClaim, { checkSuccess: true });

  // 전송 이후 보유량 조회
  const orbitBalance = await tokenClient.getToken(
    orbit.address(),
    collectionName,
    tokenName,
    "0"
  );
  const rampBalance = await tokenClient.getTokenForAccount(ramp.address(), {
    token_data_id: {
      creator: orbit.address().hex(),
      collection: collectionName,
      name: tokenName,
    },
    property_version: "0",
  });

  console.log(`Orbit's token balance: ${orbitBalance["amount"]}`);
  console.log(`Ramp's token balance: ${rampBalance["amount"]}`);

  // MultiAgent로 다시 토큰 전송 ( Ramp -> Orbit )
  let reTransfer = await tokenClient.directTransferToken(
    ramp,
    orbit,
    orbit.address(),
    collectionName,
    tokenName,
    1,
    0
  );
  await client.waitForTransaction(reTransfer, { checkSuccess: true });

  // 마지막 보유량 조회
  const orbitBalance2 = await tokenClient.getToken(
    orbit.address(),
    collectionName,
    tokenName,
    "0"
  );
  const rampBalance2 = await tokenClient.getTokenForAccount(ramp.address(), {
    token_data_id: {
      creator: orbit.address().hex(),
      collection: collectionName,
      name: tokenName,
    },
    property_version: "0",
  });

  console.log(`Orbit's token balance: ${orbitBalance2["amount"]}`);
  console.log(`Ramp's token balance: ${rampBalance2["amount"]}`);
})();
