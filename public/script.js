console.log("Hello from public");
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const weatherSection = document.querySelector("#message1");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        weatherSection.textContent = data.forecast;
      }
    });
  });
});
