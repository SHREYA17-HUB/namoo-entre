import { createContext, useContext, useState, type ReactNode, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ArrowRight,
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Phone,
  Mail,
  Check,
  Printer,
  Package,
  Sparkles,
  Gift,
  ShieldCheck,
  Factory,
  Leaf,
  ChevronRight,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/namo-logo.png.asset.json";
import hero from "@/assets/brand-studio.jpg";
import production from "@/assets/production.png.asset.json";
import about from "@/assets/about.png.asset.json";
import packagingProfessional from "@/assets/packaging-professional.jpg";
import original from "@/data/original-content.json";
import { categories, products, navigation, testimonials } from "@/data/catalogue";
import { CartProvider, CartButton, useCart, buyNow, imageFor } from "./cart";
const SiteContext = createContext({
  search: "",
  setSearch: (_value: string) => {},
  saved: [] as string[],
  toggle: (_value: string) => {},
  onlySaved: false,
  setOnlySaved: (_value: boolean) => {},
});
export function SiteShell({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [onlySaved, setOnlySaved] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const toggle = (name: string) =>
    setSaved((items) =>
      items.includes(name) ? items.filter((x) => x !== name) : [...items, name],
    );
  function onSearch(e: FormEvent) {
    e.preventDefault();
    setOnlySaved(false);
    navigate({ to: "/$page", params: { page: "products" } });
  }
  return (
    <SiteContext.Provider value={{ search, setSearch, saved, toggle, onlySaved, setOnlySaved }}>
      <CartProvider>
        <div className="announcement">
          <span>
            <Sparkles size={13} /> Your One-Stop Printing & Branding Partner
          </span>
          <a href="tel:+919035651622">
            <Phone size={12} /> +91 90356 51622
          </a>
        </div>
        <header className="site-header">
          <div className="header-main wrap">
            <Link to="/" aria-label="NAMO Enterprises home" className="brand-logo">
              <img src={logo.url} alt="NAMO Enterprises" width="150" height="72" />
            </Link>
            <form className="header-search" onSubmit={onSearch}>
              <Search size={18} />
              <input
                aria-label="Search products and services"
                placeholder="Search products and services…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span>Search</span>
            </form>
            <div className="header-actions">
              <Button
                variant="ghost"
                size="icon"
                aria-label="View wishlist"
                title="Wishlist"
                onClick={() => {
                  setOnlySaved(true);
                  setSearch("");
                  navigate({ to: "/$page", params: { page: "products" } });
                }}
              >
                <Heart />
                {saved.length > 0 && <span className="count">{saved.length}</span>}
              </Button>
              <CartButton />
              <Button variant="ghost" size="icon" asChild>
                <Link
                  to="/$page"
                  params={{ page: "contact" }}
                  aria-label="Quotation request"
                  title="Quotation request"
                >
                  <ShoppingBag />
                </Link>
              </Button>
              <Button className="quote-header" asChild>
                <Link to="/$page" params={{ page: "contact" }}>
                  Get a Quote <ArrowUpRight />
                </Link>
              </Button>
              <Button
                className="menu-button"
                variant="ghost"
                size="icon"
                onClick={() => setOpen(!open)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                {open ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
          <nav className={`main-nav wrap ${open ? "is-open" : ""}`} aria-label="Main navigation">
            {navigation.map((n) =>
              n.page ? (
                <Link
                  key={n.page}
                  to="/$page"
                  params={{ page: n.page }}
                  activeProps={{ className: "nav-active" }}
                  onClick={() => setOpen(false)}
                >
                  {n.name}
                </Link>
              ) : (
                <Link
                  key="home"
                  to="/"
                  activeOptions={{ exact: true }}
                  activeProps={{ className: "nav-active" }}
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
              ),
            )}
            <span className="nav-note">
              <span className="status-dot" /> Crafted with care. Printed to perfection.
            </span>
          </nav>
        </header>
        {children}
        <footer>
          <div className="wrap footer-grid">
            <div>
              <Link to="/" className="brand-logo footer-logo">
                <img src={logo.url} alt="NAMO Enterprises" width="150" height="72" />
              </Link>
              <p>
                Bringing your brand to life with creativity, precision and impact. Premium printing,
                packaging and branding solutions since 2014.
              </p>
              <div className="social-links">
                <a href="https://www.instagram.com/namoenterprisesbng/" aria-label="Instagram">
                  <Instagram size={19} />
                </a>
                <a href="https://www.facebook.com/p/namoenterprisesbng/" aria-label="Facebook">
                  <Facebook size={19} />
                </a>
                <a href="https://www.youtube.com/@namoenterprisesbng" aria-label="YouTube">
                  <Youtube size={19} />
                </a>
                <a
                  href="https://wa.me/919035651622"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={19} />
                </a>
              </div>
            </div>
            <div>
              <h4>Explore NAMO</h4>
              {navigation.slice(1).map((n) => (
                <Link key={n.page} to="/$page" params={{ page: n.page }}>
                  {n.name}
                </Link>
              ))}
            </div>
            <div>
              <h4>Our expertise</h4>
              {categories.map((c) => (
                <Link key={c.slug} to="/$page" params={{ page: c.slug }}>
                  {c.name}
                </Link>
              ))}
            </div>
            <div>
              <h4>Let’s talk about your brand</h4>
              <a href="tel:+919035651622">
                <Phone size={16} /> +91 90356 51622
              </a>
              <a className="email-link" href="mailto:namoenterprises116@gmail.com">
                <Mail size={16} /> namoenterprises116@gmail.com
              </a>
              <p>Bangalore, Karnataka, India</p>
              <Button asChild>
                <Link to="/$page" params={{ page: "contact" }}>
                  Start a project <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </div>
          <div className="wrap footer-bottom">
            <span>© 2026 NAMO Enterprises. All rights reserved.</span>
            <span>Made for brands that stand out.</span>
          </div>
        </footer>
        <a
          className="floating-contact"
          href="https://wa.me/919035651622"
          aria-label="Chat on WhatsApp"
        >
          <Phone size={21} />
        </a>
      </CartProvider>
    </SiteContext.Provider>
  );
}
export function CategoryGrid() {
  const { toggle, saved } = useContext(SiteContext);
  const icons = [Printer, Package, Sparkles, Gift];
  return (
    <div className="category-grid">
      {categories.map((c, i) => {
        const Icon = icons[i] ?? Printer;
        return (
          <article className={`category-card tone-${c.tone}`} key={c.slug}>
            <Link className="category-image" to="/$page" params={{ page: c.slug }}>
              <img src={c.image} alt={c.name} width="512" height="512" loading="lazy" />
              <span className="category-tag">
                <Icon size={13} /> {c.short}
              </span>
            </Link>
            <Button
              className="save-button"
              variant="outline"
              size="icon"
              aria-label={`Save ${c.name}`}
              aria-pressed={saved.includes(c.name)}
              onClick={() => toggle(c.name)}
            >
              <Heart className={saved.includes(c.name) ? "heart-saved" : ""} />
            </Button>
            <div className="category-copy">
              <h3>
                <Link to="/$page" params={{ page: c.slug }}>
                  {c.name}
                </Link>
              </h3>
              <p>{c.description}</p>
              <div className="card-actions">
                <Link to="/$page" params={{ page: c.slug }}>
                  Explore collection <ArrowUpRight size={15} />
                </Link>
                <Button variant="ghost" size="icon" asChild>
                  <Link
                    to="/$page"
                    params={{ page: "contact" }}
                    title="Request a quote"
                    aria-label={`Request quote for ${c.name}`}
                  >
                    <ShoppingBag />
                  </Link>
                </Button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
export function HomePage() {
  const [testimonial, setTestimonial] = useState(0);
  const review = testimonials[testimonial] ?? testimonials[0];
  if (!review) return null;
  return (
    <main>
      <section className="hero">
        <img
          className="hero-photo"
          src={hero}
          alt="Premium colourful custom packaging, branded bags, brochures and business cards"
          width="1920"
          height="1024"
          fetchPriority="high"
        />
        <div className="wrap hero-inner">
          <div className="hero-copy">
            <div className="eyebrow">
              <span /> BIG IDEAS. BEAUTIFULLY BROUGHT TO LIFE.
            </div>
            <h1>
              Make Your Brand
              <br />
              Impossible
              <br />
              to <span>Ignore.</span>
            </h1>
            <p>
              From premium printing and custom packaging to impactful signage and corporate gifting,
              we bring your brand vision to life with creativity, quality and precision.
            </p>
            <div className="hero-buttons">
              <Button size="lg" asChild>
                <Link to="/$page" params={{ page: "services" }}>
                  Explore Our Services <ArrowUpRight />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/$page" params={{ page: "contact" }}>
                  Request a Custom Quote <ArrowRight />
                </Link>
              </Button>
            </div>
            <div className="hero-trust">
              <span>
                <ShieldCheck size={16} /> Premium quality
              </span>
              <span>
                <Package size={16} /> Custom-made for you
              </span>
              <span>
                <Check size={16} /> 10+ years of expertise
              </span>
            </div>
          </div>
          <div className="hero-label">
            <span className="label-icon">
              <Package size={22} />
            </span>
            <div>
              <strong>Your brand. Our craftsmanship.</strong>
              <span>Made to make an impression.</span>
            </div>
            <ArrowUpRight size={20} />
          </div>
          <div className="hero-pagination">
            <span className="selected" />
            <span />
            <span />
          </div>
        </div>
      </section>
      <div className="promise-strip">
        <div className="wrap promise-inner">
          {[
            [Printer, "Precision printing"],
            [Package, "Bespoke packaging"],
            [Sparkles, "Standout signage"],
            [Gift, "Meaningful gifting"],
          ].map(([Icon, text]) => {
            const I = Icon as typeof Printer;
            return (
              <div key={String(text)}>
                <I size={21} />
                <span>{String(text)}</span>
              </div>
            );
          })}
        </div>
      </div>
      <section className="section wrap">
        <div className="section-heading">
          <div>
            <div className="eyebrow">MADE FOR YOUR BRAND</div>
            <h2>One partner. Endless possibilities.</h2>
            <p>Discover solutions that turn your brand vision into something extraordinary.</p>
          </div>
          <Link className="text-link" to="/$page" params={{ page: "products" }}>
            View all products <ArrowUpRight size={18} />
          </Link>
        </div>
        <CategoryGrid />
      </section>
      <section className="feature-section">
        <div className="wrap feature-layout">
          <div className="feature-image">
            <img
              src={categories[1].image}
              alt="Custom luxury boxes and branded shopping bags"
              width="1024"
              height="1024"
              loading="lazy"
            />
            <span>DESIGNED TO DELIGHT. BUILT TO LAST.</span>
          </div>
          <div className="feature-copy">
            <div className="eyebrow">MORE THAN JUST A BOX</div>
            <h2>
              Packaging that
              <br />
              elevates your brand.
            </h2>
            <p>
              Great packaging is the first chapter of your brand story. Make it a memorable one with
              custom solutions that look beautiful and feel exceptional.
            </p>
            <ul>
              <li>
                <Check /> Custom design, unmistakably yours
              </li>
              <li>
                <Check /> Premium materials and thoughtful finishes
              </li>
              <li>
                <Check /> Solutions for retail, gifting and beyond
              </li>
            </ul>
            <Button asChild size="lg">
              <Link to="/$page" params={{ page: "packaging-solutions" }}>
                Explore Packaging <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="section wrap about-preview">
        <div>
          <div className="eyebrow">THE PEOPLE BEHIND YOUR PRINT</div>
          <h2>
            Quality that speaks.
            <br />
            Designs that leave
            <br />a lasting impression.
          </h2>
          <p>
            With over 10 years of experience, Namo Enterprises is your one-stop destination for
            premium Digital Printing, Offset Printing, Product Packaging, LED Sign Boards and
            Corporate Gifting solutions.
          </p>
          <Link className="text-link" to="/$page" params={{ page: "about" }}>
            Get to know NAMO <ArrowUpRight size={18} />
          </Link>
          <div className="stats">
            {[
              ["10+", "Years of experience"],
              ["500+", "Happy clients"],
              ["50+", "Corporate partners"],
              ["100%", "Quality assurance"],
            ].map(([v, t]) => (
              <div key={t}>
                <strong>{v}</strong>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
        <img
          src={about.url}
          alt="NAMO printing and branding production"
          width="600"
          height="500"
          loading="lazy"
        />
      </section>
      <section className="why-section">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <div className="eyebrow">THE NAMO DIFFERENCE</div>
              <h2>A little more care. A lot more impact.</h2>
            </div>
          </div>
          <div className="why-grid">
            {[
              [
                Factory,
                "In-house production",
                "From concept to creation, quality stays in our hands.",
              ],
              [
                Printer,
                "Advanced technology",
                "Precision printing and packaging, down to the detail.",
              ],
              [
                Leaf,
                "Premium materials",
                "Thoughtfully selected for a finish that feels exceptional.",
              ],
              [
                Sparkles,
                "Made just for you",
                "Tailored solutions that are as unique as your brand.",
              ],
            ].map(([Icon, t, p], i) => {
              const I = Icon as typeof Factory;
              return (
                <div className={`why-item tone-${categories[i]?.tone ?? "cyan"}`} key={String(t)}>
                  <span>
                    <I size={26} />
                  </span>
                  <h3>{String(t)}</h3>
                  <p>{String(p)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <div>
            <div className="eyebrow">CRAFTED WITH PURPOSE</div>
            <h2>Great ideas. Tangible results.</h2>
            <p>A glimpse into our world of printing, packaging and branding.</p>
          </div>
        </div>
        <div className="portfolio-grid">
          {(
            [
              [packagingProfessional, "Premium Packaging", "packaging-solutions"],
              [production.url, "Production Excellence", "printing-services"],
              [categories[2].image, "Signage Solutions", "signage-solutions"],
            ] as const
          ).map(([image, title, page]) => (
            <Link to="/$page" params={{ page }} key={title}>
              <img src={image} alt={title} width="600" height="400" loading="lazy" />
              <div>
                <h3>{title}</h3>
                <ArrowUpRight size={21} />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="testimonial-section">
        <div className="wrap testimonial-layout">
          <div>
            <div className="eyebrow">REAL PEOPLE. REAL IMPACT.</div>
            <h2>
              Good work.
              <br />
              Even better relationships.
            </h2>
            <div className="testimonial-controls">
              <Button
                variant="outline"
                size="icon"
                aria-label="Previous testimonial"
                onClick={() => setTestimonial((testimonial + 4) % 5)}
              >
                <ArrowRight className="rotate-180" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="Next testimonial"
                onClick={() => setTestimonial((testimonial + 1) % 5)}
              >
                <ArrowRight />
              </Button>
            </div>
          </div>
          <blockquote>
            <span className="quote-mark">“</span>
            <p>{review.text}</p>
            <div className="reviewer">
              <span>
                {review.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <div>
                <strong>{review.name}</strong>
                <small>{review.role}</small>
              </div>
            </div>
          </blockquote>
        </div>
      </section>
      <QuoteBand />
    </main>
  );
}
export function QuoteBand() {
  return (
    <section className="quote-band">
      <div className="wrap">
        <div>
          <div className="eyebrow">LET’S CREATE SOMETHING EXTRAORDINARY</div>
          <h2>Your next big idea starts here.</h2>
          <p>Tell us what you have in mind. We’ll bring it to life.</p>
        </div>
        <Button variant="secondary" size="lg" asChild>
          <Link to="/$page" params={{ page: "contact" }}>
            Let’s Talk <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}
export function ContactForm() {
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = Array.from(data.entries())
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
    setEmail(
      `mailto:namoenterprises116@gmail.com?subject=${encodeURIComponent("NAMO project enquiry — " + data.get("Full name"))}&body=${encodeURIComponent(text)}`,
    );
    setReady(true);
  }
  return (
    <form onSubmit={submit} className="quote-form">
      <h2>Tell us about your project.</h2>
      <p>Every great brand starts with a conversation.</p>
      <div className="form-grid">
        {["Full name", "Company name", "Phone number", "Email address"].map((n) => (
          <label key={n}>
            {n}
            <input
              name={n}
              required={n !== "Company name"}
              type={n === "Email address" ? "email" : n === "Phone number" ? "tel" : "text"}
              placeholder={n}
            />
          </label>
        ))}
        <label>
          Service required
          <select name="Service" required>
            <option value="">Choose a service</option>
            {categories.map((c) => (
              <option key={c.slug}>{c.name}</option>
            ))}
          </select>
        </label>
        <label>
          Quantity
          <input name="Quantity" type="number" min="1" placeholder="Approximate quantity" />
        </label>
      </div>
      <label>
        Product or project details
        <textarea
          name="Project details"
          required
          rows={5}
          placeholder="Tell us about your idea, requirements and timeline…"
        />
      </label>
      <Button size="lg" type="submit">
        Prepare Enquiry <ArrowUpRight />
      </Button>
      {ready ? (
        <div className="enquiry-status" role="status">
          <p>
            Your enquiry is ready, but has not been sent. Open your email app to send it to NAMO;
            you can attach your designs there.
          </p>
          <Button asChild>
            <a href={email}>
              Open Email App <Mail />
            </a>
          </Button>
        </div>
      ) : (
        <small className="form-note">
          Enquiries are sent through your email app. You can also call +91 90356 51622.
        </small>
      )}
    </form>
  );
}
export function ContentPage({ page }: { page: string }) {
  const aliases: Record<string, string> = { "industries-we-serve": "industries", news: "blogs" };
  const key = aliases[page.replace(".html", "")] || page.replace(".html", "");
  const category = categories.find((c) => c.slug === key);
  const { search, saved, onlySaved, setOnlySaved } = useContext(SiteContext);
  const [filter, setFilter] = useState("All");
  const title =
    category?.name || navigation.find((n) => n.page === key)?.name || "NAMO Enterprises";
  const blocks = original[key as keyof typeof original] || [];
  const filtered = products.filter(
    (p) =>
      (filter === "All" || p.category.short === filter) &&
      (!onlySaved || saved.includes(p.name) || saved.includes(p.category.name)) &&
      `${p.name} ${p.category.name}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <main>
      <section className="page-intro">
        <div className="wrap">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <span>{title}</span>
          </div>
          <div className="eyebrow">PRINT. PACKAGE. MAKE AN IMPACT.</div>
          <h1>{title}</h1>
          <p>
            {category?.detail ||
              "Creativity, quality and precision. Everything your brand needs, under one roof."}
          </p>
        </div>
      </section>
      <section className="section wrap">
        {key === "contact" ? (
          <div className="contact-layout">
            <div>
              <div className="eyebrow">LET’S BRING YOUR VISION TO LIFE</div>
              <h2>
                Big idea?
                <br />
                You’re in the right place.
              </h2>
              <p>
                Connect with our team for custom printing, packaging, signage and gifting solutions.
              </p>
              <a className="contact-detail" href="tel:+919035651622">
                <Phone />
                <span>
                  <small>Call us</small>+91 90356 51622
                </span>
              </a>
              <a className="contact-detail" href="mailto:namoenterprises116@gmail.com">
                <Mail />
                <span>
                  <small>Email us</small>namoenterprises116@gmail.com
                </span>
              </a>
              <p>Bangalore, Karnataka, India</p>
              <img
                className="contact-image"
                src={hero}
                alt="Custom branded packaging and printing"
                width="600"
                height="320"
                loading="lazy"
              />
            </div>
            <ContactForm />
          </div>
        ) : key === "products" ? (
          <>
            <div className="catalogue-toolbar">
              <div className="filters">
                {["All", ...categories.map((c) => c.short)].map((t) => (
                  <Button
                    key={t}
                    variant={filter === t ? "default" : "outline"}
                    onClick={() => setFilter(t)}
                  >
                    {t}
                  </Button>
                ))}
                {onlySaved && (
                  <Button variant="secondary" onClick={() => setOnlySaved(false)}>
                    Wishlist <X />
                  </Button>
                )}
              </div>
              <span>{filtered.length} products</span>
            </div>
            {filtered.length ? (
              <div className="product-grid">
                {filtered.map((p) => (
                  <ProductCard key={p.name} product={p} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Search size={32} />
                <h2>No products found</h2>
                <p>
                  {onlySaved
                    ? "Save a collection or product to see it here."
                    : "Try another search or category."}
                </p>
              </div>
            )}
          </>
        ) : key === "services" ? (
          <CategoryGrid />
        ) : key === "blogs" ? (
          <div className="blog-empty">
            <img
              src={categories[0].image}
              alt="Printing inspiration and branding materials"
              width="400"
              height="400"
              loading="lazy"
            />
            <div>
              <div className="eyebrow">INSPIRATION IN THE MAKING</div>
              <h2>Blogs Coming Soon!</h2>
              <p>Our latest printing, packaging and branding insights will be shared here.</p>
              <Button asChild>
                <Link to="/$page" params={{ page: "services" }}>
                  Explore our services <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="editorial-layout">
            <div className="original-copy">
              {blocks.map((b, i) =>
                b.tag === "h2" ? (
                  <h2 key={i}>{b.text}</h2>
                ) : b.tag === "h3" || b.tag === "h4" || b.tag === "h5" ? (
                  <h3 key={i}>{b.text}</h3>
                ) : b.tag === "li" ? (
                  <p className="content-point" key={i}>
                    <Check size={15} />
                    {b.text}
                  </p>
                ) : (
                  <p key={i}>{b.text}</p>
                ),
              )}
            </div>
            <aside>
              <img
                src={category?.image || (key === "industries" ? production.url : about.url)}
                alt={title}
                width="700"
                height="700"
                loading="lazy"
              />
              <h3>Your brand deserves the best.</h3>
              <p>Let’s find the right solution for your next project.</p>
              <Button asChild size="lg">
                <Link to="/$page" params={{ page: "contact" }}>
                  Request a Quote <ArrowUpRight />
                </Link>
              </Button>
              <div className="aside-services">
                {categories.map((c) => (
                  <Link key={c.slug} to="/$page" params={{ page: c.slug }}>
                    {c.name}
                    <ArrowUpRight size={16} />
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        )}
      </section>
      {key !== "contact" && <QuoteBand />}
    </main>
  );
}
function ProductCard({ product: p }: { product: (typeof products)[number] }) {
  const { saved, toggle } = useContext(SiteContext);
  const cart = useCart();
  const item = {
    name: p.name,
    slug: p.category.slug,
    image: imageFor(p.name, p.category.image),
  };
  return (
    <article className={`category-card tone-${p.category.tone}`}>
      <Link className="category-image" to="/$page" params={{ page: p.category.slug }}>
        <img
          src={p.category.image}
          alt={`${p.category.name} collection`}
          width="512"
          height="512"
          loading="lazy"
        />
      </Link>
      <Button
        variant="outline"
        size="icon"
        className="save-button"
        aria-label={`Save ${p.name}`}
        aria-pressed={saved.includes(p.name)}
        onClick={() => toggle(p.name)}
      >
        <Heart className={saved.includes(p.name) ? "heart-saved" : ""} />
      </Button>
      <div className="category-copy">
        <small>{p.category.name}</small>
        <h3>{p.name}</h3>
        <div className="product-actions">
          <Button variant="outline" asChild>
            <Link to="/$page" params={{ page: p.category.slug }}>
              View Details
            </Link>
          </Button>
          <Button asChild>
            <Link to="/$page" params={{ page: "contact" }}>
              Request Quote <ArrowUpRight />
            </Link>
          </Button>
        </div>
        <div className="product-actions">
          <Button
            variant="outline"
            onClick={() => cart.add(item)}
            aria-label={`Add ${p.name} to cart`}
          >
            {cart.items.some((x) => x.name === p.name) ? "Added ✓" : "Add to Cart"}
          </Button>
          <Button onClick={() => buyNow(item)}>Buy Now</Button>
        </div>
      </div>
    </article>
  );
}
