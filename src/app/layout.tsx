import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from 'sonner'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task App",
  description: "Task app for coursework",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}

          <Toaster
            theme='system'
            position='bottom-right'
            duration={2000}
          />
        </Providers>
      </body>
    </html>
  );
}
