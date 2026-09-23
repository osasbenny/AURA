import { ShieldCheck } from 'lucide-react';

export function TermsPage() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing and using AURA\'s platform, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform. AURA provides an AI-native fundraising service that connects campaign organizers with donors across African communities.',
    },
    {
      title: '2. Platform Description',
      content: 'AURA is a fundraising platform that uses AI to verify campaigns, draft campaign pages, and facilitate donations via WhatsApp. We do not hold or manage funds — all donations are transferred directly from donors to beneficiaries through verified payment channels. AURA charges 0% platform fees on donations.',
    },
    {
      title: '3. Campaign Organizer Responsibilities',
      content: 'Campaign organizers must provide accurate, truthful information about their cause, beneficiary, and themselves. Organizers must verify their identity via WhatsApp and phone number. All supporting documents (medical bills, school letters, etc.) must be authentic. Misrepresentation of any kind will result in immediate campaign termination and potential legal action.',
    },
    {
      title: '4. Donor Responsibilities',
      content: 'Donors are responsible for reviewing campaigns before contributing. While AURA\'s AI verifies campaigns, donors should exercise their own judgment. Donations are voluntary and non-refundable except in cases of confirmed fraud. Donors can choose to donate anonymously.',
    },
    {
      title: '5. Verification Process',
      content: 'AURA uses AI-powered verification to check organizer identity, beneficiary details, and cause authenticity. Verification includes WhatsApp/phone identity check, beneficiary bank account verification, document review, and ongoing monitoring. AURA reserves the right to reject or remove any campaign that fails verification.',
    },
    {
      title: '6. Fund Disbursement',
      content: 'Funds are disbursed directly to the beneficiary\'s verified bank account. AURA does not hold or intermediate funds. For urgent medical campaigns, disbursement begins once the minimum threshold is reached. For other campaigns, funds are released in tranches with progress updates. Payment processor fees (typically 1.5%) may apply to card transactions.',
    },
    {
      title: '7. Prohibited Activities',
      content: 'Users may not use AURA for fraudulent campaigns, money laundering, financing illegal activities, impersonation, or any unlawful purpose. Creating fake campaigns, submitting forged documents, or attempting to deceive donors will result in permanent ban and legal action.',
    },
    {
      title: '8. Intellectual Property',
      content: 'AURA retains all rights to its platform, AI technology, branding, and content. Campaign organizers retain rights to their campaign stories and images. By posting content on AURA, you grant us a license to display it on our platform for the purpose of fundraising.',
    },
    {
      title: '9. Limitation of Liability',
      content: 'AURA is not liable for the accuracy of campaign information beyond our AI verification process. We are not responsible for the outcome of campaigns or how beneficiaries use funds. Our liability is limited to the extent permitted by applicable law.',
    },
    {
      title: '10. Changes to Terms',
      content: 'AURA may update these Terms of Service at any time. Users will be notified of significant changes via WhatsApp or email. Continued use of the platform after changes constitutes acceptance of the new terms.',
    },
  ];

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="clay-badge mb-6 mx-auto">
            <ShieldCheck className="w-4 h-4 text-clay-500" />
            Legal
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-clay-primary mb-4">Terms of Service</h1>
          <p className="text-clay-secondary">Last updated: September 22, 2026</p>
        </div>

        <div className="space-y-6">
          {sections.map((section, i) => (
            <div key={i} className="clay p-6 sm:p-8">
              <h2 className="text-lg font-bold text-clay-primary mb-3">{section.title}</h2>
              <p className="text-clay-secondary leading-relaxed text-sm">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
