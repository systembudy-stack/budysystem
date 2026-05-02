import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <div className="flex max-w-xl flex-col items-center gap-10">
        <span
          className="text-3xl tracking-wide text-accent"
          style={{ fontFamily: "var(--font-chewy), cursive" }}
        >
          budy system
        </span>

        <h1 className="font-serif text-5xl leading-[1.1] tracking-tight sm:text-6xl">
          A night to understand
          <br />
          <span className="italic">her body,</span> together.
        </h1>

        <p className="max-w-md text-lg leading-7 text-muted">
          A guided 30-minute experience for couples — questions, reveals, and
          the kind of conversation you've been meaning to have.
        </p>

        <Link
          href="/start"
          className="mt-2 inline-flex h-13 items-center justify-center rounded-full bg-accent px-9 text-base font-medium text-background transition-colors hover:bg-accent-hover"
        >
          Begin together →
        </Link>

        <p className="text-sm text-muted">
          Sit close. One phone between you. About 30 minutes.
        </p>
      </div>
    </main>
  );
}
