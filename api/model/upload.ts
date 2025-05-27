import { Base } from "./base";

export type UploadModel = {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
} & Base;
