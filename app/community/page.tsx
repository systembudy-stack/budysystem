import Link from "next/link";

const spaces = [
  {
    title: "Phase circles",
    description:
      "Find women in the same phase as you right now. Compare notes, share what's working, feel less alone.",
  },
  {
    title: "Condition groups",
    description:
      "PCOS, endo, perimenopause — dedicated spaces where you don't have to explain the basics.",
  },
  {
    title: "Ask a specialist",
    description:
      "Weekly live Q&As with coaches and hormonal health experts. Real answers, not forum speculation.",
  },
  {
    title: "Partner corner",
    description:
      "A space for partners too — learning together, supporting better.",
  },
];

export default function CommunityPage() {
  return (
    <main className="flex flex-1 flex-col items-center px-6 py-20">
      <div className="flex w-full max-w-3xl flex-col gap-16">
        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">
            Community
          </span>
          <h1 className="font-serif text-4xl leading-snug sm:text-5xl">
            Women who actually
            <br />
            <span className="italic">get what you&apos;re going through.</span>
          </h1>
          <p className="max-w-md text-base leading-7 text-muted">
            A community built around hormonal health — not wellness influencers,
            not generic advice. Real women, real experiences, real support.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {spaces.map((s) => (
            <div
              key={s.title}
              className="flex flex-col gap-3 rounded-3xl border border-border bg-surface p-7"
            >
              <h3 className="font-serif text-xl">{s.title}</h3>
              <p className="text-sm leading-6 text-muted">{s.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-muted">Community opening soon.</p>
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
