import { Check, HelpCircle, X } from 'lucide-react';

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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import CardLoading from './cardLoading';

interface PricingTabProps {
	startupIdea: string;
	demo: boolean;
}

interface PricingStrategyResponse {
	competitor_analysis: {
		key_differentiator: string;
		name: string;
		price_points: string[];
		pricing_model: string;
	}[];
	financial_projection: {
		cost_allocation: {
			Ingredients: string;
			Labor: string;
			Marketing: string;
			Rent: string;
			Utilities: string;
		};
		monthly_costs: string;
		monthly_profit: string;
		monthly_revenue: string;
		profit_margin: string;
		revenue_distribution: {
			High_Tier: string;
			Low_Tier: string;
			Mid_Tier: string;
		};
	};
	key_insights: string[];
	optimization_opportunities: string[];
	pricing_tiers: {
		High_Tier: {
			features: string[];
			price: string;
		};
		Low_Tier: {
			features: string[];
			price: string;
		};
		Mid_Tier: {
			features: string[];
			price: string;
		};
	};
	selected_pricing_model: string;
}

const sampleData: PricingStrategyResponse = {
	competitor_analysis: [
		{
			key_differentiator: 'Global brand recognition',
			name: 'Starbucks',
			price_points: ['4.95', '5.95', '6.95'],
			pricing_model: 'One-Time Price',
		},
		{
			key_differentiator: 'Lower price point',
			name: "Dunkin'",
			price_points: ['3.95', '4.95', '5.95'],
			pricing_model: 'One-Time Price',
		},
		{
			key_differentiator: 'Locally sourced honey',
			name: 'Local Cafe',
			price_points: ['5.50', '6.50', '7.50'],
			pricing_model: 'One-Time Price',
		},
	],
	financial_projection: {
		cost_allocation: {
			Ingredients: '4500',
			Labor: '4000',
			Marketing: '1500',
			Rent: '2500',
			Utilities: '997',
		},
		monthly_costs: '13497',
		monthly_profit: '8998',
		monthly_revenue: '22495',
		profit_margin: '40',
		revenue_distribution: {
			High_Tier: '100',
			Low_Tier: '500',
			Mid_Tier: '300',
		},
	},
	key_insights: [
		"Subscription model offers better value for frequent customers compared to competitors' one-time pricing",
		'Unique honey coffee product differentiates from major coffee chains',
		'Tiered subscription model allows for customer segmentation and upselling opportunities',
	],
	optimization_opportunities: [
		'Increase marketing efforts for Mid_Tier subscription to boost overall revenue',
		'Negotiate bulk discounts with honey suppliers to reduce ingredient costs',
		'Implement a referral program to increase customer acquisition at a lower cost',
	],
	pricing_tiers: {
		High_Tier: {
			features: [
				'Unlimited honey coffee drinks',
				'20% discount on in-store purchases',
				'Monthly newsletter',
				'Exclusive seasonal flavors',
				'Priority queue',
				'Free pastry weekly',
			],
			price: '49.99',
		},
		Low_Tier: {
			features: [
				'1 honey coffee drink per day',
				'10% discount on in-store purchases',
				'Monthly newsletter',
			],
			price: '15.99',
		},
		Mid_Tier: {
			features: [
				'2 honey coffee drinks per day',
				'15% discount on in-store purchases',
				'Monthly newsletter',
				'Exclusive seasonal flavors',
			],
			price: '29.99',
		},
	},
	selected_pricing_model: 'Subscription-Based',
};

export function PricingTab({ startupIdea, demo }: PricingTabProps) {
	const [data, setData] = useState<PricingStrategyResponse | null>(demo ? sampleData : null);
	useEffect(() => {
		(async () => {
			if (!startupIdea || demo) return;
			console.log(`Pricing Strategy for ${startupIdea}`);

			const res = await fetch('https://hackknight-api-4b72e0673517.herokuapp.com//pricing', {
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
	if (!data) return <CardLoading title="Pricing Strategy" />;

	return (
		<div className="h-full p-4">
			<h2 className="text-xl font-bold mb-4">Pricing Strategy</h2>

			<Tabs defaultValue="calculator" className="w-full">
				<TabsList className="grid w-full grid-cols-4">
					<TabsTrigger value="calculator">Profit Calculator</TabsTrigger>
					<TabsTrigger value="tiers">Pricing Tiers</TabsTrigger>
					<TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
					<TabsTrigger value="models">Pricing Models</TabsTrigger>
				</TabsList>

				<TabsContent value="calculator" className="space-y-4">
					<TooltipProvider>
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Profit Margin Calculator</CardTitle>
								<CardDescription>
									Estimate your profit margins based on pricing and costs
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-6">
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										<div className="space-y-2">
											<div className="flex items-center justify-between">
												<label className="text-sm font-medium">Monthly Revenue</label>
												<Tooltip>
													<TooltipTrigger>
														<HelpCircle className="h-4 w-4 text-muted-foreground" />
													</TooltipTrigger>
													<TooltipContent>
														<p className="w-80 text-xs">
															Estimated monthly revenue based on your pricing tiers and projected
															customer distribution.
														</p>
													</TooltipContent>
												</Tooltip>
											</div>
											<div className="text-2xl font-bold">
												${data?.financial_projection.monthly_revenue}
											</div>
											<div className="text-xs text-muted-foreground">
												Based on 150 Basic, 75 Pro, and 25 Enterprise customers
											</div>
										</div>

										<div className="space-y-2">
											<div className="flex items-center justify-between">
												<label className="text-sm font-medium">Monthly Costs</label>
												<Tooltip>
													<TooltipTrigger>
														<HelpCircle className="h-4 w-4 text-muted-foreground" />
													</TooltipTrigger>
													<TooltipContent>
														<p className="w-80 text-xs">
															Estimated monthly costs including hosting, support, development, and
															marketing expenses.
														</p>
													</TooltipContent>
												</Tooltip>
											</div>
											<div className="text-2xl font-bold">
												${data?.financial_projection.monthly_costs}
											</div>
											<div className="text-xs text-muted-foreground">
												{/* Infrastructure: $2,100, Support: $1,500, Development: $2,000, Marketing:
												$700 */}
												{data?.financial_projection.cost_allocation &&
													Object.entries(data.financial_projection.cost_allocation).map(
														([key, value], index) => (
															<div key={index}>
																{key}: ${value}
															</div>
														)
													)}
											</div>
										</div>

										<div className="space-y-2">
											<div className="flex items-center justify-between">
												<label className="text-sm font-medium">Monthly Profit</label>
												<Tooltip>
													<TooltipTrigger>
														<HelpCircle className="h-4 w-4 text-muted-foreground" />
													</TooltipTrigger>
													<TooltipContent>
														<p className="w-80 text-xs">
															Estimated monthly profit (revenue minus costs) and profit margin
															percentage.
														</p>
													</TooltipContent>
												</Tooltip>
											</div>
											<div className="text-2xl font-bold text-green-600 dark:text-green-400">
												${data?.financial_projection.monthly_profit}
											</div>
											<div className="text-xs text-muted-foreground">
												{data?.financial_projection.profit_margin}% profit margin
											</div>
										</div>
									</div>

									<div>
										<h3 className="font-medium mb-2">Profit Breakdown by Tier</h3>
										<div className="space-y-3">
											<div>
												<div className="flex items-center justify-between mb-1">
													<span className="text-sm">Low Tier</span>
													<span className="text-sm">
														{data?.financial_projection.revenue_distribution.Low_Tier}%
													</span>
												</div>
												<div className="w-full bg-muted rounded-full h-2.5">
													<div
														className="bg-blue-500 h-2.5 rounded-full"
														style={{ width: '24%' }}
													></div>
												</div>
											</div>
											<div>
												<div className="flex items-center justify-between mb-1">
													<span className="text-sm">Mid Tier</span>
													<span className="text-sm">
														{data?.financial_projection.revenue_distribution.Mid_Tier}%
													</span>
												</div>
												<div className="w-full bg-muted rounded-full h-2.5">
													<div
														className="bg-green-500 h-2.5 rounded-full"
														style={{ width: '40%' }}
													></div>
												</div>
											</div>
											<div>
												<div className="flex items-center justify-between mb-1">
													<span className="text-sm">High Tier</span>
													<span className="text-sm">
														{data?.financial_projection.revenue_distribution.High_Tier}%
													</span>
												</div>
												<div className="w-full bg-muted rounded-full h-2.5">
													<div
														className="bg-purple-500 h-2.5 rounded-full"
														style={{ width: '36%' }}
													></div>
												</div>
											</div>
										</div>
									</div>

									<div>
										<h3 className="font-medium mb-2">Optimization Opportunities</h3>
										<ul className="space-y-2">
											{data?.optimization_opportunities.map((opportunity, index) => (
												<li key={index} className="flex items-start gap-2">
													<Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
													<p className="text-sm">{opportunity}</p>
												</li>
											))}
											{/* <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <p className="text-sm">
                          Increase marketing efforts for Mid_Tier subscription to boost overall
                          revenue
                        </p>
											{/* <li className="flex items-start gap-2">
												<Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
												<p className="text-sm">
													Focus marketing efforts on Professional tier for highest ROI
												</p>
											</li>
											<li className="flex items-start gap-2">
												<Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
												<p className="text-sm">
													Consider a 10% price increase on Enterprise tier to improve margins
												</p>
											</li>
											<li className="flex items-start gap-2">
												<Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
												<p className="text-sm">
													Implement annual billing discounts to improve cash flow
												</p>
											</li>
											<li className="flex items-start gap-2">
												<Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
												<p className="text-sm">
													Explore infrastructure cost optimizations to increase overall margins
												</p>
											</li> */}
										</ul>
									</div>
								</div>
							</CardContent>
						</Card>
					</TooltipProvider>
				</TabsContent>

				<TabsContent value="models" className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Subscription Model</CardTitle>
								<CardDescription>Recurring revenue model</CardDescription>
							</CardHeader>
							<CardContent className="space-y-2">
								<div className="flex items-start gap-2">
									<Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
									<p className="text-sm">Predictable recurring revenue</p>
								</div>
								<div className="flex items-start gap-2">
									<Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
									<p className="text-sm">Lower barrier to entry for customers</p>
								</div>
								<div className="flex items-start gap-2">
									<Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
									<p className="text-sm">Opportunity for upsells and expansions</p>
								</div>
								<div className="flex items-start gap-2">
									<X className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
									<p className="text-sm">Customer churn risk</p>
								</div>
							</CardContent>
							<CardFooter>
								<Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
									Recommended
								</Badge>
							</CardFooter>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">One-time Purchase</CardTitle>
								<CardDescription>Single payment model</CardDescription>
							</CardHeader>
							<CardContent className="space-y-2">
								<div className="flex items-start gap-2">
									<Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
									<p className="text-sm">Immediate revenue recognition</p>
								</div>
								<div className="flex items-start gap-2">
									<Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
									<p className="text-sm">No recurring billing management</p>
								</div>
								<div className="flex items-start gap-2">
									<X className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
									<p className="text-sm">Requires continuous customer acquisition</p>
								</div>
								<div className="flex items-start gap-2">
									<X className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
									<p className="text-sm">Limited ongoing customer relationship</p>
								</div>
							</CardContent>
							<CardFooter>
								<Badge variant="outline">Alternative</Badge>
							</CardFooter>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">Usage-Based</CardTitle>
								<CardDescription>Pay-as-you-go model</CardDescription>
							</CardHeader>
							<CardContent className="space-y-2">
								<div className="flex items-start gap-2">
									<Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
									<p className="text-sm">Aligns pricing with customer value</p>
								</div>
								<div className="flex items-start gap-2">
									<Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
									<p className="text-sm">Attractive to customers with variable needs</p>
								</div>
								<div className="flex items-start gap-2">
									<Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
									<p className="text-sm">Potential for high-volume revenue</p>
								</div>
								<div className="flex items-start gap-2">
									<X className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
									<p className="text-sm">Revenue unpredictability</p>
								</div>
							</CardContent>
							<CardFooter>
								<Badge variant="outline">Consider for future</Badge>
							</CardFooter>
						</Card>
					</div>

					<Card>
						<CardHeader>
							<CardTitle className="text-base">Hybrid Pricing Recommendation</CardTitle>
							<CardDescription>Optimized approach for your business</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-sm">
								Based on your startup idea, we recommend a{' '}
								<strong>tiered subscription model with usage limits</strong>. This approach provides
								predictable recurring revenue while allowing customers to choose the tier that best
								fits their needs.
							</p>
							<div className="mt-4 space-y-2">
								<div className="flex items-start gap-2">
									<Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
									<p className="text-sm">Offer 3-4 tiers with clear value differentiation</p>
								</div>
								<div className="flex items-start gap-2">
									<Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
									<p className="text-sm">
										Include usage limits with overage charges for heavy users
									</p>
								</div>
								<div className="flex items-start gap-2">
									<Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
									<p className="text-sm">
										Offer annual billing with a discount (e.g., 2 months free)
									</p>
								</div>
								<div className="flex items-start gap-2">
									<Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
									<p className="text-sm">
										Consider a free tier or trial to reduce acquisition friction
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="tiers" className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<Card className="flex flex-col border-muted">
							<CardHeader>
								<CardTitle className="text-base">Low Tier</CardTitle>
								<div className="mt-2">
									<span className="text-3xl font-bold">${data?.pricing_tiers.Low_Tier.price}</span>
									<span className="text-muted-foreground">/month</span>
								</div>
								<CardDescription>For individuals and small teams</CardDescription>
							</CardHeader>
							<CardContent className="flex-1">
								<ul className="space-y-2 text-sm">
									{data?.pricing_tiers.Low_Tier.features.map((feature, index) => (
										<li key={index} className="flex items-start gap-2">
											<Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
											<span>{feature}</span>
										</li>
									))}
									{/* <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span>Core features</span>
									{/* <li className="flex items-start gap-2">
										<Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
										<span>Core features</span>
									</li>
									<li className="flex items-start gap-2">
										<Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
										<span>Up to 3 users</span>
									</li>
									<li className="flex items-start gap-2">
										<Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
										<span>5 projects</span>
									</li>
									<li className="flex items-start gap-2">
										<Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
										<span>Basic analytics</span>
									</li>
									<li className="flex items-start gap-2">
										<Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
										<span>Email support</span>
									</li>
									<li className="flex items-start gap-2">
										<X className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
										<span className="text-muted-foreground">Advanced features</span>
									</li>
									<li className="flex items-start gap-2">
										<X className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
										<span className="text-muted-foreground">API access</span>
									</li> */}
								</ul>
							</CardContent>
							<CardFooter>
								<Button variant="outline" className="w-full">
									Select Plan
								</Button>
							</CardFooter>
						</Card>

						<Card className="flex flex-col relative border-primary">
							<div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
								<Badge className="bg-primary text-primary-foreground">Popular</Badge>
							</div>
							<CardHeader>
								<CardTitle className="text-base">Mid Tier</CardTitle>
								<div className="mt-2">
									<span className="text-3xl font-bold">${data?.pricing_tiers.Mid_Tier.price}</span>
									<span className="text-muted-foreground">/month</span>
								</div>
								<CardDescription>For growing businesses</CardDescription>
							</CardHeader>
							<CardContent className="flex-1">
								<ul className="space-y-2 text-sm">
									{data?.pricing_tiers.Mid_Tier.features.map((feature, index) => (
										<li key={index} className="flex items-start gap-2">
											<Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
											<span>{feature}</span>
										</li>
									))}
									{/* <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span>All Basic features</span>
									{/* <li className="flex items-start gap-2">
										<Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
										<span>All Basic features</span>
									</li>
									<li className="flex items-start gap-2">
										<Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
										<span>Up to 10 users</span>
									</li>
									<li className="flex items-start gap-2">
										<Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
										<span>20 projects</span>
									</li>
									<li className="flex items-start gap-2">
										<Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
										<span>Advanced analytics</span>
									</li>
									<li className="flex items-start gap-2">
										<Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
										<span>Priority support</span>
									</li>
									<li className="flex items-start gap-2">
										<Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
										<span>Advanced features</span>
									</li> */}
									{/* <li className="flex items-start gap-2">
										<X className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
										<span className="text-muted-foreground">API access</span>
									</li> */}
								</ul>
							</CardContent>
							<CardFooter>
								<Button className="w-full">Select Plan</Button>
							</CardFooter>
						</Card>

						<Card className="flex flex-col border-muted">
							<CardHeader>
								<CardTitle className="text-base">High Tier</CardTitle>
								<div className="mt-2">
									<span className="text-3xl font-bold">${data?.pricing_tiers.High_Tier.price}</span>
									<span className="text-muted-foreground">/month</span>
								</div>
								<CardDescription>For large organizations</CardDescription>
							</CardHeader>
							<CardContent className="flex-1">
								<ul className="space-y-2 text-sm">
									{data?.pricing_tiers.High_Tier.features.map((feature, index) => (
										<li key={index} className="flex items-start gap-2">
											<Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
											<span>{feature}</span>
										</li>
									))}
									{/* <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span>All Professional features</span>
									{/* <li className="flex items-start gap-2">
										<Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
										<span>All Professional features</span>
									</li>
									<li className="flex items-start gap-2">
										<Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
										<span>Unlimited users</span>
									</li>
									<li className="flex items-start gap-2">
										<Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
										<span>Unlimited projects</span>
									</li>
									<li className="flex items-start gap-2">
										<Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
										<span>Custom analytics</span>
									</li>
									<li className="flex items-start gap-2">
										<Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
										<span>Dedicated support</span>
									</li>
									<li className="flex items-start gap-2">
										<Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
										<span>Advanced features</span>
									</li>
									<li className="flex items-start gap-2">
										<Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
										<span>API access</span>
									</li> */}
								</ul>
							</CardContent>
							<CardFooter>
								<Button variant="outline" className="w-full">
									Select Plan
								</Button>
							</CardFooter>
						</Card>
					</div>

					<Card>
						<CardHeader>
							<CardTitle className="text-base">Pricing Page Recommendations</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="flex items-start gap-3">
									<div className="bg-primary/10 rounded-full p-2">
										<Check className="h-5 w-5 text-primary" />
									</div>
									<div>
										<h3 className="font-medium">Highlight your most popular plan</h3>
										<p className="text-sm text-muted-foreground">
											Make it visually distinct and label it as "Most Popular" to guide customer
											choice.
										</p>
									</div>
								</div>

								<div className="flex items-start gap-3">
									<div className="bg-primary/10 rounded-full p-2">
										<Check className="h-5 w-5 text-primary" />
									</div>
									<div>
										<h3 className="font-medium">Offer annual billing option</h3>
										<p className="text-sm text-muted-foreground">
											Provide a discount for annual commitments to improve cash flow and reduce
											churn.
										</p>
									</div>
								</div>

								<div className="flex items-start gap-3">
									<div className="bg-primary/10 rounded-full p-2">
										<Check className="h-5 w-5 text-primary" />
									</div>
									<div>
										<h3 className="font-medium">Include a comparison table</h3>
										<p className="text-sm text-muted-foreground">
											Make it easy for customers to compare features across different plans.
										</p>
									</div>
								</div>

								<div className="flex items-start gap-3">
									<div className="bg-primary/10 rounded-full p-2">
										<Check className="h-5 w-5 text-primary" />
									</div>
									<div>
										<h3 className="font-medium">Add social proof</h3>
										<p className="text-sm text-muted-foreground">
											Include testimonials or customer logos near your pricing to build trust.
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="competitors" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle className="text-base">Competitor Pricing Analysis</CardTitle>
							<CardDescription>How your pricing compares to the market</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-6">
								{/* <div>
									<h3 className="font-medium mb-2">Market Positioning</h3>
									<div className="relative h-20 bg-muted rounded-lg p-4">
										<div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border"></div>
										<div
											className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-yellow-500"
											data-tooltip="Competitor A"
										></div>
										<div
											className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-green-500"
											data-tooltip="Your Position"
										></div>
										<div
											className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500"
											data-tooltip="Competitor B"
										></div>

										<div className="absolute bottom-1 left-0 text-xs">Lower Price</div>
										<div className="absolute bottom-1 right-0 text-xs">Higher Price</div>
										<div className="absolute top-1 left-0 text-xs">Fewer Features</div>
										<div className="absolute top-1 right-0 text-xs">More Features</div>
									</div>
								</div> */}

								<div className="overflow-x-auto">
									<table className="w-full border-collapse">
										<thead>
											<tr className="border-b">
												<th className="text-left py-2 font-medium">Company</th>
												<th className="text-left py-2 font-medium">Pricing Model</th>
												<th className="text-left py-2 font-medium">Price Points</th>
												{/* <th className="text-left py-2 font-medium"></th>
												<th className="text-left py-2 font-medium"></th> */}
												<th className="text-left py-2 font-medium">Key Differentiator</th>
											</tr>
										</thead>
										<tbody>
											{data?.competitor_analysis.map((competitor, index) => (
												<tr key={index} className="border-b">
													<td className="py-2">{competitor.name}</td>
													<td className="py-2">{competitor.pricing_model}</td>
													<td className="py-2">
														<ul>
															{competitor.price_points.map((price, index) => (
																<li key={index}>${price}</li>
															))}
														</ul>
													</td>
													<td className="py-2">{competitor.key_differentiator}</td>
												</tr>
											))}
											{/* <tr className="border-b">
                        <td className="py-2">Starbucks</td>
                        <td className="py-2">$4.95</td>
                        <td className="py-2">$5.95</td>
                        <td className="py-2">$6.95</td>
                        <td className="py-2">Global brand recognition</td>
											{/* <tr className="border-b">
												<td className="py-2 font-medium">Your Pricing</td>
												<td className="py-2">$29/mo</td>
												<td className="py-2">$79/mo</td>
												<td className="py-2">$199/mo</td>
												<td className="py-2">Comprehensive solution</td>
											</tr>
											<tr className="border-b">
												<td className="py-2">Competitor A</td>
												<td className="py-2">$19/mo</td>
												<td className="py-2">$59/mo</td>
												<td className="py-2">$149/mo</td>
												<td className="py-2">Lower price point</td>
											</tr>
											<tr className="border-b">
												<td className="py-2">Competitor B</td>
												<td className="py-2">$39/mo</td>
												<td className="py-2">$99/mo</td>
												<td className="py-2">$249/mo</td>
												<td className="py-2">More advanced features</td>
											</tr>
											<tr>
												<td className="py-2">Competitor C</td>
												<td className="py-2">Free</td>
												<td className="py-2">$49/mo</td>
												<td className="py-2">$129/mo</td>
												<td className="py-2">Freemium model</td>
											</tr> */}
										</tbody>
									</table>
								</div>

								<div>
									<h3 className="font-medium mb-2">Key Insights</h3>
									<ul className="space-y-2">
										{data?.key_insights.map((insight, index) => (
											<li key={index} className="flex items-start gap-2">
												<div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center shrink-0 mt-0.5">
													<span className="text-white text-xs">{index + 1}</span>
												</div>
												<p className="text-sm">{insight}</p>
											</li>
										))}
										{/* <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-white text-xs">1</span>
                      </div>
                      <p className="text-sm">
                        Subscription model offers better value for frequent customers compared to
                        competitors' one-time pricing.
                      </p>
										{/* <li className="flex items-start gap-2">
											<div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center shrink-0 mt-0.5">
												<span className="text-white text-xs">1</span>
											</div>
											<p className="text-sm">
												Your pricing is positioned in the mid-range of the market, offering a
												balance of features and affordability.
											</p>
										</li>
										<li className="flex items-start gap-2">
											<div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center shrink-0 mt-0.5">
												<span className="text-white text-xs">2</span>
											</div>
											<p className="text-sm">
												Competitor C's freemium model may attract price-sensitive customers, but
												their paid tiers offer fewer features than yours.
											</p>
										</li>
										<li className="flex items-start gap-2">
											<div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center shrink-0 mt-0.5">
												<span className="text-white text-xs">3</span>
											</div>
											<p className="text-sm">
												Consider adding a free trial or money-back guarantee to reduce the perceived
												risk for new customers.
											</p>
										</li> */}
									</ul>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
