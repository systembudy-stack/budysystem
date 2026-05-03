import Link from "next/link";

const pillars = [
  {
    title: "Hormonal literacy, together",
    description:
      "Your therapist explains what's actually happening in her body — so you're both working from the same understanding, not guesswork.",
  },
  {
    title: "Communication through change",
    description:
      "Birth, postpartum, perimenopause — every transition shifts the dynamic. Sessions help you navigate those moments as a unit.",
  },
  {
    title: "Intimacy & the cycle",
    description:
      "How hormones affect desire, connection, and emotional availability. Understanding the pattern changes everything.",
  },
  {
    title: "Practical tools",
    description:
      "Frameworks you can actually use between sessions — not just insight, but habits and language that stick.",
  },
];

export default function CouplesTherapyPage() {
  return (
    <main className="flex flex-1 flex-col items-center px-6 py-20">
      <div className="flex w-full max-w-3xl flex-col gap-16">
        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">
            Couples Therapy
          </span>
          <h1 className="font-serif text-4xl leading-snug sm:text-5xl">
            Therapy that speaks
            <br />
            <span className="italic">both of your languages.</span>
          </h1>
          <p className="max-w-md text-base leading-7 text-muted">
            Sessions for couples with a therapist who specialises in hormonal
            health and relationships. For when understanding needs more than a
            conversation starter.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="flex flex-col gap-3 rounded-3xl border border-border bg-surface p-7"
            >
              <h3 className="font-serif text-xl">{p.title}</h3>
              <p className="text-sm leading-6 text-muted">{p.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6 rounded-3xl border border-accent/20 bg-accent/5 p-8">
          <div className="flex flex-col gap-2">
            <h2 className="font-serif text-2xl">How it works</h2>
            <p className="text-sm leading-6 text-muted">
              Sessions are 60 minutes, held online, with a therapist matched to
              your situation. Spots are limited — we keep it small so the
              quality stays high.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted">
              Accepting applications for the first cohort.
            </p>
            <Link
              href="/join"
              className="self-start inline-flex h-11 items-center justify-center rounded-full bg-accent px-8 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
            >
              Join the waitlist →
            </Link>
          </div>
        </div>

        <Link
          href="/couples"
          className="self-center text-sm text-muted transition-colors hover:text-foreground"
        >
          ← Back to Couples
        </Link>
      </div>
    </main>
  );
}
