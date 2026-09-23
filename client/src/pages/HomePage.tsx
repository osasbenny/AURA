import {
  Sparkles, MessageSquareText, ShieldCheck, Zap, Users, Heart,
  TrendingUp, ArrowRight, CheckCircle2, Bot, Globe, Lock,
} from 'lucide-react';
import { useRouter } from '@/context/RouterContext';
import { ClayButton } from '@/components/ClayButton';
import { SectionHeading } from '@/components/SectionHeading';
import { CampaignCard } from '@/components/CampaignCard';
import { FeatureCheck } from '@/components/Badges';
import { useLiveCampaigns } from '@/data/liveCampaigns';

export function HomePage() {
  const { navigate } = useRouter();
  const { campaigns: featuredCampaigns } = useLiveCampaigns();

  const stats = [
    { icon: Users, label: 'Active Donors', value: '12,000+', color: 'text-ocean-500' },
    { icon: Heart, label: 'Funds Raised', value: '₦450M+', color: 'text-clay-500' },
    { icon: CheckCircle2, label: 'Campaigns Funded', value: '847', color: 'text-sage-500' },
    { icon: Globe, label: 'Communities Reached', value: '23 States', color: 'text-gold-500' },
  ];

  const steps = [
    {
      icon: MessageSquareText,
      title: 'Start on WhatsApp',
      description: 'Send a message to AURA on WhatsApp. Describe your cause in plain language — no forms, no jargon.',
      color: 'from-sage-400 to-sage-600',
      step: '01',
    },
    {
      icon: Bot,
      title: 'AI Verifies & Drafts',
      description: 'Our AI checks details, verifies identity, and drafts a compelling campaign page automatically.',
      color: 'from-ocean-400 to-ocean-600',
      step: '02',
    },
    {
      icon: Users,
      title: 'Share & Receive',
      description: 'Share your campaign link with your community. Donations come in via WhatsApp, bank transfer, or card.',
      color: 'from-clay-400 to-clay-600',
      step: '03',
    },
    {
      icon: CheckCircle2,
      title: 'Funds Disbursed',
      description: 'Funds go directly to the beneficiary. AURA takes 0% fees. Every naira reaches the people who need it.',
      color: 'from-gold-400 to-gold-600',
      step: '04',
    },
  ];

  const trustFeatures = [
    { icon: ShieldCheck, title: 'AI-Powered Verification', description: 'Every campaign is checked by AI for authenticity before going live.' },
    { icon: Lock, title: 'Direct Beneficiary Payouts', description: 'Funds go straight to the person in need — never through intermediaries.' },
    { icon: Zap, title: 'Instant WhatsApp Updates', description: 'Donors get real-time updates on campaign progress via WhatsApp.' },
    { icon: TrendingUp, title: 'Transparent Tracking', description: 'Every naira is tracked. See exactly how funds are used.' },
  ];

  return (
    <div className="pt-24">
      {/* ===== Hero ===== */}
      <section className="relative px-4 sm:px-6 pb-20 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-20 left-0 w-72 h-72 bg-clay-300/30 dark:bg-clay-700/20 blob-1 animate-blob -z-10" />
        <div className="absolute top-40 right-0 w-64 h-64 bg-sage-300/30 dark:bg-sage-700/20 blob-2 animate-blob-slow -z-10" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-ocean-300/20 dark:bg-ocean-700/15 blob-3 animate-float-slow -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div className="text-center lg:text-left">
              <div className="clay-badge mb-6 animate-fade-in">
                <Sparkles className="w-4 h-4 text-clay-500" />
                AI-Native Fundraising for Africa
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-clay-primary leading-[1.05] text-balance mb-6">
                Fundraising that feels like{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-clay-500 via-clay-600 to-clay-700 dark:from-clay-400 dark:via-clay-500 dark:to-clay-600 bg-clip-text text-transparent">
                    family
                  </span>
                  <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                    <path d="M2 5.5C50 2.5 150 2.5 198 5.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-clay-400 dark:text-clay-500" />
                  </svg>
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-clay-secondary leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 text-pretty">
                AURA is the first AI-native fundraising platform built for African communities.
                Start a campaign on WhatsApp in minutes. No fees. No middlemen. Just trust.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
                <ClayButton variant="primary" size="lg" onClick={() => navigate('/start')}>
                  Start a Campaign
                  <ArrowRight className="w-5 h-5" />
                </ClayButton>
                <ClayButton size="lg" onClick={() => navigate('/campaigns')}>
                  Browse Campaigns
                </ClayButton>
              </div>
              <div className="flex items-center gap-6 justify-center lg:justify-start text-sm text-clay-secondary">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sage-500" />
                  0% Platform Fees
                </span>
                <span className="flex items-center gap-2">
                  <MessageSquareText className="w-4 h-4 text-ocean-500" />
                  WhatsApp Native
                </span>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative animate-slide-up">
              {/* Main phone mockup */}
              <div className="relative mx-auto max-w-sm">
                {/* Floating campaign card */}
                <div className="clay-raised p-5 animate-float">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-clay-sm bg-gradient-to-br from-clay-400 to-clay-600 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-clay-primary text-sm">Help Adaeze Walk Again</h3>
                      <p className="text-xs text-clay-muted">Enugu, Nigeria</p>
                    </div>
                  </div>
                  <div className="h-2 clay-inset-sm rounded-full mb-2">
                    <div className="h-full w-[70%] rounded-full bg-gradient-to-r from-clay-400 to-clay-500" />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-clay-primary">₦5,950,000</span>
                    <span className="text-clay-muted">70% of goal</span>
                  </div>
                </div>

                {/* Floating WhatsApp message bubble */}
                <div className="absolute -bottom-8 -left-8 sm:-left-12 clay-sm p-4 max-w-[200px] animate-float-delayed">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-sage-500 flex items-center justify-center">
                      <MessageSquareText className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-bold text-clay-primary">AURA Bot</span>
                  </div>
                  <p className="text-xs text-clay-secondary">
                    "Hi! I've created your campaign page. Want to review it?"
                  </p>
                </div>

                {/* Floating verification badge */}
                <div className="absolute -top-6 -right-4 sm:-right-8 clay-sm p-3 animate-wiggle">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-sage-500" />
                    <div>
                      <p className="text-xs font-bold text-clay-primary">Verified</p>
                      <p className="text-[10px] text-clay-muted">AI Checked</p>
                    </div>
                  </div>
                </div>

                {/* Floating stat bubble */}
                <div className="absolute top-1/2 -right-4 sm:-right-12 clay-sm p-3 animate-float-slow">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-ocean-500">847</p>
                    <p className="text-[10px] text-clay-muted">donors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Stats Strip ===== */}
      <section className="px-4 sm:px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="clay p-6 sm:p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-clay-sm clay-inset-sm mb-3`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-clay-primary font-display">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-clay-secondary mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <section className="px-4 sm:px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            center
            eyebrow="How It Works"
            title="From idea to funded in 4 simple steps"
            subtitle="AURA makes fundraising effortless. Start on WhatsApp, let AI handle the rest, and focus on what matters — your community."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="clay p-6 group hover:-translate-y-1.5 transition-all duration-500 relative">
                <div className="absolute top-4 right-4 text-4xl font-bold text-clay-200 dark:text-clay-800 font-display opacity-50">
                  {step.step}
                </div>
                <div className={`w-14 h-14 rounded-clay-sm bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-clay-primary mb-2">{step.title}</h3>
                <p className="text-sm text-clay-secondary leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Featured Campaigns ===== */}
      <section className="px-4 sm:px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <SectionHeading
              eyebrow="Featured Campaigns"
              title="Causes that need your help today"
              className="!mb-0"
            />
            <ClayButton variant="default" onClick={() => navigate('/campaigns')}>
              View All
              <ArrowRight className="w-4 h-4" />
            </ClayButton>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Trust & Safety ===== */}
      <section className="px-4 sm:px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                eyebrow="Trust & Safety"
                title="Trust is our foundation"
                subtitle="AURA uses AI to verify every campaign and ensure funds reach the right people. No scams. No fraud. Just real help."
              />
              <ul className="space-y-4 mb-8">
                <FeatureCheck>AI-powered identity verification for every campaign organizer</FeatureCheck>
                <FeatureCheck>Direct beneficiary payouts — funds never pass through AURA</FeatureCheck>
                <FeatureCheck>Real-time WhatsApp updates keep donors informed</FeatureCheck>
                <FeatureCheck>0% platform fees — every naira reaches the cause</FeatureCheck>
              </ul>
              <ClayButton variant="sage" onClick={() => navigate('/trust')}>
                Learn About Our Trust System
                <ArrowRight className="w-4 h-4" />
              </ClayButton>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {trustFeatures.map((feature, i) => (
                <div key={i} className={`clay p-6 ${i % 2 === 1 ? 'sm:mt-8' : ''}`}>
                  <div className="w-12 h-12 rounded-clay-sm clay-inset-sm flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-clay-500" />
                  </div>
                  <h3 className="font-bold text-clay-primary mb-2">{feature.title}</h3>
                  <p className="text-sm text-clay-secondary leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== WhatsApp Demo ===== */}
      <section className="px-4 sm:px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="clay-raised p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-sage-300/20 blob-1 animate-blob" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-ocean-300/20 blob-2 animate-blob-slow" />
            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="clay-badge mb-4">
                  <MessageSquareText className="w-4 h-4 text-sage-500" />
                  WhatsApp Native
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-clay-primary mb-4 text-balance">
                  Start a campaign with a simple text
                </h2>
                <p className="text-clay-secondary mb-6 text-pretty">
                  No app to download. No website to navigate. Just open WhatsApp and tell AURA what you need.
                  Our AI handles verification, campaign creation, and sharing — all from a chat.
                </p>
                <ClayButton variant="sage" size="lg" onClick={() => navigate('/how-it-works')}>
                  See How It Works
                  <ArrowRight className="w-5 h-5" />
                </ClayButton>
              </div>

              {/* Chat mockup */}
              <div className="clay-inset p-4 space-y-3">
                <div className="flex justify-end">
                  <div className="clay-sm px-4 py-2.5 max-w-[80%]">
                    <p className="text-sm text-clay-primary">My sister needs heart surgery. Can you help me start a campaign?</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-sage-500 text-white px-4 py-2.5 rounded-clay-sm rounded-bl-sm max-w-[80%]">
                    <p className="text-sm">I'm so sorry to hear that. I can help! Can you share her name, hospital, and the amount needed?</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="clay-sm px-4 py-2.5 max-w-[80%]">
                    <p className="text-sm text-clay-primary">Chioma Adeyemi, Lagos University Hospital, ₦15M</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-sage-500 text-white px-4 py-2.5 rounded-clay-sm rounded-bl-sm max-w-[80%]">
                    <p className="text-sm">Thank you! I've verified the hospital details and created your campaign page. Here's your link: aura.ng/chioma-heart 💚</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="clay-sm px-4 py-2.5 max-w-[60%]">
                    <p className="text-sm text-clay-primary">Amazing! Thank you so much 🙏</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Impact Numbers ===== */}
      <section className="px-4 sm:px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            center
            eyebrow="Our Impact"
            title="Real change, powered by community"
            subtitle="Every number represents a life touched, a family supported, a community strengthened."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="clay p-8 text-center group hover:-translate-y-2 transition-all duration-500">
              <p className="text-5xl font-bold text-clay-500 font-display mb-2 group-hover:scale-110 transition-transform duration-300">
                ₦450M+
              </p>
              <p className="text-clay-secondary">Total funds raised across all campaigns</p>
            </div>
            <div className="clay p-8 text-center group hover:-translate-y-2 transition-all duration-500">
              <p className="text-5xl font-bold text-sage-500 font-display mb-2 group-hover:scale-110 transition-transform duration-300">
                847
              </p>
              <p className="text-clay-secondary">Campaigns fully funded since launch</p>
            </div>
            <div className="clay p-8 text-center group hover:-translate-y-2 transition-all duration-500">
              <p className="text-5xl font-bold text-ocean-500 font-display mb-2 group-hover:scale-110 transition-transform duration-300">
                12K+
              </p>
              <p className="text-clay-secondary">Donors supporting their communities</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
