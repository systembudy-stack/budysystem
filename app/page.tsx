import Link from "next/link";

const services = [
  {
    href: "/coaching",
    tag: "1:1",
    title: "Coaching",
    description:
      "Work with a specialist who actually understands your hormones — through birth, menopause, PCOS, and everything in between.",
  },
  {
    href: "/tracker",
    tag: "Daily",
    title: "Tracker",
    description:
      "A period tracker that goes deeper — hormonal insights by phase, not just dates.",
  },
  {
    href: "/community",
    tag: "Together",
    title: "Community",
    description:
      "Meet women who get it. A space to share, ask, and feel less alone in what you're going through.",
  },
  {
    href: "/memberships",
    tag: "200+ hrs",
    title: "Memberships",
    description:
      "Self-care, meditation, productivity, and hormonal health — a library built around how you actually feel.",
  },
  {
    href: "/couples",
    tag: "With him",
    title: "Couples",
    description:
      "Bring your partner into it. The Budy Date and couples therapy — because understanding works better together.",
  },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-28 text-center">
        <div className="flex max-w-2xl flex-col items-center gap-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Women&apos;s hormonal health
          </p>
          <h1 className="font-serif text-5xl leading-[1.1] tracking-tight sm:text-6xl">
            Most women feel unsupported
            <br />
            <span className="italic">with their hormones.</span>
            <br />
            We&apos;re here to fix that.
          </h1>
          <p className="max-w-md text-lg leading-7 text-muted">
            Coaching, tracking, community, and more — everything your body
            deserves, finally in one place.
          </p>
          <Link
            href="/coaching"
            className="mt-2 inline-flex h-13 items-center justify-center rounded-full bg-accent px-9 text-base font-medium text-background transition-colors hover:bg-accent-hover"
          >
            Find your path →
          </Link>
        </div>
      </section>

      {/* Services grid */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-28">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex flex-col gap-4 rounded-3xl border border-border bg-surface p-8 transition-colors hover:border-accent/30 hover:bg-background"
            >
              <span className="self-start rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-muted">
                {s.tag}
              </span>
              <div className="flex flex-col gap-2">
                <h2 className="font-serif text-2xl leading-snug">{s.title}</h2>
                <p className="text-sm leading-6 text-muted">{s.description}</p>
              </div>
              <span className="mt-auto text-sm text-accent opacity-0 transition-opacity group-hover:opacity-100">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
