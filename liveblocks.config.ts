import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const publicApiKey =
  process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY ||
  "pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

const client = createClient({
  throttle: 16,
  publicApiKey,
});

type Presence = {
  cursor: { x: number; y: number } | null;
};

type Storage = {
};

export const { RoomProvider, useOthers, useMyPresence } = createRoomContext<
  Presence,
  Storage
>(client);
