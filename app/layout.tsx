import { assetPath } from '../lib/asset-path';
import type { Metadata } from 'next';
import './globals.css';
const title = 'Little things by Joy | Little gifts. Lasting joy.';
const description = 'Thoughtful gifting for big milestones, everyday thank-yous and just-because moments. Discover the gifting world of Little things by Joy.';
const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
const socialImage = new URL(assetPath('og.png'), siteUrl).href;
export const metadata: Metadata = {
  metadataBase: siteUrl,
  icons: { icon: assetPath('favicon.svg') },
  title, description,
  openGraph: { title, description, type: 'website', images: [{url:socialImage,width:1536,height:1024,alt:'Little things by Joy. Little gifts. Lasting joy.'}] },
  twitter: {card:'summary_large_image',title,description,images:[socialImage]},
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
