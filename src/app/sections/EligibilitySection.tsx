import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { useI18n } from "@/i18n/I18n";

export default function EligibilitySection() {
  const { t } = useI18n();
  const [age, setAge] = useState<number | "">("");
  const [citizen, setCitizen] = useState<null | boolean>(null);
  const [result, setResult] = useState<null | "yes" | "no_age" | "no_citizen">(null);

  const submit = () => {
    if (citizen === false) return setResult("no_citizen");
    if (typeof age !== "number" || age < 18) return setResult("no_age");
    setResult("yes");
  };

  return (
    <section id="eligibility" className="px-3 sm:px-4 py-12 sm:py-20">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight">
            {t("sec_elig_title").split(" ").slice(0, -1).join(" ")}{" "}
            <span className="font-serif-i">{t("sec_elig_title").split(" ").slice(-1)}</span>
          </h2>
          <p className="text-neutral-600 mt-3">{t("sec_elig_sub")}</p>
        </header>

        <div className="bg-tray rounded-3xl p-5 sm:p-8 space-y-5">
          <div className="bg-white rounded-2xl p-5">
            <label className="text-[13px] text-neutral-700">{t("q_age")}</label>
            <input
              type="number"
              value={age}
              min={0}
              onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))}
              className="mt-2 w-full text-2xl font-semibold outline-none bg-transparent"
              placeholder="18"
            />
          </div>

          <div className="bg-white rounded-2xl p-5">
            <label className="text-[13px] text-neutral-700">{t("q_citizen")}</label>
            <div className="mt-3 flex gap-2">
              {[
                { v: true, label: t("card_form_yes") },
                { v: false, label: t("card_form_no") },
              ].map((o) => (
                <button
                  key={String(o.v)}
                  onClick={() => setCitizen(o.v)}
                  className={`flex-1 rounded-xl py-3 text-[14px] border transition ${
                    citizen === o.v
                      ? "bg-[#0b0f1a] text-white border-[#0b0f1a]"
                      : "bg-white text-neutral-800 border-neutral-200"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={submit}
            className="w-full bg-[#ef4d23] text-white rounded-xl py-3 text-[14px] font-medium"
          >
            {t("card_form_save")}
          </button>

          {result && (
            <div className={`rounded-2xl p-5 flex items-start gap-3 ${result === "yes" ? "bg-green-50" : "bg-red-50"}`}>
              {result === "yes" ? (
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600 shrink-0" />
              )}
              <div>
                <p className={`text-[15px] font-medium ${result === "yes" ? "text-green-800" : "text-red-800"}`}>
                  {result === "yes" ? t("elig_yes") : result === "no_age" ? t("elig_no_age") : t("elig_no_citizen")}
                </p>
                {result === "yes" && (
                  <div className="mt-3 text-[13px] text-green-900">
                    <p className="font-medium">{t("elig_docs")}</p>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>{t("doc_1")}</li>
                      <li>{t("doc_2")}</li>
                      <li>{t("doc_3")}</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
