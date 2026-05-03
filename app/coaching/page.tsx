import Link from "next/link";

const areas = [
  {
    title: "Hormonal transitions",
    description:
      "Birth, postpartum, perimenopause, menopause — every major shift deserves expert support, not guesswork.",
  },
  {
    title: "Diagnoses & conditions",
    description:
      "PCOS, endometriosis, thyroid imbalances — coaches who understand the full picture, not just the label.",
  },
  {
    title: "Cycle-syncing",
    description:
      "Learn to work with your cycle instead of against it. Energy, mood, focus — all of it follows a pattern.",
  },
  {
    title: "Everyday wellbeing",
    description:
      "Sleep, stress, nutrition, movement — personalised to where you are in your cycle right now.",
  },
];

export default function CoachingPage() {
  return (
    <main className="flex flex-1 flex-col items-center px-6 py-20">
      <div className="flex w-full max-w-3xl flex-col gap-16">
        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">
            1:1 Coaching
          </span>
          <h1 className="font-serif text-4xl leading-snug sm:text-5xl">
            A coach who actually
            <br />
            <span className="italic">understands your body.</span>
          </h1>
          <p className="max-w-md text-base leading-7 text-muted">
            One-on-one sessions with a specialist trained in hormonal health —
            not a generic wellness coach, someone who knows the science and
            speaks your language.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {areas.map((a) => (
            <div
              key={a.title}
              className="flex flex-col gap-3 rounded-3xl border border-border bg-surface p-7"
            >
              <h3 className="font-serif text-xl">{a.title}</h3>
              <p className="text-sm leading-6 text-muted">{a.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start gap-4 rounded-3xl border border-accent/20 bg-accent/5 p-8">
          <p className="font-serif text-2xl italic text-foreground">
            &ldquo;Finally someone who didn&apos;t tell me to just track my
            cycle and drink more water.&rdquo;
          </p>
          <span className="text-xs uppercase tracking-[0.15em] text-muted">
            — Coming soon
          </span>
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-muted">Coaching spots open soon.</p>
          <Link
            href="/join"
            className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-8 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
          >
            Join the waitlist →
          </Link>
        </div>
      </div>
    </main>
  );
}
