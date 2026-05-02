"use client";

import Link from "next/link";
import { useState } from "react";

export default function JoinPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-20">
      <div className="flex w-full max-w-3xl flex-col gap-12">
        <div className="flex flex-col gap-4 text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">
            While you&apos;re here
          </span>
          <h2 className="font-serif text-4xl leading-snug sm:text-5xl">
            Stay with us.
          </h2>
          <p className="mx-auto max-w-sm text-base text-muted">
            Two ways to keep going — pick one, or both.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <SignupCard
            tag="For her"
            tagBg="bg-her"
            title="Monthly dispatches"
            description="A monthly guide to understanding your body by phase — what to eat, how to move, what to expect, based on where you are in your cycle."
            buttonLabel="Get the letter"
          />
          <SignupCard
            tag="For both"
            tagBg="bg-partner"
            title="Couples physiology sessions"
            description="Sessions for couples with a therapist who specialises in hormonal health and relationships. Join the waitlist — spots are limited."
            buttonLabel="Join the waitlist"
          />
        </div>

        <Link
          href="/"
          className="self-center text-sm text-muted transition-colors hover:text-foreground"
        >
          ← Back to start
        </Link>
      </div>
    </main>
  );
}

function SignupCard({
  tag,
  tagBg,
  title,
  description,
  buttonLabel,
}: {
  tag: string;
  tagBg: string;
  title: string;
  description: string;
  buttonLabel: string;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col justify-between gap-8 rounded-3xl border border-border bg-surface p-8">
      <div className="flex flex-col gap-4">
        <span
          className={`self-start inline-flex items-center rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-foreground/80 ${tagBg}`}
        >
          {tag}
        </span>
        <h3 className="font-serif text-2xl leading-snug">{title}</h3>
        <p className="text-sm leading-6 text-muted">{description}</p>
      </div>

      {submitted ? (
        <p className="font-serif text-xl italic text-accent">
          You&apos;re on the list.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="sr-only" htmlFor={`email-${tag}`}>
            Email address
          </label>
          <input
            id={`email-${tag}`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="h-11 rounded-full border border-border bg-background px-5 text-sm text-foreground placeholder:text-muted transition-colors focus:border-accent focus:outline-none"
          />
          <button
            type="submit"
            className="h-11 rounded-full bg-accent px-6 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
          >
            {buttonLabel} →
          </button>
        </form>
      )}
    </div>
  );
}
