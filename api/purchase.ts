import { client } from "./client";
import { ProductModel } from "./model/product";
import { PurchaseModel } from "./model/purchase";
import { UserModel } from "./model/user";

export type MakePurchasePayload = {
  customerNumber: string;
  productId: string;
};

export const makePurchase = ({
  productId,
  ...payload
}: MakePurchasePayload): Promise<
  PurchaseModel & {
    user?: UserModel | null;
    product?: ProductModel | null;
  }
> =>
  client.post(`/purchase/${productId}`, payload).then(({ data }) => data.data);

export const purchaseHistory = (): Promise<
  (PurchaseModel & {
    user?: UserModel | null;
    product?: ProductModel | null;
  })[]
> => client.get("/purchase/history").then(({ data }) => data.data);
