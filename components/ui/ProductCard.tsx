type Props = {
	image: string;
	discount: string;
	name: string;
	price: number;
	origPrice: number;
};

export default function ProductCard({
	image,
	discount,
	name,
	price,
	origPrice,
}: Props) {
	const truncate = (text: string, max = 25) => {
		if (text.length <= max) return text;

		const shortened = text.slice(0, max);
		const lastSpace = shortened.lastIndexOf(" ");

		return (
			(lastSpace > 0 ? shortened.slice(0, lastSpace) : shortened) +
			" …"
		);
	};

	return (
		<div className="product-card">
			<div className="product-img-wrap">
				<img src={image} alt={name} />

				<span className="product-tag">{discount} OFF</span>
			</div>

			<h3 className="product-name">{truncate(name)}</h3>

			<div className="product-prices">
				<span className="price">₹{price}</span>
				<span className="orig-price">₹{origPrice}</span>
			</div>

			<button className="add-cart-btn">Add to Cart</button>
		</div>
	);
}
