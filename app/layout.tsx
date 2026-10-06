import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Doraemon the Movie: New Nobita and the Castle of the Undersea Devil | 映画ドラえもん 新・のび太の海底鬼岩城',
  description:
    'An immersive 3D cinematic underwater movie experience for Doraemon the Movie: New Nobita and the Castle of the Undersea Devil. The 45th theatrical film releasing 2 October 2026 in India.',
  openGraph: {
    title: 'Doraemon the Movie: New Nobita and the Castle of the Undersea Devil',
    description:
      'Enter the crushing ocean abyss with Doraemon, Nobita, and the Underwater Buggy. Experience the 45th theatrical movie in 4DX and MX4D.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Doraemon the Movie: New Nobita and the Castle of the Undersea Devil',
    description:
      'Enter the crushing ocean abyss with Doraemon, Nobita, and the Underwater Buggy.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
