'use client'

import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/app/ui/button';

export default function CallbackPage() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const code = searchParams.get('code');
	const urlStatus = searchParams.get('status');

	
	// Le verrou doit être actif dès le premier test de l'appel
	const lockState = useRef(false);

	const [isSave, setIsSave] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [status, setStatus] = useState<number | null>(null);

	useEffect(() => {

		/* 1. Si le code est manquant, on arrête tout de suite */
		if (!code) {
			setError("\"code\" missing in the URL");
			setStatus(400);
			return;
		}

		/* 2. Si le verrou est déjà levé, on bloque l'exécution pour éviter le double appel */
		if (lockState.current) {
			return;
		}

		/* 3. On verrouille IMMÉDIATEMENT avant de lancer la requête asynchrone */
		lockState.current = true;

		(async () => {
			try {
				const response = await fetch(`/api/oauth?code=${code}&status=${urlStatus}`);
				const data = await response.json();

				setStatus(response.status);

				if (response.status === 200) {
					setIsSave(true); 
				} else {
					setError(data.error || "An error has occurred");
					setIsSave(false);
					/* Optionnel : déverrouiller ici si vous voulez permettre de réessayer */
					/* lockState.current = false; */
				}
			} catch (err) {
				setStatus(500);
				setError("Network error");
				lockState.current = false;
			}
		})();
		
	}, [code, urlStatus]);

	return (
		<main className="min-h-screen flex flex-col items-center justify-center px-6 gap-4">
			{/* ÉTAT 1 : En attente du traitement */}
			{status === null && (
				<p className="text-gray-500 font-medium animate-pulse">Connexion à Notion en cours...</p>
			)}

			{/* ÉTAT 2 : Échec du processus */}
			{status !== null && status !== 200 && (
				<div className="flex flex-col gap-2 p-8 sm:flex-row sm:items-center sm:gap-6 sm:py-4 border border-red-200 rounded-lg bg-red-50">
					<div className="space-y-2 text-center">
						<p className="font-medium text-red-600">Retrieving token process failed</p>
						{error && <p className="text-xs text-red-500">{error}</p>}	
					</div>
					<Button 
						onClick={() => router.push('/connect')}
					>
						Reconnect to Notion
					</Button>
				</div>
			)}

			{/* ÉTAT 3 : Réussi mais non sauvegardé */}
			{status === 200 && !isSave && (
				<div className="text-center space-y-3">
					<p className="text-amber-600 font-medium">Token not saved</p>
					<Button className="px-4 py-2 bg-amber-500 text-white rounded-md font-medium hover:bg-amber-600 transition">
						Retry to save
					</Button>
				</div>
			)}

			{/* ÉTAT 4 : Réussi et sauvegardé */}
			{status === 200 && isSave && (
				<div className="text-center space-y-3">
					<p className="text-green-600 font-medium">Token saved successfully!</p>
					<Button 
						onClick={() => router.push('/dashboard')}
					>
						Go to dashboard
					</Button>
				</div>
			)}
		</main>
	);
}