import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Flow Immersive - AR Data Visualization for Better Decisions",
  description: "Transform complex data into immersive AR/VR experiences. Flow Immersive enables teams to visualize, analyze, and collaborate with data in 3D space for superior decision-making across financial services, consulting, healthcare, and more.",
  keywords: [
    "AR data visualization",
    "augmented reality analytics", 
    "immersive data analysis",
    "3D data visualization",
    "AR smart glasses",
    "collaborative data analysis",
    "enterprise AR solutions",
    "data storytelling",
    "business intelligence AR",
    "mixed reality data",
    "spatial computing",
    "data-driven decisions",
    "Meta Quest enterprise",
    "HTC Vive business",
    "Magic Leap applications"
  ].join(", "),
  authors: [{ name: "Flow Immersive Team" }],
  creator: "Flow Immersive, Inc.",
  publisher: "Flow Immersive, Inc.",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://flowimmersive.vercel.app",
    siteName: "Flow Immersive",
    title: "Flow Immersive - AR Data Visualization for Better Decisions",
    description: "Transform complex data into immersive AR/VR experiences. Visualize, analyze, and collaborate with data in 3D space for superior decision-making.",
    images: [
      {
        url: "/flow/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flow Immersive - AR Data Visualization Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@FlowImmersive",
    creator: "@FlowImmersive",
    title: "Flow Immersive - AR Data Visualization for Better Decisions",
    description: "Transform complex data into immersive AR/VR experiences. Visualize, analyze, and collaborate with data in 3D space for superior decision-making.",
    images: ["/flow/twitter-card.png"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#1e40af",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
