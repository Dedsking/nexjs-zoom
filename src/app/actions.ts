"use server";

import { currentUser } from "@clerk/nextjs";
import { StreamClient } from "@stream-io/node-sdk";

export async function getToken() {
  const streamApiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY;
  const streamAPiSecret = process.env.STREAM_VIDEO_API_SECRET;

  if (!streamApiKey || !streamAPiSecret) {
    throw new Error("Stream API key or Secret not provided");
  }

  const user = await currentUser();
  console.log("🚀 ~ getToken ~ user:", user);

  if (!user) {
    throw new Error("User not authenticated");
  }

  const streamClient = new StreamClient(streamApiKey, streamAPiSecret);

  const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;

  const issuedAt = Math.floor(Date.now() / 1000) - 60;

  const token = streamClient.createToken(user.id, expirationTime, issuedAt);

  return token;
}
