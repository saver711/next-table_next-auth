import { ToasterWrapper } from '@/components/soli/alerts/toaster-wrapper';
import { cn } from '@/lib/utils';
import './globals.css';
import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';

const ubunto = Ubuntu({
  weight: ['400', '700', '500'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Solisys',
  description: 'Solar stations monitoring system',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={cn('relative', ubunto.className)}>
        {children} <ToasterWrapper />
        <div id='modal'></div>
      </body>
    </html>
  );
}
