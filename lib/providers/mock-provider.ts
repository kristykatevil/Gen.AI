import { v4 as uuidv4 } from "uuid";
import { pickPrimitive } from "@/lib/shape";
import { GenerationProvider, GenerationRequest, GenerationSubmission } from "@/lib/providers/generation-provider";

export class MockProvider implements GenerationProvider {
  async submit(request: GenerationRequest): Promise<GenerationSubmission> {
    return {
      provider: "mock",
      providerTaskId: uuidv4(),
      primitiveType: pickPrimitive(request.prompt, request.imageUrl)
    };
  }
}
