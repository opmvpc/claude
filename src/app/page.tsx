import { Button } from "@nextui-org/button";
import { createStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs";
import { v4 as uuidv4 } from "uuid";

export async function createConversation() {
  "use server";

  const storage = createStorage({
    driver: fsDriver({ base: "/storage/conversations" }),
  });

  const id = uuidv4();
  const conversation = {
    id,
    name: "Nouvelle conversation",
    messages: [],
  };

  await storage.setItem("conversations:" + id, conversation);
}

export async function getConversations() {
  "use server";

  const storage = createStorage({
    driver: fsDriver({ base: "/storage/conversations" }),
  });

  const keys = await storage.keys("conversations");
  const conversations = await Promise.all(
    keys.map(async (key) => {
      const conversation = await storage.getItem(key);
      return conversation;
    })
  );

  return conversations;
}

export default function Home() {
  return (
    <main className=" min-h-screen flex ">
      <div className="w-52 bg-gray-950">
        <ul></ul>
      </div>

      <div>
        <Button
          onClick={async () => {
            await createConversation();
          }}
        >
          Click me
        </Button>
      </div>
    </main>
  );
}
