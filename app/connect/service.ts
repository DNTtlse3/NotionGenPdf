'use server';

import 'dotenv/config';

export async function buildUrl(): Promise<string> {
  const params = new URLSearchParams({
    client_id: process.env.NOTION_CLIENT_ID!,
    response_type: 'code',
    owner: 'user',
    redirect_uri: 'http://localhost:3000/callback',
  });

  return `https://api.notion.com/v1/oauth/authorize?${params.toString()}`;
}