'use client';
import Image from 'next/image';
import { Copy, Download, Instagram, Palette, Twitter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import CardLoading from './cardLoading';
import { MoonLoader } from 'react-spinners';

interface BrandingTabProps {
	name: string;
	startupIdea: string;
	demo: boolean;
}

interface BrandingImagesResponse {
	emailHeader: string;
	logo: string;
	socialMediaAvatar: string;
	websiteBanner: string;
}

interface BrandingTextResponse {
	brand_identity: {
		colors: {
			accent: string;
			primary: string;
			secondary: string;
		};
		idea: string;
		social_media_posts: {
			instagram: string;
			linkedin: string;
			twitter: string;
		};
		tagline: string;
	};
}

const imagesSampleData = {
	emailHeader:
		'https://oaidalleapiprodscus.blob.core.windows.net/private/org-OJa9c1twZuBC2SIOZIw0SNUW/pandora-backend/img-ER4LGOpxuVKFsGIcpcQ29JeN.png?st=2025-03-08T22%3A29%3A49Z&se=2025-03-09T00%3A29%3A49Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-03-08T22%3A24%3A13Z&ske=2025-03-09T22%3A24%3A13Z&sks=b&skv=2024-08-04&sig=NTBQaHu1Hh8E9lRJlIgYdInENcESD5fCxuxf3pXc3w4%3D',
	logo:
		'https://oaidalleapiprodscus.blob.core.windows.net/private/org-OJa9c1twZuBC2SIOZIw0SNUW/pandora-backend/img-gmwpFcGjMFQPEjGTAukrHW96.png?st=2025-03-08T22%3A29%3A03Z&se=2025-03-09T00%3A29%3A03Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-03-08T22%3A30%3A30Z&ske=2025-03-09T22%3A30%3A30Z&sks=b&skv=2024-08-04&sig=V7pGJyTp8jLj/8Prv4grCn5sLpHQoVCOWL4KRfLdvXA%3D',
	socialMediaAvatar:
		'https://oaidalleapiprodscus.blob.core.windows.net/private/org-OJa9c1twZuBC2SIOZIw0SNUW/pandora-backend/img-XLCEPHyjNW7cj62Py8EBZXZ8.png?st=2025-03-08T22%3A29%3A32Z&se=2025-03-09T00%3A29%3A32Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-03-08T22%3A43%3A29Z&ske=2025-03-09T22%3A43%3A29Z&sks=b&skv=2024-08-04&sig=6x9N4mH/HmSBUpsfQYE3ARyLqRcqD5FFRV1MJ1IGhHc%3D',
	websiteBanner:
		'https://oaidalleapiprodscus.blob.core.windows.net/private/org-OJa9c1twZuBC2SIOZIw0SNUW/pandora-backend/img-VUQOUAzbmkRkioptkP3K5GsH.png?st=2025-03-08T22%3A29%3A21Z&se=2025-03-09T00%3A29%3A21Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-03-08T23%3A02%3A26Z&ske=2025-03-09T23%3A02%3A26Z&sks=b&skv=2024-08-04&sig=8DQChpf7Uh8rhlNHzP%2B799CfIf9pRQA0ee9Yjha48hc%3D',
};

const textSampleData = {
	brand_identity: {
		colors: {
			accent: '#FFFF00',
			primary: '#FFA500',
			secondary: '#8B4513',
		},
		idea: 'Coffee shop that sells honey coffee',
		social_media_posts: {
			instagram:
				"Honey, we've got the perfect brew for you! 🍯☕ Our unique honey coffee blend is creating quite a stir. Swipe to see how we craft this liquid gold, and come taste the buzz everyone's talking about! #HoneyCoffee #SweetBuzzSmoothSip #CoffeeLovers",
			linkedin:
				"🍯☕ Discover the perfect blend of nature's sweetness and coffee's boldness! Our honey coffee is creating quite a buzz. Experience a smooth, naturally sweet sip that'll have you coming back for more. #HoneyCoffee #SweetBuzzSmoothSip #UniqueBlend",
			twitter:
				'Bee-lieve the buzz! 🐝 Our honey coffee is the sweet treat your taste buds have been waiting for. Come in for a sip of liquid gold! ☕🍯 #HoneyCoffee #SweetBuzzSmoothSip',
		},
		tagline: 'Sweet Buzz, Smooth Sip',
	},
};

export function BrandingTab({ name, startupIdea, demo }: BrandingTabProps) {
	const [imageData, setImageData] = useState<BrandingImagesResponse | null>(
		demo ? imagesSampleData : null
	);
	const [textData, setTextData] = useState<BrandingTextResponse | null>(
		demo ? textSampleData : null
	);
	useEffect(() => {
		(async () => {
			if (!startupIdea || demo) return;
			console.log(`Brand Generation for ${startupIdea}`);

			let res = await fetch('http://127.0.0.1:5000//branding/images', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ idea: startupIdea }),
			});
			let data = await res.json();
			setImageData(data);

			res = await fetch('http://127.0.0.1:5000//branding/text', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ idea: startupIdea }),
			});
			data = await res.json();
			setTextData(data);
		})();
	}, [startupIdea]);
	if (!textData) return <CardLoading title="Branding" />;

	return (
		<div className="h-full p-4">
			<h2 className="text-xl font-bold mb-4">Branding</h2>

			<Tabs defaultValue="logo" className="w-full">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="logo">Logo & Colors</TabsTrigger>
					{/* <TabsTrigger value="voice">Brand Voice</TabsTrigger> */}
					<TabsTrigger value="social">Social Media</TabsTrigger>
					<TabsTrigger value="assets">Assets</TabsTrigger>
				</TabsList>

				<TabsContent value="logo" className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Logo</CardTitle>
								<CardDescription>AI-generated logo for {name}</CardDescription>
							</CardHeader>
							<CardContent className="flex flex-col items-center justify-center">
								<div className="bg-primary/10 rounded-full p-4 mb-4">
									<div className="w-32 h-32 relative">
										{imageData ? (
											<Image
												src={demo ? '/demo/logo.jpg' : imageData.logo}
												alt={`${name} logo`}
												width={128}
												height={128}
												className="object-contain rounded-full"
											/>
										) : (
											<MoonLoader size={16} />
										)}
									</div>
								</div>
								<div className="text-center">
									<h3 className="text-xl font-bold">{name}</h3>
									<p className="text-sm text-muted-foreground">Your brand identity</p>
								</div>
							</CardContent>
							<CardFooter className="flex justify-center gap-2">
								<Button size="sm" variant="outline">
									<Download className="mr-2 h-4 w-4" />
									Download
								</Button>
								<Button size="sm" variant="outline">
									<Copy className="mr-2 h-4 w-4" />
									Copy
								</Button>
							</CardFooter>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">Brand Colors</CardTitle>
								<CardDescription>Color palette for your brand</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="flex flex-col gap-2">
										<div className="flex items-center gap-2">
											<div
												className="w-6 h-6 rounded-full"
												style={{
													background: textData.brand_identity.colors.primary,
												}}
											></div>
											<span>Primary</span>
											<Badge variant="outline" className="ml-auto">
												{textData.brand_identity.colors.primary}
											</Badge>
										</div>
										<div
											className="h-12 rounded-md"
											style={{
												background: textData.brand_identity.colors.primary,
											}}
										></div>
									</div>

									<div className="flex flex-col gap-2">
										<div className="flex items-center gap-2">
											<div
												className="w-6 h-6 rounded-full"
												style={{
													background: textData.brand_identity.colors.secondary,
												}}
											></div>
											<span>Secondary</span>
											<Badge variant="outline" className="ml-auto">
												{textData.brand_identity.colors.secondary}
											</Badge>
										</div>
										<div
											className="h-12 rounded-md"
											style={{
												background: textData.brand_identity.colors.secondary,
											}}
										></div>
									</div>

									<div className="flex flex-col gap-2">
										<div className="flex items-center gap-2">
											<div
												className="w-6 h-6 rounded-full"
												style={{
													background: textData.brand_identity.colors.accent,
												}}
											></div>
											<span>Accent</span>
											<Badge variant="outline" className="ml-auto">
												{textData.brand_identity.colors.accent}
											</Badge>
										</div>
										<div
											className="h-12 rounded-md"
											style={{
												background: textData.brand_identity.colors.accent,
											}}
										></div>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<Button size="sm" variant="outline" className="w-full">
									<Palette className="mr-2 h-4 w-4" />
									Export Color Palette
								</Button>
							</CardFooter>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="voice" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle className="text-base">Brand Voice & Tone</CardTitle>
							<CardDescription>How your brand communicates</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div>
									<h3 className="font-medium mb-2">Brand Personality</h3>
									<div className="flex flex-wrap gap-2">
										<Badge>Professional</Badge>
										<Badge>Innovative</Badge>
										<Badge>Trustworthy</Badge>
										<Badge>Approachable</Badge>
										<Badge>Solution-oriented</Badge>
									</div>
								</div>

								<div>
									<h3 className="font-medium mb-2">Voice Characteristics</h3>
									<ul className="list-disc pl-5 space-y-1">
										<li>Clear and concise communication</li>
										<li>Confident but not arrogant</li>
										<li>Helpful and educational</li>
										<li>Conversational but professional</li>
										<li>Empathetic to customer needs</li>
									</ul>
								</div>

								<div>
									<h3 className="font-medium mb-2">Language Guidelines</h3>
									<div className="grid grid-cols-2 gap-4">
										<div>
											<p className="font-medium text-green-600 dark:text-green-400">Do</p>
											<ul className="list-disc pl-5 space-y-1">
												<li>Use active voice</li>
												<li>Be specific and direct</li>
												<li>Focus on benefits</li>
												<li>Use inclusive language</li>
											</ul>
										</div>
										<div>
											<p className="font-medium text-red-600 dark:text-red-400">Don't</p>
											<ul className="list-disc pl-5 space-y-1">
												<li>Use jargon unnecessarily</li>
												<li>Be overly technical</li>
												<li>Make unsubstantiated claims</li>
												<li>Use negative language</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="social" className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-base">Twitter</CardTitle>
								<Twitter className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="rounded-md border p-3">
										<p className="text-sm">{textData.brand_identity.social_media_posts.twitter}</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-base">LinkedIn</CardTitle>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="text-muted-foreground"
								>
									<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
									<rect x="2" y="9" width="4" height="12"></rect>
									<circle cx="4" cy="4" r="2"></circle>
								</svg>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="rounded-md border p-3">
										<p className="text-sm">{textData.brand_identity.social_media_posts.linkedin}</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-base">Instagram</CardTitle>
								<Instagram className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="rounded-md border p-3">
										<p className="text-sm">
											{textData.brand_identity.social_media_posts.instagram}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					<Card>
						<CardHeader>
							<CardTitle className="text-base">Content Calendar</CardTitle>
							<CardDescription>Suggested posting schedule</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="grid grid-cols-7 gap-2 text-center text-xs font-medium">
									<div>Mon</div>
									<div>Tue</div>
									<div>Wed</div>
									<div>Thu</div>
									<div>Fri</div>
									<div>Sat</div>
									<div>Sun</div>
								</div>
								<div className="grid grid-cols-7 gap-2">
									<div className="rounded-md bg-blue-100 dark:bg-blue-900 p-2 text-xs">
										Industry Tips
									</div>
									<div className="rounded-md bg-green-100 dark:bg-green-900 p-2 text-xs">
										Product Feature
									</div>
									<div className="rounded-md bg-purple-100 dark:bg-purple-900 p-2 text-xs">
										Customer Story
									</div>
									<div className="rounded-md bg-yellow-100 dark:bg-yellow-900 p-2 text-xs">
										Behind the Scenes
									</div>
									<div className="rounded-md bg-red-100 dark:bg-red-900 p-2 text-xs">
										Industry News
									</div>
									<div className="rounded-md bg-gray-100 dark:bg-gray-800 p-2 text-xs">
										Inspiration
									</div>
									<div className="rounded-md bg-gray-100 dark:bg-gray-800 p-2 text-xs">
										Weekly Recap
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="assets" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle className="text-base">Brand Assets</CardTitle>
							<CardDescription>Download and use your brand assets</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="border rounded-md p-4 flex flex-col items-center">
									<div className="bg-primary/10 rounded-md p-4 mb-4">
										{imageData ? (
											<Image
												src={demo ? '/demo/websiteBanner.png' : imageData.websiteBanner}
												alt="Banner"
												width={200}
												height={100}
												className="object-contain"
											/>
										) : (
											<MoonLoader size={16} />
										)}
									</div>
									<h3 className="font-medium">Website Banner</h3>
									<p className="text-sm text-muted-foreground mb-4">1200 x 600px</p>
									<Button size="sm" variant="outline">
										<Download className="mr-2 h-4 w-4" />
										Download
									</Button>
								</div>

								<div className="border rounded-md p-4 flex flex-col items-center">
									<div className="bg-primary/10 rounded-md p-4 mb-4">
										{imageData ? (
											<Image
												src={demo ? '/demo/socialMediaAvatar.png' : imageData?.socialMediaAvatar}
												alt="Social Media Avatar"
												width={100}
												height={100}
												className="object-contain rounded-full"
											/>
										) : (
											<MoonLoader size={16} />
										)}
									</div>
									<h3 className="font-medium">Social Media Avatar</h3>
									<p className="text-sm text-muted-foreground mb-4">500 x 500px</p>
									<Button size="sm" variant="outline">
										<Download className="mr-2 h-4 w-4" />
										Download
									</Button>
								</div>
							</div>
							<div className="border rounded-md p-4 flex flex-col items-center mt-4">
								<div className="bg-primary/10 rounded-md p-4 mb-4">
									{imageData ? (
										<Image
											src={demo ? '/demo/emailHeader.png' : imageData?.emailHeader}
											alt="Email Header"
											width={200 * 1.5}
											height={100 * 1.5}
											className="object-contain"
										/>
									) : (
										<MoonLoader size={16} />
									)}
								</div>
								<h3 className="font-medium">Email Header</h3>
								<p className="text-sm text-muted-foreground mb-4">600 x 200px</p>
								<Button size="sm" variant="outline">
									<Download className="mr-2 h-4 w-4" />
									Download
								</Button>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
