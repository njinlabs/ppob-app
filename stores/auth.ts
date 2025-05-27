import { MembershipModel } from "@/api/model/membership";
import { UploadModel } from "@/api/model/upload";
import { UserModel } from "@/api/model/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export interface AuthState {
  token: string | null;
  user:
    | (UserModel & {
        membership?: MembershipModel | null;
        avatar?: UploadModel | null;
      })
    | null;
  setUser: (user: UserModel) => void;
  setToken: (token: string, storage?: boolean) => void;
  revoke: () => void;
}

export const useAuth = create<AuthState>()((set) => ({
  token: null,
  user: null,
  setUser: (user) => set(() => ({ user })),
  setToken: (token, storage) =>
    set(() => {
      if (storage) AsyncStorage.setItem("token", token);

      return {
        token,
      };
    }),
  revoke: () =>
    set(() => {
      AsyncStorage.clear();

      return {
        user: null,
        token: null,
      };
    }),
}));
