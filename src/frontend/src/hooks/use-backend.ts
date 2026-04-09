import { useActor } from "@caffeineai/core-infrastructure";
import { type ExternalBlob, createActor } from "../backend";

export function useBackend() {
  return useActor((canisterId, uploadFile, downloadFile, options) =>
    createActor(
      canisterId,
      uploadFile as (
        file: ExternalBlob,
      ) => Promise<Uint8Array<ArrayBufferLike>>,
      downloadFile as (
        file: Uint8Array<ArrayBufferLike>,
      ) => Promise<ExternalBlob>,
      options,
    ),
  );
}
