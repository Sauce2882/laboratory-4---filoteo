import "./ProductCard.css";

function ProductCard({ title, price, category = "General", inStock, onAddToCart, children }) {
  const formattedPrice = price.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className={`card ${inStock ? "" : "card--out"}`}>
      {children && <div className="card__badge">{children}</div>}
      <h3>{title}</h3>
      <p className="card__category">{category}</p>
      <p className="card__price">₱{formattedPrice}</p>
      <p className={inStock ? "stock stock--in" : "stock stock--out"}>
        {inStock ? "In Stock" : "Out of Stock"}
      </p>
      <button disabled={!inStock} onClick={() => onAddToCart(title)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
