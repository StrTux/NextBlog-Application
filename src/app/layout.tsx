import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthProvider from "@/components/providers/AuthProvider";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NextBlog - Articles, Blogs, and News',
  description: 'A modern platform for articles, blogs, and news powered by Next.js, Sanity, and PostgreSQL',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <AuthProvider>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
