let expenses = []; 


const addExpense = (req, res) => {
  const { category, amount, date } = req.body;


  if (!["Food", "Travel", "Shopping", "Utilities"].includes(category)) {
    return res.status(400).json({
      status: "error",
      data: null,
      error: "Invalid category",
    });
  }
  if (amount <= 0) {
    return res.status(400).json({
      status: "error",
      data: null,
      error: "Amount must be positive",
    });
  }

  
  const newExpense = { id: expenses.length + 1, category, amount, date };
  expenses.push(newExpense);

  res.status(201).json({
    status: "success",
    data: newExpense,
    error: null,
  });
};


const getExpenses = (req, res) => {
  const { category, startDate, endDate } = req.query;

  let filteredExpenses = expenses;

  if (category) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.category === category
    );
  }

  if (startDate && endDate) {
    filteredExpenses = filteredExpenses.filter((expense) => {
      return (
        new Date(expense.date) >= new Date(startDate) &&
        new Date(expense.date) <= new Date(endDate)
      );
    });
  }

  res.json({
    status: "success",
    data: filteredExpenses,
    error: null,
  });
};

// Analyze spending patterns (total amount, category spendings)
const analyzeExpenses = (req, res) => {
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const categorySpendings = expenses.reduce((acc, expense) => {
    if (acc[expense.category]) {
      acc[expense.category] += expense.amount;
    } else {
      acc[expense.category] = expense.amount;
    }
    return acc;
  }, {});

  res.json({
    status: "success",
    data: { totalAmount, categorySpendings },
    error: null,
  });
};

// Export functions
module.exports = { addExpense, getExpenses, analyzeExpenses };
