import FAQSection from "../components/home/FAQ";
// import JobSearchForm from "../components/home/FindJob";
import Hero from "../components/home/Hero";
import HowItWorks from "../components/home/HowItWorks";
import { RecommendationSection } from "../components/home/Recommendations";
import { Testimonials } from "../components/home/Testimonials";

// Home Page
export default function HomePage() {
  return (
    <main>
      <Hero />
      {/* <JobSearchForm /> */}
      <RecommendationSection />
      <HowItWorks />
      <Testimonials />
      <FAQSection />
    </main>
  );
}