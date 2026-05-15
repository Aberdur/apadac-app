import config from "@payload-config";
import { getPayload } from "payload";

declare global {
  var __payloadPromise__: ReturnType<typeof getPayload> | undefined;
}

const globalForPayload = globalThis as typeof globalThis & {
  __payloadPromise__?: ReturnType<typeof getPayload>;
};

export const getCMS = () => {
  if (!globalForPayload.__payloadPromise__) {
    globalForPayload.__payloadPromise__ = getPayload({ config });
  }

  return globalForPayload.__payloadPromise__;
};
