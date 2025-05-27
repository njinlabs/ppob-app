import { ImagePickerAsset } from "expo-image-picker";
import { client, toFile } from "./client";
import { UploadModel } from "./model/upload";
import { UserModel } from "./model/user";

export type UpdateProfilePayload = Pick<
  UserModel,
  "fullname" | "email" | "phone"
> & {
  avatar?: ImagePickerAsset | string | null;
};

export type ChangePasswordPayload = {
  password: string;
  newPassword: string;
};

export const updateProfile = ({
  avatar,
  ...data
}: UpdateProfilePayload): Promise<
  UserModel & {
    avatar?: UploadModel | null;
  }
> => {
  const formData = new FormData();

  for (const key in data) {
    formData.append(key, data[key as keyof typeof data]);
  }

  if (avatar && typeof avatar === "object") {
    formData.append(
      "avatar",
      toFile({
        uri: avatar.uri,
        name: avatar.fileName || "image.jpeg",
        type: avatar.mimeType || "image/jpeg",
      })
    );
  }

  return client
    .put("/user", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => data.data);
};

export const changePassword = (
  data: ChangePasswordPayload
): Promise<
  UserModel & {
    avatar?: UploadModel | null;
  }
> => client.put("/user/password", data).then(({ data }) => data.data);
