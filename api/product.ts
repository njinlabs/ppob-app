import { client } from "./client";
import { BrandModel } from "./model/brand";
import { CategoryModel } from "./model/category";
import { ProductModel } from "./model/product";
import { UploadModel } from "./model/upload";

export type GetProductPayload = {
  brand?: string | null;
  category?: string | null;
};

export const getBrandByPhone = (
  number: string
): Promise<
  BrandModel & {
    image?: UploadModel | null;
  }
> =>
  client
    .get(`/product/brand/${number.replace(/\D/g, "").replace(/^0/, "62")}`)
    .then(({ data }) => data.data);

export const getProduct = (
  payload: GetProductPayload
): Promise<
  (ProductModel & {
    category: CategoryModel | null;
    brand:
      | (BrandModel & {
          image?: UploadModel | null;
        })
      | null;
  })[]
> =>
  client
    .get("/product", {
      params: payload,
    })
    .then(({ data }) => data.data);

export const getProductById = (
  payload: string
): Promise<
  ProductModel & {
    category: CategoryModel | null;
    brand: BrandModel | null;
  }
> => client.get(`/product/${payload}`).then(({ data }) => data.data);

export const getCategory = (): Promise<CategoryModel[]> =>
  client.get("/product/category").then(({ data }) => data.data);
