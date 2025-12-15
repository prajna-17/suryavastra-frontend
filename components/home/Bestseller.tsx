import { robotoSlab } from "@/app/fonts";
import ProductCard from "../ui/ProductCard";
import { sarees } from "@/data/data";

export default function BestSeller() {
	const assuranceData = [
		{
			id: 1,
			image: "/img/grid-1.jpeg",
			title: "Quality Craftsmanship",
		},
		{
			id: 2,
			image: "/img/grid-2.jpeg",
			title: "Return Confirm",
		},
		{
			id: 3,
			image: "/img/grid-3.jpeg",
			title: "100% Transparency",
		},
	];

	return (
		<>
			<section
				className={`best-seller-section ${robotoSlab.className}`}
			>
				<h2 className="best-title">Best Seller</h2>

				<div className="best-banner">
					<img
						src="/img/banner-1.jpeg"
						alt="Best Seller Banner"
					/>
				</div>

				<div className="best-grid">
					{sarees.slice(0, 4).map((saree) => (
						<ProductCard
							key={saree.id}
							image={saree.images[0]}
							discount={saree.off}
							name={saree.name}
							price={saree.discountedPrice}
							origPrice={saree.price}
						/>
					))}
				</div>

				<button className="view-all-button">View All</button>
			</section>

			<section className="assurance-section">
				<h2 className="assurance-title">Surya Vastra Assurance</h2>
				<p className="assurance-subtitle">
					Crafted by experts, cherished by you
				</p>

				<div className="assurance-grid">
					{assuranceData.map((item) => (
						<div className="assurance-item" key={item.id}>
							<div className="assurance-img">
								<img
									src={item.image}
									alt={item.title}
								/>
							</div>
							<h3>{item.title}</h3>
						</div>
					))}
				</div>
			</section>
		</>
	);
}
