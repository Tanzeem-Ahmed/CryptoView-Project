function searchData() {
  const currentURL = window.location.href;
  const urlObj = new URL(currentURL);
  const params = new URLSearchParams(urlObj.search);
  if (!params.has("q")) {
    return;
  }
  document.getElementsByName("q")[0].value = params.get("q");

    fetch(`https://api.coingecko.com/api/v3/search?query=${params.get("q")}`)
    .then(convertToJSON)
    .then(render);
}

function render(data) {
  for (let i = 0; i < data.coins.length; i++) {
    const singleCoin = data.coins[i];

    const idx = i + 1;
    const logo = singleCoin.thumb;
    const name = singleCoin.name;
    const symbol = singleCoin.symbol;
    const coinId = singleCoin.id;
    createCard(idx, logo, name, symbol, coinId);
  }
}

function createCard(idx, logo, name, symbol, coinId) {
  const idEle = document.createElement("p");
  idEle.innerText = idx;

  const imgEle = document.createElement("img");
  imgEle.src = logo;

  const nameEle = document.createElement("h3");
  nameEle.innerText = name;

  const symbolEle = document.createElement("h3");
  symbolEle.innerText = symbol;

  const anchorEle = document.createElement("a");
  anchorEle.innerText = "More Info";
  anchorEle.href = `./detail.html?id=${coinId}`;

  const containerEle = document.createElement("div");
  containerEle.classList.add("single-result", "card");
  containerEle.appendChild(idEle);
  containerEle.appendChild(imgEle);
  containerEle.appendChild(nameEle);
  containerEle.appendChild(symbolEle);
  containerEle.appendChild(anchorEle);

  document.getElementById('search-results').appendChild(containerEle);
}

window.onload = searchData;
