import { useState, useEffect } from "react";
import products from "./data/products";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  // Cart state (Lab 3)
  const [count, setCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");

  // Search and filter state (Lab 4)
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  // Debounce: wait 300ms after the last keystroke before filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);
    return () => clearTimeout(timer); // cleanup
  }, [searchText]);

  const handleAddToCart = (title) => {
    setCount(count + 1);
    setLastAdded(title);
  };

  const handleClear = () => {
    setSearchText("");
    setDebouncedSearch("");
    setCategory("All");
    setSortOrder("default");
  };

  // Derived list: calculated during render, original array is never modified
  const filteredProducts = [...products]
    .filter((p) => p.title.toLowerCase().includes(debouncedSearch.trim().toLowerCase()))
    .filter((p) => category === "All" || p.category === category)
    .sort((a, b) => {
      if (sortOrder === "low-high") return a.price - b.price;
      if (sortOrder === "high-low") return b.price - a.price;
      return 0;
    });

  // Update the browser tab title whenever the number of results changes
  useEffect(() => {
    document.title = `CvSU Mini Store (${filteredProducts.length} results)`;
  }, [filteredProducts.length]);

  return (
    <div className="app">
      <h1 className="app__title">CvSU Mini Store</h1>
      <p className="cart-message">
        {count === 0
          ? "Your cart is empty."
          : `Items added to cart: ${count} (Last added: ${lastAdded})`}
      </p>

      <SearchBar
        searchText={searchText}
        onSearchChange={setSearchText}
        category={category}
        onCategoryChange={setCategory}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        onClear={handleClear}
      />

      <p className="results-count">
        Showing {filteredProducts.length} of {products.length} products
      </p>

      {filteredProducts.length === 0 ? (
        <p className="empty-state">No products found. Try a different keyword or category.</p>
      ) : (
        <div className="grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              category={product.category}
              inStock={product.inStock}
              onAddToCart={handleAddToCart}
            >
              {product.id === 1 && <span>New</span>}
              {product.id === 5 && <span>Sale</span>}
            </ProductCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
