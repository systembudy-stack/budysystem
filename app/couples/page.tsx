import Link from "next/link";

const offerings = [
  {
    tag: "Experience",
    href: "/start",
    title: "The Budy Date",
    description:
      "A guided 30-minute experience for couples. Questions, reveals, and the kind of conversation you've been meaning to have — about her body, together.",
    cta: "Begin together →",
  },
  {
    tag: "Support",
    href: "/couples/therapy",
    title: "Couples Therapy",
    description:
      "Sessions with a therapist who specialises in hormonal health and relationships. For couples navigating real change — together.",
    cta: "Learn more →",
  },
];

export default function CouplesPage() {
  return (
    <main className="flex flex-1 flex-col items-center px-6 py-20">
      <div className="flex w-full max-w-3xl flex-col gap-16">
        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">
            Couples
          </span>
          <h1 className="font-serif text-4xl leading-snug sm:text-5xl">
            Understanding her body
            <br />
            <span className="italic">is a team sport.</span>
          </h1>
          <p className="max-w-md text-base leading-7 text-muted">
            Two ways to bring your partner into her hormonal health — a
            conversation starter and deeper therapeutic support.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {offerings.map((o) => (
            <div
              key={o.href}
              className="flex flex-col justify-between gap-8 rounded-3xl border border-border bg-surface p-8"
            >
              <div className="flex flex-col gap-4">
                <span className="self-start rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-muted">
                  {o.tag}
                </span>
                <h3 className="font-serif text-2xl leading-snug">{o.title}</h3>
                <p className="text-sm leading-6 text-muted">{o.description}</p>
              </div>
              <Link
                href={o.href}
                className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
              >
                {o.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
