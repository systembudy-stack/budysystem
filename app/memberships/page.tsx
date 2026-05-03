import Link from "next/link";

const categories = [
  {
    tag: "Foundation",
    title: "Understanding your cycle",
    hours: "40+ hrs",
    description:
      "The full hormonal picture — phases, patterns, what changes and why. Start here.",
  },
  {
    tag: "Body",
    title: "Movement & nutrition",
    hours: "60+ hrs",
    description:
      "How to eat and move based on your phase. Not one-size-fits-all — cycle-synced.",
  },
  {
    tag: "Mind",
    title: "Mood, stress & sleep",
    hours: "50+ hrs",
    description:
      "The hormonal roots of anxiety, sleep disruption, and emotional shifts — and how to work with them.",
  },
  {
    tag: "Life",
    title: "Productivity & creativity",
    hours: "30+ hrs",
    description:
      "Schedule your work, your rest, and your ambitions around your natural energy curve.",
  },
  {
    tag: "Transitions",
    title: "Big hormonal moments",
    hours: "30+ hrs",
    description:
      "Birth, postpartum, perimenopause, menopause. Expert-led series for every chapter.",
  },
];

export default function MembershipsPage() {
  return (
    <main className="flex flex-1 flex-col items-center px-6 py-20">
      <div className="flex w-full max-w-3xl flex-col gap-16">
        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">
            Memberships
          </span>
          <h1 className="font-serif text-4xl leading-snug sm:text-5xl">
            200+ hours of content
            <br />
            <span className="italic">built around your body.</span>
          </h1>
          <p className="max-w-md text-base leading-7 text-muted">
            Video lectures, guided sessions, and expert series — on self-care,
            meditation, productivity, and hormonal health. Watch at your own
            pace, in your own phase.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {categories.map((c) => (
            <div
              key={c.title}
              className="flex items-start gap-6 rounded-3xl border border-border bg-surface p-7"
            >
              <div className="flex flex-col items-center gap-1 pt-1">
                <span className="text-[10px] uppercase tracking-[0.15em] text-muted">
                  {c.tag}
                </span>
                <span className="font-serif text-lg text-accent">{c.hours}</span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-serif text-xl">{c.title}</h3>
                <p className="text-sm leading-6 text-muted">{c.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-muted">Library launching soon. Join to get notified.</p>
          <Link
            href="/join"
            className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-8 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
          >
            Get early access →
          </Link>
        </div>
      </div>
    </main>
  );
}
