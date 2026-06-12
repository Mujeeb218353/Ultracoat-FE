import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalProviders from "../components/providers/global-providers";
import Alert from "@/components/Alert";
import { App as AntdApp } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "UltraCoat Pakistan",
    template: "%s | UltraCoat Pakistan",
  },
  description: "PSO UltraCoat Admin Portal",
  icons: {
    icon: "/ultra-coat-image.png",
    shortcut: "/ultra-coat-image.png",
    apple: "/ultra-coat-image.png",
  },
  openGraph: {
    title: "UltraCoat Pakistan",
    description: "PSO UltraCoat Admin Portal",
    siteName: "UltraCoat Pakistan",
    images: [
      {
        url: "/ultra-coat-image.png",
        alt: "UC Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AntdRegistry>
          <AntdApp>
            <GlobalProviders>
              <Alert />
              {children}
            </GlobalProviders>
          </AntdApp>
        </AntdRegistry>
      </body>
    </html>
  );
}