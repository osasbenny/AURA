import {
  ShieldCheck, Bot, Lock, FileText, Eye, AlertTriangle,
  CheckCircle2, UserCheck, Banknote, MessageSquareText,
} from 'lucide-react';
import { useRouter } from '@/context/RouterContext';
import { ClayButton } from '@/components/ClayButton';
import { SectionHeading } from '@/components/SectionHeading';
import { FeatureCheck } from '@/components/Badges';

export function TrustPage() {
  const { navigate } = useRouter();

  const pillars = [
    {
      icon: Bot,
      title: 'AI-Powered Verification',
      description: 'Every campaign is automatically checked by our AI for identity, beneficiary, and cause authenticity before going live.',
      color: 'from-ocean-400 to-ocean-600',
    },
    {
      icon: Lock,
      title: 'Direct Beneficiary Payouts',
      description: 'Funds go straight to the beneficiary\'s verified account. AURA never holds or touches the money.',
      color: 'from-sage-400 to-sage-600',
    },
    {
      icon: Eye,
      title: 'Full Transparency',
      description: 'Every transaction is tracked and visible. Donors see exactly how their money is used.',
      color: 'from-clay-400 to-clay-600',
    },
    {
      icon: AlertTriangle,
      title: 'Fraud Detection',
      description: 'AI continuously monitors campaigns for suspicious activity and flags potential fraud instantly.',
      color: 'from-gold-400 to-gold-600',
    },
  ];

  const process = [
    { icon: UserCheck, label: 'Identity Verification', description: 'Organizer\'s identity verified via WhatsApp and phone number' },
    { icon: FileText, label: 'Document Check', description: 'Medical bills, school documents, and other evidence verified' },
    { icon: Banknote, label: 'Beneficiary Account', description: 'Beneficiary bank account verified before campaign goes live' },
    { icon: ShieldCheck, label: 'Ongoing Monitoring', description: 'AI monitors campaign activity for anomalies throughout' },
  ];

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="clay-badge mb-6 mx-auto">
            <ShieldCheck className="w-4 h-4 text-sage-500" />
            Trust & Safety
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-clay-primary mb-6 text-balance">
            Trust is not a feature.{' '}
            <span className="bg-gradient-to-r from-sage-500 to-sage-700 dark:from-sage-400 dark:to-sage-600 bg-clip-text text-transparent">
              It's the foundation.
            </span>
          </h1>
          <p className="text-lg text-clay-secondary max-w-2xl mx-auto text-pretty">
            AURA is built on the principle that every naira should reach the person who needs it.
            Our AI verification system ensures every campaign is real, every beneficiary is verified,
            and every donation is tracked.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {pillars.map((pillar, i) => (
            <div key={i} className="clay p-8 group hover:-translate-y-1.5 transition-all duration-500">
              <div className={`inline-flex w-14 h-14 rounded-clay-sm bg-gradient-to-br ${pillar.color} items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <pillar.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-clay-primary mb-2">{pillar.title}</h3>
              <p className="text-clay-secondary leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>

        {/* Verification Process */}
        <div className="clay-raised p-8 sm:p-12 mb-16">
          <SectionHeading
            center
            eyebrow="Verification Process"
            title="How we verify every campaign"
            subtitle="A 4-step AI-driven process that runs automatically before any campaign goes live."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <div key={i} className="text-center">
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-clay-sm clay-inset-sm mb-4">
                  <step.icon className="w-7 h-7 text-clay-500" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-clay-500 text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-bold text-clay-primary mb-1">{step.label}</h3>
                <p className="text-sm text-clay-secondary">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantees */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="clay p-8">
            <h2 className="text-2xl font-bold text-clay-primary mb-4">Our Guarantees</h2>
            <ul className="space-y-4">
              <FeatureCheck>0% platform fees — every naira reaches the beneficiary</FeatureCheck>
              <FeatureCheck>Funds disbursed directly to verified beneficiary accounts</FeatureCheck>
              <FeatureCheck>AI verification before any campaign goes live</FeatureCheck>
              <FeatureCheck>Full transparency on fund usage and disbursement</FeatureCheck>
              <FeatureCheck>Real-time WhatsApp updates to all donors</FeatureCheck>
              <FeatureCheck>Refund policy if a campaign is found fraudulent</FeatureCheck>
            </ul>
          </div>
          <div className="clay p-8">
            <h2 className="text-2xl font-bold text-clay-primary mb-4">What We Check</h2>
            <ul className="space-y-4">
              <FeatureCheck>Organizer identity via WhatsApp and phone verification</FeatureCheck>
              <FeatureCheck>Beneficiary identity and bank account details</FeatureCheck>
              <FeatureCheck>Medical bills, school admission letters, and other evidence</FeatureCheck>
              <FeatureCheck>Relationship between organizer and beneficiary</FeatureCheck>
              <FeatureCheck>Campaign story consistency and factual accuracy</FeatureCheck>
              <FeatureCheck>Ongoing campaign activity for suspicious patterns</FeatureCheck>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="clay-raised p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-sage-300/20 blob-1 animate-blob" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-clay-300/20 blob-2 animate-blob-slow" />
          <div className="relative">
            <CheckCircle2 className="w-12 h-12 text-sage-500 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-clay-primary mb-3">
              Have questions about trust?
            </h2>
            <p className="text-clay-secondary mb-6 max-w-lg mx-auto">
              Our team is available on WhatsApp 24/7 to answer any questions about campaign verification,
              fund disbursement, or platform security.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <ClayButton variant="sage" onClick={() => navigate('/support')}>
                <MessageSquareText className="w-4 h-4" />
                Contact Support
              </ClayButton>
              <ClayButton onClick={() => navigate('/campaigns')}>
                Browse Verified Campaigns
              </ClayButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
