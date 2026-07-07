import { useState } from "react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newExpense = {
      amount: parseFloat(amount),
      category: category,
      description: description,
    };

    console.log(newExpense);
  }

  return (
    <div>
      <h1>Expense Tracker</h1>

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
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default App;
