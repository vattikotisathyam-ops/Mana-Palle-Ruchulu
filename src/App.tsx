/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  ChevronRight, 
  UtensilsCrossed, 
  MessageSquare,
  Menu as MenuIcon,
  X,
  ArrowRight,
  Instagram,
  Facebook,
  ExternalLink
} from 'lucide-react';

// --- Types ---
interface MenuItem {
  id: number;
  nameEn: string;
  nameTe: string;
  price: string;
  category: string;
  descriptionEn: string;
  descriptionTe: string;
  popular?: boolean;
}

// --- Data ---
const MENU_ITEMS: MenuItem[] = [
  { id: 1, nameEn: "Andhra Special Veg Meals", nameTe: "ఆంధ్రా స్పెషల్ వెజ్ మీల్స్", price: "₹250", category: "Meals", descriptionEn: "Traditional banana leaf meal with 12+ varieties", descriptionTe: "అరటి ఆకులో 12+ వెరైటీలతో ఆంధ్రా భోజనం", popular: true },
  { id: 2, nameEn: "Non-Veg Thali", nameTe: "నాన్ వెజ్ ధాలి", price: "₹350", category: "Meals", descriptionEn: "Rice, Chicken Curry, Kheema, and traditional sides", descriptionTe: "అన్నం, చికెన్ కర్రీ, కీమా మరియు ఇతర వంటకాలు", popular: true },
  { id: 3, nameEn: "Narketpalle Chicken Curry", nameTe: "నార్కెట్‌పల్లి చికెన్ కర్రీ", price: "₹180", category: "Curries", descriptionEn: "Our signature village-style spicy chicken gravy", descriptionTe: "మా ప్రత్యేక విలేజ్ స్టైల్ స్పైసీ చికెన్ కర్రీ" },
  { id: 4, nameEn: "Gongura Pappu", nameTe: "గోంగూర పప్పు", price: "₹120", category: "Curries", descriptionEn: "Tangy sorrel leaves cooked with lentils", descriptionTe: "రుచికరమైన గోంగూర పప్పు" },
  { id: 5, nameEn: "Special Dosai", nameTe: "స్పెషల్ దోసె", price: "₹80", category: "Tiffins", descriptionEn: "Crispy crepe served with 3 types of chutney", descriptionTe: "3 రకాల చట్నీలతో క్రిస్పీ దోసె" },
  { id: 6, nameEn: "Ghee Roast Idli", nameTe: "నెయ్యి ఇడ్లీ", price: "₹70", category: "Tiffins", descriptionEn: "Soft steamed cakes with pure village ghee", descriptionTe: "స్వచ్ఛమైన నెయ్యితో మెత్తని ఇడ్లీలు" },
  { id: 7, nameEn: "Mutton Dry Fry", nameTe: "మటన్ ఫ్రై", price: "₹280", category: "Special", descriptionEn: "Traditional spiced mutton deep fry", descriptionTe: "స్పైసీ మటన్ ఫ్రై" },
  { id: 8, nameEn: "Natukodi Pulusu", nameTe: "నాటుకోడి పులుసు", price: "₹300", category: "Special", descriptionEn: "Country chicken in spicy Andhra gravy", descriptionTe: "స్పైసీ ఆంధ్రా స్టైల్ నాటుకోడి పులుసు", popular: true },
];

const REVIEWS = [
  { id: 1, name: "Rahul K.", rating: 5, comment: "Best Andhra meals near Narketpalle highway. Worth every rupee!", date: "2 days ago" },
  { id: 2, name: "Sneha Reddy", rating: 4, comment: "Authentic spicy taste. Chicken curry was excellent.", date: "1 week ago" },
  { id: 3, name: "Venkatesh P.", rating: 5, comment: "Quality of rice and ghee is amazing. Feels like home.", date: "2 weeks ago" },
];

// --- Components ---

const NavItem = ({ href, children }: { href: string, children: ReactNode }) => (
  <a href={href} className="text-earth-800 hover:text-leaf-600 font-medium transition-colors">
    {children}
  </a>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Meals");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ["Meals", "Tiffins", "Curries", "Special"];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-cream shadow-md py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-earth-800 flex items-center justify-center text-turmeric rounded-lg">
              <UtensilsCrossed size={20} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold uppercase text-earth-800 tracking-tighter">Mana Palle Ruchulu</h1>
              <p className="text-[10px] telugu font-bold text-spice-red uppercase tracking-widest -mt-1">మన పల్లె రుచులు</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-earth-800">
              <NavItem href="#home">Home</NavItem>
              <NavItem href="#menu">Menu</NavItem>
              <NavItem href="#about">Story</NavItem>
              <NavItem href="#gallery">Gallery</NavItem>
              <NavItem href="#contact">Contact</NavItem>
            </div>
            <a 
              href="https://wa.me/919848152992" 
              className="bg-spice-red hover:bg-earth-800 text-white px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all shadow-lg"
            >
              WhatsApp
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-earth-800" onClick={() => setIsMenuOpen(true)}>
            <MenuIcon size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-earth-800 z-[60] flex flex-col p-10 text-cream"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsMenuOpen(false)} className="text-cream">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-8 mt-12 text-4xl font-extrabold uppercase tracking-tighter">
              <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
              <a href="#menu" onClick={() => setIsMenuOpen(false)}>Menu</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)}>Story</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
            </div>
            <div className="mt-auto space-y-4">
               <a href="tel:09848152992" className="block text-center bg-turmeric text-earth-900 p-5 rounded-2xl font-bold uppercase tracking-widest">
                Call Now
              </a>
              <a href="https://wa.me/919848152992" className="block text-center border-2 border-cream p-5 rounded-2xl font-bold uppercase tracking-widest">
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center overflow-hidden bg-earth-800">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=2000&auto=format&fit=crop" 
            alt="Traditional Andhra Meal" 
            className="w-full h-full object-cover opacity-40 scale-105"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10 w-full pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="pill-label border-turmeric text-turmeric inline-block mb-8">
              Est. 1998 • Authentic Village Flavors
            </div>
            
            <h2 className="text-white text-6xl md:text-9xl mb-6 font-extrabold leading-[0.85] uppercase tracking-tighter">
              Mana Palle <br />
              <span className="text-turmeric italic serif-italic normal-case tracking-normal">Ruchulu</span>
            </h2>
            
            <p className="text-white/80 text-lg md:text-2xl serif-italic mb-10 max-w-xl leading-relaxed">
              Experience the authentic soul of Andhra village cooking. From our spicy curries to the legendary banana leaf meals.
            </p>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <a href="#menu" className="bg-spice-red hover:bg-white hover:text-earth-900 text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-2xl">
                Explore the Menu
              </a>
              <a href="tel:09848152992" className="bg-white/10 hover:bg-white hover:text-earth-900 backdrop-blur-md text-white border border-white/30 px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest transition-all">
                Book a Table
              </a>
            </div>

            <div className="mt-20 flex gap-12 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-leaf-600 rounded-full" />
                <span>Open till 12 AM</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-turmeric rounded-full" />
                <span>NH 65, Narketpalle</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-y border-earth-100 py-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="space-y-1">
            <h3 className="text-4xl font-extrabold text-earth-800">3.6<span className="text-turmeric">/5</span></h3>
            <p className="text-earth-400 text-[10px] font-bold uppercase tracking-widest">2.1K+ Reviews</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-4xl font-extrabold text-earth-800">100%</h3>
            <p className="text-earth-400 text-[10px] font-bold uppercase tracking-widest">Village Recipe</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-4xl font-extrabold text-earth-800">₹200</h3>
            <p className="text-earth-400 text-[10px] font-bold uppercase tracking-widest">Starting Price</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-4xl font-extrabold text-earth-800">Daily</h3>
            <p className="text-earth-400 text-[10px] font-bold uppercase tracking-widest">7 AM - 12 AM</p>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} className="relative">
              <div className="absolute top-0 right-0 w-48 h-48 bg-turmeric/10 rounded-full -mr-24 -mt-24 blur-3xl" />
              <img 
                src="https://images.unsplash.com/photo-1589187151032-573a91317445?q=80&w=1000&auto=format&fit=crop" 
                alt="Chef's Special" 
                className="rounded-[40px] shadow-2xl relative z-10 w-full aspect-[4/5] object-cover"
              />
              <div className="absolute -bottom-10 -right-10 bg-spice-red text-white p-12 rounded-3xl shadow-2xl z-20 hidden md:block">
                <span className="text-6xl font-extrabold">25+</span>
                <p className="text-[10px] uppercase font-bold tracking-widest mt-2">Years of Heritage</p>
              </div>
            </motion.div>
            
            <div className="space-y-10">
              <div className="space-y-4">
                <h4 className="text-leaf-600 font-bold uppercase text-xs tracking-widest">Our Heritage Story</h4>
                <h2 className="text-6xl md:text-8xl font-extrabold text-earth-900 uppercase tracking-tighter">Village <br/><span className="text-turmeric">Soul.</span></h2>
              </div>
              
              <div className="space-y-6 text-earth-800 text-lg leading-relaxed">
                <p className="serif-italic border-l-4 border-turmeric pl-6 py-2">
                  "We believe that the best flavors are found in the simplest of places—the villages of Andhra."
                </p>
                <p className="telugu text-3xl font-bold text-earth-800 leading-tight">
                  మేము పల్లెటూరి రుచులను మీ నగరానికి తీసుకువస్తాము. ప్రతి వంటకం ఒక జ్ఞాపకం.
                </p>
                <p className="text-earth-500 text-sm font-medium leading-loose">
                  Our kitchen is a tribute to the authentic spice blends and traditional methods of Narketpalle. We source our ingredients directly from local farms, ensuring that every bite resonates with the freshness of the village.
                </p>
              </div>

              <div className="pt-6">
                <a href="#menu" className="inline-flex items-center gap-4 text-earth-900 font-black uppercase text-xs tracking-[0.2em] group">
                   Explore the full story <div className="w-10 h-[1px] bg-earth-900 group-hover:w-16 transition-all" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-32 bg-white scroll-mt-header">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
            <div className="space-y-4">
              <h4 className="text-spice-red font-bold uppercase text-xs tracking-widest">Daily Tiffins & Meals</h4>
              <h2 className="text-6xl md:text-8xl font-extrabold text-earth-800 uppercase tracking-tighter">The Menu</h2>
            </div>
            
            <div className="flex flex-wrap gap-4 bg-cream p-2 rounded-2xl border border-earth-100">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeCategory === cat 
                    ? 'bg-earth-800 text-white shadow-xl' 
                    : 'text-earth-400 hover:text-earth-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            <AnimatePresence mode="wait">
              {MENU_ITEMS.filter(item => item.category === activeCategory).map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-card p-10 rounded-[32px] border-l-8 border-leaf-600 flex justify-between items-center group transition-all hover:translate-x-2"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-extrabold text-earth-900 uppercase tracking-tight">{item.nameEn}</h3>
                      {item.popular && <span className="w-2 h-2 bg-spice-red rounded-full" />}
                    </div>
                    <p className="telugu text-spice-red font-bold text-lg">{item.nameTe}</p>
                    <p className="text-earth-400 text-[10px] font-bold uppercase tracking-widest mt-4 leading-loose">{item.descriptionEn}</p>
                  </div>
                  <div className="text-3xl font-black text-earth-900 font-mono tracking-tighter">
                    {item.price}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* WhatsApp Feature */}
      <section className="bg-turmeric py-24 text-earth-900">
        <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <h2 className="text-6xl md:text-8xl font-extrabold uppercase tracking-tighter leading-[0.85] mb-6">WhatsApp <br/>Direct <span className="serif-italic lowercase tracking-normal font-medium">Ordering.</span></h2>
            <p className="text-lg font-semibold opacity-70">Pre-book your banana leaf meals or check daily availability instantly on chat.</p>
          </div>
          <a href="https://wa.me/919848152992" className="w-32 h-32 bg-earth-900 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl">
            <MessageSquare size={48} />
          </a>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-32 bg-cream scroll-mt-header">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="col-span-2 space-y-8">
              <h4 className="text-leaf-600 font-bold uppercase text-xs tracking-widest">Visual Diary</h4>
              <h2 className="text-6xl md:text-8xl font-extrabold text-earth-900 uppercase tracking-tighter">The Gallery.</h2>
              <p className="serif-italic text-earth-500 max-w-sm">Vibrant spices, aromatic curries, and the warmth of Narketpalle hospitality caught in time.</p>
            </div>
            <div className="h-full">
              <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover rounded-[40px] shadow-xl" alt="Gallery 1" />
            </div>
            <div className="h-full translate-y-12">
              <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover rounded-[40px] shadow-xl" alt="Gallery 2" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-16 h-80">
            <div className="col-span-2">
              <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover rounded-[40px] shadow-xl" alt="Gallery 3" />
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover rounded-[40px] shadow-xl" alt="Gallery 4" />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="grid lg:grid-cols-3 gap-20">
            <div className="space-y-8">
               <div className="w-20 h-2 bg-turmeric rounded-full" />
              <h2 className="text-6xl font-extrabold text-earth-900 uppercase tracking-tighter leading-none">Guests <br/>Feedback.</h2>
              <p className="text-earth-500 text-sm font-medium tracking-wide">Rated 3.6 Average based on over 2,100 authentic customer reviews from Google.</p>
              <div className="flex text-turmeric gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
              </div>
            </div>
            <div className="lg:col-span-2 space-y-6">
              {REVIEWS.map(item => (
                <div key={item.id} className="p-12 bg-cream rounded-[40px] border border-earth-100 flex gap-8 items-start">
                   <div className="text-spice-red font-black text-6xl opacity-20">"</div>
                   <div className="space-y-6">
                     <p className="text-2xl font-bold text-earth-800 leading-tight">
                        {item.comment}
                     </p>
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-widest">{item.name}</span>
                        <span className="text-earth-300 font-mono text-[10px]">{item.date}</span>
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Map */}
      <section id="contact" className="py-32 bg-earth-800 text-cream scroll-mt-header">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="space-y-16">
              <div className="space-y-4">
                <h4 className="text-turmeric font-bold uppercase text-xs tracking-widest underline underline-offset-8">Visit Us Today</h4>
                <h2 className="text-7xl font-extrabold uppercase tracking-tighter leading-none">Find <br/>Our Palle.</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-turmeric">Address</h5>
                  <p className="text-xl font-bold leading-snug">655G+9JW, NH 65, Narketpalle, Telangana 508254</p>
                </div>
                <div className="space-y-4">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-turmeric">Hours</h5>
                  <p className="text-xl font-bold">7:00 AM – 12:00 AM Daily</p>
                </div>
                <div className="space-y-4">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-turmeric">Contact</h5>
                  <p className="text-xl font-bold">098481 52992</p>
                </div>
                <div className="space-y-4">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-turmeric">Social</h5>
                  <div className="flex gap-4">
                    <Instagram size={24} />
                    <Facebook size={24} />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 flex-wrap pt-10">
                <a href="tel:09848152992" className="bg-turmeric text-earth-900 px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform">Call Now</a>
                <a href="https://wa.me/919848152992" className="border-2 border-cream px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-cream hover:text-earth-900 transition-all">WhatsApp Location</a>
              </div>
            </div>

            <div className="h-[600px] rounded-[50px] overflow-hidden shadow-2xl border-8 border-cream/10">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15243.6444855263!2d79.1970251!3d17.2185208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bca9bc391ca358b%3A0xe96321ef722c1b18!2sMana%20Palle%20Ruchulu!5e0!3m2!1sen!2sin!4v1713768000000!5m2!1sen!2sin" 
                width="100%" height="100%" style={{ border: 0, filter: 'grayscale(1) contrast(1.2)' }} loading="lazy" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cream border-t border-earth-100 py-16 text-earth-900">
        <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-earth-800 rounded-lg" />
             <span className="text-xl font-extrabold uppercase tracking-tighter">Mana Palle Ruchulu</span>
          </div>
          <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-earth-400">
            <span>Instagram</span>
            <span>Facebook</span>
            <span>Since 1998</span>
          </div>
          <p className="text-[10px] font-bold text-earth-400 opacity-50">© {new Date().getFullYear()} Narketpalle, Telangana.</p>
        </div>
      </footer>
    </div>
  );
}
