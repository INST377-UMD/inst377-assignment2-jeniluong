const apiKey = 'gxU8wE585qbqEFOWXkZ8wZW8pBNvgoJc';

function fetchStock() {
  const ticker = document.getElementById('ticker').value.toUpperCase();
  const days = document.getElementById('days').value;
  const toDate = new Date();
  const fromDate = new Date();
  fromDate.setDate(toDate.getDate() - parseInt(days));

  const from = fromDate.toISOString().split('T')[0];
  const to = toDate.toISOString().split('T')[0];

  const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}?adjusted=true&sort=asc&limit=120&apiKey=${apiKey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const labels = data.results.map(d => new Date(d.t * 1000).toLocaleDateString());
      const values = data.results.map(d => d.c);

      const ctx = document.getElementById('stockChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: `${ticker} Closing Prices`,
            data: values,
            borderColor: 'blue',
            fill: false
          }]
        }
      });
    });
}

/* Reddit Stocks Table */
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
  });

/* Annyang Stock Voice Command */
if (typeof annyang !== 'undefined') {
  annyang.addCommands({
    'lookup *stock': (stock) => {
      document.getElementById('ticker').value = stock.toUpperCase();
      document.getElementById('days').value = '30';
      fetchStock();
    }
  });
}