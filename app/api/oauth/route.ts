import { logger } from '@/app/utils/loger';
import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const code = req.nextUrl.searchParams.get("code");
  const status = req.nextUrl.searchParams.get("status");

  // 1. Validation du code
  if (!code) {
    logger.error("Échec de la récupération : le paramètre 'code' est manquant.");
    return NextResponse.json(
      { error: "Retrieve code failed" },
      { status: 400 }
    );
  }

  try {
    // 2. Initialisation du client Notion pour l'OAuth
    const notion = new Client();

    // 3. Échange du code contre le jeton d'accès (access_token)
    const tokenResponse = await notion.oauth.token({
      client_id: process.env.NOTION_CLIENT_ID!,
      client_secret: process.env.NOTION_CLIENT_SECRET!,
      grant_type: "authorization_code",
      code: code,
      redirect_uri:"http://localhost:3000/callback",
    });

    logger.info("Notion token successfully retrieved.");

    // 4. Renvoi des données au composant client
    // Note : Notion retourne un objet contenant 'access_token', 'workspace_name', etc.
    return NextResponse.json(tokenResponse, { status: 200 });

  } catch (error: any) {
    logger.error("Error while exchanging the Notion token:", error);
    
    return NextResponse.json(
      { 
        error: "Failed to exchange token with Notion", 
        details: error.body?.message || error.message 
      },
      { status: 500 }
    );
  }
}
