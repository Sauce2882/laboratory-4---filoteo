# Laboratory Exercise 3: React Props and Component Communication

Mini Product Catalog ("CvSU Mini Store") built with React + Vite.

## Run
npm install
npm run dev

## Guide Questions (Lab 3)

1. **What is the difference between props and state?**
   Props are values passed down from a parent component to a child, and they are read-only. State is data that a component owns and manages itself, and it can change over time, which makes the component re-render.

2. **Why can a child component not modify the props it receives?**
   Props belong to the parent, so React treats them as read-only. This keeps data flowing in one direction (parent to child), which makes the app predictable and easier to debug. If a child needs to change something, it asks the parent to do it.

3. **How does the onAddToCart callback allow data to flow from child to parent even though props only flow downward?**
   The parent passes a function down as a prop. The child does not change the parent's data directly. It just calls that function when the button is clicked and passes the product title as an argument. The function runs in the parent, so the parent receives the data and updates its own state (the cart count and last added item).

4. **Why is the key prop required when rendering a list with .map()? What could happen if it is missing or duplicated?**
   The key gives each item in the list a unique identity, so React can tell which items were added, removed, or changed and update only those. If it is missing or duplicated, React shows a warning and may re-render the wrong items, mix up their data or state, or perform slower updates.

5. **What does the children prop allow you to do that a normal prop does not?**
   The children prop lets a parent put any content (text, elements, or other components) between the opening and closing tags of a component, such as a <span>New</span> badge inside ProductCard. A normal prop passes a single value like a string or number, while children lets the component display flexible, custom content.

---

# Laboratory Exercise 4: React useState and useEffect (Live Search and Filter)

Branch: `lab4-livesearch`. Adds a SearchBar (keyword, category, sort, Clear Filters), a 300ms debounced search, result count, empty state, and a document title effect.

## Guide Questions (Lab 4)

1. **Why do we use two separate states, searchText and debouncedSearch, instead of only one?**
   searchText updates on every keystroke so the input always shows what the user typed. debouncedSearch only updates after the user pauses for 300ms, and it is the value used for filtering. With one state, the list would re-filter on every keystroke, and delaying that state would make the input itself feel laggy.

2. **What would happen if the debounce effect did not return a cleanup function?**
   Every keystroke would start its own timer and none would be cancelled. Each timer would still fire later, so debouncedSearch would be updated many times, once per keystroke, and the debounce would not work. Old timers could also set outdated values.

3. **What is the purpose of the dependency array? What happens if it is empty ([])? What happens if it is left out completely?**
   The dependency array tells React when to re-run the effect: only when one of the listed values has changed. If it is empty, the effect runs only once, after the first render. If it is left out, the effect runs after every render, which can cause unnecessary work or infinite loops when the effect updates state.

4. **Why should we avoid sorting the original products array directly?**
   sort() changes the array in place (mutation). Mutating the original data can cause bugs, because other parts of the app may rely on the original order, and React expects data not to be mutated. Also, the Default order could never be restored. So we copy the array with the spread operator first, then sort the copy.

5. **Is the filtered product list better stored in its own state, or calculated from existing state during rendering? Explain your choice.**
   It is better to calculate it during rendering. The filtered list can always be derived from debouncedSearch, category, sortOrder, and the products array, so storing it in another state would duplicate data and risk the two getting out of sync (and would need extra effects to update it). Calculating it each render keeps one source of truth and the list always matches the current filters.
