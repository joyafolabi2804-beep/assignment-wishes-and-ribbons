import type { Metadata } from 'next';
import './globals.css';
const title = 'Little things by Joy | Little gifts. Lasting joy.';
const description = 'Thoughtful gifting for big milestones, everyday thank-yous and just-because moments. Discover the gifting world of Little things by Joy.';
export const metadata: Metadata = {
  metadataBase: new URL('https://little-things-by-joy.crypticernie.chatgpt.site'),
  title, description,
  openGraph: { title, description, type: 'website', images: [{url:'/og.png',width:1536,height:1024,alt:'Little things by Joy. Little gifts. Lasting joy.'}] },
  twitter: {card:'summary_large_image',title,description,images:['/og.png']},
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
