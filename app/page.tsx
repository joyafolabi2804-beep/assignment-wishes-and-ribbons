import { ArrowUpRight, ArrowRight, Gift, Heart, PenLine, Sparkles } from 'lucide-react';

export default function Home() {
  return <>
    <div className="announcement">A little thought. A lot of love.</div>
    <header className="header wrap">
      <a className="wordmark" href="#" aria-label="Little things by Joy home">little things<span>by Joy</span></a>
      <nav aria-label="Main navigation"><a href="#gifts">The gift edit</a><a href="#story">Our little story</a><a href="#questions">Good to know</a></nav>
      <a className="header-link" href="#gifts">Find a little joy <ArrowUpRight size={17}/></a>
    </header>
    <main>
      <section className="hero wrap">
        <div className="hero-copy"><p className="eyebrow"><span/> THOUGHTFUL GIFTING, BEAUTIFULLY SIMPLE</p><h1>Little gifts.<br/>Big feelings.<br/><em>Lasting joy.</em></h1><p className="intro">For the big milestones, the everyday thank-yous, and the just-because moments. A little something that says a whole lot.</p><a className="primary-link" href="#gifts">Explore the gift edit <ArrowRight size={18}/></a><div className="hero-note"><Heart size={16} strokeWidth={1.4}/> Because it’s the thought that makes it special.</div></div>
        <div className="hero-visual"><img src="/joy-gift-box.jpg" alt="Little things by Joy gift box with Addis black tea and two bars of chocolate, nestled in paper shavings" width={1200} height={1800} fetchPriority="high"/><div className="photo-caption"><span>A LITTLE BOX OF</span><strong>you mean so much.</strong></div><div className="image-note">Thoughtfully chosen. Joyfully given.</div></div>
      </section>
      <div className="benefits"><div className="wrap benefit-inner"><span><Gift/> Little things, beautifully presented</span><span><PenLine/> A personal touch</span><span><Heart/> Made for meaningful moments</span></div></div>
      <section id="gifts" className="collections wrap"><div className="section-heading"><div><p className="eyebrow">THE GIFT EDIT</p><h2>A little something<br/>for <em>every kind of love.</em></h2></div><p>Start with the feeling.<br/>Find a gift that says it for you.</p></div>
      <div className="collection-grid">{[
        ['01','A moment for you','Slow mornings, soft evenings and a little well-deserved me-time.','For a little self-care','care'],
        ['02','A reason to celebrate','Birthdays, new beginnings and all of life’s lovely little wins.','For their special moment','celebrate'],
        ['03','Just because','No occasion needed. Just a thoughtful reminder that someone matters.','For a happy little surprise','because']
      ].map(([number,title,copy,tag,style])=><article className={`collection ${style}`} key={number}><div className="collection-photo"><img src="/gift-hero.png" alt={`${title}: illustrative gift collection inspiration`} loading="lazy"/><span>{tag}</span></div><div className="collection-title"><h3>{title}</h3><span>{number}</span></div><p>{copy}</p></article>)}</div><p className="collection-disclaimer">A first look at our gifting world. Collections and imagery are illustrative; product details and ordering are coming soon.</p></section>
      <section id="story" className="story"><div className="wrap story-inner"><div className="story-label"><Sparkles size={35} strokeWidth={1}/><p className="eyebrow">A NOTE FROM JOY</p></div><div><h2>It’s never just <em>a gift.</em></h2><p>It’s “I saw this and thought of you.” It’s “you’ve got this.” It’s a thank-you, a celebration, or a hug from a little further away.</p><p>Little things by Joy is built around a simple idea: the smallest gestures can hold the biggest feelings. A thoughtful little gift can make an ordinary day feel special.</p><span className="signature">With a little love, Joy</span></div></div></section>
      <section className="personal wrap"><p className="eyebrow">SMALL DETAILS. BIG DIFFERENCE.</p><h2>A little more thoughtful.<br/><em>A lot more you.</em></h2><p>Their favourite things. A few words from the heart.<br/>The kind of details that turn a gift into a memory.</p><a href="#gifts" className="text-link">Find your inspiration <ArrowUpRight size={18}/></a></section>
      <section id="questions" className="faq wrap"><div><p className="eyebrow">GOOD TO KNOW</p><h2>The little<br/><em>details.</em></h2></div><div className="faq-list"><details><summary>How can I place an order?<span>+</span></summary><p>Our online gift collection is taking shape. Product availability, prices and an ordering method will be added here when the shop is ready.</p></details><details><summary>Can I add a personal message?<span>+</span></summary><p>A personal message makes a gift feel extra special. Personalisation options will be listed with each gift when ordering opens.</p></details><details><summary>Where do you deliver?<span>+</span></summary><p>Delivery areas, costs and estimated arrival times will be confirmed before ordering opens.</p></details></div></section>
    </main>
    <footer><div className="wrap footer-inner"><a className="wordmark" href="#">little things<span>by Joy</span></a><p>Little gifts. Lasting joy.</p><a href="#gifts">Explore the gift edit <ArrowUpRight size={16}/></a></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} Little things by Joy</span><span>Thoughtful, down to the little things.</span></div></footer>
  </>;
}
