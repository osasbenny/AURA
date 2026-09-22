import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, CheckCircle2, HeartHandshake, Loader2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

const categories = [
  { value: "medical", label: "Medical care" },
  { value: "emergency", label: "Emergency" },
  { value: "education", label: "Education" },
  { value: "community", label: "Family or community" },
] as const;

type FormState = {
  title: string;
  story: string;
  category: (typeof categories)[number]["value"];
  beneficiaryName: string;
  relationship: string;
  goalAmount: string;
};

const initialForm: FormState = {
  title: "",
  story: "",
  category: "medical",
  beneficiaryName: "",
  relationship: "",
  goalAmount: "",
};

export default function CampaignStart() {
  const { user, loading, isAuthenticated } = useAuth();
  const [form, setForm] = useState<FormState>(initialForm);
  const [savedSlug, setSavedSlug] = useState<string | null>(null);
  const createDraft = trpc.campaigns.createDraft.useMutation();

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm(current => ({ ...current, [key]: value }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await createDraft.mutateAsync({
      title: form.title,
      story: form.story,
      category: form.category,
      beneficiaryName: form.beneficiaryName,
      relationship: form.relationship,
      goalAmountMinor: Math.round(Number(form.goalAmount) * 100),
    });
    setSavedSlug(result?.slug ?? null);
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" aria-label="Loading" />
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <Link href="/" className="mb-12 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:opacity-75">
            <ArrowLeft className="h-4 w-4" /> Back to AURA
          </Link>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-center">
            <section>
              <Badge className="mb-5 bg-accent text-accent-foreground hover:bg-accent">A calm place to begin</Badge>
              <h1 className="font-display text-5xl leading-[1.05] tracking-tight text-balance sm:text-6xl">
                Your story can become a way for people to help.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                AURA will help you shape a clear campaign, explain what evidence may be needed, and keep you informed at every review step.
              </p>
              <Button size="lg" className="mt-8 rounded-full px-7" onClick={startLogin}>
                Sign in to begin
              </Button>
            </section>
            <Card className="border-primary/15 bg-card/80 shadow-xl shadow-primary/5">
              <CardHeader>
                <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <CardTitle className="font-display text-2xl">Built around trust</CardTitle>
                <CardDescription>Starting a draft does not publish anything or start a payment.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>Identity, story, evidence, and financial settlement are reviewed as separate questions.</p>
                <p>A human can step in whenever a situation is sensitive, uncertain, or needs care.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    );
  }

  if (savedSlug) {
    return (
      <main className="min-h-screen px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="mb-12 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:opacity-75">
            <ArrowLeft className="h-4 w-4" /> Back to AURA
          </Link>
          <Card className="overflow-hidden border-primary/15 shadow-xl shadow-primary/5">
            <div className="h-2 bg-primary" />
            <CardHeader className="px-6 pt-10 sm:px-10">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <CardTitle className="font-display text-4xl">Your first draft is safe.</CardTitle>
              <CardDescription className="max-w-xl text-base leading-7">
                Thanks, {user?.name?.split(" ")[0] ?? "friend"}. This is a private draft. The next step is to add evidence and complete the review process before anything can be published.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-10 sm:px-10">
              <div className="rounded-2xl bg-muted/70 p-5 text-sm text-muted-foreground">
                Draft reference: <span className="font-mono font-semibold text-foreground">{savedSlug}</span>
              </div>
              <Button variant="outline" className="mt-6 rounded-full" onClick={() => { setSavedSlug(null); setForm(initialForm); }}>
                Start another draft
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:opacity-75">
            <ArrowLeft className="h-4 w-4" /> Back to AURA
          </Link>
          <Badge variant="outline" className="hidden border-primary/25 text-primary sm:inline-flex">Private draft</Badge>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <section className="lg:sticky lg:top-8">
            <Badge className="mb-5 bg-accent text-accent-foreground hover:bg-accent">Step 1 of the journey</Badge>
            <h1 className="font-display text-5xl leading-[1.05] tracking-tight text-balance sm:text-6xl">Tell us what help is needed.</h1>
            <p className="mt-6 max-w-md text-lg leading-8 text-muted-foreground">
              Start with the human details. You can refine the words later. AURA will never describe a signal as proof or promise approval before review.
            </p>
            <div className="mt-10 space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3"><HeartHandshake className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span>Your draft stays private while you prepare.</span></div>
              <div className="flex gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span>Evidence and identity checks come before publication.</span></div>
            </div>
          </section>

          <Card className="border-primary/15 shadow-xl shadow-primary/5">
            <CardHeader className="border-b border-border/70 px-6 pb-6 sm:px-8">
              <CardTitle className="font-display text-3xl">Create a campaign draft</CardTitle>
              <CardDescription>Nothing is published and no donation is taken from this form.</CardDescription>
            </CardHeader>
            <CardContent className="px-6 py-7 sm:px-8">
              <form className="space-y-6" onSubmit={submit}>
                <div className="space-y-2">
                  <Label htmlFor="title">What should people understand first?</Label>
                  <Input id="title" value={form.title} onChange={event => update("title", event.target.value)} placeholder="Help my mother access surgery" required minLength={4} maxLength={160} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="story">Tell the story in your own words</Label>
                  <Textarea id="story" value={form.story} onChange={event => update("story", event.target.value)} placeholder="Share what happened, what help is needed, and how the funds would be used." className="min-h-36 resize-y" required minLength={20} maxLength={5000} />
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">What kind of need is this?</Label>
                    <select id="category" value={form.category} onChange={event => update("category", event.target.value as FormState["category"])} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" required>
                      {categories.map(category => <option key={category.value} value={category.value}>{category.label}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="goalAmount">Goal amount (NGN)</Label>
                    <Input id="goalAmount" type="number" inputMode="decimal" min="1" step="1" value={form.goalAmount} onChange={event => update("goalAmount", event.target.value)} placeholder="500000" required />
                  </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="beneficiaryName">Who will benefit?</Label>
                    <Input id="beneficiaryName" value={form.beneficiaryName} onChange={event => update("beneficiaryName", event.target.value)} placeholder="Amina Yusuf" required minLength={2} maxLength={160} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="relationship">How are you connected?</Label>
                    <Input id="relationship" value={form.relationship} onChange={event => update("relationship", event.target.value)} placeholder="My mother" required minLength={2} maxLength={120} />
                  </div>
                </div>
                {createDraft.error && <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{createDraft.error.message}</p>}
                <Button type="submit" size="lg" className="w-full rounded-full" disabled={createDraft.isPending}>
                  {createDraft.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving your draft…</> : "Save private draft"}
                </Button>
                <p className="text-center text-xs leading-5 text-muted-foreground">By continuing, you agree to provide accurate information. AURA will explain the next verification steps before publication.</p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
