import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/global.css";
import { UserProvider } from "@/context/UserContext";
import { CartProvider} from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maverick Mart",
  description:"Your one-stop shop for all things Maverick. Explore our wide range of products and enjoy a seamless shopping experience.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
  openGraph: {
    title: "Maverick Mart",
    description: "Your one-stop shop for all things Maverick. Explore our wide range of products and enjoy a seamless shopping experience.",
    url: "https://maverickmart.com",
    siteName: "Maverick Mart",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maverick Mart",
    description: "Your one-stop shop for all things Maverick. Explore our wide range of products and enjoy a seamless shopping experience.",
    images: ["/twitter-card.png"],
  },
  manifest: "/manifest.json",
  };


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider>
		<CartProvider>
        {children}
		</CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
