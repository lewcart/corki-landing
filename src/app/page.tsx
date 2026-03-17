import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { SocialProof } from "@/components/sections/social-proof";
import { FeatureScan } from "@/components/sections/feature-scan";
import { FeatureAsk } from "@/components/sections/feature-ask";
import { FeatureCellar } from "@/components/sections/feature-cellar";
import { HowItWorks } from "@/components/sections/how-it-works";
import { UseCases } from "@/components/sections/use-cases";
import { Pricing } from "@/components/sections/pricing";
import { Testimonial } from "@/components/sections/testimonial";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SocialProof />
        <FeatureScan />
        <FeatureAsk />
        <FeatureCellar />
        <HowItWorks />
        <UseCases />
        <Pricing />
        <Testimonial />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
