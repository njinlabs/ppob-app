import { Base } from "./base";

export type WalletModel = {
  id: string;
  balance: number;
  userId: string;
} & Base;
