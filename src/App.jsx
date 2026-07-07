import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();

    const expenseData = {
      amount: parseFloat(amount),
      category: category,
      description: description,
    };

    const url = editingId
      ? `http://127.0.0.1:8000/expenses/${editingId}`
      : "http://127.0.0.1:8000/expenses";

    const method = editingId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expenseData),
      });

      if (!response.ok) {
        console.error("Failed to save expense");
        return;
      }

      fetchExpenses();
      setAmount("");
      setCategory("");
      setDescription("");
      setEditingId(null);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      if (!response.ok) {
        console.error("Login failed");
        return;
      }

      const data = await response.json();
      setToken(data.access_token);
      console.log("Logged in! Token:", data.access_token);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function fetchExpenses() {
    if (!token) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch expenses");
        return;
      }

      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function handleDelete(expenseId) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/expenses/${expenseId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        console.error("Failed to delete expense");
        return;
      }

      fetchExpenses();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function startEdit(expense) {
    setEditingId(expense.id);
    setAmount(expense.amount);
    setCategory(expense.category);
    setDescription(expense.description);
  }

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const byCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  return (
    <div className="app-container">
      <h1>Expense Tracker</h1>

      {!token ? (
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      ) : (
        <>
          <button
            onClick={() => {
              setToken("");
              setUsername("");
              setPassword("");
            }}
          >
            Logout
          </button>

          <form onSubmit={handleSubmit}>
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">
              {editingId ? "Update Expense" : "Add Expense"}
            </button>
          </form>

          <ul>
            {expenses.map((expense) => (
              <li key={expense.id}>
                {expense.description} - {expense.amount} ({expense.category})
                <button onClick={() => startEdit(expense)}>Edit</button>
                <button onClick={() => handleDelete(expense.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <div className="summary">
            <h2>Summary</h2>
            <p>Total spent: {total}</p>
            <ul>
              {Object.entries(byCategory).map(([category, amount]) => (
                <li key={category}>
                  {category}: {amount}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
