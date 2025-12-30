export const getWishlist = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("wishlist")) || [];
};

// Add item only if not present
export const addToWishlist = (product) => {
  const wishlist = getWishlist();
  const exists = wishlist.find((item) => item.id === product.id);

  if (!exists) {
    wishlist.push({
      id: product.id,
      name:
        product.name ||
        product.title ||
        product.productName ||
        "Unnamed Product",
      image: product.image,
      price: product.price,
      mrp: product.mrp,
      discount: product.discount,
    });
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    window.dispatchEvent(new Event("wishlist-updated"));
  }
};

// Remove one item
export const removeFromWishlist = (id) => {
  const wishlist = getWishlist().filter((item) => item.id !== id);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  window.dispatchEvent(new Event("wishlist-updated"));
};

//  TOGGLE LOGIC ADDED (add/remove in single click)
export const toggleWishlist = (product) => {
  const wishlist = getWishlist();
  const exists = wishlist.find((item) => item.id === product.id);

  if (exists) {
    // if present → remove
    removeFromWishlist(product.id);
  } else {
    // if not present → add
    addToWishlist(product);
  }
};

export const isInWishlist = (id) => {
  return getWishlist().some((item) => item.id === id);
};
