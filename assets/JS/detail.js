function loadDetails() {
  const url = window.location.href;
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);

  if (!params.has("id")) {
    window.location.href = "./";
  }

  fetch(
    `https://api.coingecko.com/api/v3/coins/${params.get(
      "id"
    )}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
  )
    .then(convertToJSON)
    .then(render);

  fetch(
    `https://api.coingecko.com/api/v3/coins/${params.get("id")}/market_chart?vs_currency=inr&days=1&interval=hourly`)
    .then(convertToJSON)
    .then(renderChart);
}

function render(data) {
  console.log(data);
  const name = `${data.name} (${data.symbol.toUpperCase()})`;
  const desc = data.description.en;
  const img = data.image.large;

  const inr = data.market_data.current_price.inr;
  const usd = data.market_data.current_price.usd;
  const euro = data.market_data.current_price.eur;
  const gbp = data.market_data.current_price.gbp;

  document.getElementById("coin-name").innerText = name;
  document.getElementById("coin-desc").innerHTML = desc;
  document.getElementById("coin-logo").src = img;

  document.getElementById("rup").innerText = inr;
  document.getElementById("dol").innerText = usd;
  document.getElementById("euro").innerText = euro;
  document.getElementById("gbp").innerText = gbp;
}

window.onload = function () {
  loadDetails();
};

function renderChart(data) {
  const prices = data.prices;
  const timestamps = [];
  const pricesInr = [];

  for (let i = 0; i < prices.length; i++) {
    const singlePrice = prices[i];

    const dateObj = new Date(singlePrice[0]);
    const hour =
      dateObj.getHours() < 10 ? "0" + dateObj.getHours() : dateObj.getHours();
    const minutes =
      dateObj.getMinutes() < 10
        ? "0" + dateObj.getMinutes()
        : dateObj.getMinutes();

    timestamps.push(`${hour}:${minutes}`);
    pricesInr.push(singlePrice[1]);
  }

  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: timestamps,
      datasets: [
        {
          label: "Price in (INR)",
          data: pricesInr,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.2,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}
