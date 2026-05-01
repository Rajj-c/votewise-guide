import { useI18n } from "@/i18n/I18n";

export default function LearnSection() {
  const { t } = useI18n();
  const cards = [
    { t: "learn_evm_t", d: "learn_evm_d" },
    { t: "learn_nota_t", d: "learn_nota_d" },
    { t: "learn_vvpat_t", d: "learn_vvpat_d" },
    { t: "learn_count_t", d: "learn_count_d" },
  ] as const;

  return (
    <section id="learn" className="px-3 sm:px-4 py-12 sm:py-20 bg-[#ededed]">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-8">
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight">
            {t("sec_learn_title").split("—")[0].trim()}{" "}
            <span className="font-serif-i">— {t("sec_learn_title").split("—")[1]?.trim()}</span>
          </h2>
          <p className="text-neutral-600 mt-3">{t("sec_learn_sub")}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((c, i) => (
            <article key={c.t} className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200 relative overflow-hidden">
              <span className="absolute top-5 right-5 text-[11px] text-[#ef4d23] font-medium">0{i + 1}</span>
              <h3 className="text-[20px] sm:text-[22px] font-medium tracking-tight">{t(c.t)}</h3>
              <p className="text-[14px] text-neutral-600 leading-relaxed mt-3">{t(c.d)}</p>
            </article>
          ))}
        </div>

        <p className="text-center text-[12px] text-neutral-500 mt-10">{t("footer")}</p>
      </div>
    </section>
  );
}
