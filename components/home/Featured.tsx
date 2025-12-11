export default function FeaturedCollection() {
	return (
		<section className="featured-section">
			{/* Full-width Top Image */}
			<div className="featured-hero">
				<img src="/img/design.png" alt="Featured" />
			</div>

			{/* Title + Subtitle */}
			<div className="featured-header">
				<h2>Featured Collection</h2>
				<p>A Companion For Every Occasion</p>
			</div>

			{/* Grid Section */}
			<div className="featured-grid">
				{/* Left Column */}
				<div className="grid-col">
					<div className="grid-img large">
						<img src="/img/img-14.jpg" alt="Item" />
						<div className="grid-gradient"></div>
						<span className="grid-text">Silk</span>
					</div>

					<div className="grid-img small">
						<img src="/img/img-9.jpg" alt="Item" />
						<div className="grid-gradient"></div>
						<span className="grid-text">Party Wear</span>
					</div>
				</div>

				{/* Right Column */}
				<div className="grid-col">
					<div className="grid-img small">
						<img src="/img/img-20.jpg" alt="Item" />
						<div className="grid-gradient"></div>
						<span className="grid-text">Daily Wear</span>
					</div>

					<div className="grid-img large">
						<img src="/img/img-7.jpg" alt="Item" />
						<div className="grid-gradient"></div>
						<span className="grid-text">Banarasi</span>
					</div>
				</div>
			</div>
		</section>
	);
}
