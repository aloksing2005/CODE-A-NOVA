const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const list = document.getElementById('list');
const balance = document.getElementById('balance');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

let chart;

// Update UI
function updateUI() {
  list.innerHTML = "";

  let total = 0;
  let income = 0;
  let expense = 0;

  transactions.forEach((t, index) => {
    total += t.amount;

    if (t.amount > 0) income += t.amount;
    else expense += t.amount;

    const li = document.createElement('li');
    li.classList.add(t.amount > 0 ? 'income' : 'expense');

    li.innerHTML = `
      ${t.text}
      <span>
        ₹${t.amount}
        <span class="delete-btn" onclick="deleteTransaction(${index})">❌</span>
      </span>
    `;

    list.appendChild(li);
  });

  balance.innerText = total;

  // Save to localStorage
  localStorage.setItem('transactions', JSON.stringify(transactions));

  updateChart(income, Math.abs(expense));
}

// Delete
function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateUI();
}

// Add transaction
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const transaction = {
    text: text.value,
    amount: +amount.value
  };

  transactions.push(transaction);

  text.value = "";
  amount.value = "";

  updateUI();
});

// Chart
function updateChart(income, expense) {
  const ctx = document.getElementById('chart').getContext('2d');

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Income', 'Expense'],
      datasets: [{
        data: [income, expense],
        backgroundColor: ['green', 'red']
      }]
    }
  });
}

// Initial load
updateUI();