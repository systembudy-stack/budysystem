"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Step =
  | "intro"
  | "r1-intro"
  | "r1-partner-q"
  | "r1-handoff"
  | "r1-her-q"
  | "r1-reveal"
  | "r1-info"
  | "r1-talk"
  | "done";

const STEP_ORDER: Step[] = [
  "intro",
  "r1-intro",
  "r1-partner-q",
  "r1-handoff",
  "r1-her-q",
  "r1-reveal",
  "r1-info",
  "r1-talk",
  "done",
];

export default function StartPage() {
  const [step, setStep] = useState<Step>("intro");
  const [partnerAnswer, setPartnerAnswer] = useState<number | null>(null);
  const [herAnswer, setHerAnswer] = useState<number | null>(null);

  const progress = useMemo(() => {
    const idx = STEP_ORDER.indexOf(step);
    return idx / (STEP_ORDER.length - 1);
  }, [step]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="fixed left-0 right-0 top-0 z-10 h-[3px] bg-border/50">
        <div
          className="h-full bg-accent transition-[width] duration-700 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <main className="flex flex-1 items-center justify-center px-6 py-20">
        <div
          key={step}
          className="w-full max-w-xl animate-[fadeIn_400ms_ease-out]"
        >
          {step === "intro" && (
            <ScreenIntro onContinue={() => setStep("r1-intro")} />
          )}
          {step === "r1-intro" && (
            <ScreenRoundIntro
              roundNumber={1}
              total={6}
              title="How long does it actually last?"
              onContinue={() => setStep("r1-partner-q")}
            />
          )}
          {step === "r1-partner-q" && (
            <ScreenNumberPick
              tag="partner"
              tagLabel="Partner"
              prompt="How many days do you think her period typically lasts?"
              hint="Best guess. No wrong answers here."
              value={partnerAnswer}
              onChange={setPartnerAnswer}
              onLockIn={() => setStep("r1-handoff")}
            />
          )}
          {step === "r1-handoff" && (
            <ScreenHandoff
              toLabel="Her turn"
              onContinue={() => setStep("r1-her-q")}
            />
          )}
          {step === "r1-her-q" && (
            <ScreenNumberPick
              tag="her"
              tagLabel="Her"
              prompt="How many days does it actually last for you?"
              hint="Roughly. It shifts cycle to cycle."
              value={herAnswer}
              onChange={setHerAnswer}
              onLockIn={() => setStep("r1-reveal")}
            />
          )}
          {step === "r1-reveal" && (
            <ScreenReveal
              partnerAnswer={partnerAnswer ?? 0}
              herAnswer={herAnswer ?? 0}
              onContinue={() => setStep("r1-info")}
            />
          )}
          {step === "r1-info" && (
            <ScreenInfo onContinue={() => setStep("r1-talk")} />
          )}
          {step === "r1-talk" && (
            <ScreenTalk onContinue={() => setStep("done")} />
          )}
          {step === "done" && <ScreenDone />}
        </div>
      </main>
    </div>
  );
}

function ScreenIntro({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex flex-col gap-10 text-center">
      <span className="text-xs uppercase tracking-[0.2em] text-muted">
        Before we start
      </span>
      <h2 className="font-serif text-4xl leading-[1.1] sm:text-5xl">
        A few small things.
      </h2>
      <ul className="mx-auto flex max-w-sm flex-col gap-5 text-left text-lg leading-7 text-foreground/85">
        <li className="flex gap-4">
          <span className="font-serif text-accent">1.</span>
          Sit somewhere comfortable, close.
        </li>
        <li className="flex gap-4">
          <span className="font-serif text-accent">2.</span>
          You&apos;ll pass the phone back and forth. The screen will say
          who&apos;s up.
        </li>
        <li className="flex gap-4">
          <span className="font-serif text-accent">3.</span>
          Talk between rounds. That&apos;s where this actually works.
        </li>
      </ul>
      <ContinueButton onClick={onContinue}>I&apos;m ready →</ContinueButton>
    </div>
  );
}

function ScreenRoundIntro({
  roundNumber,
  total,
  title,
  onContinue,
}: {
  roundNumber: number;
  total: number;
  title: string;
  onContinue: () => void;
}) {
  return (
    <div className="flex flex-col gap-10 text-center">
      <span className="text-xs uppercase tracking-[0.2em] text-muted">
        Round {roundNumber} of {total}
      </span>
      <h2 className="font-serif text-5xl leading-[1.05] sm:text-6xl">
        {title}
      </h2>
      <ContinueButton onClick={onContinue}>Begin →</ContinueButton>
    </div>
  );
}

function ScreenNumberPick({
  tag,
  tagLabel,
  prompt,
  hint,
  value,
  onChange,
  onLockIn,
}: {
  tag: "her" | "partner";
  tagLabel: string;
  prompt: string;
  hint: string;
  value: number | null;
  onChange: (n: number) => void;
  onLockIn: () => void;
}) {
  const tagBg = tag === "her" ? "bg-her" : "bg-partner";
  return (
    <div className="flex flex-col gap-9">
      <div className="flex justify-center">
        <span
          className={`inline-flex h-7 items-center rounded-full px-3 text-[11px] font-medium uppercase tracking-[0.15em] text-foreground/80 ${tagBg}`}
        >
          {tagLabel}
        </span>
      </div>
      <h2 className="text-center font-serif text-3xl leading-snug sm:text-4xl">
        {prompt}
      </h2>
      <p className="-mt-4 text-center text-sm text-muted">{hint}</p>
      <div className="grid grid-cols-5 gap-2.5">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
          const selected = value === n;
          return (
            <button
              key={n}
              onClick={() => onChange(n)}
              className={`h-16 rounded-2xl border text-lg font-medium transition-all ${
                selected
                  ? "scale-[1.04] border-accent bg-accent text-background shadow-sm"
                  : "border-border bg-surface text-foreground/85 hover:border-accent/40 hover:bg-surface"
              }`}
            >
              {n}
            </button>
          );
        })}
      </div>
      <ContinueButton onClick={onLockIn} disabled={value === null}>
        Lock in →
      </ContinueButton>
    </div>
  );
}

function ScreenHandoff({
  toLabel,
  onContinue,
}: {
  toLabel: string;
  onContinue: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <span className="font-serif text-xl italic text-muted">
        Pass the phone
      </span>
      <div className="select-none text-6xl text-accent">↓</div>
      <h2 className="font-serif text-5xl leading-tight">{toLabel}</h2>
      <p className="max-w-xs text-base text-muted">
        Hand it over. Don&apos;t peek at the last answer.
      </p>
      <ContinueButton onClick={onContinue}>Got it →</ContinueButton>
    </div>
  );
}

function ScreenReveal({
  partnerAnswer,
  herAnswer,
  onContinue,
}: {
  partnerAnswer: number;
  herAnswer: number;
  onContinue: () => void;
}) {
  const gap = Math.abs(partnerAnswer - herAnswer);
  const note =
    gap === 0
      ? "Same number. Nice."
      : gap === 1
        ? "Within a day. Close."
        : `${gap} days apart.`;

  return (
    <div className="flex flex-col gap-10 text-center">
      <span className="text-xs uppercase tracking-[0.2em] text-muted">
        The reveal
      </span>
      <div className="grid grid-cols-2 gap-3 sm:gap-5">
        <RevealCard
          tagBg="bg-partner"
          tagLabel="Partner guessed"
          value={partnerAnswer}
        />
        <RevealCard tagBg="bg-her" tagLabel="She said" value={herAnswer} />
      </div>
      <p className="font-serif text-2xl italic text-muted">{note}</p>
      <ContinueButton onClick={onContinue}>What this means →</ContinueButton>
    </div>
  );
}

function RevealCard({
  tagBg,
  tagLabel,
  value,
}: {
  tagBg: string;
  tagLabel: string;
  value: number;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-surface p-7">
      <span
        className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-foreground/80 ${tagBg}`}
      >
        {tagLabel}
      </span>
      <span className="font-serif text-7xl leading-none">{value}</span>
      <span className="text-sm text-muted">days</span>
    </div>
  );
}

function ScreenInfo({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex flex-col gap-8">
      <span className="self-center text-xs uppercase tracking-[0.2em] text-muted">
        What&apos;s actually going on
      </span>
      <div className="flex flex-col gap-7 rounded-3xl border border-border bg-surface p-8 sm:p-10">
        <InfoBlock label="First, the truth">
          Periods aren&apos;t a fixed thing. They shift cycle to cycle, and the
          days of bleeding aren&apos;t the only days she feels it.
        </InfoBlock>
        <div className="h-px bg-border" />
        <InfoBlock label="Why it happens" small>
          During menstruation, estrogen and progesterone are at their lowest
          point of the month. That hormonal floor affects energy, sleep, and
          pain sensitivity — and the dip often starts a day or two before
          bleeding begins, and lingers a day or two after.
        </InfoBlock>
        <div className="h-px bg-border" />
        <InfoBlock label="One thing this week" small>
          Plan one low-pressure thing together for her week 1 — not &quot;doing
          nothing,&quot; but something restful she actually enjoys. A movie. A
          slow walk. The stakes are small; the signal is what matters.
        </InfoBlock>
      </div>
      <ContinueButton onClick={onContinue}>Continue →</ContinueButton>
    </div>
  );
}

function InfoBlock({
  label,
  children,
  small,
}: {
  label: string;
  children: React.ReactNode;
  small?: boolean;
}) {
  return (
    <div>
      <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
        {label}
      </span>
      <p
        className={
          small
            ? "mt-3 text-base leading-7 text-foreground/90"
            : "mt-3 font-serif text-2xl leading-snug"
        }
      >
        {children}
      </p>
    </div>
  );
}

function ScreenTalk({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex flex-col items-center gap-9 text-center">
      <span className="text-xs uppercase tracking-[0.2em] text-muted">
        Phone down · 2 minutes
      </span>
      <h2 className="font-serif text-3xl leading-snug sm:text-4xl">
        What&apos;s one thing that&apos;s hard during her period that you
        haven&apos;t said out loud?
      </h2>
      <p className="max-w-sm text-base text-muted">
        Either of you. Take your time. The phone can wait.
      </p>
      <ContinueButton onClick={onContinue}>We talked →</ContinueButton>
    </div>
  );
}

function ScreenDone() {
  return (
    <div className="flex flex-col items-center gap-9 text-center">
      <span className="text-xs uppercase tracking-[0.2em] text-muted">
        Round 1 complete
      </span>
      <h2 className="font-serif text-5xl leading-[1.05]">
        That was one round.
        <br />
        <span className="italic">Five more to go.</span>
      </h2>
      <p className="max-w-md text-base leading-7 text-muted">
        This is the prototype shape — one full round, end to end. Next we add
        rounds 2 through 6 with your gf&apos;s real questions.
      </p>
      <Link
        href="/"
        className="text-sm text-accent underline-offset-4 hover:underline"
      >
        Back to the start
      </Link>
    </div>
  );
}

function ContinueButton({
  children,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="self-center inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-base font-medium text-background transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-accent"
    >
      {children}
    </button>
  );
}
