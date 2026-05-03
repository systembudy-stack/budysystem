import Link from "next/link";

const features = [
  {
    title: "Phase-aware tracking",
    description:
      "Know exactly which of the four phases you're in — menstrual, follicular, ovulation, luteal — and what that means for today.",
  },
  {
    title: "Hormonal insights",
    description:
      "We go beyond dates. Understand what's actually happening inside your body at each point in your cycle.",
  },
  {
    title: "Energy & mood patterns",
    description:
      "Log how you feel and watch your patterns emerge over time. Your body is predictable — once you know what to look for.",
  },
  {
    title: "Partner sharing",
    description:
      "Share your phase with your partner so they understand what you need, without you having to explain it every time.",
  },
];

export default function TrackerPage() {
  return (
    <main className="flex flex-1 flex-col items-center px-6 py-20">
      <div className="flex w-full max-w-3xl flex-col gap-16">
        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">
            Tracker
          </span>
          <h1 className="font-serif text-4xl leading-snug sm:text-5xl">
            Not just a period tracker.
            <br />
            <span className="italic">A hormonal compass.</span>
          </h1>
          <p className="max-w-md text-base leading-7 text-muted">
            Most trackers tell you when your period is coming. Budy tells you
            why you feel the way you do — and what to do about it.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col gap-3 rounded-3xl border border-border bg-surface p-7"
            >
              <h3 className="font-serif text-xl">{f.title}</h3>
              <p className="text-sm leading-6 text-muted">{f.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-muted">Tracker launching soon.</p>
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
