import React, { useEffect, useState } from "react";
import { NextPage } from "next/types";
import { Types, AptosClient } from "aptos";

declare global {
  interface Window {
    aptos: any;
  }
}

const client = new AptosClient("https://fullnode.devnet.aptoslabs.com/v1");

const Home: NextPage = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [account, setAccount] = useState<Types.AccountData | null>(null);

  useEffect(() => {
    const { aptos } = window;

    if (aptos) init();
    console.log(aptos);
  }, []);

  useEffect(() => {
    if (!address) return;
    client.getAccount(address).then(setAccount);
  }, [address]);

  const init = async () => {
    const { aptos } = window;
    if (aptos) {
      const { address, publicKey } = await window.aptos.connect();
      setAddress(address);
    }
  };

  return (
    <div className="min-h-screen">
      <p>
        Account Address: <code>{address}</code>
      </p>
      <p>
        Sequence Number: <code>{account?.sequence_number}</code>
      </p>
    </div>
  );
};

export default Home;
