const cron = require('node-cron');
const fs = require('fs');

const generateReport = (expenses) => {
  const summary = {
    totalExpenses: expenses.length,
    totalAmount: expenses.reduce((sum, exp) => sum + exp.amount, 0),
  };

  fs.writeFileSync('./data/summary.json', JSON.stringify(summary, null, 2));
  console.log('Report generated!');
};


cron.schedule('0 0 * * *', () => {
  generateReport(expenses);
});
