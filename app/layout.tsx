import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Launchpad',
	description:
		'Transform your startup idea into a fully-fledged business with our interactive dashboard. Invest safely and properly with CapitalOne bank synchronization.',
	themeColor: '#ffffff',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
