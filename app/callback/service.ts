'use server';

import * as fs from 'fs/promises';
import * as path from 'path';

export async function StoreToken({directory:String, acess_token: String,filename:String}){
  try{
    await fs.writeFile(filePath, acess_token, { encoding: 'utf8' });
  }catch(err){
    return false;
  }
  return true;
}

