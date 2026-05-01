import { I18nProvider } from "@/i18n/I18n";
import Hero from "@/app/components/Hero";
import GuideSection from "@/app/sections/GuideSection";
import TimelineSection from "@/app/sections/TimelineSection";
import EligibilitySection from "@/app/sections/EligibilitySection";
import LearnSection from "@/app/sections/LearnSection";

const Index = () => {
  return (
    <I18nProvider>
      <main>
        <Hero />
        <GuideSection />
        <TimelineSection />
        <EligibilitySection />
        <LearnSection />
      </main>
    </I18nProvider>
  );
};

export default Index;
