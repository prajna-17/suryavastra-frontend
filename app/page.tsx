import BannerSlider from "@/components/home/BannerSlides";
import FeaturedCollection from "@/components/home/Featured";
import TopSlider from "@/components/home/TopSlider";
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
		</section>
	);
};

export default HomePage;
