import React from "react";

const budgetItems = [
	{ id: 1, image: "/img/img-37.jpeg", label: "Under 499" },
	{ id: 2, image: "/img/img-13.jpg", label: "Under 999" },
	{ id: 3, image: "/img/img-2.jpg", label: "Under 1499" },
	{ id: 4, image: "/img/img-4.jpg", label: "Under 1999" },
	{ id: 5, image: "/img/img-5.jpg", label: "Under 2499" },
	{ id: 6, image: "/img/img-19.jpg", label: "Under 3999" },
];

const BudgetGrid: React.FC = () => {
	return (
		<section className="budget-section">
			<h2 className="budget-title">Style Under Your Budget</h2>

			<div className="budget-grid">
				{budgetItems.map((item) => (
					<div className="budget-card" key={item.id}>
						<img
							src={item.image}
							alt={item.label}
							className="budget-img"
						/>

						<div className="budget-label">
							<span>{item.label}</span>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default BudgetGrid;
