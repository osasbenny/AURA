import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { useRouter } from '@/context/RouterContext';
import { ThemeToggle } from './ThemeToggle';
import { ClayButton } from './ClayButton';

const navLinks = [
  { label: 'Browse', path: '/campaigns' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'Trust & Safety', path: '/trust' },
  { label: 'Support', path: '/support' },
];

export function Navbar() {
  const { path, navigate } = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [path]);

  const isActive = (linkPath: string) => path === linkPath;

  const handleNav = (to: string) => navigate(to);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            className={`clay-sm flex items-center justify-between gap-4 px-4 sm:px-6 py-2.5 transition-all duration-500 ${
              scrolled ? 'glass !bg-opacity-80' : ''
            }`}
            style={{
              background: scrolled ? 'var(--clay-surface-raised)' : 'var(--clay-surface)',
            }}
          >
            {/* Logo */}
            <button
              onClick={() => handleNav('/')}
              className="flex items-center gap-2.5 group flex-shrink-0"
            >
              <div className="w-10 h-10 rounded-clay-sm bg-gradient-to-br from-clay-400 to-clay-600 flex items-center justify-center shadow-glow-clay group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-clay-primary hidden sm:block">
                AURA
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`px-4 py-2 rounded-clay-sm text-sm font-semibold transition-all duration-300 ${
                    isActive(link.path)
                      ? 'text-clay-primary clay-inset-sm'
                      : 'text-clay-secondary hover:text-clay-primary hover:clay-sm'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <ClayButton
                variant="primary"
                size="sm"
                onClick={() => handleNav('/start')}
                className="hidden sm:inline-flex"
              >
                Start a Campaign
              </ClayButton>
              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-11 h-11 clay-sm flex items-center justify-center"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/30 glass"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-20 left-4 right-4 clay-raised p-6 transition-all duration-500 ${
            mobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
          }`}
        >
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`px-4 py-3 rounded-clay-sm text-left text-base font-semibold transition-all ${
                  isActive(link.path)
                    ? 'text-clay-primary clay-inset-sm'
                    : 'text-clay-secondary hover:text-clay-primary'
                }`}
              >
                {link.label}
              </button>
            ))}
            <ClayButton
              variant="primary"
              fullWidth
              className="mt-2"
              onClick={() => handleNav('/start')}
            >
              Start a Campaign
            </ClayButton>
          </nav>
        </div>
      </div>
    </>
  );
}
