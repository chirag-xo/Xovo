import './globals.css';
import type { Metadata } from 'next';
import { Syne, Space_Grotesk } from 'next/font/google';
import Cursor from '@/components/Cursor';
import SmoothScroll from '@/components/SmoothScroll';

const syne = Syne({ subsets: ['latin'], variable: '--serif' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--sans' });

export const metadata: Metadata = {
  title: 'XOVO India - Marketing Studio',
  description: 'XOVO India is a premier marketing and brand strategy studio, delivering category dominance, creative direction, and high-impact digital growth.',
  icons: {
    icon: [
      { url: '/favicon.png' },
      { url: '/icon.png' }
    ],
    shortcut: '/favicon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'XOVO India - Marketing Studio',
    description: 'XOVO India is a premier marketing and brand strategy studio, delivering category dominance, creative direction, and high-impact digital growth.',
    siteName: 'XOVO India',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${spaceGrotesk.variable}`}>
        <SmoothScroll>
          <Cursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
