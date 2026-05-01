import { useState } from "react";
import { ChevronRight, UserPlus, IdCard, MapPin, Plane } from "lucide-react";
import { useI18n } from "@/i18n/I18n";

type PathKey = "new" | "have" | "moved" | "nri";

export default function GuideSection() {
  const { t } = useI18n();
  const [path, setPath] = useState<PathKey>("new");

  const paths: { key: PathKey; label: string; icon: React.ReactNode; steps: (keyof typeof labels)[] }[] = [
    { key: "new", label: t("guide_new"), icon: <UserPlus className="w-4 h-4" />, steps: ["step_register", "step_doc", "step_check", "step_epic", "step_locate", "step_vote"] },
    { key: "have", label: t("guide_have_id"), icon: <IdCard className="w-4 h-4" />, steps: ["step_have_check", "step_have_booth", "step_have_vote"] },
    { key: "moved", label: t("guide_moved"), icon: <MapPin className="w-4 h-4" />, steps: ["step_moved_form8a", "step_moved_proof", "step_moved_wait", "step_have_booth", "step_have_vote"] },
    { key: "nri", label: t("guide_nri"), icon: <Plane className="w-4 h-4" />, steps: ["step_nri_form6a", "step_nri_passport", "step_nri_vote"] },
  ];

  const active = paths.find((p) => p.key === path)!;

  return (
    <section id="guide" className="px-3 sm:px-4 py-12 sm:py-20">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-8">
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight">
            {t("sec_guide_title").split(" ").slice(0, -1).join(" ")}{" "}
            <span className="font-serif-i">{t("sec_guide_title").split(" ").slice(-1)}</span>
          </h2>
          <p className="text-neutral-600 mt-3">{t("sec_guide_sub")}</p>
        </header>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {paths.map((p) => (
            <button
              key={p.key}
              onClick={() => setPath(p.key)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] border transition ${
                path === p.key
                  ? "bg-[#0b0f1a] text-white border-[#0b0f1a]"
                  : "bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400"
              }`}
            >
              {p.icon}
              {p.label}
            </button>
          ))}
        </div>

        <ol className="bg-tray rounded-3xl p-4 sm:p-6 space-y-3">
          {active.steps.map((s, i) => (
            <li key={s} className="bg-white rounded-2xl p-4 sm:p-5 flex items-start gap-4">
              <span className="shrink-0 w-8 h-8 rounded-full bg-[#ef4d23] text-white text-[13px] font-semibold flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-[14px] sm:text-[15px] leading-relaxed pt-1">{t(s)}</p>
              <ChevronRight className="ml-auto w-4 h-4 text-neutral-300 mt-2" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// dummy ref so TS narrows keys
const labels = {
  step_register: 1, step_doc: 1, step_check: 1, step_epic: 1, step_locate: 1, step_vote: 1,
  step_have_check: 1, step_have_booth: 1, step_have_vote: 1,
  step_moved_form8a: 1, step_moved_proof: 1, step_moved_wait: 1,
  step_nri_form6a: 1, step_nri_passport: 1, step_nri_vote: 1,
};
