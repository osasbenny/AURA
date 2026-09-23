import { useState } from 'react';
import {
  MessageSquareText, Bot, Sparkles, ArrowRight, CheckCircle2,
  User, Target, MapPin, Banknote,
} from 'lucide-react';
import { useRouter } from '@/context/RouterContext';
import { ClayButton } from '@/components/ClayButton';
import { ClayInput, ClayTextarea, ClaySelect } from '@/components/ClayInput';
import { categories } from '@/data/campaigns';
import { trpc } from '@/lib/trpc';
import { startLogin } from '@/const';
import { useAuth } from '@/_core/hooks/useAuth';

const allowedCategories = categories.filter((category) =>
  ['medical', 'emergency', 'education', 'community'].includes(category.id),
);

type CampaignForm = {
  title: string;
  category: 'medical' | 'emergency' | 'education' | 'community' | '';
  story: string;
  beneficiaryName: string;
  relationship: string;
  goalAmount: string;
};

export function StartCampaignPage() {
  const { navigate } = useRouter();
  const { isAuthenticated } = useAuth();
  const [step, setStep] = useState(0);
  const [submitError, setSubmitError] = useState('');
  const [form, setForm] = useState<CampaignForm>({ title: '', category: '', story: '', beneficiaryName: '', relationship: '', goalAmount: '' });
  const createDraft = trpc.campaigns.createDraft.useMutation({
    onSuccess: () => { setSubmitError(''); setStep(2); },
    onError: (error) => setSubmitError(error.message || 'We could not save your draft. Please try again.'),
  });

  const update = <K extends keyof CampaignForm>(field: K, value: CampaignForm[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setSubmitError('');
  };

  const submitDraft = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitError('');
    if (!isAuthenticated) {
      try { await startLogin(); } catch { setSubmitError('Please sign in with Google to save your campaign draft.'); return; }
    }
    createDraft.mutate({
      title: form.title,
      story: form.story,
      category: form.category as 'medical' | 'emergency' | 'education' | 'community',
      beneficiaryName: form.beneficiaryName,
      relationship: form.relationship,
      goalAmountMinor: Math.round(Number(form.goalAmount) * 100),
    });
  };

  const steps = [
    { icon: MessageSquareText, label: 'Start on WhatsApp', description: 'Tell AURA about your cause' },
    { icon: Bot, label: 'AI Creates Your Page', description: 'Review and approve the draft' },
    { icon: Sparkles, label: 'Go Live', description: 'Share and start receiving donations' },
  ];

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="clay-badge mb-6 mx-auto">
            <Sparkles className="w-4 h-4 text-clay-500" />
            Start a Campaign
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-clay-primary mb-6 text-balance">
            Start in minutes.{' '}
            <span className="bg-gradient-to-r from-clay-500 to-clay-700 dark:from-clay-400 dark:to-clay-600 bg-clip-text text-transparent">
              Get funded today.
            </span>
          </h1>
          <p className="text-lg text-clay-secondary max-w-2xl mx-auto text-pretty">
            The fastest way to start fundraising in Africa. Just tell AURA what you need on WhatsApp,
            and our AI handles the rest.
          </p>
        </div>

        {/* WhatsApp CTA */}
        <div className="clay-raised p-8 sm:p-12 mb-12 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-sage-300/20 blob-1 animate-blob" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-ocean-300/20 blob-2 animate-blob-slow" />
          <div className="relative text-center">
            <div className="inline-flex w-16 h-16 rounded-clay-sm bg-gradient-to-br from-sage-400 to-sage-600 items-center justify-center mb-4 shadow-lg">
              <MessageSquareText className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-clay-primary mb-3">
              The easiest way: Chat with AURA on WhatsApp
            </h2>
            <p className="text-clay-secondary mb-6 max-w-lg mx-auto">
              Send a message and our AI will guide you through creating your campaign step by step.
              No forms to fill — just a conversation.
            </p>
            <ClayButton variant="sage" size="lg" onClick={() => window.open('https://wa.me/?text=Hi%20AURA%2C%20I%20want%20to%20start%20a%20campaign', '_blank')}>
              <MessageSquareText className="w-5 h-5" />
              Start on WhatsApp
            </ClayButton>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-clay-200 dark:bg-clay-800" />
          <span className="text-sm text-clay-muted font-semibold">OR FILL THE FORM BELOW</span>
          <div className="flex-1 h-px bg-clay-200 dark:bg-clay-800" />
        </div>

        {/* Form */}
        <div className="clay p-6 sm:p-8 lg:p-10">
          {/* Step indicator */}
          <div className="flex items-center justify-between mb-8 max-w-md mx-auto">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-clay-sm flex items-center justify-center transition-all duration-300 ${
                      i <= step
                        ? 'bg-gradient-to-br from-clay-400 to-clay-600 text-white shadow-lg'
                        : 'clay-inset-sm text-clay-muted'
                    }`}
                  >
                    {i < step ? <CheckCircle2 className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs mt-2 font-semibold hidden sm:block ${i <= step ? 'text-clay-primary' : 'text-clay-muted'}`}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-2 transition-all duration-500 ${i < step ? 'bg-clay-500' : 'bg-clay-200 dark:bg-clay-800'}`} />
                )}
              </div>
            ))}
          </div>

          {step === 0 && (
            <form className="space-y-5 animate-fade-in" onSubmit={(e) => { e.preventDefault(); setStep(1); }}>
              <ClayInput label="Campaign Title" placeholder="e.g., Help Adaeze Walk Again" value={form.title} onChange={(event) => update('title', event.target.value)} required minLength={4} />
              <ClaySelect label="Category" value={form.category} onChange={(event) => update('category', event.target.value as CampaignForm['category'])} required>
                <option value="" disabled>Select a category</option>
                {allowedCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </ClaySelect>
              <ClayTextarea label="What do you need help with?" rows={4} placeholder="Describe your cause in your own words..." hint="Don't worry about making it perfect — our AI will help polish it." value={form.story} onChange={(event) => update('story', event.target.value)} required minLength={20} />
              <ClayButton variant="primary" fullWidth size="lg">
                Continue
                <ArrowRight className="w-5 h-5" />
              </ClayButton>
            </form>
          )}

          {step === 1 && (
            <form className="space-y-5 animate-fade-in" onSubmit={submitDraft}>
              <div className="grid sm:grid-cols-2 gap-4">
                <ClayInput label="Your Name" placeholder="Organizer name" />
                <ClayInput label="Phone Number" placeholder="+234..." />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <ClayInput label="Beneficiary Name" placeholder="Who will receive the funds?" value={form.beneficiaryName} onChange={(event) => update('beneficiaryName', event.target.value)} required minLength={2} />
                <ClayInput label="Relationship" placeholder="e.g., Sister, Brother, Neighbor" value={form.relationship} onChange={(event) => update('relationship', event.target.value)} required minLength={2} />
              </div>
              <ClayInput label="Location" placeholder="City, State, Country" />
              <ClayInput label="Goal Amount (₦)" type="number" placeholder="e.g., 5000000" value={form.goalAmount} onChange={(event) => update('goalAmount', event.target.value)} required min={1} />
              {submitError && <p className="text-sm text-red-600 dark:text-red-400" role="alert">{submitError}</p>}
              <div className="flex gap-3">
                <ClayButton onClick={() => setStep(0)} type="button">
                  Back
                </ClayButton>
                <ClayButton variant="primary" fullWidth size="lg" disabled={createDraft.isPending}>
                  {createDraft.isPending ? 'Saving...' : 'Continue'}
                  <ArrowRight className="w-5 h-5" />
                </ClayButton>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in text-center">
              <div className="inline-flex w-16 h-16 rounded-clay-sm bg-gradient-to-br from-sage-400 to-sage-600 items-center justify-center mb-2 shadow-lg">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-clay-primary">Almost there!</h3>
              <p className="text-clay-secondary max-w-md mx-auto">
                Your campaign details have been submitted. Our AI is now verifying your information
                and will draft your campaign page. You'll receive a WhatsApp message within 5 minutes
                to review and approve.
              </p>
              <div className="clay-inset p-6 max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center gap-3">
                  <Bot className="w-5 h-5 text-ocean-500" />
                  <span className="text-sm text-clay-secondary">AI verification in progress...</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-sage-500" />
                  <span className="text-sm text-clay-secondary">Identity check: Passed</span>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-clay-500" />
                  <span className="text-sm text-clay-secondary">Cause verification: In progress</span>
                </div>
                <div className="flex items-center gap-3">
                  <Banknote className="w-5 h-5 text-gold-500" />
                  <span className="text-sm text-clay-secondary">Beneficiary account: Pending</span>
                </div>
              </div>
              <ClayButton variant="primary" size="lg" onClick={() => navigate('/')}>
                Back to Home
              </ClayButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
