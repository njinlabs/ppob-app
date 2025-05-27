import { client } from "./client";
import { MembershipModel } from "./model/membership";
import { UploadModel } from "./model/upload";
import { UserModel } from "./model/user";

export type RegisterPayload = Required<
  Pick<UserModel, "fullname" | "email" | "phone" | "password">
> & {
  referredBy?: string;
};
export type LoginPayload = Required<Pick<UserModel, "email" | "password">>;

export const register = (payload: RegisterPayload) =>
  client
    .post("/auth/register", payload)
    .then(
      ({ data }) =>
        data as {
          data: UserModel & {
            token: string;
          };
        }
    )
    .catch((e) => {
      console.log(e);
      throw e;
    });

export const login = (payload: LoginPayload) =>
  client.post("/auth/login", payload).then(
    ({ data }) =>
      data as {
        data: UserModel & { token: string };
      }
  );

export const checkToken = (
  token: string
): Promise<{
  data: UserModel & {
    membership: MembershipModel | null;
    avatar?: UploadModel | null;
  };
}> =>
  client
    .get("/auth/check-token", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => data);

export const logout = (): Promise<{
  data: UserModel & {
    membership: MembershipModel | null;
  };
}> => client.delete("/auth/logout").then(({ data }) => data);
