'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Rocket } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Home() {
	const router = useRouter();
	const [startupIdea, setStartupIdea] = useState('');
	const [name, setName] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// In a real app, you might want to save this to a database or context
		// For now, we'll just pass it as URL parameters
		const params = new URLSearchParams();
		params.set('idea', startupIdea);
		params.set('name', name);

		setTimeout(() => {
			router.push(`/dashboard?${params.toString()}`);
		}, 1000); // Simulate loading
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted">
			<Card className="w-full max-w-md">
				<CardHeader>
					<div className="flex items-center gap-2 mb-2">
						<Rocket className="h-6 w-6 text-primary" />
						<CardTitle>Startup Launchpad</CardTitle>
					</div>
					<CardDescription>
						Transform your startup idea into a fully-fledged business with our interactive
						dashboard.
					</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">What's your startup name?</Label>
							<Input
								id="name"
								placeholder="Future Co."
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="startup-idea">What's your startup idea?</Label>
							<Textarea
								id="startup-idea"
								placeholder="e.g., A subscription box for plant enthusiasts"
								value={startupIdea}
								onChange={(e) => setStartupIdea(e.target.value)}
								rows={4}
								required
							/>
						</div>
					</CardContent>
					<CardFooter>
						<Button type="submit" className="w-full" disabled={isSubmitting}>
							{isSubmitting ? 'Creating your dashboard...' : 'Create my business dashboard'}
						</Button>
					</CardFooter>
				</form>
				<Button
					variant="secondary"
					className="w-full rounded-t-none"
					onClick={() =>
						router.push('/dashboard?idea=A+coffee+shop+that+sells+honey&name=Hawney&demo=true')
					}
				>
					View demo
				</Button>
			</Card>
		</main>
	);
}
