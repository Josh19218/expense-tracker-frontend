# Expense Tracker Frontend

A React frontend for the Expense Tracker API — lets users register, log in, and manage their expenses through a simple web interface.

## Features

- Login with JWT-based authentication
- Add expenses with amount, category, and description
- View a live list of expenses, pulled from a real backend and database
- Logout, with proper state cleanup

## Tech stack

- **React** (with Vite)
- **Fetch API** for communicating with the backend
- Talks to the [Expense Tracker API](https://github.com/Josh19218/expense-tracker-api), a FastAPI backend with JWT auth and a SQLite database

## How to run

1. Clone this repository
2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`
3. Make sure the [Expense Tracker API](https://github.com/Josh19218/expense-tracker-api) is running locally at `http://127.0.0.1:8000`
4. Start the dev server:
   \`\`\`
   npm run dev
   \`\`\`
5. Open the printed local URL (usually `http://localhost:5173`) in your browser

## What I learned

This project was my introduction to frontend development and connecting a UI to a real backend. Key things I learned:

- Core React concepts: components, JSX, state (useState), and effects (useEffect)
- Controlled form inputs and handling form submission
- Making authenticated HTTP requests with fetch, including handling CORS
- Managing an authentication flow entirely in the frontend: storing a token, attaching it to requests, and clearing it on logout
- Debugging real issues: CORS mismatches, incorrect template literal syntax, and typos in JSX tags

A full day-by-day breakdown is in [LEARNING.md](LEARNING.md).

## Related projects

This frontend is part of a three-part portfolio project:

- [Expense Tracker CLI](https://github.com/Josh19218/expense-tracker) — the original command-line version, built to learn Python fundamentals
- [Expense Tracker API](https://github.com/Josh19218/expense-tracker-api) — the FastAPI backend this frontend connects to

## Possible future improvements

- Add delete and edit buttons for existing expenses
- Add proper styling
- Show a spending summary (total, by category)
- Deploy live
