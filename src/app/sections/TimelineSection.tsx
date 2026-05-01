import { useEffect, useState } from "react";
import { CalendarDays, FileText, Megaphone, Vote, Trophy } from "lucide-react";
import { useI18n } from "@/i18n/I18n";

// Placeholder timeline — adjust per actual ECI schedule
const events = [
  { key: "ev_registration", date: new Date("2029-02-15T18:00:00+05:30"), icon: CalendarDays },
  { key: "ev_nomination",   date: new Date("2029-03-20T17:00:00+05:30"), icon: FileText },
  { key: "ev_campaign_end", date: new Date("2029-04-17T17:00:00+05:30"), icon: Megaphone },
  { key: "ev_voting",       date: new Date("2029-04-19T07:00:00+05:30"), icon: Vote },
  { key: "ev_results",      date: new Date("2029-05-23T08:00:00+05:30"), icon: Trophy },
] as const;

const VOTING_DAY = events.find((e) => e.key === "ev_voting")!.date;

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return { d, h, m, s };
}

export default function TimelineSection() {
  const { t, lang } = useI18n();
  const [c, setC] = useState(diff(VOTING_DAY));
  useEffect(() => {
    const i = setInterval(() => setC(diff(VOTING_DAY)), 1000);
    return () => clearInterval(i);
  }, []);

  const fmt = (d: Date) =>
    d.toLocaleDateString(lang === "hi" ? "hi-IN" : lang === "te" ? "te-IN" : "en-IN", {
      day: "numeric", month: "long", year: "numeric",
    });

  return (
    <section id="timeline" className="px-3 sm:px-4 py-12 sm:py-20 bg-[#ededed]">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-8">
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight">
            {t("sec_timeline_title").split(" ")[0]}{" "}
            <span className="font-serif-i">{t("sec_timeline_title").split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="text-neutral-600 mt-3">{t("sec_timeline_sub")}</p>
        </header>

        {/* Countdown */}
        <div className="bg-[#0b0f1a] text-white rounded-3xl p-6 sm:p-8 mb-8">
          <p className="text-[13px] uppercase tracking-widest text-white/60">{t("countdown_to")}</p>
          <div className="grid grid-cols-4 gap-3 sm:gap-6 mt-4">
            {[
              { v: c.d, label: t("days") },
              { v: c.h, label: t("hours") },
              { v: c.m, label: t("mins") },
              { v: c.s, label: t("secs") },
            ].map((x) => (
              <div key={x.label} className="bg-white/5 rounded-2xl p-4 text-center">
                <div className="text-3xl sm:text-5xl font-semibold tabular-nums">{String(x.v).padStart(2, "0")}</div>
                <div className="text-[11px] sm:text-[12px] text-white/60 mt-1 uppercase tracking-wide">{x.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline list */}
        <ol className="relative border-l-2 border-neutral-200 ml-3 space-y-5">
          {events.map((e) => {
            const Icon = e.icon;
            const past = e.date.getTime() < Date.now();
            return (
              <li key={e.key} className="pl-6 relative">
                <span className={`absolute -left-[13px] top-1 w-6 h-6 rounded-full flex items-center justify-center ${past ? "bg-neutral-300" : "bg-[#ef4d23]"} text-white`}>
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200">
                  <div className="text-[15px] font-medium">{t(e.key as Parameters<typeof t>[0])}</div>
                  <div className="text-[13px] text-neutral-500 mt-0.5">{fmt(e.date)}</div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
