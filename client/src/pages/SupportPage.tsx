import { useState } from 'react';
import {
  MessageSquareText, Mail, Phone, Clock, ChevronDown,
  HelpCircle, Send, Search,
} from 'lucide-react';
import { ClayButton } from '@/components/ClayButton';
import { ClayInput, ClayTextarea } from '@/components/ClayInput';
import { SectionHeading } from '@/components/SectionHeading';

const faqs = [
  {
    q: 'How do I start a campaign on AURA?',
    a: 'Simply send a message to AURA\'s WhatsApp number. Our AI will guide you through the process — describe your cause, share details, and the AI will create your campaign page automatically. No forms, no website needed.',
  },
  {
    q: 'Does AURA charge any fees?',
    a: 'No. AURA takes 0% platform fees. Every naira donated goes directly to the beneficiary\'s verified bank account. The only charges are standard payment processor fees (typically 1.5%) for card payments.',
  },
  {
    q: 'How does AURA verify campaigns?',
    a: 'Our AI system verifies organizer identity via WhatsApp and phone, checks beneficiary bank details, reviews supporting documents (medical bills, school letters, etc.), and monitors for suspicious activity throughout the campaign.',
  },
  {
    q: 'How long does verification take?',
    a: 'Most campaigns are verified within 5-10 minutes. Complex cases that require manual document review may take up to 24 hours. You\'ll receive updates via WhatsApp throughout the process.',
  },
  {
    q: 'How do donors send money?',
    a: 'Donors can contribute via WhatsApp directly, bank transfer, or card payment. All options are available on the campaign page. Donors receive an instant receipt and ongoing updates via WhatsApp.',
  },
  {
    q: 'When does the beneficiary receive the funds?',
    a: 'Funds are disbursed directly to the beneficiary\'s verified bank account. For urgent campaigns (medical emergencies), disbursement begins as soon as the minimum threshold is reached. For others, funds are released in tranches with progress updates.',
  },
  {
    q: 'Can I donate anonymously?',
    a: 'Yes. You can choose to donate anonymously during the payment process. Your name will not appear on the campaign page, but you\'ll still receive WhatsApp updates.',
  },
  {
    q: 'What if I suspect a campaign is fraudulent?',
    a: 'Every campaign page has a "Report" button. Click it and describe your concern. Our AI team will investigate within 24 hours. If fraud is confirmed, all donations are refunded.',
  },
];

export function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [search, setSearch] = useState('');

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(search.toLowerCase()) ||
      faq.a.toLowerCase().includes(search.toLowerCase())
  );

  const contactOptions = [
    {
      icon: MessageSquareText,
      title: 'WhatsApp Support',
      description: 'Fastest response — chat with our AI or a human agent',
      action: 'Chat Now',
      color: 'from-sage-400 to-sage-600',
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'For detailed inquiries and documentation',
      action: 'Send Email',
      color: 'from-ocean-400 to-ocean-600',
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      action: 'Call Now',
      color: 'from-clay-400 to-clay-600',
    },
  ];

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="clay-badge mb-6 mx-auto">
            <HelpCircle className="w-4 h-4 text-clay-500" />
            Support Center
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-clay-primary mb-6 text-balance">
            How can we{' '}
            <span className="bg-gradient-to-r from-clay-500 to-clay-700 dark:from-clay-400 dark:to-clay-600 bg-clip-text text-transparent">
              help you?
            </span>
          </h1>
          <p className="text-lg text-clay-secondary max-w-2xl mx-auto text-pretty">
            We're here to help. Search our FAQ or reach out directly — we respond within minutes on WhatsApp.
          </p>
        </div>

        {/* Contact options */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {contactOptions.map((option, i) => (
            <div key={i} className="clay p-6 group hover:-translate-y-1.5 transition-all duration-500">
              <div className={`inline-flex w-14 h-14 rounded-clay-sm bg-gradient-to-br ${option.color} items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <option.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-clay-primary mb-1">{option.title}</h3>
              <p className="text-sm text-clay-secondary mb-4">{option.description}</p>
              <ClayButton size="sm" fullWidth>
                {option.action}
              </ClayButton>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <SectionHeading
            center
            eyebrow="FAQ"
            title="Frequently asked questions"
            subtitle="Everything you need to know about AURA, campaigns, and donations."
          />

          {/* Search */}
          <div className="relative max-w-xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-clay-muted" />
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="clay-input pl-12"
            />
          </div>

          {/* FAQ list */}
          <div className="max-w-3xl mx-auto space-y-3">
            {filteredFaqs.map((faq, i) => (
              <div key={i} className="clay overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-bold text-clay-primary text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-clay-muted flex-shrink-0 transition-transform duration-300 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    openFaq === i ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <p className="px-5 pb-5 text-clay-secondary leading-relaxed text-sm">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
            {filteredFaqs.length === 0 && (
              <div className="clay p-8 text-center">
                <p className="text-clay-secondary">No questions match your search. Try different keywords.</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact form */}
        <div className="clay-raised p-8 sm:p-12 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-clay-primary mb-2">Still have questions?</h2>
            <p className="text-clay-secondary">Send us a message and we'll get back to you within 24 hours.</p>
          </div>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-4">
              <ClayInput label="Name" placeholder="Your name" />
              <ClayInput label="Email" type="email" placeholder="you@example.com" />
            </div>
            <ClayInput label="Subject" placeholder="What's this about?" />
            <ClayTextarea label="Message" rows={4} placeholder="Tell us how we can help..." />
            <ClayButton variant="primary" fullWidth size="lg">
              <Send className="w-4 h-4" />
              Send Message
            </ClayButton>
          </form>
          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-clay-muted">
            <Clock className="w-4 h-4" />
            Average response time: under 2 hours on WhatsApp
          </div>
        </div>
      </div>
    </div>
  );
}
