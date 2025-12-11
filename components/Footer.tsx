import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
	return (
		<footer className="footer">
			{/* Newsletter Section */}
			<div className="footer-newsletter">
				<h2>Join Our Newsletter Now</h2>
				<p>
					Be the first to know about new designs, events and more
				</p>

				<div className="newsletter-input-wrap">
					<input
						type="email"
						placeholder="Your email"
						className="newsletter-input"
					/>
					<button className="newsletter-btn">Subscribe</button>
				</div>
			</div>

			{/* Links Section */}
			<div className="footer-links">
				<div className="links-col">
					<h3>Useful Links</h3>
					<ul>
						<li>Delivery Information</li>
						<li>International Shipping</li>
						<li>Payment Options</li>
						<li>Track Your Order</li>
						<li>Returns</li>
						<li>Find a Store</li>
					</ul>
				</div>

				<div className="links-col">
					<h3>Information</h3>
					<ul>
						<li>Blog</li>
						<li>Offers and More</li>
						<li>Help & FAQs</li>
						<li>About Surya Vastra</li>
					</ul>
				</div>
			</div>

			<div className="footer-divider">
				<div></div>
			</div>

			{/* Help Desk */}
			<div className="footer-helpdesk">
				<h3>Help Desk</h3>

				<div className="helpdesk-grid">
					<div className="help-box">
						<FaPhoneAlt className="help-icon" />
						<span>+91 98765 432XX</span>
					</div>

					<div className="help-box">
						<FaEnvelope className="help-icon" />
						<span>support@suryavastra.com</span>
					</div>
				</div>

				<p className="timing">Mon – Sat : 10:00 AM – 7:00 PM</p>
			</div>

			{/* Social Icons */}
			<div className="footer-social">
				<div className="social-icon">
					<img src="/img/youtube.png" alt="YouTube" />
				</div>
				<div className="social-icon">
					<img src="/img/facebook.png" alt="Facebook" />
				</div>
				<div className="social-icon">
					<img src="/img/instagram.png" alt="Instagram" />
				</div>
				<div className="social-icon">
					<img src="/img/pinterest.png" alt="Pinterest" />
				</div>
			</div>
		</footer>
	);
}
