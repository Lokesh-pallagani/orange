import { useState, useEffect, useCallback } from 'react';
import {
  Bell,
  Wifi,
  Car,
  UtensilsCrossed,
  Sparkles,
  Snowflake,
  Shirt,
  ShieldCheck,
  Star,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Instagram,
  ArrowRight,
  Check,
  Calendar,
  Users,
  BedDouble,
  Send,
  Award,
  Clock,
  HeartHandshake,
  Sun,
  Moon,
} from 'lucide-react';
import {
  SOCIAL_LINKS,
  CONTACT_INFO,
  HERO_IMAGE,
  HERO_IMAGE_DARK,
  ABOUT_IMAGE,
  ROOMS,
  SERVICES,
  GALLERY,
  REVIEWS,
  OFFERS,
} from '@/data/hotelData';

const ICONS: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number | string }>> = {
  Bell,
  Wifi,
  Car,
  UtensilsCrossed,
  Sparkles,
  Snowflake,
  Shirt,
  ShieldCheck,
};

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Rooms', href: '#rooms' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

type Theme = 'light' | 'dark';

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem('orange-theme') as Theme | null;
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('orange-theme', theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggle };
}

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return scrolled;
}

function ThemeToggle({ theme, toggle, scrolled, inMobileMenu }: { theme: Theme; toggle: () => void; scrolled: boolean; inMobileMenu?: boolean }) {
  const isDark = theme === 'dark';

  if (inMobileMenu) {
    return (
      <button
        onClick={toggle}
        className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-bold bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white"
      >
        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110 ${
        scrolled
          ? 'bg-gray-100 hover:bg-orange-100 text-gray-700 dark:bg-white/10 dark:text-white dark:hover:bg-orange-500/20'
          : 'bg-white/15 backdrop-blur hover:bg-white/25 text-white'
      }`}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}

function Navbar({ theme, toggleTheme }: { theme: Theme; toggleTheme: () => void }) {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  const navBg = scrolled
    ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg py-3'
    : 'bg-transparent py-5';

  const linkColor = scrolled
    ? 'text-gray-700 dark:text-gray-200 hover:text-orange-500'
    : 'text-white/90 hover:text-orange-400';

  const logoColor = scrolled ? 'text-orange-500' : 'text-white';
  const subColor = scrolled ? 'text-gray-400 dark:text-gray-500' : 'text-orange-200';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <span className={`text-2xl font-black tracking-tight transition-colors ${logoColor}`}>ORANGE</span>
          <span className={`text-[10px] font-bold uppercase tracking-[3px] hidden sm:block transition-colors ${subColor}`}>
            Hotel
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={`text-sm font-semibold transition-colors ${linkColor}`}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} toggle={toggleTheme} scrolled={scrolled} />
          <a
            href="#booking"
            className="hidden sm:inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30"
          >
            Book Now
            <ArrowRight className="w-4 h-4" />
          </a>
          <button onClick={() => setOpen(!open)} className={`lg:hidden ${scrolled ? 'text-gray-800 dark:text-white' : 'text-white'}`}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-xl">
          <div className="px-6 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-gray-700 dark:text-gray-200 font-semibold py-2 hover:text-orange-500"
              >
                {link.label}
              </a>
            ))}
            <ThemeToggle theme={theme} toggle={toggleTheme} scrolled={true} inMobileMenu />
            <a
              href="#booking"
              onClick={() => setOpen(false)}
              className="bg-orange-500 text-white px-5 py-3 rounded-xl text-sm font-bold text-center mt-2"
            >
              Book Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero({ theme }: { theme: Theme }) {
  const heroImg = theme === 'dark' ? HERO_IMAGE_DARK : HERO_IMAGE;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="ORANGE Hotel" className="w-full h-full object-cover transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-gray-900/30 dark:from-black/90 dark:via-black/65 dark:to-black/40" />
      </div>

      <div className="relative z-10 max-w-3xl px-6 text-center text-white">
        <div className="inline-block bg-orange-500/20 border border-orange-400/30 rounded-full px-4 py-1.5 mb-6 animate-[fadeIn_0.8s_ease]">
          <span className="text-orange-200 text-xs font-bold tracking-[3px] uppercase">Welcome to ORANGE Hotel</span>
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[0.95] mb-6 animate-[fadeIn_1s_ease]">
          Stay bright.
          <br />
          <span className="text-orange-400">Stay comfortable.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-100 max-w-xl mx-auto mb-8 leading-relaxed">
          A warm, modern hotel experience designed for business trips, family holidays and relaxing getaways.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#booking"
            className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-base transition-all hover:scale-105 hover:shadow-xl hover:shadow-orange-500/40"
          >
            Book Your Stay
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#rooms"
            className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/30 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-base transition-all"
          >
            Explore Rooms
          </a>
        </div>

        <div className="flex items-center justify-center gap-8 mt-12">
          <div className="text-center">
            <div className="text-3xl font-black text-orange-400">500+</div>
            <div className="text-xs text-gray-300 uppercase tracking-wider">Happy Guests</div>
          </div>
          <div className="w-px h-12 bg-white/20" />
          <div className="text-center">
            <div className="text-3xl font-black text-orange-400">4.6</div>
            <div className="text-xs text-gray-300 uppercase tracking-wider">Guest Rating</div>
          </div>
          <div className="w-px h-12 bg-white/20" />
          <div className="text-center">
            <div className="text-3xl font-black text-orange-400">24/7</div>
            <div className="text-xs text-gray-300 uppercase tracking-wider">Reception</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-orange-50 to-transparent dark:from-gray-900" />
    </section>
  );
}

function SectionHead({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-14">
      <span className="text-orange-500 text-xs font-bold tracking-[3px] uppercase">{eyebrow}</span>
      <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mt-3 mb-3">{title}</h2>
      {subtitle && <p className="text-gray-500 dark:text-gray-400 text-lg">{subtitle}</p>}
    </div>
  );
}

function About() {
  const highlights = [
    { icon: Award, title: 'Award-Winning Service', text: 'Recognized for excellence in guest hospitality.' },
    { icon: Clock, title: '24/7 Availability', text: 'Round-the-clock reception and support.' },
    { icon: HeartHandshake, title: 'Personal Touch', text: 'Every guest treated like family.' },
  ];

  return (
    <section id="about" className="py-24 bg-orange-50/50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead
          eyebrow="About Us"
          title="Hospitality with a personal touch"
          subtitle="ORANGE Hotel brings together comfortable rooms, friendly service and convenient facilities under one welcoming roof."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img src={ABOUT_IMAGE} alt="ORANGE Hotel" className="rounded-3xl shadow-2xl w-full object-cover h-[420px]" />
            <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white rounded-2xl p-6 shadow-xl hidden sm:block">
              <div className="text-4xl font-black">10+</div>
              <div className="text-sm text-orange-100">Years of Service</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-orange-100 dark:border-gray-700 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Our Story</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Started with a simple idea — to make every guest feel at home. ORANGE has grown into a contemporary
                stay destination while keeping personal hospitality at its heart.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-orange-100 dark:border-gray-700 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Why guests choose us</h3>
              <ul className="space-y-3">
                {[
                  'Comfort-focused rooms and thoughtful amenities',
                  'Friendly 24/7 reception support',
                  'Convenient dining, parking and Wi-Fi',
                  'Simple and seamless online booking experience',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-orange-600 dark:text-orange-400" strokeWidth={3} />
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {highlights.map((h) => (
                <div key={h.title} className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-orange-100 dark:border-gray-700 text-center">
                  <h.icon className="w-7 h-7 text-orange-500 mx-auto mb-2" />
                  <div className="text-sm font-bold text-gray-900 dark:text-white">{h.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{h.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Rooms() {
  return (
    <section id="rooms" className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead eyebrow="Rooms & Suites" title="Find your comfortable space" subtitle="Choose the room that fits your stay." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROOMS.map((room) => (
            <article
              key={room.name}
              className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{room.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-3">{room.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.features.map((f) => (
                    <span key={f} className="bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400 px-2.5 py-1 rounded-full text-xs font-semibold">
                      {f}
                    </span>
                  ))}
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-2xl font-black text-orange-500">{room.price}</span>
                    <span className="text-sm text-gray-400 dark:text-gray-500 font-medium"> / night</span>
                  </div>
                  <a
                    href="#booking"
                    className="text-orange-500 font-bold text-sm hover:text-orange-600 transition-colors inline-flex items-center gap-1"
                  >
                    Book
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead eyebrow="Hotel Services" title="Everything you need" subtitle="We provide a full range of amenities to make your stay effortless." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => {
            const Icon = ICONS[service.icon];
            return (
              <div
                key={service.title}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg hover:border-orange-200 dark:hover:border-orange-500/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-orange-50 dark:bg-orange-500/15 group-hover:bg-orange-500 flex items-center justify-center mb-4 transition-colors">
                  {Icon && <Icon className="w-7 h-7 text-orange-500 group-hover:text-white transition-colors" />}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">{service.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Booking() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-white text-gray-900 dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all';

  return (
    <section id="booking" className="py-24 bg-gray-900 dark:bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-orange-950/40 dark:from-black dark:via-gray-950 dark:to-orange-950/30" />
      <div className="relative max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-orange-400 text-xs font-bold tracking-[3px] uppercase">Online Booking</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mt-3 mb-3">Reserve your stay</h2>
          <p className="text-gray-400 text-lg">Select your room, dates and guests.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur rounded-3xl border border-white/10 p-8 md:p-10"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <BedDouble className="w-3.5 h-3.5" /> Room Type
              </label>
              <select className={inputClass}>
                {ROOMS.map((r) => (
                  <option key={r.name}>{r.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Check-in
              </label>
              <input type="date" className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Check-out
              </label>
              <input type="date" className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> Guests
              </label>
              <select className={inputClass}>
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4+ Guests</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Name</label>
              <input required placeholder="Your full name" className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Phone</label>
              <input required placeholder="Mobile number" className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email</label>
              <input type="email" placeholder="you@example.com" className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Special Request</label>
              <input placeholder="Any extras?" className={inputClass} />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.01] hover:shadow-xl hover:shadow-orange-500/30"
          >
            Confirm Booking
          </button>

          {submitted && (
            <div className="mt-4 bg-green-500/20 border border-green-400/30 rounded-xl px-5 py-3 text-green-300 text-center font-semibold">
              Thank you! Your booking request has been received. We'll contact you shortly.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead eyebrow="Gallery" title="A glimpse of ORANGE" subtitle="Take a visual tour of our hotel." />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {GALLERY.map((item) => (
            <div key={item.label} className="group relative rounded-2xl overflow-hidden shadow-md cursor-pointer">
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex items-end p-5">
                <span className="text-white font-bold text-lg">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-orange-50/50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead eyebrow="Customer Reviews" title="What guests say" subtitle="Real feedback from our valued guests." />

        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-7 border border-orange-100 dark:border-gray-700 shadow-sm">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-5 h-5 ${idx < review.stars ? 'text-orange-400 fill-orange-400' : 'text-gray-200 dark:text-gray-600'}`}
                  />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed italic mb-4">"{review.text}"</p>
              <p className="font-bold text-gray-900 dark:text-white">— {review.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Offers() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead eyebrow="Special Offers" title="Stay more, save more" subtitle="Take advantage of our latest deals and packages." />

        <div className="grid md:grid-cols-3 gap-6">
          {OFFERS.map((offer) => (
            <div
              key={offer.title}
              className="bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-500/10 dark:to-orange-500/5 border border-orange-200/50 dark:border-orange-500/20 rounded-2xl p-8 hover:shadow-lg transition-all"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{offer.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-5">{offer.description}</p>
              <a
                href="#booking"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
              >
                {offer.cta}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all';

  return (
    <section id="contact" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead eyebrow="Contact Us" title="We'd love to hear from you" subtitle="Have a question or want to book directly? Reach out." />

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">ORANGE Hotel</h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-500/15 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase">Phone</div>
                  <div className="text-gray-900 dark:text-white font-semibold">{CONTACT_INFO.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-500/15 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase">Email</div>
                  <div className="text-gray-900 dark:text-white font-semibold">{CONTACT_INFO.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-500/15 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase">Location</div>
                  <div className="text-gray-900 dark:text-white font-semibold">{CONTACT_INFO.location}</div>
                </div>
              </div>
            </div>

            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Send us a message</h4>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input required placeholder="Your name" className={inputClass} />
              <input required type="email" placeholder="Email" className={inputClass} />
              <textarea rows={4} placeholder="Your message" className={`${inputClass} resize-none`} />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-xl font-bold transition-all hover:scale-[1.01]"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
              {sent && (
                <div className="bg-green-50 dark:bg-green-500/15 border border-green-200 dark:border-green-500/30 rounded-xl px-4 py-3 text-green-700 dark:text-green-400 text-center font-semibold">
                  Your message has been sent. We'll get back to you soon!
                </div>
              )}
            </form>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Find Us</h3>
            <div className="flex-1 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700 min-h-[300px] relative">
              <iframe
                title="ORANGE Hotel Location"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '300px' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=Vijayawada%2C%20Andhra%20Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="text-2xl font-black text-white mb-3">
              ORANGE <span className="text-orange-500">Hotel</span>
            </div>
            <p className="text-gray-400 max-w-sm">
              Comfort. Hospitality. Memories. Your trusted destination for a warm and modern stay experience.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Explore</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-400 hover:text-orange-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>{CONTACT_INFO.phone}</li>
              <li>{CONTACT_INFO.email}</li>
              <li>{CONTACT_INFO.location}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2026 ORANGE Hotel. All rights reserved.</p>
          <p className="text-gray-500 text-sm">
            Designed by <span className="text-orange-400 font-semibold">Lokesh Pallagani</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans antialiased transition-colors duration-300">
      <Navbar theme={theme} toggleTheme={toggle} />
      <Hero theme={theme} />
      <About />
      <Rooms />
      <Services />
      <Booking />
      <Gallery />
      <Reviews />
      <Offers />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
