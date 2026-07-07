# Learning Log — Expense Tracker Frontend

## Day 1 — React Setup & Controlled Form Inputs

**What I did:**

- Set up a new React project using Vite
- Cleared out the default demo content
- Built a form with three inputs (amount, category, description) using useState
- Debugged a typo where <input> was accidentally written as <import>
- Confirmed state updates correctly using console.log and the browser DevTools console

**Commands I learned:**

- npm create vite@latest — scaffolds a new Vite + React project
- npm install — installs dependencies listed in package.json
- npm run dev — starts the local development server

**Concepts I learned:**

- A React component is a JavaScript function that returns JSX (HTML-like syntax inside JS)
- useState(initialValue) returns a [value, setValue] pair — reading the value and a function to update it
- Updating state via its setter function automatically re-renders the component — this is React's core mechanic
- A "controlled input" ties an input's value directly to state (value={x}) and updates that state on every keystroke (onChange)
- e.target.value inside an onChange handler gives you the input's current text
- import is a reserved JavaScript keyword — it can't be used as a tag/component name, which caused a rendering error when typed instead of <input>
- Browser DevTools console is essential for debugging React state and catching errors during development

## Day 2 — Form Submission

**What I did:**

- Built handleSubmit() to handle the form's submit event
- Used e.preventDefault() to stop the default full-page reload
- Converted the amount from a string to a number using parseFloat()
- Bundled form state into a single object matching the API's expected shape

**Concepts I learned:**

- HTML forms reload the page by default on submit — e.preventDefault() stops this, essential in React forms
- onSubmit={handleSubmit} wires a function to run when the form is submitted
- parseFloat() converts a string to a decimal number, same underlying reason as float() in Python
- Structuring form state into one object makes it easy to send as an API request body later

## Day 3 — Connecting to the API & CORS

**What I did:**

- Updated handleSubmit to send a POST request to the API using fetch
- Hit and fixed a CORS error by adding CORSMiddleware to the FastAPI backend
- Debugged a port mismatch (Vite ran on 5174, not the default 5173) causing CORS to still fail
- Confirmed the frontend and backend can communicate — received a "Not authenticated" response as expected, since no login has happened yet

**Concepts I learned:**

- fetch(url, options) sends an HTTP request from JavaScript; options include method, headers, and body
- JSON.stringify() converts a JS object to a JSON string for sending; response.json() parses a JSON response back into a JS object
- CORS is a browser security feature blocking requests between different origins (ports count as different origins) unless the server explicitly allows it
- CORSMiddleware in FastAPI must list the exact origin(s) allowed to make requests
- Vite doesn't always run on its default port — if that port is taken, it silently picks the next one, which can cause confusing CORS mismatches
- The browser's Network tab (not just Console) is essential for debugging failed requests — it shows the actual request/response details

## Day 4 — Login Form & Storing the Token

**What I did:**

- Added a login form (username/password) with its own state
- Built handleLogin() to send credentials to /login using form-encoded data
- Stored the returned access token in React state

**Concepts I learned:**

- The /login endpoint expects form-encoded data (URLSearchParams), not JSON, since it uses FastAPI's OAuth2PasswordRequestForm
- response.ok is a quick way to check if a fetch request succeeded (status 200-299) before processing the response
- Storing the token in state makes it available to the rest of the component, ready to attach to future authenticated requests

## Day 5 — Authenticated Requests & the Full Flow

**What I did:**

- Added the Authorization header (Bearer <token>) to the expense POST request
- Debugged a bug where the token wasn't being inserted — used single quotes instead of backticks, so ${token} was sent as literal text instead of the actual value
- Confirmed the full flow works: login -> token stored -> authenticated request -> expense saved to the database

**Concepts I learned:**

- Template literals require backticks (`), not single or double quotes — ${} interpolation only works inside backticks
- The Authorization header format for bearer tokens is exactly "Bearer <token>"
- The browser's Network tab Headers section is the definitive way to check exactly what a request actually sent, rather than guessing from code alone
- This bug looked like an auth/token problem but was actually a plain JavaScript syntax issue — worth checking the simplest explanation before assuming something complex is wrong

## Day 6 — Displaying the Expense List

**What I did:**

- Added expenses state and a fetchExpenses() function to GET data from the API
- Used useEffect to automatically fetch expenses whenever the token changes (i.e. right after login)
- Called fetchExpenses() again after successfully adding a new expense, to keep the list in sync
- Rendered the expense list using .map() to turn API data into JSX elements
- Fixed a typo: userEffect instead of useEffect

**Concepts I learned:**

- useEffect(fn, [dependency]) runs a function whenever something in the dependency array changes — here, it runs fetchExpenses() automatically when token changes from empty to a real value
- .map() transforms an array of data into an array of JSX elements — the standard way to render lists in React
- Every list item needs a unique key prop (here, expense.id) so React can track items efficiently
- Re-fetching data after a mutation (like adding an expense) is a common pattern to keep the UI in sync with the backend

## Day 7 — Logged-in/Logged-out UI & Polish

**What I did:**

- Cleared the expense form fields after successful submission
- Used a ternary operator to conditionally show the login form or the expense tracker, based on whether a token exists
- Used a Fragment (<>...</>) to group multiple elements without an extra wrapping div
- Added a Logout button that clears the token
- Fixed a bug where the login form stayed pre-filled after logout by also clearing username and password state

**Concepts I learned:**

- {condition ? A : B} is a ternary operator — JSX's inline way of conditionally rendering one thing or another
- A Fragment (<>...</>) groups elements without adding an extra DOM node, since JSX requires returning a single root element
- An arrow function's body can be a single expression (() => doThing()) or a block with multiple statements ({ doThing(); doOtherThing() })
- Clearing all related state (not just the most obvious piece) matters for both UX and security — a password left visible after logout is a real issue, not just cosmetic

## Day 8 — Edit & Delete Functionality

**What I did:**

- Added handleDelete() to remove an expense via the DELETE endpoint
- Added editingId state to track which expense (if any) is being edited
- Added startEdit() to pre-fill the form with an existing expense's values
- Updated handleSubmit() to conditionally POST (create) or PUT (update) depending on whether editingId is set
- Updated the submit button's label to reflect the current mode

**Concepts I learned:**

- Wrapping a handler in an arrow function (onClick={() => handleDelete(id)}) delays execution until the click happens — without it, the function would run immediately on render
- A single piece of state (editingId) can control multiple parts of the UI at once: which URL/method to use, what the button says, and whether the form is in "add" or "edit" mode
- Reusing existing form state for editing (rather than building a separate edit form) keeps the code simpler and avoids duplication

## Day 9 — Basic CSS Styling

**What I did:**

- Added global styling in index.css (body font, background)
- Added component styling in App.css (container, forms, buttons, list)
- Applied a className to the outer container for consistent card-style layout

**Concepts I learned:**

- JSX uses className instead of class, since class is a reserved JavaScript keyword
- index.css applies globally across the whole page, while App.css is scoped to styling this specific component's elements
- Small, consistent details (spacing, border-radius, hover states) make a big visual difference even with minimal CSS
