function convertToJSON(response) {
  return response.json();
}

document
  .getElementById("nav-search-btn")
  .addEventListener("click", function () {
    window.location.href = "./search.html";
  });

document.getElementById("main-title").addEventListener("click", function () {
  window.location.href = "./index.html";
});
