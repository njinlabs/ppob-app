import { client } from "./client";
import { WalletModel } from "./model/wallet";
import { WalletLedgerModel } from "./model/wallet-ledger";

export const getWallet = (): Promise<WalletModel> =>
  client.get("/wallet").then(({ data }) => data.data);

export const getWalletHistory = (): Promise<WalletLedgerModel[]> =>
  client.get("/wallet/history").then(({ data }) => data.data);
