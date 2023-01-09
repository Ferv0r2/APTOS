# APTOS Testing

Aptos is a Layer 1 for everyone. In the Ohlone language, "Aptos" means "The People." This site is here to help you grow a web3 ecosystem project that benefits the entire world through easier development, more reliable services, faster transactions, and a supportive, decentralized family.

- [TypescriptSDK](https://aptos.dev/sdks/ts-sdk/index/) has been used.

- [APTOS DOCS](https://aptos.dev/)

- [Faucet](https://www.aptosfaucet.com/)

- [Wallet - (Petra)](https://chrome.google.com/webstore/detail/petra-aptos-wallet/ejjladinnckdgjemekebdpeokbikhfci/related)

## Testing

```
npm install
npm start
```

1. `faucetClient`로 `fundAccount`메서드를 호출하지 않아 아무 트랜잭션이 없으면 `coinClient`의 `checkBalance`메서드 호출 시 에러가 발생함 ( 존재하지 않는 계정으로 처리 )

2. APTOS는 `tokenClient`의 `offerToken`메서드로 토큰 제안할 수 있으며 `claimToken`으로 토큰을 수락할 수 있음

3. 2번과 달리 `directTransferToken`메서드를 활용하면 `claimToken`없이 다이렉트로 전송이 가능함

4. 트랜잭션을 전송하려면 `client.waitForTransaction`메서드를 통해 처리할 수 있음

5. APTOS는 `Mainnet`, `Testnet` 뿐만 아니라 `Devnet` 도 운영됨
