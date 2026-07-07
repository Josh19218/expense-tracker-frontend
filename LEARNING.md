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
