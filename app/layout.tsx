import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
import ClientLayout from "./client-layout";

export const metadata: Metadata = {
	title: {
		default: "Gung Febrian |  Portofolio",
		template: "%s | Gung Febrian",
	},
	description: "Portfolio of Gung Febrian: Computer Engineering Student",
	openGraph: {
		title: "Gung Febrian",
		description:
			"Portfolio of Gung Febrian: Computer Engineering Student",
		url: "https://gung-portfolio.vercel.app/", // REMINDER: Update this to your live domain!
		siteName: "Gung Febrian Portfolio",
		images: [
			{
				url: "/og.png",
				width: 1920,
				height: 1080,
			},
		],
		locale: "en-US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		title: "Gung Febrian | Hybrid Engineering",
		card: "summary_large_image",
	},
	icons: {
		shortcut: "/favicon.png",
	},
};
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const calSans = LocalFont({
	src: "../public/fonts/CalSans-SemiBold.ttf",
	variable: "--font-calsans",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
			<head>
				<Analytics />
			</head>
			<body
				className={`bg-black ${
					process.env.NODE_ENV === "development" ? "debug-screens" : undefined
				}`}
			>
				<ClientLayout>{children}</ClientLayout>
			</body>
		</html>
	);
}