import BannerSlider from "@/components/home/BannerSlides";
import BestSeller from "@/components/home/Bestseller";
import BudgetGrid from "@/components/home/BudgetGrid";
import FeaturedCollection from "@/components/home/Featured";
import Testimonials from "@/components/home/Testimonials";
import TopSlider from "@/components/home/TopSlider";
import VideoBannerWithSlider from "@/components/home/VideoAndSlides";
import { FiSearch } from "react-icons/fi";

const HomePage = () => {
	return (
		<section>
			{/* Search Bar */}
			<div className="search-container">
				<FiSearch className="search-icon" />
				<input
					type="text"
					placeholder="Search here"
					className="search-input"
				/>
			</div>

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
