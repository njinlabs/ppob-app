import { Base } from "./base";

export type WalletLedgerModel = {
  id: string;
  current: number;
  add: number;
  result: number;
  event?: {
    topup?: {
      id: string;
      method: string;
    };
    membership?: {
      id: string;
      name: string;
    };
    purchase?: {
      id: string;
      category?: {
        id?: string;
        name?: string;
      };
      brand?: {
        id?: string;
        name?: string;
      };
      name: string;
    };
  } | null;
} & Base;
