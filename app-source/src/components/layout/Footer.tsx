import React, { useState } from 'react';
import { Heart, Send, Check, Sparkles, Youtube, Instagram, Music2, MessageCircle, Globe } from 'lucide-react';
import { CATEGORIES } from '../../lib/tools-data';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  const socialLinks = [
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@aimabideditz',
      icon: Youtube,
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/its_abid29/',
      icon: Instagram,
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@its_abid29',
      icon: Music2,
    },
    {
      name: 'WhatsApp',
      url: 'https://whatsapp.com/channel/0029Vb669jh11ulG8ttZ3K3s',
      icon: MessageCircle,
    },
    {
      name: 'Website',
      url: 'http://multitubeviews.com/',
      icon: Globe,
    },
  ];

  return (
    <footer className="relative bg-slate-100/80 border-t border-slate-200 text-slate-700 overflow-hidden pt-12 pb-8">
      {/* Wave SVG Top Divider */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none pointer-events-none opacity-30">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-8 text-indigo-500 fill-current">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          {/* Col 1: Brand & Socials */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-8 h-8">
                  <defs>
                    <linearGradient id="footerPmtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                  <polygon points="50,5 92,28 92,72 50,95 8,72 8,28" fill="url(#footerPmtGrad)" />
                  <text x="50" y="59" fill="#FFFFFF" fontSize="32" fontWeight="800" fontFamily="Space Grotesk" textAnchor="middle">PMT</text>
                </svg>
              </div>
              <span className="font-heading font-extrabold text-lg text-slate-900">Public Media Tool</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Free Browser-Based Tools. Simple. Private. Fast. Hundreds of high-performance tools running 100% in your local browser runtime.
            </p>

            {/* Social Icons (Small, Clickable) */}
            <div className="flex items-center gap-2 pt-2">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-full bg-slate-200/80 text-slate-600 flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-tr hover:from-indigo-500 hover:to-pink-500 hover:text-white hover:shadow-[0_0_8px_rgba(99,102,241,0.4)] cursor-pointer"
                    title={social.name}
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2: Top Categories */}
          <div>
            <h4 className="font-heading font-bold text-slate-900 text-sm mb-4 uppercase tracking-wider">Top Categories</h4>
            <ul className="space-y-2 text-xs">
              {[
                { name: 'Text Formatting', slug: 'text-formatting' },
                { name: 'Code Formatters', slug: 'code-formatters' },
                { name: 'Calculators', slug: 'financial-calculators' },
                { name: 'Unit Converters', slug: 'measurement-converters' },
                { name: 'Color Palettes', slug: 'color-palettes' },
                { name: 'PDF Utilities', slug: 'pdf-inspection' },
              ].map((cat) => (
                <li key={cat.slug}>
                  <button
                    onClick={() => navigate(`/categories/${cat.slug}`)}
                    className="hover:text-indigo-600 transition-colors cursor-pointer text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-slate-900 text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate('/privacy-policy')}
                  className="hover:text-indigo-600 transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/disclaimer')}
                  className="hover:text-indigo-600 transition-colors cursor-pointer text-left"
                >
                  Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/terms')}
                  className="hover:text-indigo-600 transition-colors cursor-pointer text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/credits')}
                  className="hover:text-indigo-600 transition-colors cursor-pointer text-left"
                >
                  Credits
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-indigo-600 transition-colors cursor-pointer text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="hover:text-indigo-600 transition-colors cursor-pointer text-left"
                >
                  Contact & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Stay Updated */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-slate-900 text-sm uppercase tracking-wider">Stay Updated</h4>
            <p className="text-xs text-slate-600">Get notified when new browser tools are added.</p>

            {subscribed ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Subscribed successfully!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg flex items-center transition-colors cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Public Media Tool (publicmediatool.com). All rights reserved.
          </div>
          <div className="text-center sm:text-right text-[11px] text-slate-400 max-w-md">
            Disclaimer: Not affiliated with any third-party trademark. All browser tools run 100% client-side.
          </div>
          <div className="flex items-center gap-1 font-medium">
            Made with <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 inline" /> for developers & creators
          </div>
        </div>
      </div>
    </footer>
  );
};
