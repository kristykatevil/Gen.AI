import { PrimitiveType } from "@/lib/types";

export type GenerationRequest = {
  type: "text_to_3d" | "image_to_3d";
  prompt?: string | null;
  imageUrl?: string | null;
  qualityPreset: "draft" | "standard" | "high";
  outputTarget: "preview" | "printable";
};

export type GenerationSubmission = {
  provider: string;
  providerTaskId: string;
  primitiveType: PrimitiveType;
};

export interface GenerationProvider {
  submit(request: GenerationRequest): Promise<GenerationSubmission>;
}
