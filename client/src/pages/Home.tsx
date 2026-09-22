import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { ArrowRight, Check, HeartHandshake, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "wouter";

const categories = [
  { label: "Medical care", detail: "For treatment, surgery, and recovery" },
  { label: "Emergencies", detail: "For urgent moments that cannot wait" },
  { label: "Education", detail: "For fees, materials, and opportunity" },
  { label: "Community", detail: "For families and neighbours showing up" },
];

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();
  const campaigns = trpc.campaigns.featured.useQuery();

  return (
    <div className="min-h-screen overflow-hidden">
      <header className="relative z-10 border-b border-primary/10 bg-background/75 backdrop-blur-xl">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20"><HeartHandshake className="h-5 w-5" /></span>
            AURA
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-muted-foreground md:flex">
            <a href="#how-it-works" className="transition hover:text-foreground">How it works</a>
            <a href="#stories" className="transition hover:text-foreground">Stories</a>
            <a href="#trust" className="transition hover:text-foreground">Trust</a>
          </nav>
          <div className="flex items-center gap-3">
            {isAuthenticated ? <Button variant="ghost" className="hidden sm:inline-flex" onClick={() => void logout()}>Sign out</Button> : <Button variant="ghost" className="hidden sm:inline-flex" onClick={startLogin}>Sign in</Button>}
            <Link href="/start"><Button className="rounded-full px-5">Start a campaign</Button></Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative">
          <div className="container grid min-h-[640px] items-center gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
            <div className="relative z-10">
              <Badge className="mb-7 gap-2 bg-accent text-accent-foreground hover:bg-accent"><Sparkles className="h-3.5 w-3.5" /> Human generosity, amplified by AI</Badge>
              <h1 className="max-w-3xl font-display text-6xl leading-[0.96] tracking-tight text-balance sm:text-7xl lg:text-8xl">Raise money by simply having a conversation.</h1>
              <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">AURA helps people turn a real need into a clear, reviewable campaign — with a little less friction and a lot more care.</p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link href="/start"><Button size="lg" className="rounded-full px-7 text-base">Tell your story <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
                <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 text-sm font-bold text-primary transition hover:gap-3">See how AURA works <ArrowRight className="h-4 w-4" /></a>
              </div>
              <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Nigeria-first</span>
                <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Human review when it matters</span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
              <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -bottom-8 -right-6 h-48 w-48 rounded-full bg-accent/50 blur-3xl" />
              <Card className="relative overflow-hidden rounded-[2rem] border-primary/15 bg-card/85 shadow-2xl shadow-primary/10 backdrop-blur">
                <div className="h-2 bg-gradient-to-r from-primary via-emerald-400 to-accent" />
                <CardContent className="p-7 sm:p-9">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">A conversation becomes a plan</p>
                      <p className="mt-3 font-display text-3xl leading-tight">“I need help raising money for my mother’s surgery.”</p>
                    </div>
                    <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary sm:flex"><MessageCircle className="h-6 w-6" /></div>
                  </div>
                  <div className="my-8 h-px bg-border/70" />
                  <div className="space-y-5">
                    {["AURA asks the gentle next question", "A clear campaign draft takes shape", "Trust steps are explained before review"].map((item, index) => (
                      <div key={item} className="flex items-center gap-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary">0{index + 1}</span>
                        <span className="text-sm font-semibold text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 rounded-2xl bg-muted/75 p-4 text-sm leading-6 text-muted-foreground"><span className="font-semibold text-foreground">The promise:</span> AI removes friction. Systems create accountability. Humans handle judgment.</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="border-y border-primary/10 bg-secondary/35 py-20 sm:py-24">
          <div className="container">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">A calmer way to ask for help</p>
              <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">The tools should feel human. The safeguards should feel real.</h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {[
                { number: "01", title: "Start with a conversation", text: "Describe the need in your own words. We help turn a story into the building blocks of a campaign." },
                { number: "02", title: "Build trust step by step", text: "Identity, claim, evidence, and financial details are treated as separate questions — never one magic score." },
                { number: "03", title: "Keep people in the loop", text: "When a situation is sensitive or uncertain, a human can step in without making you repeat the whole story." },
              ].map(item => <Card key={item.number} className="border-primary/10 bg-card/75 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"><CardContent className="p-7"><span className="font-mono text-sm font-bold text-primary">{item.number}</span><h3 className="mt-8 font-display text-2xl">{item.title}</h3><p className="mt-4 leading-7 text-muted-foreground">{item.text}</p></CardContent></Card>)}
            </div>
          </div>
        </section>

        <section id="stories" className="container py-20 sm:py-24">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Stories of care</p><h2 className="mt-3 font-display text-4xl sm:text-5xl">Good things are already moving.</h2></div>
            <span className="max-w-xs text-sm leading-6 text-muted-foreground">Approved public campaigns will appear here as AURA’s review and payment gates are completed.</span>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {campaigns.data?.length ? campaigns.data.map(campaign => <Card key={campaign.id} className="border-primary/10"><CardContent className="p-6"><Badge variant="outline" className="border-primary/20 text-primary">{campaign.category}</Badge><h3 className="mt-6 font-display text-2xl">{campaign.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{campaign.story}</p></CardContent></Card>) : categories.map(category => <Card key={category.label} className="border-dashed border-primary/20 bg-card/45"><CardContent className="p-6"><div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary text-primary"><HeartHandshake className="h-5 w-5" /></div><h3 className="mt-6 font-display text-2xl">{category.label}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{category.detail}</p><p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-primary/70">Preparing with care</p></CardContent></Card>)}
          </div>
        </section>

        <section id="trust" className="bg-primary py-20 text-primary-foreground sm:py-24">
          <div className="container grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div><p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-100">Trust is a practice</p><h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">Technology can make generosity easier without making trust weaker.</h2></div>
            <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-7 backdrop-blur"><ShieldCheck className="h-7 w-7 text-emerald-100" /><p className="mt-5 text-lg leading-8 text-emerald-50">AURA is donation-based. It is not an investment platform, lender, crypto wallet, or a promise that AI can decide who is telling the truth.</p></div>
          </div>
        </section>
      </main>

      <footer className="border-t border-primary/10 py-8"><div className="container flex flex-col justify-between gap-3 text-sm text-muted-foreground sm:flex-row"><span>© 2026 AURA. Human generosity, amplified by AI.</span><span>Built with care in Nigeria, for people everywhere.</span></div></footer>
    </div>
  );
}
