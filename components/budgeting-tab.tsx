'use client';

import { useState } from 'react';
import {
	ArrowRight,
	BarChart3,
	Calendar,
	ChevronDown,
	CreditCard,
	DollarSign,
	HelpCircle,
	LineChart,
	Lock,
	PieChart,
	RefreshCw,
	Wallet,
} from 'lucide-react';
import Image from 'next/image';

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
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface BudgetingTabProps {
	startupIdea: string;
}

export function BudgetingTab({ startupIdea }: BudgetingTabProps) {
	const [analysisComplete, setAnalysisComplete] = useState(false);

	const [isConnected, setIsConnected] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [timeframe, setTimeframe] = useState('3m');
	const [marketingAllocation, setMarketingAllocation] = useState(40);
	const [investmentsAllocation, setInvestmentsAllocation] = useState(35);
	const [laborAllocation, setLaborAllocation] = useState(25);
	const [autoAdjust, setAutoAdjust] = useState(true);

	const handleConnect = () => {
		setIsLoading(true);
		// Simulate API connection
		setTimeout(() => {
			setIsConnected(true);
			setIsLoading(false);
		}, 2000);
	};

	const handleDisconnect = () => {
		setIsConnected(false);
	};

	const handleMarketingChange = (value: number[]) => {
		const newValue = value[0];
		setMarketingAllocation(newValue);
		if (autoAdjust) {
			// Adjust other allocations proportionally
			const remaining = 100 - newValue;
			const ratio = investmentsAllocation / (investmentsAllocation + laborAllocation);
			const newInvestments = Math.round(remaining * ratio);
			const newLabor = remaining - newInvestments;
			setInvestmentsAllocation(newInvestments);
			setLaborAllocation(newLabor);
		}
	};

	const handleInvestmentsChange = (value: number[]) => {
		const newValue = value[0];
		setInvestmentsAllocation(newValue);
		if (autoAdjust) {
			// Adjust other allocations proportionally
			const remaining = 100 - newValue;
			const ratio = marketingAllocation / (marketingAllocation + laborAllocation);
			const newMarketing = Math.round(remaining * ratio);
			const newLabor = remaining - newMarketing;
			setMarketingAllocation(newMarketing);
			setLaborAllocation(newLabor);
		}
	};

	const handleLaborChange = (value: number[]) => {
		const newValue = value[0];
		setLaborAllocation(newValue);
		if (autoAdjust) {
			// Adjust other allocations proportionally
			const remaining = 100 - newValue;
			const ratio = marketingAllocation / (marketingAllocation + investmentsAllocation);
			const newMarketing = Math.round(remaining * ratio);
			const newInvestments = remaining - newMarketing;
			setMarketingAllocation(newMarketing);
			setInvestmentsAllocation(newInvestments);
		}
	};

	return (
		<div className="h-full p-4">
			<h2 className="text-xl font-bold mb-4">Budgeting & Financial Planning</h2>

			<Tabs defaultValue={isConnected ? 'overview' : 'connect'} className="w-full">
				<TabsList className="grid w-full grid-cols-4">
					<TabsTrigger value="connect">Connect Bank</TabsTrigger>
					<TabsTrigger value="overview" disabled={!isConnected}>
						Overview
					</TabsTrigger>
					<TabsTrigger value="allocations" disabled={!isConnected}>
						Allocations
					</TabsTrigger>
					<TabsTrigger value="transactions" disabled={!isConnected}>
						Transactions
					</TabsTrigger>
				</TabsList>

				<TabsContent value="connect">
					{!isConnected ? (
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Connect Your Capital One Account</CardTitle>
								<CardDescription>
									Securely connect your Capital One account to analyze your transactions and get
									personalized budget recommendations.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-muted/30">
									<Image
										src="/placeholder.svg?height=60&width=120"
										alt="Capital One Logo"
										width={120}
										height={60}
										className="mb-4"
									/>
									<p className="text-center text-sm text-muted-foreground mb-4">
										We use bank-level encryption to securely connect to your Capital One account.
										Your credentials are never stored on our servers.
									</p>
									<div className="flex items-center gap-2 mb-4">
										<Lock className="h-4 w-4 text-primary" />
										<span className="text-sm font-medium">Secure 256-bit encrypted connection</span>
									</div>
									<Button onClick={handleConnect} disabled={isLoading}>
										{isLoading ? (
											<>
												<RefreshCw className="mr-2 h-4 w-4 animate-spin" />
												Connecting...
											</>
										) : (
											<>Connect Capital One Account</>
										)}
									</Button>
								</div>

								<div className="space-y-4">
									<h3 className="text-sm font-medium">Why connect your bank account?</h3>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										<div className="flex flex-col items-center text-center p-4 border rounded-lg">
											<BarChart3 className="h-8 w-8 text-primary mb-2" />
											<h4 className="font-medium">Analyze Spending</h4>
											<p className="text-sm text-muted-foreground">
												Get insights into your spending patterns and financial health.
											</p>
										</div>
										<div className="flex flex-col items-center text-center p-4 border rounded-lg">
											<PieChart className="h-8 w-8 text-primary mb-2" />
											<h4 className="font-medium">Smart Allocations</h4>
											<p className="text-sm text-muted-foreground">
												Receive data-driven recommendations for budget allocations.
											</p>
										</div>
										<div className="flex flex-col items-center text-center p-4 border rounded-lg">
											<LineChart className="h-8 w-8 text-primary mb-2" />
											<h4 className="font-medium">Track Progress</h4>
											<p className="text-sm text-muted-foreground">
												Monitor your financial growth and adjust strategies accordingly.
											</p>
										</div>
									</div>
								</div>
							</CardContent>
							<CardFooter className="flex flex-col items-start">
								<p className="text-xs text-muted-foreground mb-2">
									By connecting your account, you agree to our{' '}
									<a href="#" className="underline">
										Terms of Service
									</a>{' '}
									and{' '}
									<a href="#" className="underline">
										Privacy Policy
									</a>
									.
								</p>
							</CardFooter>
						</Card>
					) : (
						<Card>
							<CardHeader>
								<div className="flex items-center justify-between">
									<CardTitle className="text-base">Connected Account</CardTitle>
									<Badge
										variant="outline"
										className="text-green-600 bg-green-50 dark:bg-green-900 dark:text-green-300"
									>
										Connected
									</Badge>
								</div>
								<CardDescription>
									Your Capital One account is successfully connected.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center gap-4 p-4 border rounded-lg">
									<Image
										src="/placeholder.svg?height=40&width=80"
										alt="Capital One Logo"
										width={80}
										height={40}
									/>
									<div>
										<h3 className="font-medium">Capital One Business Checking</h3>
										<p className="text-sm text-muted-foreground">Account ending in •••• 4567</p>
									</div>
									<div className="ml-auto">
										<Button variant="outline" size="sm" onClick={handleDisconnect}>
											Disconnect
										</Button>
									</div>
								</div>

								<Alert>
									<LineChart className="h-4 w-4" />
									<AlertTitle>
										{analysisComplete ? 'Analysis Complete' : 'Analysis in progress'}
									</AlertTitle>
									<AlertDescription>
										{/* We've analyzed your transactions and prepared budget recommendations. View them
										in the Overview tab. */}
										{analysisComplete
											? "We've analyzed your transactions and prepared budget recommendations. View them in the Overview tab."
											: "We're currently analyzing your transactions to provide budget recommendations. This may take a few minutes."}
									</AlertDescription>
								</Alert>
							</CardContent>
							<CardFooter>
								<Button
									variant="outline"
									className="w-full"
									onClick={() => (window.location.hash = '#overview')}
								>
									View Budget Overview
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</CardFooter>
						</Card>
					)}
				</TabsContent>

				<TabsContent value="overview">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base">Current Balance</CardTitle>
								<CardDescription>Available funds</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex items-end gap-2">
									<div className="text-2xl font-bold">$42,750.00</div>
									<div className="text-sm text-green-600 dark:text-green-400 mb-1">
										+$3,240 (8.2%)
									</div>
								</div>
								<p className="text-xs text-muted-foreground">Compared to previous month</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base">Monthly Burn Rate</CardTitle>
								<CardDescription>Average monthly expenses</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex items-end gap-2">
									<div className="text-2xl font-bold">$15,320.00</div>
									<div className="text-sm text-red-600 dark:text-red-400 mb-1">+$1,450 (10.5%)</div>
								</div>
								<p className="text-xs text-muted-foreground">Compared to previous month</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base">Runway</CardTitle>
								<CardDescription>Months of operation at current burn rate</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex items-end gap-2">
									<div className="text-2xl font-bold">2.8 months</div>
								</div>
								<div className="mt-2">
									<Progress value={35} className="h-2" />
								</div>
								<p className="text-xs text-muted-foreground mt-1">
									Based on current balance and burn rate
								</p>
							</CardContent>
						</Card>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
						<Card>
							<CardHeader>
								<div className="flex items-center justify-between">
									<CardTitle className="text-base">Spending Breakdown</CardTitle>
									<Select defaultValue={timeframe} onValueChange={setTimeframe}>
										<SelectTrigger className="w-[120px]">
											<SelectValue placeholder="Timeframe" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="1m">Last Month</SelectItem>
											<SelectItem value="3m">Last 3 Months</SelectItem>
											<SelectItem value="6m">Last 6 Months</SelectItem>
											<SelectItem value="12m">Last Year</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<CardDescription>How your funds are currently being spent</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="h-[200px] flex items-center justify-center">
									<PieChart className="h-32 w-32 text-muted-foreground" />
								</div>
								<div className="space-y-4 mt-4">
									<div>
										<div className="flex items-center justify-between mb-1">
											<div className="flex items-center gap-2">
												<div className="w-3 h-3 rounded-full bg-primary"></div>
												<span className="text-sm">Marketing & Advertising</span>
											</div>
											<span className="text-sm font-medium">32%</span>
										</div>
										<Progress value={32} className="h-2" />
									</div>
									<div>
										<div className="flex items-center justify-between mb-1">
											<div className="flex items-center gap-2">
												<div className="w-3 h-3 rounded-full bg-blue-500"></div>
												<span className="text-sm">Software & Services</span>
											</div>
											<span className="text-sm font-medium">24%</span>
										</div>
										<Progress value={24} className="h-2 bg-muted" color="blue" />
									</div>
									<div>
										<div className="flex items-center justify-between mb-1">
											<div className="flex items-center gap-2">
												<div className="w-3 h-3 rounded-full bg-green-500"></div>
												<span className="text-sm">Salaries & Contractors</span>
											</div>
											<span className="text-sm font-medium">28%</span>
										</div>
										<Progress value={28} className="h-2 bg-muted" color="green" />
									</div>
									<div>
										<div className="flex items-center justify-between mb-1">
											<div className="flex items-center gap-2">
												<div className="w-3 h-3 rounded-full bg-yellow-500"></div>
												<span className="text-sm">Office & Equipment</span>
											</div>
											<span className="text-sm font-medium">16%</span>
										</div>
										<Progress value={16} className="h-2 bg-muted" color="yellow" />
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">Recommended Allocations</CardTitle>
								<CardDescription>
									Based on your financial history and industry benchmarks
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="space-y-4">
									<div>
										<div className="flex items-center justify-between mb-1">
											<div className="flex items-center gap-2">
												<div className="w-3 h-3 rounded-full bg-primary"></div>
												<span className="text-sm">Marketing Initiatives</span>
											</div>
											<span className="text-sm font-medium">40%</span>
										</div>
										<Progress value={40} className="h-2" />
										<p className="text-xs text-muted-foreground mt-1">Recommended: $6,128/month</p>
									</div>
									<div>
										<div className="flex items-center justify-between mb-1">
											<div className="flex items-center gap-2">
												<div className="w-3 h-3 rounded-full bg-blue-500"></div>
												<span className="text-sm">Investments & Assets</span>
											</div>
											<span className="text-sm font-medium">35%</span>
										</div>
										<Progress value={35} className="h-2 bg-muted" color="blue" />
										<p className="text-xs text-muted-foreground mt-1">Recommended: $5,362/month</p>
									</div>
									<div>
										<div className="flex items-center justify-between mb-1">
											<div className="flex items-center gap-2">
												<div className="w-3 h-3 rounded-full bg-green-500"></div>
												<span className="text-sm">Outsourced Labor</span>
											</div>
											<span className="text-sm font-medium">25%</span>
										</div>
										<Progress value={25} className="h-2 bg-muted" color="green" />
										<p className="text-xs text-muted-foreground mt-1">Recommended: $3,830/month</p>
									</div>
								</div>

								<div className="p-4 border rounded-lg bg-muted/30">
									<h3 className="font-medium mb-2">Recommendation Insights</h3>
									<ul className="space-y-2 text-sm">
										<li className="flex items-start gap-2">
											<ChevronDown className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
											<span>Reduce software expenses by 15% to improve runway</span>
										</li>
										<li className="flex items-start gap-2">
											<ArrowRight className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
											<span>Shift 10% from fixed assets to marketing for better growth</span>
										</li>
										<li className="flex items-start gap-2">
											<ArrowRight className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
											<span>Consider freelancers over full-time hires at current stage</span>
										</li>
									</ul>
								</div>
							</CardContent>
							<CardFooter>
								<Button className="w-full" onClick={() => (window.location.hash = '#allocations')}>
									Adjust Allocations
								</Button>
							</CardFooter>
						</Card>
					</div>

					<Card>
						<CardHeader>
							<CardTitle className="text-base">Monthly Cash Flow</CardTitle>
							<CardDescription>Income vs. expenses over time</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-[250px] flex items-center justify-center">
								<LineChart className="h-full w-full text-muted-foreground" />
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="allocations">
					<TooltipProvider>
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Budget Allocation Planner</CardTitle>
								<CardDescription>
									Adjust how your budget should be allocated across key areas
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="flex items-center justify-between">
									<h3 className="text-sm font-medium">Monthly Budget: $15,320</h3>
									<div className="flex items-center gap-2">
										<Label htmlFor="auto-adjust" className="text-sm">
											Auto-balance
										</Label>
										<Switch id="auto-adjust" checked={autoAdjust} onCheckedChange={setAutoAdjust} />
									</div>
								</div>

								<div className="space-y-8">
									<div className="space-y-4">
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<div className="w-3 h-3 rounded-full bg-primary"></div>
												<h3 className="font-medium">Marketing Initiatives</h3>
											</div>
											<div className="flex items-center gap-2">
												<span className="text-sm font-medium">{marketingAllocation}%</span>
												<span className="text-sm text-muted-foreground">
													${Math.round((15320 * marketingAllocation) / 100)}/mo
												</span>
												<Tooltip>
													<TooltipTrigger>
														<HelpCircle className="h-4 w-4 text-muted-foreground" />
													</TooltipTrigger>
													<TooltipContent className="w-80">
														<p className="text-sm">
															Marketing initiatives include digital advertising, content creation,
															SEO, social media, and other customer acquisition efforts.
														</p>
													</TooltipContent>
												</Tooltip>
											</div>
										</div>
										<Slider
											defaultValue={[marketingAllocation]}
											max={100}
											step={1}
											value={[marketingAllocation]}
											onValueChange={handleMarketingChange}
											className="[&>span]:bg-primary"
										/>
										<div className="grid grid-cols-2 gap-4 text-sm">
											<div className="p-3 border rounded-lg">
												<div className="flex items-center gap-2 mb-1">
													<DollarSign className="h-4 w-4 text-primary" />
													<span className="font-medium">Recommended</span>
												</div>
												<p className="text-muted-foreground">40% ($6,128/mo)</p>
											</div>
											<div className="p-3 border rounded-lg">
												<div className="flex items-center gap-2 mb-1">
													<BarChart3 className="h-4 w-4 text-primary" />
													<span className="font-medium">Industry Average</span>
												</div>
												<p className="text-muted-foreground">35-45% for early-stage startups</p>
											</div>
										</div>
									</div>

									<div className="space-y-4">
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<div className="w-3 h-3 rounded-full bg-blue-500"></div>
												<h3 className="font-medium">Investments & Assets</h3>
											</div>
											<div className="flex items-center gap-2">
												<span className="text-sm font-medium">{investmentsAllocation}%</span>
												<span className="text-sm text-muted-foreground">
													${Math.round((15320 * investmentsAllocation) / 100)}/mo
												</span>
												<Tooltip>
													<TooltipTrigger>
														<HelpCircle className="h-4 w-4 text-muted-foreground" />
													</TooltipTrigger>
													<TooltipContent className="w-80">
														<p className="text-sm">
															Investments include capital expenditures, equipment, software
															licenses, and other assets that provide long-term value.
														</p>
													</TooltipContent>
												</Tooltip>
											</div>
										</div>
										<Slider
											defaultValue={[investmentsAllocation]}
											max={100}
											step={1}
											value={[investmentsAllocation]}
											onValueChange={handleInvestmentsChange}
											className="[&>span]:bg-blue-500"
										/>
										<div className="grid grid-cols-2 gap-4 text-sm">
											<div className="p-3 border rounded-lg">
												<div className="flex items-center gap-2 mb-1">
													<DollarSign className="h-4 w-4 text-blue-500" />
													<span className="font-medium">Recommended</span>
												</div>
												<p className="text-muted-foreground">35% ($5,362/mo)</p>
											</div>
											<div className="p-3 border rounded-lg">
												<div className="flex items-center gap-2 mb-1">
													<BarChart3 className="h-4 w-4 text-blue-500" />
													<span className="font-medium">Industry Average</span>
												</div>
												<p className="text-muted-foreground">30-40% for early-stage startups</p>
											</div>
										</div>
									</div>

									<div className="space-y-4">
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<div className="w-3 h-3 rounded-full bg-green-500"></div>
												<h3 className="font-medium">Outsourced Labor</h3>
											</div>
											<div className="flex items-center gap-2">
												<span className="text-sm font-medium">{laborAllocation}%</span>
												<span className="text-sm text-muted-foreground">
													${Math.round((15320 * laborAllocation) / 100)}/mo
												</span>
												<Tooltip>
													<TooltipTrigger>
														<HelpCircle className="h-4 w-4 text-muted-foreground" />
													</TooltipTrigger>
													<TooltipContent className="w-80">
														<p className="text-sm">
															Outsourced labor includes freelancers, contractors, consultants, and
															other external workforce expenses.
														</p>
													</TooltipContent>
												</Tooltip>
											</div>
										</div>
										<Slider
											defaultValue={[laborAllocation]}
											max={100}
											step={1}
											value={[laborAllocation]}
											onValueChange={handleLaborChange}
											className="[&>span]:bg-green-500"
										/>
										<div className="grid grid-cols-2 gap-4 text-sm">
											<div className="p-3 border rounded-lg">
												<div className="flex items-center gap-2 mb-1">
													<DollarSign className="h-4 w-4 text-green-500" />
													<span className="font-medium">Recommended</span>
												</div>
												<p className="text-muted-foreground">25% ($3,830/mo)</p>
											</div>
											<div className="p-3 border rounded-lg">
												<div className="flex items-center gap-2 mb-1">
													<BarChart3 className="h-4 w-4 text-green-500" />
													<span className="font-medium">Industry Average</span>
												</div>
												<p className="text-muted-foreground">20-30% for early-stage startups</p>
											</div>
										</div>
									</div>
								</div>

								<Alert className="bg-muted/50">
									<div className="flex items-start gap-2">
										<Calendar className="h-4 w-4 mt-0.5" />
										<div>
											<AlertTitle>Budget Forecast</AlertTitle>
											<AlertDescription>
												With your current balance of $42,750 and these allocations, your runway is
												approximately 2.8 months. Consider reducing expenses or securing additional
												funding.
											</AlertDescription>
										</div>
									</div>
								</Alert>
							</CardContent>
							<CardFooter className="flex justify-between">
								<Button
									variant="outline"
									onClick={() => {
										setMarketingAllocation(40);
										setInvestmentsAllocation(35);
										setLaborAllocation(25);
									}}
								>
									Reset to Recommended
								</Button>
								<Button>Save Allocations</Button>
							</CardFooter>
						</Card>
					</TooltipProvider>
				</TabsContent>

				<TabsContent value="transactions">
					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<CardTitle className="text-base">Recent Transactions</CardTitle>
								<Select defaultValue={timeframe} onValueChange={setTimeframe}>
									<SelectTrigger className="w-[120px]">
										<SelectValue placeholder="Timeframe" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="1m">Last Month</SelectItem>
										<SelectItem value="3m">Last 3 Months</SelectItem>
										<SelectItem value="6m">Last 6 Months</SelectItem>
										<SelectItem value="12m">Last Year</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<CardDescription>View and categorize your recent transactions</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="flex items-center justify-between p-2 bg-muted rounded-lg text-sm font-medium">
									<div className="w-1/3">Description</div>
									<div className="w-1/4">Category</div>
									<div className="w-1/6">Date</div>
									<div className="w-1/6 text-right">Amount</div>
								</div>

								<div className="space-y-2">
									<div className="flex items-center justify-between p-2 border-b text-sm">
										<div className="w-1/3 flex items-center gap-2">
											<CreditCard className="h-4 w-4 text-muted-foreground" />
											<span>Adobe Creative Cloud</span>
										</div>
										<div className="w-1/4">
											<Badge
												variant="outline"
												className="bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
											>
												Software
											</Badge>
										</div>
										<div className="w-1/6 text-muted-foreground">May 15, 2023</div>
										<div className="w-1/6 text-right font-medium">-$52.99</div>
									</div>

									<div className="flex items-center justify-between p-2 border-b text-sm">
										<div className="w-1/3 flex items-center gap-2">
											<CreditCard className="h-4 w-4 text-muted-foreground" />
											<span>Google Ads</span>
										</div>
										<div className="w-1/4">
											<Badge
												variant="outline"
												className="bg-primary/10 text-primary dark:bg-primary/20"
											>
												Marketing
											</Badge>
										</div>
										<div className="w-1/6 text-muted-foreground">May 14, 2023</div>
										<div className="w-1/6 text-right font-medium">-$1,245.67</div>
									</div>

									<div className="flex items-center justify-between p-2 border-b text-sm">
										<div className="w-1/3 flex items-center gap-2">
											<CreditCard className="h-4 w-4 text-muted-foreground" />
											<span>Freelancer Payment - J. Smith</span>
										</div>
										<div className="w-1/4">
											<Badge
												variant="outline"
												className="bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-300"
											>
												Labor
											</Badge>
										</div>
										<div className="w-1/6 text-muted-foreground">May 12, 2023</div>
										<div className="w-1/6 text-right font-medium">-$850.00</div>
									</div>

									<div className="flex items-center justify-between p-2 border-b text-sm">
										<div className="w-1/3 flex items-center gap-2">
											<CreditCard className="h-4 w-4 text-muted-foreground" />
											<span>Office Equipment - Monitors</span>
										</div>
										<div className="w-1/4">
											<Badge
												variant="outline"
												className="bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
											>
												Assets
											</Badge>
										</div>
										<div className="w-1/6 text-muted-foreground">May 10, 2023</div>
										<div className="w-1/6 text-right font-medium">-$899.98</div>
									</div>

									<div className="flex items-center justify-between p-2 border-b text-sm">
										<div className="w-1/3 flex items-center gap-2">
											<CreditCard className="h-4 w-4 text-muted-foreground" />
											<span>Facebook Ads</span>
										</div>
										<div className="w-1/4">
											<Badge
												variant="outline"
												className="bg-primary/10 text-primary dark:bg-primary/20"
											>
												Marketing
											</Badge>
										</div>
										<div className="w-1/6 text-muted-foreground">May 8, 2023</div>
										<div className="w-1/6 text-right font-medium">-$876.32</div>
									</div>

									<div className="flex items-center justify-between p-2 border-b text-sm">
										<div className="w-1/3 flex items-center gap-2">
											<Wallet className="h-4 w-4 text-green-500" />
											<span>Angel Investment</span>
										</div>
										<div className="w-1/4">
											<Badge
												variant="outline"
												className="bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-300"
											>
												Income
											</Badge>
										</div>
										<div className="w-1/6 text-muted-foreground">May 1, 2023</div>
										<div className="w-1/6 text-right font-medium text-green-600">+$50,000.00</div>
									</div>
								</div>
							</div>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button variant="outline" size="sm">
								Export CSV
							</Button>
							<div className="flex items-center gap-1 text-sm text-muted-foreground">
								<Button variant="outline" size="icon" className="h-8 w-8">
									<ChevronDown className="h-4 w-4" />
								</Button>
								<span>Page 1 of 5</span>
								<Button variant="outline" size="icon" className="h-8 w-8">
									<ChevronDown className="h-4 w-4 rotate-180" />
								</Button>
							</div>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
