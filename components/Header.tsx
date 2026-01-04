import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import { clearCart } from "@/utils/cart";
import { clearWishlist } from "@/utils/wishlist";
function Header() {
  return (
    <header className="header">
      <div className="header-banner">
        <p>Enjoy extra 10% off on your first purchase</p>
      </div>

      <div className="header-icons">
        <LuMenu size={28} />

        <img src="/img/logo.png" alt="Logo" />

        <div className="header-icon-seperator">
          <IoMdHeartEmpty size={28} />
          <IoCartOutline size={28} />
        </div>
      </div>
    </header>
  );
}

export default Header;
