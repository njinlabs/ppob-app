import { client } from "./client";
import { UserModel } from "./model/user";

export type RegisterPayload = Required<
  Pick<UserModel, "fullname" | "email" | "phone" | "password">
> & {
  referredBy?: string;
};
export type LoginPayload = Required<Pick<UserModel, "email" | "password">>;

export const register = (payload: RegisterPayload) =>
  client.post("/auth/register", payload).then(
    ({ data }) =>
      data as {
        data: UserModel & {
          token: string;
        };
      }
  );

export const login = (payload: LoginPayload) =>
  client.post("/auth/login", payload).then(
    ({ data }) =>
      data as {
        data: UserModel & { token: string };
      }
  );
