import { useState } from 'react';
import { Bot, ChevronDown, MessageCircle, Send, X } from 'lucide-react';
import { useRouter } from '@/context/RouterContext';

const quickReplies = [
  { label: 'Start a campaign', answer: 'I can help you start a campaign. The fastest route is WhatsApp, where AURA guides you step by step.' },
  { label: 'How does verification work?', answer: 'AURA checks organizer details, beneficiary information, and supporting evidence before a campaign is published.' },
  { label: 'Speak to support', answer: 'Our support team is available through the Support Center, with WhatsApp as the fastest channel.' },
];

export function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState('Hi! I’m AURA Bot. How can I help with your campaign or donation?');
  const { navigate } = useRouter();

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="clay-raised w-[min(21rem,calc(100vw-2rem))] overflow-hidden animate-fade-in-up">
          <div className="flex items-center justify-between gap-3 px-4 py-3 bg-gradient-to-r from-sage-500 to-ocean-500 text-white">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <Bot className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-bold">AURA Bot</p>
                <p className="text-[11px] text-white/80">Here to help</p>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close AURA Bot" className="rounded-full p-1 hover:bg-white/15">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-3 p-4">
            <div className="clay-inset-sm p-3 text-sm leading-relaxed text-clay-secondary">{answer}</div>
            <div className="grid gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply.label}
                  type="button"
                  onClick={() => setAnswer(reply.answer)}
                  className="clay-btn w-full justify-start px-3 py-2 text-left text-xs"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-ocean-500" />
                  {reply.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => navigate('/support')}
              className="clay-btn clay-btn-primary w-full px-3 py-2 text-xs"
            >
              <Send className="h-3.5 w-3.5" />
              Open Support Center
            </button>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-label={open ? 'Close AURA Bot' : 'Open AURA Bot'}
        className="clay-btn clay-btn-primary flex h-14 w-14 rounded-full p-0 shadow-xl transition-transform duration-300 hover:scale-105"
      >
        {open ? <ChevronDown className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
