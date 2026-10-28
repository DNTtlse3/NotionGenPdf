'use server';

import fs from 'fs';
import path from 'path';

// Dossier cible (ex: un dossier 'documents' à la racine de votre projet)
const TARGET_DIR: string = path.join(process.cwd(), 'files-gen');

/**
 * Récupère la liste des noms de fichiers du dossier ciblé
 */
export async function getFilesList(): Promise<string[]> {
  try {
    if (!fs.existsSync(TARGET_DIR)) {
      return [];
    }
    const files: string[] = fs.readdirSync(TARGET_DIR);
    
    // Filtre uniquement les fichiers (exclut les dossiers)
    return files.filter((file: string) => 
      fs.statSync(path.join(TARGET_DIR, file)).isFile()
    );
  } catch (error) {
    console.error("Erreur lors de la lecture du dossier :", error);
    return [];
  }
}

/**
 * Récupère le contenu d'un fichier encodé en Base64
 */
export async function getFileContent(fileName: string): Promise<string> {
  try {
    const filePath: string = path.join(TARGET_DIR, fileName);
    
    // Sécurité impérative contre les attaques de type Path Traversal
    if (!filePath.startsWith(TARGET_DIR)) {
      throw new Error("Accès non autorisé");
    }

    const fileBuffer: Buffer = fs.readFileSync(filePath);
    return fileBuffer.toString('base64');
  } catch (error) {
    console.error(`Erreur lors de la lecture du fichier ${fileName} :`, error);
    throw new Error("Impossible de lire le fichier");
  }
}