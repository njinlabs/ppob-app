import { client } from "./client";
import { WalletModel } from "./model/wallet";

export const getWallet = (): Promise<WalletModel> =>
  client.get("/wallet").then(({ data }) => data.data);
