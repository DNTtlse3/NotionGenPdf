'use server';

import { logger } from '@/app/utils/loger'
import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';


import * as fs from 'fs/promises';
import * as path from 'path';

export async function GET(req: NextRequest) : Promise<NextResponse> {
  const code  = req.nextUrl.searchParams.get("code");
  const status= req.nextUrl.searchParams.get("status");

  if(!code){
    return NextResponse.json(
      { error: "Retrieve code failed" },
      { status: 400 }
    );
  }
  
  const notion = new Client();

  const token = await notion.oauth.token({
    client_id: process.env.NOTION_CLIENT_ID!,
    client_secret: process.env.NOTION_CLIENT_SECRET!,
    grant_type: "authorization_code",
    code,
    redirect_uri: "http://localhost:3000/api/notion/callback",
  });

  return NextResponse.json(token);
}

export async function StoreToken({directory:String, acess_token: String,filename:String}){
  try{
    await fs.writeFile(filePath, acess_token, { encoding: 'utf8' });
  }catch(err){
    return false;
  }
  return true;
}

