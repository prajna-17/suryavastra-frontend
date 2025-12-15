import BannerSlider from "@/components/home/BannerSlides";
import BestSeller from "@/components/home/Bestseller";
import BudgetGrid from "@/components/home/BudgetGrid";
import FeaturedCollection from "@/components/home/Featured";
import Testimonials from "@/components/home/Testimonials";
import TopSlider from "@/components/home/TopSlider";
import VideoBannerWithSlider from "@/components/home/VideoAndSlides";

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
