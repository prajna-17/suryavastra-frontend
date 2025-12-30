import BannerSlider from "@/components/components-jsx/home/BannerSlides";
import BestSeller from "@/components/components-jsx/home/Bestseller";
import BudgetGrid from "@/components/components-jsx/home/BudgetGrid";
import FeaturedCollection from "@/components/components-jsx/home/Featured";
import Testimonials from "@/components/components-jsx/home/Testimonials";
import TopSlider from "@/components/components-jsx/home/TopSlider";
import VideoBannerWithSlider from "@/components/components-jsx/home/VideoAndSlides";

const HomePage = () => {
  return (
    <section>
      <TopSlider />
      <BannerSlider />
      <FeaturedCollection />
      <BestSeller />
      <BudgetGrid />
      <VideoBannerWithSlider />
      <Testimonials />
    </section>
  );
};

export default HomePage;
