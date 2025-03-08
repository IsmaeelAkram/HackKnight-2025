import { Mail, MessageSquare, Phone, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import CardLoading from './cardLoading';

interface OutreachTabProps {
	startupIdea: string;
}

interface OutreachGenResponse {
	Calls: {
		CallToAction: string;
		Interested: string;
		Introduction: string;
		ObjectionHandling: {
			objection: string;
			response: string;
		}[];
	};
	Emails: {
		ColdEmailTemplate: string;
		FollowUpEmail: string;
		IntroductionEmail: string;
	};
}

const sampleData: OutreachGenResponse = {
	Calls: {
		CallToAction:
			"I'd love to send you a sample of our honey coffee and discuss how it might fit your specific menu. Would you be available for a 20-minute call later this week to discuss this further? I have openings on [suggest 2-3 specific times].",
		Interested:
			"I'd love to learn more about your current coffee offerings. Could you tell me a bit about what types of coffee you currently serve? [Listen and take notes] That's really helpful to understand. Many of our clients were looking to stand out in a crowded market before working with us. What we've developed is a honey-infused coffee that offers a unique flavor profile and higher profit margins.",
		Introduction:
			"Hi [Name], this is [Your Name] from HoneyCoffee Hub. How are you doing today? [Pause for response] Great! The reason I'm calling is that we help coffee shops enhance their offerings with our unique honey coffee, and I was wondering if you're currently looking to diversify your menu?",
		ObjectionHandling: [
			{
				objection: "We're happy with our current coffee selection",
				response:
					'I understand. Many of our current clients were initially satisfied with their selection too, but found that adding our honey coffee significantly boosted customer interest and sales. Would you be open to trying a sample to see how it compares?',
			},
			{
				objection: "We don't have budget for new products right now",
				response:
					'I completely understand budget constraints. Our honey coffee actually helps shops increase their profit margins by 20% on average. Would it make sense to at least explore if those increased margins could benefit your business?',
			},
		],
	},
	Emails: {
		ColdEmailTemplate:
			"Subject: Elevate Your Coffee Experience with HoneyCoffee Hub\n\nDear [Recipient Name],\n\nI hope this email finds you well. My name is [Your Name] from HoneyCoffee Hub, and I'm reaching out because I noticed that [Company Name] might be looking for unique coffee offerings.\n\nAt HoneyCoffee Hub, we've developed a specialty honey coffee that helps businesses like yours:\n• Offer a distinctive flavor profile to customers\n• Increase customer satisfaction and loyalty\n• Boost sales with a premium product\n\nWe've already helped companies like [Reference Company] achieve a 30% increase in coffee sales, and I'd love to show you how we could do the same for [Company Name].\n\nWould you be available for a quick 15-minute call next week to discuss how HoneyCoffee Hub could enhance your coffee menu? I'm free on [Date/Time] or [Date/Time].\n\nLooking forward to connecting,\n\n[Your Name]\n[Your Title]\nHoneyCoffee Hub\n[Phone Number]\n[Email]",
		FollowUpEmail:
			"Subject: Following up on HoneyCoffee Hub for [Company Name]\n\nDear [Name],\n\nI wanted to follow up on my previous message about how HoneyCoffee Hub can help [Company Name] enhance its coffee offerings.\n\nI thought you might find this article valuable: [Link to article about rising trend of flavored coffees]\n\nIt shows how specialty coffees like our honey-infused blend are gaining popularity, with flavored coffee market expected to grow by 5.7% annually through 2025.\n\nI'd still love to schedule a quick call to discuss your specific needs. Would any of these times work for you?\n- [Date/Time Option 1]\n- [Date/Time Option 2]\n- [Date/Time Option 3]\n\nLooking forward to connecting,\n\n[Your Name]\nHoneyCoffee Hub",
		IntroductionEmail:
			"Subject: Following Up on [Referrer]'s Introduction - Unique Honey Coffee\n\nDear [Recipient Name],\n\nI hope this email finds you well. [Referrer Name] suggested I reach out to you regarding potential enhancements to your coffee offerings.\n\nAt HoneyCoffee Hub, we specialize in helping businesses like yours stand out with our unique honey coffee. Our product enables:\n\n• A distinctive sweet flavor that delivers a memorable customer experience\n• Ethically sourced beans and honey that ensures sustainability\n• A premium offering that provides higher profit margins\n\nI'd love to schedule a brief call to learn more about your specific needs and show you how HoneyCoffee Hub might be able to help. Would you have 15 minutes available this week?\n\nLooking forward to connecting,\n\n[Your Name]\n[Your Title]\nHoneyCoffee Hub\n[Phone Number]\n[Email]",
	},
};

export function OutreachTab({ startupIdea }: OutreachTabProps) {
	const [data, setData] = useState<OutreachGenResponse | null>(null);
	useEffect(() => {
		(async () => {
			if (!startupIdea) return;
			console.log(`Outreach Generation for ${startupIdea}`);

			const res = await fetch('http://127.0.0.1:5000/outreach', {
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
	if (!data) return <CardLoading title="Outreach" />;

	return (
		<div className="h-full p-4">
			<h2 className="text-xl font-bold mb-4">Outreach</h2>

			<Tabs defaultValue="email" className="w-full">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="email">Email Scripts</TabsTrigger>
					<TabsTrigger value="call">Call Scripts</TabsTrigger>
					<TabsTrigger value="follow">Follow-up</TabsTrigger>
				</TabsList>

				<TabsContent value="email" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle className="text-base">Cold Email Template</CardTitle>
							<CardDescription>Initial outreach to potential customers</CardDescription>
						</CardHeader>
						<CardContent>
							<Textarea
								className="min-h-[200px] font-mono text-sm"
								value={data?.Emails.ColdEmailTemplate}
								readOnly
							/>
							<div className="flex justify-end mt-4">
								<Button size="sm">Copy to Clipboard</Button>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-base">Introduction Email</CardTitle>
							<CardDescription>For warm leads or referrals</CardDescription>
						</CardHeader>
						<CardContent>
							<Textarea
								className="min-h-[200px] font-mono text-sm"
								value={data?.Emails.IntroductionEmail}
								readOnly
							/>
							<div className="flex justify-end mt-4">
								<Button size="sm">Copy to Clipboard</Button>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="call" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle className="text-base">Cold Call Script</CardTitle>
							<CardDescription>Guide for initial phone conversations</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="border-l-4 border-primary pl-4">
									<h3 className="font-medium">Introduction</h3>
									<p className="text-sm mt-2">{data?.Calls.Introduction}</p>
								</div>

								<div className="border-l-4 border-primary pl-4">
									<h3 className="font-medium">If they show interest</h3>
									<p className="text-sm mt-2">{data?.Calls.Interested}</p>
								</div>

								<div className="border-l-4 border-primary pl-4">
									<h3 className="font-medium">Call to action</h3>
									<p className="text-sm mt-2">{data?.Calls.CallToAction}</p>
								</div>

								<div className="border-l-4 border-primary pl-4">
									<h3 className="font-medium">Handling objections</h3>
									<p className="text-sm mt-2">
										{data?.Calls.ObjectionHandling.map((objection, index) => (
											<div key={index}>
												<strong>"{objection.objection}"</strong>
												<br />"{objection.response}"
											</div>
										))}
										{/* <strong>"We're already using another solution"</strong>
										<br />
										"I understand. Many of our current clients switched from other solutions because
										of our [unique value proposition]. Would you be open to seeing how we compare to
										your current solution?"
										<br />
										<br />
										<strong>"We don't have budget right now"</strong>
										<br />
										"I completely understand budget constraints. Our solution actually helps
										companies save [average savings amount] within the first [timeframe]. Would it
										make sense to at least explore if those savings could apply to your situation?" */}
									</p>
								</div>
							</div>
							<div className="flex justify-end mt-4">
								<Button size="sm">Download Script</Button>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="follow" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle className="text-base">Follow-up Strategy</CardTitle>
							<CardDescription>Maintaining engagement with prospects</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-6">
								<div>
									<h3 className="font-medium mb-2">Follow-up Timeline</h3>
									<ol className="space-y-2">
										<li className="flex items-start gap-2">
											<div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
												1
											</div>
											<div>
												<p className="font-medium">Day 1: Initial Contact</p>
												<p className="text-sm text-muted-foreground">
													Send initial email or make first call
												</p>
											</div>
										</li>
										<li className="flex items-start gap-2">
											<div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
												2
											</div>
											<div>
												<p className="font-medium">Day 3: First Follow-up</p>
												<p className="text-sm text-muted-foreground">
													Send a follow-up email with additional value (case study, article, etc.)
												</p>
											</div>
										</li>
										<li className="flex items-start gap-2">
											<div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
												3
											</div>
											<div>
												<p className="font-medium">Day 7: Second Follow-up</p>
												<p className="text-sm text-muted-foreground">
													Try a different channel (call if you emailed, or vice versa)
												</p>
											</div>
										</li>
										<li className="flex items-start gap-2">
											<div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
												4
											</div>
											<div>
												<p className="font-medium">Day 14: Third Follow-up</p>
												<p className="text-sm text-muted-foreground">
													Share a relevant success story or new feature announcement
												</p>
											</div>
										</li>
										<li className="flex items-start gap-2">
											<div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
												5
											</div>
											<div>
												<p className="font-medium">Day 30: Final Follow-up</p>
												<p className="text-sm text-muted-foreground">
													Send a "break-up" email to create urgency
												</p>
											</div>
										</li>
									</ol>
								</div>

								<Card>
									<CardHeader className="pb-2">
										<CardTitle className="text-sm">Follow-up Email Template</CardTitle>
									</CardHeader>
									<CardContent>
										<Textarea
											className="min-h-[150px] font-mono text-sm"
											value={data?.Emails.FollowUpEmail}
											readOnly
										/>
									</CardContent>
								</Card>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
