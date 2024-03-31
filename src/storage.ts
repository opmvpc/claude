import { createStorage } from "unstorage";
import vercelKVDriver from "unstorage/drivers/vercel-kv";

export const storage = createStorage({
  driver: vercelKVDriver({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
    base: "test",
    env: "KV",
  }),
});
