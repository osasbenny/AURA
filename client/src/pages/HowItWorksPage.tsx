import {
  MessageSquareText, Bot, Users, CheckCircle2, ArrowRight,
  ShieldCheck, Zap, FileText, Heart, Clock,
} from 'lucide-react';
import { useRouter } from '@/context/RouterContext';
import { ClayButton } from '@/components/ClayButton';
import { SectionHeading } from '@/components/SectionHeading';
import { FeatureCheck } from '@/components/Badges';

export function HowItWorksPage() {
  const { navigate } = useRouter();

  const steps = [
    {
      icon: MessageSquareText,
      title: 'Start on WhatsApp',
      step: '01',
      color: 'from-sage-400 to-sage-600',
      details: [
        'Send a message to AURA\'s WhatsApp number',
        'Describe your cause in your own words — no forms',
        'AI asks follow-up questions to gather details',
        'Takes less than 2 minutes to start',
      ],
    },
    {
      icon: Bot,
      title: 'AI Verifies & Drafts',
      step: '02',
      color: 'from-ocean-400 to-ocean-600',
      details: [
        'AI verifies organizer identity and beneficiary details',
        'Checks cause authenticity against public records',
        'Drafts a compelling campaign page automatically',
        'You review and approve before it goes live',
      ],
    },
    {
      icon: Users,
      title: 'Share & Receive',
      step: '03',
      color: 'from-clay-400 to-clay-600',
      details: [
        'Share your unique campaign link via WhatsApp',
        'Donors contribute via WhatsApp, bank transfer, or card',
        'Real-time updates sent to all donors automatically',
        'Track progress on your dashboard',
      ],
    },
    {
      icon: CheckCircle2,
      title: 'Funds Disbursed',
      step: '04',
      color: 'from-gold-400 to-gold-600',
      details: [
        'Funds go directly to the beneficiary account',
        'AURA takes 0% platform fees',
        'Donors receive a final impact report',
        'Campaign closes with a thank-you message',
      ],
    },
  ];

  const features = [
    { icon: Zap, title: 'Lightning Fast', description: 'From idea to live campaign in under 5 minutes.' },
    { icon: ShieldCheck, title: 'AI Verified', description: 'Every campaign checked for authenticity.' },
    { icon: FileText, title: 'Auto-Drafted', description: 'AI writes your campaign story for you.' },
    { icon: Heart, title: '0% Fees', description: 'Every naira goes to the beneficiary.' },
  ];

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="clay-badge mb-6 mx-auto">
            <MessageSquareText className="w-4 h-4 text-sage-500" />
            How It Works
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-clay-primary mb-6 text-balance">
            Fundraising, reimagined for{' '}
            <span className="bg-gradient-to-r from-clay-500 to-clay-700 dark:from-clay-400 dark:to-clay-600 bg-clip-text text-transparent">
              everyone
            </span>
          </h1>
          <p className="text-lg text-clay-secondary max-w-2xl mx-auto mb-8 text-pretty">
            No technical skills needed. No long forms. Just a conversation on WhatsApp with AURA's AI,
            and your campaign is live.
          </p>
          <ClayButton variant="primary" size="lg" onClick={() => navigate('/start')}>
            Start a Campaign Now
            <ArrowRight className="w-5 h-5" />
          </ClayButton>
        </div>

        {/* Steps */}
        <div className="space-y-8 mb-16">
          {steps.map((step, i) => (
            <div key={i} className="clay p-6 sm:p-8 lg:p-10">
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="text-center lg:text-left">
                  <div className={`inline-flex w-16 h-16 rounded-clay-sm bg-gradient-to-br ${step.color} items-center justify-center mb-4 shadow-lg`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-5xl font-bold text-clay-200 dark:text-clay-800 font-display block mb-1">
                    {step.step}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-clay-primary">{step.title}</h3>
                </div>
                <div className="lg:col-span-2">
                  <ul className="space-y-3">
                    {step.details.map((detail, j) => (
                      <FeatureCheck key={j}>{detail}</FeatureCheck>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mb-16">
          <SectionHeading
            center
            eyebrow="Why AURA"
            title="Built different, by design"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="clay p-6 text-center group hover:-translate-y-1.5 transition-all duration-500">
                <div className="inline-flex w-14 h-14 rounded-clay-sm clay-inset-sm items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-clay-500" />
                </div>
                <h3 className="font-bold text-clay-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-clay-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="clay-raised p-8 sm:p-12">
          <h2 className="text-2xl font-bold text-clay-primary mb-2 text-center">The AURA Timeline</h2>
          <p className="text-clay-secondary text-center mb-8">From start to funded — faster than you think</p>
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { time: '2 min', label: 'Start on WhatsApp' },
              { time: '5 min', label: 'AI Verification' },
              { time: '10 min', label: 'Campaign Live' },
              { time: 'Ongoing', label: 'Receive Donations' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-clay-sm clay-inset-sm mb-3">
                  <Clock className="w-7 h-7 text-clay-500" />
                </div>
                <p className="text-2xl font-bold text-clay-primary font-display">{item.time}</p>
                <p className="text-sm text-clay-secondary">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
