import { Sparkles, Heart } from 'lucide-react';
import { useRouter } from '@/context/RouterContext';

const footerLinks = {
  Platform: [
    { label: 'Browse Campaigns', path: '/campaigns' },
    { label: 'Start a Campaign', path: '/start' },
    { label: 'How It Works', path: '/how-it-works' },
  ],
  Trust: [
    { label: 'Trust & Safety', path: '/trust' },
    { label: 'Verified Campaigns', path: '/trust' },
    { label: 'AI Verification', path: '/trust' },
  ],
  Support: [
    { label: 'Help Center', path: '/support' },
    { label: 'Contact Us', path: '/support' },
    { label: 'WhatsApp Support', path: '/support' },
  ],
  Legal: [
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Privacy Policy', path: '/privacy' },
  ],
};

export function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="mt-20 pt-16 pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* CTA strip */}
        <div className="clay-raised p-8 sm:p-12 mb-16 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-clay-300/20 blob-1 animate-blob" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-sage-300/20 blob-2 animate-blob-slow" />
          <div className="relative">
            <h3 className="text-2xl sm:text-3xl font-bold text-clay-primary mb-3">
              Ready to make a difference?
            </h3>
            <p className="text-clay-secondary mb-6 max-w-lg mx-auto">
              Start a campaign in 5 minutes or support someone in need today. No fees. No middlemen. Just community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate('/start')}
                className="clay-btn clay-btn-primary"
              >
                Start a Campaign
              </button>
              <button
                onClick={() => navigate('/campaigns')}
                className="clay-btn"
              >
                Browse Campaigns
              </button>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-sm font-bold text-clay-primary mb-4">{section}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigate(link.path)}
                      className="text-sm text-clay-secondary hover:text-clay-primary transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-clay-200/50 dark:border-clay-800/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-clay-sm bg-gradient-to-br from-clay-400 to-clay-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-lg font-bold text-clay-primary">AURA</span>
          </div>
          <p className="text-xs text-clay-muted text-center sm:text-left">
            © 2026 AURA. Built for African communities, by African communities.
          </p>
          <a
            href="https://cactusdigitalmedia.ng/start-a-project"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-clay-muted hover:text-clay-primary transition-colors"
          >
            Designed &amp; Developed By Cactus Digital Media
          </a>
          <div className="flex items-center gap-1.5 text-xs text-clay-muted">
            Made with <Heart className="w-3 h-3 text-clay-500 fill-clay-500" /> in Nigeria
          </div>
        </div>
      </div>
    </footer>
  );
}
