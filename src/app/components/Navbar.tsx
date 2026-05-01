import { useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { useI18n, LANGS } from "@/i18n/I18n";

function Logo() {
  return (
    <img src="/android-chrome-192x192.png" alt="Smart Election Guide Logo" className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-full" />
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t, lang, setLang } = useI18n();

  const links = [
    { label: t("nav_home"), href: "#home", dot: true },
    { label: t("nav_guide"), href: "#guide" },
    { label: t("nav_timeline"), href: "#timeline" },
    { label: t("nav_eligibility"), href: "#eligibility" },
    { label: t("nav_learn"), href: "#learn", accent: true },
  ];

  return (
    <div className="flex justify-center pt-4 sm:pt-6 px-3 sm:px-4">
      <div className="bg-white rounded-full shadow-sm border border-neutral-200 pl-2 pr-2 py-2 w-full max-w-[760px] relative flex items-center">
        <div className="flex items-center gap-2 pl-1">
          <Logo />
        </div>

        <nav className="hidden md:flex items-center gap-6 ml-6 text-[14px] text-neutral-800">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={`flex items-center gap-1.5 ${l.accent ? "text-[#ef4d23]" : ""}`}>
              {l.dot && <span className="inline-block w-[6px] h-[6px] rounded-full bg-black" style={{ borderWidth: 1.5 }} />}
              {l.label}
              {l.accent && <ChevronDown className="w-3.5 h-3.5" />}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* Language switcher */}
          <div className="hidden sm:flex items-center bg-neutral-100 rounded-full p-1 text-[12px]">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-2.5 py-0.5 rounded-full transition ${lang === l.code ? "bg-white shadow-sm text-neutral-900" : "text-neutral-500"}`}
              >
                {l.label}
              </button>
            ))}
          </div>



          <button className="md:hidden ml-1 p-2 text-neutral-700" onClick={() => setOpen(!open)} aria-label="Menu">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {open && (
          <div className="md:hidden absolute top-full left-2 right-2 mt-2 bg-white rounded-2xl shadow-lg border border-neutral-200 p-3 z-20">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block py-2 px-2 text-[14px] ${l.accent ? "text-[#ef4d23]" : "text-neutral-800"}`}
              >
                {l.label}
              </a>
            ))}
            <div className="flex sm:hidden items-center gap-1 mt-2 pt-2 border-t border-neutral-100">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-3 py-1 rounded-full text-[12px] ${lang === l.code ? "bg-[#ef4d23] text-white" : "bg-neutral-100 text-neutral-600"}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
