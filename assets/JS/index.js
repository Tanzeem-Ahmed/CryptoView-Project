function windowloaded() {
  fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr"
  )
    .then(convertToJSON)
    .then(loadCoinData);
}

function loadCoinData(data) {
  const conversionRate = data.bitcoin.inr;
  fetch("https://api.coingecko.com/api/v3/search/trending")
    .then(convertToJSON)
    .then(function (data) {
      render(data, conversionRate);
    });
}

function render(data, conversionRate) {
  for (let i = 0; i < data.coins.length; i++) {
    const singleCoin = data.coins[i].item;

    const logo = singleCoin.thumb;
    const name = `${singleCoin.name} (${singleCoin.symbol})`;
    const price = (singleCoin.price_btc * conversionRate).toFixed(4);
    insertCryptoCard(logo, name, price);
  }
}

function insertCryptoCard(logo, name, price) {
  const price_para = document.createElement("p");
  const name_head = document.createElement("h1");
  price_para.innerText = `₹ ${price}`;
  name_head.innerText = name;

  const divEle = document.createElement("div");
  divEle.classList.add("f-left");
  divEle.appendChild(name_head);
  divEle.appendChild(price_para);

  const imgEle = document.createElement("img");
  imgEle.src = logo;
  imgEle.classList.add("f-left", "card-img");
  imgEle.alt = 'Coin Image';

  const main_div = document.createElement('div');
  main_div.classList.add('flex-card', 'card');
  main_div.appendChild(imgEle);
  main_div.appendChild(divEle);

  document.getElementById('coins_container').appendChild(main_div);
}

window.onload = function () {
  windowloaded();
};
