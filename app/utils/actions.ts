'use server';

import fs from 'fs';
import path from 'path';


const FILES_GEN_DIR: string = path.join(process.cwd(), 'files-gen');

/**
 * Récupère la liste des noms des files du dir òu sont
 * stockés les pdf générés.
 */
export async function getFilesList(): Promise<string[]> {
  try {
    if (!fs.existsSync(FILES_GEN_DIR)) {
      return [];
    }
    const files: string[] = fs.readdirSync(FILES_GEN_DIR);
    
    // On récupère seulement les files(exclut les dirs)
    return files.filter((file: string) => 
      fs.statSync(path.join(FILES_GEN_DIR, file)).isFile()
    );
  } catch (error) {
    console.error("Error reading the folder :", error);
    return [];
  }
}

/**
 * On récupère le contenu d'un file encodé en Base64
 */
export async function getFileContent(fileName: string): Promise<string> {
  try {
    const filePath: string = path.join(FILES_GEN_DIR, fileName);
    
    // Sécurité impérative contre les attaques de type Path Traversal
    if (!filePath.startsWith(FILES_GEN_DIR)) {
      throw new Error("Unauthorized Access");
    }

    const fileBuffer: Buffer = fs.readFileSync(filePath);
    return fileBuffer.toString('base64');
  } catch (error) {
    console.error(`Error reading the file ${fileName} :`, error);
    throw new Error("Unable to read the file");
  }
}