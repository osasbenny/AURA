import { ThemeProvider } from '@/context/ThemeContext';
import { RouterProvider, useRouter } from '@/context/RouterContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/pages/HomePage';
import { CampaignsPage } from '@/pages/CampaignsPage';
import { CampaignDetailPage } from '@/pages/CampaignDetailPage';
import { HowItWorksPage } from '@/pages/HowItWorksPage';
import { TrustPage } from '@/pages/TrustPage';
import { SupportPage } from '@/pages/SupportPage';
import { StartCampaignPage } from '@/pages/StartCampaignPage';
import { TermsPage } from '@/pages/TermsPage';
import { PrivacyPage } from '@/pages/PrivacyPage';

function PageRouter() {
  const { path } = useRouter();

  if (path === '/' || path === '') return <HomePage />;
  if (path === '/campaigns') return <CampaignsPage />;
  if (path.startsWith('/campaign/')) return <CampaignDetailPage />;
  if (path === '/how-it-works') return <HowItWorksPage />;
  if (path === '/trust') return <TrustPage />;
  if (path === '/support') return <SupportPage />;
  if (path === '/start') return <StartCampaignPage />;
  if (path === '/terms') return <TermsPage />;
  if (path === '/privacy') return <PrivacyPage />;

  return (
    <div className="pt-32 pb-12 px-4 text-center">
      <h1 className="text-4xl font-bold text-clay-primary mb-4">Page not found</h1>
      <p className="text-clay-secondary mb-6">The page you're looking for doesn't exist.</p>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <RouterProvider>
        <div className="min-h-screen relative">
          <Navbar />
          <main>
            <PageRouter />
          </main>
          <Footer />
        </div>
      </RouterProvider>
    </ThemeProvider>
  );
}

export default App;
