import { useState, useMemo } from "react";
import { ChevronDown, TrendingDown, TrendingUp, X } from "lucide-react";
import Gauge from "./Gauge";
import { useI18n } from "@/i18n/I18n";

// Days until next general voting day (placeholder: April 19, 2029 = next general election cycle)
const VOTING_DAY = new Date("2029-04-19T07:00:00+05:30");

export default function DashboardPreview() {
  const { t } = useI18n();
  const daysLeft = useMemo(() => {
    const ms = VOTING_DAY.getTime() - Date.now();
    return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
  }, []);

  const [age, setAge] = useState("21");
  const [citizen, setCitizen] = useState(true);
  const [result, setResult] = useState<null | "yes" | "no_age" | "no_citizen">(null);

  const check = () => {
    const a = parseInt(age || "0", 10);
    if (!citizen) setResult("no_citizen");
    else if (a < 18) setResult("no_age");
    else setResult("yes");
  };
  const reset = () => { setAge("21"); setCitizen(true); setResult(null); };

  return (
    <div className="bg-tray rounded-3xl p-4 sm:p-6 w-full max-w-[880px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Card 1 — Days to vote */}
        <div className="bg-white rounded-2xl p-5">
          <div className="flex items-baseline justify-between text-[13px]">
            <span className="text-[#ef4d23] font-medium">{t("card_days_title")}</span>
            <span className="text-neutral-500">{t("card_days_sub")}</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[28px] font-semibold leading-none">{daysLeft.toLocaleString()}</span>
            <span className="bg-red-50 text-red-600 rounded-full px-2 py-0.5 flex items-center gap-1 text-[11px]">
              <TrendingDown className="w-3 h-3" /> -1 / day
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">until polling opens</p>

          <p className="text-center text-[12px] text-neutral-600 mt-4">{t("card_days_label")}</p>
          <Gauge value={92} color="#ef4d23" showLabels min="389K" max="425K" />

          <div className="bg-neutral-100 rounded-full p-1 flex mt-3 text-[12px]">
            <span className="flex-1 text-center bg-white rounded-full py-1 shadow-sm">{t("toggle_left")}</span>
            <span className="flex-1 text-center text-neutral-500 py-1">{t("toggle_right")}</span>
          </div>
        </div>

        {/* Card 2 — Quick eligibility form */}
        <div className="bg-white rounded-2xl p-5 flex flex-col gap-3">
          <div className="text-[13px] text-[#ef4d23] font-medium">{t("card_form_title")}</div>

          <div>
            <label className="text-[12px] text-neutral-700 block mb-1">{t("card_form_age")}</label>
            <div className="flex items-center border border-neutral-200 rounded-lg px-3 py-2 text-[13px]">
              <span className="text-neutral-400 mr-1">#</span>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full outline-none"
                min={0}
              />
            </div>
          </div>

          <div>
            <label className="text-[12px] text-neutral-700 block mb-1">{t("card_form_citizen")}</label>
            <button
              onClick={() => setCitizen(!citizen)}
              className="w-full flex items-center justify-between border border-neutral-200 rounded-lg px-3 py-2 text-[13px]"
            >
              <span>{citizen ? t("card_form_yes") : t("card_form_no")}</span>
              <ChevronDown className="w-4 h-4 text-neutral-400" />
            </button>
          </div>

          {result && (
            <div className={`text-[12px] rounded-lg px-3 py-2 ${result === "yes" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
              {result === "yes" ? t("elig_yes") : result === "no_age" ? t("elig_no_age") : t("elig_no_citizen")}
            </div>
          )}

          <div className="flex items-center gap-3 mt-auto pt-2">
            <button onClick={check} className="bg-[#ef4d23] text-white rounded-lg px-5 py-2 text-[13px]">
              {t("card_form_save")}
            </button>
            <button onClick={reset} className="underline text-[13px] text-neutral-700">{t("card_form_cancel")}</button>
            <button onClick={reset} className="ml-auto text-neutral-400" aria-label="Close"><X className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Card 3 — Turnout */}
        <div className="bg-white rounded-2xl p-5">
          <div className="flex items-baseline justify-between text-[13px]">
            <span className="text-[#ef4d23] font-medium">{t("card_turnout_title")}</span>
            <span className="text-neutral-500">{t("card_turnout_sub")}</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[28px] font-semibold leading-none">68%</span>
            <span className="bg-neutral-100 text-neutral-600 rounded-full px-2 py-0.5 flex items-center gap-1 text-[11px]">
              <TrendingUp className="w-3 h-3" /> +2.4%
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">vs last election</p>

          <p className="text-center text-[12px] text-neutral-600 mt-4">{t("card_turnout_label")}</p>
          <Gauge value={68} color="#9ca3af" />

          <div className="bg-neutral-100 rounded-full p-1 flex mt-3 text-[12px]">
            <span className="flex-1 text-center bg-white rounded-full py-1 shadow-sm">Urban</span>
            <span className="flex-1 text-center text-neutral-500 py-1">Rural</span>
          </div>
        </div>
      </div>
    </div>
  );
}
