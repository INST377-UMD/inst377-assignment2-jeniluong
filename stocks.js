const apiKey = 'gxU8wE585qbqEFOWXkZ8wZW8pBNvgoJc'; // Replace with your API key
let stockChart; // Store Chart instance globally so we can destroy/re-render

function fetchStock() {
  const ticker = document.getElementById('ticker').value.toUpperCase();
  const days = document.getElementById('days').value;

  if (!ticker) {
    alert("Please enter a stock ticker.");
    return;
  }

  const toDate = new Date();
  const fromDate = new Date();
  fromDate.setDate(toDate.getDate() - parseInt(days));

  const from = fromDate.toISOString().split('T')[0];
  const to = toDate.toISOString().split('T')[0];

  const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}?adjusted=true&sort=asc&limit=120&apiKey=${apiKey}`;
  console.log("Fetching stock data from:", url);

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!data.results || data.results.length === 0) {
        alert("No data found. Check the ticker symbol or try a different date range.");
        return;
      }

      const labels = data.results.map(d => {
        const date = new Date(d.t);
        return `${date.getMonth() + 1}/${date.getDate()}`;
      });

      const values = data.results.map(d => d.c);

      const canvas = document.getElementById('stockChart');
      const ctx = canvas.getContext('2d');

      // Destroy previous chart
      if (stockChart) {
        stockChart.destroy();
      }

      stockChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: `${ticker} Closing Prices`,
            data: values,
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 2,
            fill: false,
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: true }
          },
          scales: {
            x: { title: { display: true, text: 'Date' } },
            y: { title: { display: true, text: 'Price ($)' } }
          }
        }
      });
    })
    .catch(error => {
      console.error("Error fetching stock data:", error);
      alert("Error fetching stock data: " + error.message);
    });
}

// Fetch Reddit Top 5 Stocks
fetch('https://tradestie.com/api/v1/apps/reddit?date=2022-04-03')
  .then(res => res.json())
  .then(data => {
    const top5 = data.slice(0, 5);
    const table = document.getElementById('redditTable');
    table.innerHTML = `<tr><th>Ticker</th><th>Comments</th><th>Sentiment</th></tr>`;

    top5.forEach(stock => {
      const sentimentIcon = stock.sentiment === 'Bullish' ? '🐂' : '🐻';
      const link = `https://finance.yahoo.com/quote/${stock.ticker}`;
      table.innerHTML += `
        <tr>
          <td><a href="${link}" target="_blank">${stock.ticker}</a></td>
          <td>${stock.no_of_comments}</td>
          <td>${sentimentIcon} (${stock.sentiment})</td>
        </tr>`;
    });
  })
  .catch(err => {
    console.error("Error fetching Reddit stocks:", err);
  });

// Voice Commands
if (typeof annyang !== 'undefined') {
  annyang.addCommands({
    'lookup *stock': (stock) => {
      document.getElementById('ticker').value = stock.toUpperCase();
      document.getElementById('days').value = '30';
      fetchStock();
    }
  });
}