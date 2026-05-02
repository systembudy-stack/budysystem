"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Step =
  | "intro"
  | "r1-intro"
  | "r1-partner-q"
  | "r1-handoff"
  | "r1-her-q"
  | "r1-reveal"
  | "r1-info"
  | "r1-talk"
  | "r2-intro"
  | "r2-partner-q"
  | "r2-reveal"
  | "r2-info"
  | "r2-talk"
  | "r3-intro"
  | "r3-partner-q"
  | "r3-handoff"
  | "r3-her-q"
  | "r3-reveal"
  | "r3-info"
  | "r3-talk"
  | "r4-intro"
  | "r4-partner-q"
  | "r4-handoff"
  | "r4-her-q"
  | "r4-reveal"
  | "r4-info"
  | "r4-talk"
  | "r5-intro"
  | "r5-partner-q"
  | "r5-handoff"
  | "r5-her-q"
  | "r5-reveal"
  | "r5-info"
  | "r5-talk"
  | "r6-intro"
  | "r6-partner-q"
  | "r6-handoff"
  | "r6-her-q"
  | "r6-reveal"
  | "r6-talk"
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
  "r2-intro",
  "r2-partner-q",
  "r2-reveal",
  "r2-info",
  "r2-talk",
  "r3-intro",
  "r3-partner-q",
  "r3-handoff",
  "r3-her-q",
  "r3-reveal",
  "r3-info",
  "r3-talk",
  "r4-intro",
  "r4-partner-q",
  "r4-handoff",
  "r4-her-q",
  "r4-reveal",
  "r4-info",
  "r4-talk",
  "r5-intro",
  "r5-partner-q",
  "r5-handoff",
  "r5-her-q",
  "r5-reveal",
  "r5-info",
  "r5-talk",
  "r6-intro",
  "r6-partner-q",
  "r6-handoff",
  "r6-her-q",
  "r6-reveal",
  "r6-talk",
  "done",
];

export default function StartPage() {
  const [step, setStep] = useState<Step>("intro");
  const [partnerAnswer, setPartnerAnswer] = useState<number | null>(null);
  const [herAnswer, setHerAnswer] = useState<number | null>(null);
  const [r2PartnerAnswer, setR2PartnerAnswer] = useState<number | null>(null);
  const [r3PartnerAnswer, setR3PartnerAnswer] = useState<number | null>(null);
  const [r3HerAnswer, setR3HerAnswer] = useState<number | null>(null);
  const [r4PartnerAnswer, setR4PartnerAnswer] = useState<number | null>(null);
  const [r4HerAnswer, setR4HerAnswer] = useState<number | null>(null);
  const [r5PartnerAnswer, setR5PartnerAnswer] = useState<number | null>(null);
  const [r5HerAnswer, setR5HerAnswer] = useState<number | null>(null);
  const [r6PartnerAnswer, setR6PartnerAnswer] = useState<number | null>(null);
  const [r6HerAnswer, setR6HerAnswer] = useState<number | null>(null);

  const stepRef = useRef(step);
  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  const goTo = useCallback((next: Step) => {
    window.history.pushState(null, "");
    setStep(next);
  }, []);

  useEffect(() => {
    const onPop = () => {
      const idx = STEP_ORDER.indexOf(stepRef.current);
      if (idx > 0) {
        window.history.pushState(null, "");
        setStep(STEP_ORDER[idx - 1]);
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

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
            <ScreenIntro onContinue={() => goTo("r1-intro")} />
          )}

          {/* Round 1 — period duration */}
          {step === "r1-intro" && (
            <ScreenRoundIntro
              roundNumber={1}
              total={6}
              title="How long does it actually last?"
              onContinue={() => goTo("r1-partner-q")}
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
              onLockIn={() => goTo("r1-handoff")}
            />
          )}
          {step === "r1-handoff" && (
            <ScreenHandoff
              toLabel="Her turn"
              onContinue={() => goTo("r1-her-q")}
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
              onLockIn={() => goTo("r1-reveal")}
            />
          )}
          {step === "r1-reveal" && (
            <ScreenReveal
              partnerAnswer={partnerAnswer ?? 0}
              herAnswer={herAnswer ?? 0}
              unit="days"
              onContinue={() => goTo("r1-info")}
            />
          )}
          {step === "r1-info" && (
            <ScreenInfo onContinue={() => goTo("r1-talk")} />
          )}
          {step === "r1-talk" && (
            <ScreenTalk onContinue={() => goTo("r2-intro")} />
          )}

          {/* Round 2 — four phases */}
          {step === "r2-intro" && (
            <ScreenRoundIntro
              roundNumber={2}
              total={6}
              title="How many chapters does her month have?"
              onContinue={() => goTo("r2-partner-q")}
            />
          )}
          {step === "r2-partner-q" && (
            <ScreenNumberPick
              tag="partner"
              tagLabel="Partner"
              prompt="How many distinct chapters do you think her month has?"
              hint="Think beyond just the period."
              value={r2PartnerAnswer}
              onChange={setR2PartnerAnswer}
              onLockIn={() => goTo("r2-reveal")}
              max={8}
            />
          )}
          {step === "r2-reveal" && (
            <ScreenR2Reveal
              partnerAnswer={r2PartnerAnswer ?? 0}
              onContinue={() => goTo("r2-info")}
            />
          )}
          {step === "r2-info" && (
            <ScreenR2Info onContinue={() => goTo("r2-talk")} />
          )}
          {step === "r2-talk" && (
            <ScreenR2Talk onContinue={() => goTo("r3-intro")} />
          )}

          {/* Round 3 — pain */}
          {step === "r3-intro" && (
            <ScreenRoundIntro
              roundNumber={3}
              total={6}
              title="How much does it actually hurt?"
              onContinue={() => goTo("r3-partner-q")}
            />
          )}
          {step === "r3-partner-q" && (
            <ScreenNumberPick
              tag="partner"
              tagLabel="Partner"
              prompt="On a scale of 1–10, how much pain do you think she's in during her period?"
              hint="1 is barely there. 10 is can't-get-out-of-bed."
              value={r3PartnerAnswer}
              onChange={setR3PartnerAnswer}
              onLockIn={() => goTo("r3-handoff")}
            />
          )}
          {step === "r3-handoff" && (
            <ScreenHandoff
              toLabel="Her turn"
              onContinue={() => goTo("r3-her-q")}
            />
          )}
          {step === "r3-her-q" && (
            <ScreenNumberPick
              tag="her"
              tagLabel="Her"
              prompt="On a scale of 1–10, how much pain do you actually experience?"
              hint="Be honest. This one matters."
              value={r3HerAnswer}
              onChange={setR3HerAnswer}
              onLockIn={() => goTo("r3-reveal")}
            />
          )}
          {step === "r3-reveal" && (
            <ScreenReveal
              partnerAnswer={r3PartnerAnswer ?? 0}
              herAnswer={r3HerAnswer ?? 0}
              unit="/ 10"
              onContinue={() => goTo("r3-info")}
            />
          )}
          {step === "r3-info" && (
            <ScreenR3Info onContinue={() => goTo("r3-talk")} />
          )}
          {step === "r3-talk" && (
            <ScreenR3Talk onContinue={() => goTo("r4-intro")} />
          )}

          {/* Round 4 — luteal window */}
          {step === "r4-intro" && (
            <ScreenRoundIntro
              roundNumber={4}
              total={6}
              title="When does the shift actually start?"
              onContinue={() => goTo("r4-partner-q")}
            />
          )}
          {step === "r4-partner-q" && (
            <ScreenNumberPick
              tag="partner"
              tagLabel="Partner"
              prompt="How many days before her period do you think she starts feeling the shift?"
              hint="Count back from when it begins."
              value={r4PartnerAnswer}
              onChange={setR4PartnerAnswer}
              onLockIn={() => goTo("r4-handoff")}
            />
          )}
          {step === "r4-handoff" && (
            <ScreenHandoff
              toLabel="Her turn"
              onContinue={() => goTo("r4-her-q")}
            />
          )}
          {step === "r4-her-q" && (
            <ScreenNumberPick
              tag="her"
              tagLabel="Her"
              prompt="How many days before your period do you actually start feeling it?"
              hint="The mood shift, the fatigue, the sensitivity — when does it begin?"
              value={r4HerAnswer}
              onChange={setR4HerAnswer}
              onLockIn={() => goTo("r4-reveal")}
            />
          )}
          {step === "r4-reveal" && (
            <ScreenReveal
              partnerAnswer={r4PartnerAnswer ?? 0}
              herAnswer={r4HerAnswer ?? 0}
              unit="days before"
              onContinue={() => goTo("r4-info")}
            />
          )}
          {step === "r4-info" && (
            <ScreenR4Info onContinue={() => goTo("r4-talk")} />
          )}
          {step === "r4-talk" && (
            <ScreenR4Talk onContinue={() => goTo("r5-intro")} />
          )}

          {/* Round 5 — how supported she feels */}
          {step === "r5-intro" && (
            <ScreenRoundIntro
              roundNumber={5}
              total={6}
              title="How supported does she actually feel?"
              onContinue={() => goTo("r5-partner-q")}
            />
          )}
          {step === "r5-partner-q" && (
            <ScreenNumberPick
              tag="partner"
              tagLabel="Partner"
              prompt="On a scale of 1–10, how supported do you think she feels during her hardest phase?"
              hint="Be honest with yourself."
              value={r5PartnerAnswer}
              onChange={setR5PartnerAnswer}
              onLockIn={() => goTo("r5-handoff")}
            />
          )}
          {step === "r5-handoff" && (
            <ScreenHandoff
              toLabel="Her turn"
              onContinue={() => goTo("r5-her-q")}
            />
          )}
          {step === "r5-her-q" && (
            <ScreenNumberPick
              tag="her"
              tagLabel="Her"
              prompt="On a scale of 1–10, how supported do you actually feel during your hardest phase?"
              hint="Be honest. This is the one that matters."
              value={r5HerAnswer}
              onChange={setR5HerAnswer}
              onLockIn={() => goTo("r5-reveal")}
            />
          )}
          {step === "r5-reveal" && (
            <ScreenR5Reveal
              partnerAnswer={r5PartnerAnswer ?? 0}
              herAnswer={r5HerAnswer ?? 0}
              onContinue={() => goTo("r5-info")}
            />
          )}
          {step === "r5-info" && (
            <ScreenR5Info onContinue={() => goTo("r5-talk")} />
          )}
          {step === "r5-talk" && (
            <ScreenR5Talk onContinue={() => goTo("r6-intro")} />
          )}

          {/* Round 6 — how connected they feel */}
          {step === "r6-intro" && (
            <ScreenRoundIntro
              roundNumber={6}
              total={6}
              title="How connected do you feel right now?"
              onContinue={() => goTo("r6-partner-q")}
            />
          )}
          {step === "r6-partner-q" && (
            <ScreenNumberPick
              tag="partner"
              tagLabel="Partner"
              prompt="On a scale of 1–10, how connected do you feel to her right now?"
              hint="Right now, in this moment."
              value={r6PartnerAnswer}
              onChange={setR6PartnerAnswer}
              onLockIn={() => goTo("r6-handoff")}
            />
          )}
          {step === "r6-handoff" && (
            <ScreenHandoff
              toLabel="Her turn"
              onContinue={() => goTo("r6-her-q")}
            />
          )}
          {step === "r6-her-q" && (
            <ScreenNumberPick
              tag="her"
              tagLabel="Her"
              prompt="On a scale of 1–10, how connected do you feel to him right now?"
              hint="Right now, in this moment."
              value={r6HerAnswer}
              onChange={setR6HerAnswer}
              onLockIn={() => goTo("r6-reveal")}
            />
          )}
          {step === "r6-reveal" && (
            <ScreenR6Reveal
              partnerAnswer={r6PartnerAnswer ?? 0}
              herAnswer={r6HerAnswer ?? 0}
              onContinue={() => goTo("r6-talk")}
            />
          )}
          {step === "r6-talk" && (
            <ScreenR6Close onContinue={() => goTo("done")} />
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
  max = 10,
}: {
  tag: "her" | "partner";
  tagLabel: string;
  prompt: string;
  hint: string;
  value: number | null;
  onChange: (n: number) => void;
  onLockIn: () => void;
  max?: number;
}) {
  const tagBg = tag === "her" ? "bg-her" : "bg-partner";
  const colsClass = max <= 8 ? "grid-cols-4" : "grid-cols-5";
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
      <div className={`grid ${colsClass} gap-2.5`}>
        {Array.from({ length: max }, (_, i) => i + 1).map((n) => {
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
  unit = "days",
  onContinue,
}: {
  partnerAnswer: number;
  herAnswer: number;
  unit?: string;
  onContinue: () => void;
}) {
  const gap = Math.abs(partnerAnswer - herAnswer);
  const note =
    gap === 0
      ? "Same number. Nice."
      : gap === 1
        ? "One apart. Close."
        : `${gap} apart.`;

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
          unit={unit}
        />
        <RevealCard
          tagBg="bg-her"
          tagLabel="She said"
          value={herAnswer}
          unit={unit}
        />
      </div>
      <p className="font-serif text-2xl italic text-muted">{note}</p>
      <ContinueButton onClick={onContinue}>What this means →</ContinueButton>
    </div>
  );
}

function ScreenR2Reveal({
  partnerAnswer,
  onContinue,
}: {
  partnerAnswer: number;
  onContinue: () => void;
}) {
  const gap = Math.abs(partnerAnswer - 4);
  const note =
    gap === 0 ? "Got it exactly." : gap === 1 ? "One off." : `${gap} away.`;

  return (
    <div className="flex flex-col gap-10 text-center">
      <span className="text-xs uppercase tracking-[0.2em] text-muted">
        The reveal
      </span>
      <div className="grid grid-cols-2 gap-3 sm:gap-5">
        <RevealCard
          tagBg="bg-partner"
          tagLabel="You guessed"
          value={partnerAnswer}
          unit="chapters"
        />
        <RevealCard
          tagBg="bg-her"
          tagLabel="The answer"
          value={4}
          unit="chapters"
        />
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
  unit = "days",
}: {
  tagBg: string;
  tagLabel: string;
  value: number;
  unit?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-surface p-7">
      <span
        className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-foreground/80 ${tagBg}`}
      >
        {tagLabel}
      </span>
      <span className="font-serif text-7xl leading-none">{value}</span>
      <span className="text-sm text-muted">{unit}</span>
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

function ScreenR2Info({ onContinue }: { onContinue: () => void }) {
  const phases = [
    {
      name: "Menstrual",
      days: "days 1–5",
      desc: "lowest hormones, rest and inward",
      note: "Energy is low. Mood turns tender, sometimes heavy.",
    },
    {
      name: "Follicular",
      days: "days 6–13",
      desc: "estrogen rises, energy builds",
      note: "Energy climbs steadily. Mood opens up — curious, optimistic, social.",
    },
    {
      name: "Ovulation",
      days: "day ~14",
      desc: "peak — her clearest, most energetic days",
      note: "Energy peaks. Mood is confident, communicative, most herself.",
    },
    {
      name: "Luteal",
      days: "days 15–28",
      desc: "the longest phase, often the hardest stretch",
      note: "Energy drops toward the end. Mood shifts — more sensitive, needs more quiet.",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <span className="self-center text-xs uppercase tracking-[0.2em] text-muted">
        The four chapters
      </span>
      <div className="flex flex-col gap-7 rounded-3xl border border-border bg-surface p-8 sm:p-10">
        <InfoBlock label="The answer is four">
          Her cycle has four distinct phases — and each one shifts her energy,
          mood, and how she moves through the world. Most people only ever
          notice one.
        </InfoBlock>
        <div className="h-px bg-border" />
        <InfoBlock label="What they actually are" small>
          <div className="flex flex-col gap-4">
            {phases.map(({ name, days, desc, note }) => (
              <div key={name} className="flex flex-col gap-0.5">
                <div>
                  <span className="font-medium text-foreground">{name}</span>
                  <span className="text-muted"> ({days})</span>
                  <span> — {desc}.</span>
                </div>
                <div className="text-sm text-muted">{note}</div>
              </div>
            ))}
          </div>
        </InfoBlock>
        <div className="h-px bg-border" />
        <InfoBlock label="One thing this week" small>
          Find out which phase she&apos;s in right now. If you&apos;re not sure
          how, just ask her. That question alone is worth something.
        </InfoBlock>
      </div>
      <ContinueButton onClick={onContinue}>Continue →</ContinueButton>
    </div>
  );
}

function ScreenR3Info({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex flex-col gap-8">
      <span className="self-center text-xs uppercase tracking-[0.2em] text-muted">
        What&apos;s actually going on
      </span>
      <div className="flex flex-col gap-7 rounded-3xl border border-border bg-surface p-8 sm:p-10">
        <InfoBlock label="First, the truth">
          Period pain is real — and it ranges enormously. What&apos;s
          manageable for one person can be genuinely debilitating for another.
          Both are valid.
        </InfoBlock>
        <div className="h-px bg-border" />
        <InfoBlock label="Why it happens" small>
          The uterus contracts to shed its lining. The chemical that triggers
          those contractions — prostaglandin — also causes inflammation, nausea,
          lower back pain, and sometimes affects the bowels. Higher levels mean
          higher pain. It&apos;s not just cramps.
        </InfoBlock>
        <div className="h-px bg-border" />
        <InfoBlock label="One thing this week" small>
          Next time she&apos;s in pain, ask what she needs — heat, quiet,
          touch, or just company. Don&apos;t guess. Don&apos;t fix. Just ask.
        </InfoBlock>
      </div>
      <ContinueButton onClick={onContinue}>Continue →</ContinueButton>
    </div>
  );
}

function ScreenR4Info({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex flex-col gap-8">
      <span className="self-center text-xs uppercase tracking-[0.2em] text-muted">
        What&apos;s actually going on
      </span>
      <div className="flex flex-col gap-7 rounded-3xl border border-border bg-surface p-8 sm:p-10">
        <InfoBlock label="First, the truth">
          What most people call PMS is just the tail end of the luteal phase —
          which can last up to two weeks. The shift starts long before she
          bleeds.
        </InfoBlock>
        <div className="h-px bg-border" />
        <InfoBlock label="Why it happens" small>
          After ovulation, progesterone rises — then falls. As it drops, so
          does serotonin. That&apos;s mood, sleep, and pain sensitivity all
          declining together, over days. It&apos;s not emotional. It&apos;s
          chemical.
        </InfoBlock>
        <div className="h-px bg-border" />
        <InfoBlock label="One thing this week" small>
          Start noticing where she is in her cycle. Even just saying &quot;you
          might be in your luteal phase&quot; tells her you&apos;ve been paying
          attention. That alone changes something.
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
      <div
        className={
          small
            ? "mt-3 text-base leading-7 text-foreground/90"
            : "mt-3 font-serif text-2xl leading-snug"
        }
      >
        {children}
      </div>
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

function ScreenR2Talk({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex flex-col items-center gap-9 text-center">
      <span className="text-xs uppercase tracking-[0.2em] text-muted">
        Phone down · 5 minutes
      </span>
      <h2 className="font-serif text-3xl leading-snug sm:text-4xl">
        Go through each phase together — how does she feel, and what does she
        actually need from you during that one?
      </h2>
      <p className="text-xs tracking-wide text-muted">
        Menstrual · Follicular · Ovulation · Luteal
      </p>
      <p className="max-w-sm text-base text-muted">
        She leads. You listen. No fixing, just understanding.
      </p>
      <ContinueButton onClick={onContinue}>We talked →</ContinueButton>
    </div>
  );
}

function ScreenR3Talk({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex flex-col items-center gap-9 text-center">
      <span className="text-xs uppercase tracking-[0.2em] text-muted">
        Phone down · 2 minutes
      </span>
      <h2 className="font-serif text-3xl leading-snug sm:text-4xl">
        When she&apos;s in pain — what has he done that actually helped, and
        what has he gotten wrong?
      </h2>
      <p className="max-w-sm text-base text-muted">
        Honest answers only. No defence, just listening.
      </p>
      <ContinueButton onClick={onContinue}>We talked →</ContinueButton>
    </div>
  );
}

function ScreenR4Talk({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex flex-col items-center gap-9 text-center">
      <span className="text-xs uppercase tracking-[0.2em] text-muted">
        Phone down · 2 minutes
      </span>
      <h2 className="font-serif text-3xl leading-snug sm:text-4xl">
        Now that he knows the shift can last two weeks — what&apos;s one thing
        he&apos;ll actually do differently?
      </h2>
      <p className="max-w-sm text-base text-muted">
        Make it specific. Vague intentions don&apos;t land.
      </p>
      <ContinueButton onClick={onContinue}>We talked →</ContinueButton>
    </div>
  );
}

function ScreenR5Reveal({
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
      ? "Same number."
      : partnerAnswer > herAnswer
        ? `He thought ${gap} point${gap === 1 ? "" : "s"} higher than she feels.`
        : `She feels more supported than he realised.`;

  return (
    <div className="flex flex-col gap-10 text-center">
      <span className="text-xs uppercase tracking-[0.2em] text-muted">
        The reveal
      </span>
      <div className="grid grid-cols-2 gap-3 sm:gap-5">
        <RevealCard
          tagBg="bg-partner"
          tagLabel="He thought"
          value={partnerAnswer}
          unit="/ 10"
        />
        <RevealCard
          tagBg="bg-her"
          tagLabel="She feels"
          value={herAnswer}
          unit="/ 10"
        />
      </div>
      <p className="font-serif text-2xl italic text-muted">{note}</p>
      <ContinueButton onClick={onContinue}>What this means →</ContinueButton>
    </div>
  );
}

function ScreenR5Info({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex flex-col gap-8">
      <span className="self-center text-xs uppercase tracking-[0.2em] text-muted">
        What&apos;s actually going on
      </span>
      <div className="flex flex-col gap-7 rounded-3xl border border-border bg-surface p-8 sm:p-10">
        <InfoBlock label="First, the truth">
          Support during her hardest phases isn&apos;t about grand gestures.
          It&apos;s about noticing — and asking — before she has to spell it
          out.
        </InfoBlock>
        <div className="h-px bg-border" />
        <InfoBlock label="Why the gap usually exists" small>
          Men often default to solving the problem. She usually needs presence,
          not solutions — someone who checks in without waiting to be asked, who
          adjusts without needing an explanation, who doesn&apos;t make her
          justify how she feels. The gap between what he offers and what she
          needs is almost always this.
        </InfoBlock>
        <div className="h-px bg-border" />
        <InfoBlock label="One thing this week" small>
          Ask her what a 10 looks like — not in general, but specifically, this
          week, in whatever phase she&apos;s in. The answer will be more
          concrete than he expects.
        </InfoBlock>
      </div>
      <ContinueButton onClick={onContinue}>Continue →</ContinueButton>
    </div>
  );
}

function ScreenR5Talk({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex flex-col items-center gap-9 text-center">
      <span className="text-xs uppercase tracking-[0.2em] text-muted">
        Phone down · 3 minutes
      </span>
      <h2 className="font-serif text-3xl leading-snug sm:text-4xl">
        What would a 10 feel like for her?
      </h2>
      <p className="max-w-sm text-base text-muted">
        She describes it in specifics. He just listens — no defending, no
        explaining. Just taking it in.
      </p>
      <ContinueButton onClick={onContinue}>We talked →</ContinueButton>
    </div>
  );
}

function ScreenR6Reveal({
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
      ? "Same number. That's the point."
      : gap === 1
        ? "One apart. Close enough."
        : `${gap} apart — still, look at those numbers.`;

  return (
    <div className="flex flex-col gap-10 text-center">
      <span className="text-xs uppercase tracking-[0.2em] text-muted">
        The reveal
      </span>
      <div className="grid grid-cols-2 gap-3 sm:gap-5">
        <RevealCard
          tagBg="bg-partner"
          tagLabel="He feels"
          value={partnerAnswer}
          unit="/ 10"
        />
        <RevealCard
          tagBg="bg-her"
          tagLabel="She feels"
          value={herAnswer}
          unit="/ 10"
        />
      </div>
      <p className="font-serif text-2xl italic text-muted">{note}</p>
      <ContinueButton onClick={onContinue}>Finish →</ContinueButton>
    </div>
  );
}

function ScreenR6Close({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex flex-col items-center gap-9 text-center">
      <span className="text-xs uppercase tracking-[0.2em] text-muted">
        That&apos;s all six
      </span>
      <h2 className="font-serif text-4xl leading-snug sm:text-5xl">
        Stay here
        <br />
        <span className="italic">for a minute.</span>
      </h2>
      <p className="max-w-sm text-base leading-7 text-muted">
        Six questions. Honest answers. A conversation most couples never have.
        <br />
        Tonight was something.
      </p>
      <ContinueButton onClick={onContinue}>We&apos;re done →</ContinueButton>
    </div>
  );
}

function ScreenDone() {
  return (
    <div className="flex flex-col items-center gap-9 text-center">
      <span className="text-xs uppercase tracking-[0.2em] text-muted">
        Done
      </span>
      <h2 className="font-serif text-5xl leading-[1.05]">
        You know more
        <br />
        <span className="italic">than you did.</span>
      </h2>
      <p className="max-w-md text-base leading-7 text-muted">
        You now know more about her cycle than most partners ever will. Use it —
        not just tonight, but in how you show up next week, and the week after.
      </p>
      <Link
        href="/join"
        className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-base font-medium text-background transition-colors hover:bg-accent-hover"
      >
        Stay with us →
      </Link>
      <Link
        href="/"
        className="text-sm text-muted underline-offset-4 hover:underline"
      >
        Start again
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
