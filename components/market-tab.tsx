'use client';
import { BarChart, LineChart } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';
import CardLoading from './cardLoading';

interface MarketTabProps {
	startupIdea: string;
	demo: boolean;
}

interface MarketAnalysisResponse {
	CompetitiveLandscape: {
		CompetitorName: string;
		MarketSharePercent: number;
		Strengths: string;
		Weaknesses: string;
	}[];
	CustomerSegments: {
		Name: string;
		Percent: number;
	}[];
	GeographicDistribution: {
		Percent: number;
		region: string;
	}[];
	MarketSize: {
		SAM: string;
		SOM: string;
		TAM: string;
	};
	MarketSizeGrowingYOYPercent: {
		SAM: number;
		SOM: number;
		TAM: number;
	};
	MarketTrends: string[];
	SWOT: {
		Opportunities: string[];
		Strengths: string[];
		Threats: string[];
		Weaknesses: string[];
	};
}

const sampleData: MarketAnalysisResponse = {
	CompetitiveLandscape: [
		{
			CompetitorName: 'Starbucks',
			MarketSharePercent: 40,
			Strengths: 'Global brand recognition, extensive store network',
			Weaknesses: 'Perceived as commercial, less personalized',
		},
		{
			CompetitorName: 'Costa Coffee',
			MarketSharePercent: 15,
			Strengths: 'Strong presence in Europe and Asia',
			Weaknesses: 'Limited menu variety',
		},
		{
			CompetitorName: "Dunkin'",
			MarketSharePercent: 10,
			Strengths: 'Affordable pricing, fast service',
			Weaknesses: 'Less focus on premium coffee offerings',
		},
		{
			CompetitorName: 'Local specialty coffee shops',
			MarketSharePercent: 20,
			Strengths: 'Unique offerings, personalized experience',
			Weaknesses: 'Limited scalability',
		},
		{
			CompetitorName: 'Your position',
			MarketSharePercent: 5,
			Strengths: 'Unique honey coffee offering, focus on quality',
			Weaknesses: 'Limited brand recognition, smaller network',
		},
	],
	CustomerSegments: [
		{
			Name: 'Young urban professionals',
			Percent: 40,
		},
		{
			Name: 'Health-conscious consumers',
			Percent: 30,
		},
		{
			Name: 'Coffee enthusiasts',
			Percent: 20,
		},
		{
			Name: 'Students',
			Percent: 10,
		},
	],
	GeographicDistribution: [
		{
			Percent: 35,
			region: 'North America',
		},
		{
			Percent: 30,
			region: 'Europe',
		},
		{
			Percent: 25,
			region: 'Asia Pacific',
		},
		{
			Percent: 10,
			region: 'Rest of World',
		},
	],
	MarketSize: {
		SAM: '94.7B',
		SOM: '1.89B',
		TAM: '473.1B',
	},
	MarketSizeGrowingYOYPercent: {
		SAM: 3.01,
		SOM: 6.52,
		TAM: 3.5,
	},
	MarketTrends: [
		'Rising demand for specialty and premium coffee',
		'Increasing focus on sustainability and ethical sourcing',
		'Growing popularity of honey as a natural sweetener',
		'Shift towards experiential coffee shops',
		'Integration of digital technologies in coffee shops',
	],
	SWOT: {
		Opportunities: [
			'Growing interest in specialty coffee and natural sweeteners',
			'Expansion into retail products (bottled honey coffee)',
			'Partnerships with local honey producers',
			'Development of honey-based coffee products',
		],
		Strengths: [
			'Unique honey coffee offering',
			'Focus on quality and premium ingredients',
			'Potential health benefits of honey',
			'Customizable coffee experience',
		],
		Threats: [
			'Competition from established coffee chains',
			'Fluctuating coffee and honey prices',
			'Changing consumer preferences',
			'Potential health concerns about sugar content in honey',
		],
		Weaknesses: [
			'Limited initial brand recognition',
			'Smaller network compared to established chains',
			'Higher costs due to premium ingredients',
			'Potential supply chain challenges for honey',
		],
	},
};

export function MarketTab({ startupIdea, demo }: MarketTabProps) {
	const [data, setData] = useState<MarketAnalysisResponse | null>(demo ? sampleData : null);
	useEffect(() => {
		(async () => {
			if (!startupIdea || demo) return;
			console.log(`Market Analysis for ${startupIdea}`);

			const res = await fetch('http://127.0.0.1:5000/market', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ idea: startupIdea }),
			});
			const data = await res.json();
			setData(data);
		})();
	}, [startupIdea]);
	if (!data) return <CardLoading title="Market Analysis" />;
	return (
		<div className="h-full p-4">
			<h2 className="text-xl font-bold mb-4">Market Analysis</h2>

			<Tabs defaultValue="overview" className="w-full">
				<TabsList className="grid w-full grid-cols-4">
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="trends">Trends</TabsTrigger>
					<TabsTrigger value="competition">Competition</TabsTrigger>
					<TabsTrigger value="swot">SWOT</TabsTrigger>
				</TabsList>

				<TabsContent value="overview" className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base">TAM</CardTitle>
								<CardDescription>Estimated total addressable market</CardDescription>
							</CardHeader>
							<CardContent className="flex items-center justify-center py-4">
								<div className="flex items-center gap-2">
									<BarChart className="h-12 w-12 text-primary" />
									<div>
										<p className="text-2xl font-bold">${data?.MarketSize.TAM}</p>
										<p className="text-sm text-muted-foreground">
											Yearly +{data?.MarketSizeGrowingYOYPercent.TAM}%
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base">SAM</CardTitle>
								<CardDescription>Estimated serviceable available market</CardDescription>
							</CardHeader>
							<CardContent className="flex items-center justify-center py-4">
								<div className="flex items-center gap-2">
									<BarChart className="h-12 w-12 text-primary" />
									<div>
										<p className="text-2xl font-bold">${data?.MarketSize.SAM}</p>
										<p className="text-sm text-muted-foreground">
											Yearly +{data?.MarketSizeGrowingYOYPercent.SAM}%
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base">SOM</CardTitle>
								<CardDescription>Estimated serviceable obtainable market </CardDescription>
							</CardHeader>
							<CardContent className="flex items-center justify-center py-4">
								<div className="flex items-center gap-2">
									<BarChart className="h-12 w-12 text-primary" />
									<div>
										<p className="text-2xl font-bold">${data?.MarketSize.SOM}</p>
										<p className="text-sm text-muted-foreground">
											Yearly +{data?.MarketSizeGrowingYOYPercent.SOM}%
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base">Customer Segments</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="space-y-2">
									{data?.CustomerSegments.map((segment) => (
										<li key={segment.Name} className="flex items-center gap-2">
											<span className={`h-2 w-2 rounded-full bg-blue-500`}></span>
											<span>
												{segment.Name} ({segment.Percent}%)
											</span>
										</li>
									))}
									{/* <li className="flex items-center gap-2">
										<span className="h-2 w-2 rounded-full bg-blue-500"></span>
										<span>Small Businesses (42%)</span>
									</li>
									<li className="flex items-center gap-2">
										<span className="h-2 w-2 rounded-full bg-green-500"></span>
										<span>Enterprise (28%)</span>
									</li>
									<li className="flex items-center gap-2">
										<span className="h-2 w-2 rounded-full bg-yellow-500"></span>
										<span>Consumers (30%)</span>
									</li> */}
								</ul>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base">Geographic Distribution</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="space-y-2">
									{data?.GeographicDistribution.map((region) => (
										<li key={region.region} className="flex items-center gap-2">
											<span
												className={`h-2 w-2 rounded-full bg-blue-500
												`}
											></span>
											<span>
												{region.region} ({region.Percent}%)
											</span>
										</li>
									))}
									{/* <li className="flex items-center gap-2">
										<span className="h-2 w-2 rounded-full bg-red-500"></span>
										<span>North America (55%)</span>
									</li>
									<li className="flex items-center gap-2">
										<span className="h-2 w-2 rounded-full bg-purple-500"></span>
										<span>Europe (25%)</span>
									</li>
									<li className="flex items-center gap-2">
										<span className="h-2 w-2 rounded-full bg-indigo-500"></span>
										<span>Asia Pacific (20%)</span>
									</li> */}
								</ul>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="trends" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle className="text-base">Market Trends</CardTitle>
							<CardDescription>Key trends affecting {startupIdea}</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex items-center justify-center mb-4">
								<LineChart className="h-32 w-32 text-primary" />
							</div>
							<ul className="space-y-2">
								{data?.MarketTrends.map((trend) => (
									<li key={trend} className="flex items-center gap-2">
										<span className={`h-2 w-2 rounded-full bg-blue-500`}></span>
										<span>{trend}</span>
									</li>
								))}
								{/* <li className="flex items-center gap-2">
									<span className="h-2 w-2 rounded-full bg-green-500"></span>
									<span>Increasing demand for digital solutions</span>
								</li>
								<li className="flex items-center gap-2">
									<span className="h-2 w-2 rounded-full bg-blue-500"></span>
									<span>Shift towards subscription-based models</span>
								</li>
								<li className="flex items-center gap-2">
									<span className="h-2 w-2 rounded-full bg-purple-500"></span>
									<span>Growing focus on sustainability</span>
								</li>
								<li className="flex items-center gap-2">
									<span className="h-2 w-2 rounded-full bg-yellow-500"></span>
									<span>Integration of AI and automation</span>
								</li> */}
							</ul>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="competition" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle className="text-base">Competitive Landscape</CardTitle>
							<CardDescription>Key players in the market</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{data?.CompetitiveLandscape.map((competitor) => (
									<div
										key={competitor.CompetitorName}
										className="flex items-center justify-between"
									>
										<span>{competitor.CompetitorName}</span>
										<div className="w-2/3 bg-muted rounded-full h-2.5">
											<div
												className={`h-2.5 rounded-full ${
													competitor.CompetitorName === 'Your position'
														? 'bg-green-500'
														: 'bg-primary'
												}`}
												style={{ width: `${competitor.MarketSharePercent}%` }}
											></div>
										</div>
									</div>
								))}
								{/* <div className="flex items-center justify-between">
									<span>Competitor A</span>
									<div className="w-2/3 bg-muted rounded-full h-2.5">
										<div className="bg-primary h-2.5 rounded-full" style={{ width: '85%' }}></div>
									</div>
								</div>
								<div className="flex items-center justify-between">
									<span>Competitor B</span>
									<div className="w-2/3 bg-muted rounded-full h-2.5">
										<div className="bg-primary h-2.5 rounded-full" style={{ width: '70%' }}></div>
									</div>
								</div>
								<div className="flex items-center justify-between">
									<span>Competitor C</span>
									<div className="w-2/3 bg-muted rounded-full h-2.5">
										<div className="bg-primary h-2.5 rounded-full" style={{ width: '60%' }}></div>
									</div>
								</div>
								<div className="flex items-center justify-between">
									<span>Your Position</span>
									<div className="w-2/3 bg-muted rounded-full h-2.5">
										<div className="bg-green-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
									</div>
								</div> */}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="swot" className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Card className="bg-blue-50 dark:bg-blue-950">
							<CardHeader>
								<CardTitle className="text-base">Strengths</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="list-disc pl-5 space-y-1">
									{data?.SWOT.Strengths.map((strength) => (
										<li key={strength}>{strength}</li>
									))}
									{/* <li>Unique honey coffee offering</li>
									{/* <li>Innovative product offering</li>
									<li>Strong founding team expertise</li>
									<li>Low overhead costs</li>
									<li>Agility and adaptability</li> */}
								</ul>
							</CardContent>
						</Card>

						<Card className="bg-red-50 dark:bg-red-950">
							<CardHeader>
								<CardTitle className="text-base">Weaknesses</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="list-disc pl-5 space-y-1">
									{data?.SWOT.Weaknesses.map((weakness) => (
										<li key={weakness}>{weakness}</li>
									))}
									{/* <li>Limited initial resources</li>
									<li>Brand awareness challenges</li>
									<li>Unproven business model</li>
									<li>Small customer base</li> */}
								</ul>
							</CardContent>
						</Card>

						<Card className="bg-green-50 dark:bg-green-950">
							<CardHeader>
								<CardTitle className="text-base">Opportunities</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="list-disc pl-5 space-y-1">
									{data?.SWOT.Opportunities.map((opportunity) => (
										<li key={opportunity}>{opportunity}</li>
									))}
									{/* <li>Emerging market demand</li>
									{/* <li>Expanding market size</li>
									<li>Strategic partnerships</li>
									<li>International expansion</li>
									<li>New feature development</li> */}
								</ul>
							</CardContent>
						</Card>

						<Card className="bg-yellow-50 dark:bg-yellow-950">
							<CardHeader>
								<CardTitle className="text-base">Threats</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="list-disc pl-5 space-y-1">
									{data?.SWOT.Threats.map((threat) => (
										<li key={threat}>{threat}</li>
									))}
									{/* <li>Established competitors</li>
									<li>Changing regulations</li>
									<li>Economic downturns</li>
									<li>Rapid technological changes</li> */}
								</ul>
							</CardContent>
						</Card>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
