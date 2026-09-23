import { ShieldCheck } from 'lucide-react';

export function PrivacyPage() {
  const sections = [
    {
      title: '1. Information We Collect',
      content: 'We collect information you provide when creating a campaign or making a donation: name, phone number, email, WhatsApp number, bank account details (for beneficiaries), and campaign content. We also collect usage data such as device information, IP address, and interaction data with our platform.',
    },
    {
      title: '2. How We Use Your Information',
      content: 'We use your information to verify campaign authenticity, process donations, send WhatsApp updates about campaigns, provide customer support, detect and prevent fraud, and improve our AI verification system. We do not sell your personal information to third parties.',
    },
    {
      title: '3. WhatsApp Data',
      content: 'AURA operates primarily through WhatsApp. When you interact with AURA on WhatsApp, we process your messages, phone number, and shared media (documents, photos) for campaign verification and communication. Message data is stored securely and used only for the stated purpose.',
    },
    {
      title: '4. Data Storage and Security',
      content: 'Your data is stored on secure servers with encryption in transit and at rest. Access is restricted to authorized personnel and our AI systems. We use industry-standard security measures including SSL/TLS encryption, secure authentication, and regular security audits.',
    },
    {
      title: '5. Beneficiary Bank Details',
      content: 'Bank account details collected for beneficiaries are used solely for fund disbursement. These details are verified by our AI system, stored securely, and never shared with third parties. Once disbursement is complete, bank details are retained for audit purposes only.',
    },
    {
      title: '6. Donor Privacy',
      content: 'Donors can choose to donate anonymously. Non-anonymous donor names and amounts are displayed on campaign pages. Donor contact information is never shared with campaign organizers or other donors without explicit consent.',
    },
    {
      title: '7. AI and Data Processing',
      content: 'Our AI system processes campaign data to verify authenticity, detect fraud, and generate campaign content. AI processing is automated and does not involve human review unless flagged for manual verification. AI does not make final decisions on campaign approval — human oversight is maintained.',
    },
    {
      title: '8. Data Retention',
      content: 'Campaign data is retained for the duration of the campaign plus 5 years for audit and legal compliance. Donor data is retained for 3 years. You can request early deletion of your data subject to legal retention requirements.',
    },
    {
      title: '9. Your Rights',
      content: 'You have the right to access, correct, or delete your personal data. You can request a copy of your data, opt out of WhatsApp updates, and withdraw consent for data processing. To exercise these rights, contact us via WhatsApp or email.',
    },
    {
      title: '10. Changes to This Policy',
      content: 'We may update this Privacy Policy from time to time. You will be notified of significant changes via WhatsApp or email. Continued use of AURA after changes constitutes acceptance of the updated policy.',
    },
  ];

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="clay-badge mb-6 mx-auto">
            <ShieldCheck className="w-4 h-4 text-sage-500" />
            Legal
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-clay-primary mb-4">Privacy Policy</h1>
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
