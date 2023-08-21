let latitude;
let longitude;

const btn = document.querySelector("button");
const loading = document.querySelector(".loading");
const lat = document.querySelector(".lat");
const lon = document.querySelector(".lon");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const up = document.querySelector(".up");
const down = document.querySelector(".down");
let data;

async function getTemp(crdLat, crdLong) {
  const result = await fetch(
    `https://weather.contrateumdev.com.br/api/weather?lat=${crdLat}&lon=${crdLong}`
  );
  const data = await result.json();
  console.log(data);

  const temperature = data.main.temp;
  temp.innerHTML = temperature + "°C";

  //   city.
  city.innerHTML = data.name;

  
  //formater ce timestamp en une date lisible.
  down.innerHTML = new Date(data.sys.sunrise * 1000).toString();
  
  // up.innerHTML = new Date(data.sys.sunrise).toString();
  // const data = result.json();
  // console.log(data);
};

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;
  latitude = crd.latitude;
  longitude = crd.longitude;

  lon.innerHTML = "longitude : " + longitude;
  lat.innerHTML = "latitude : " + latitude;

  getTemp(latitude, longitude);
}

function error(err) {
  console.warn(`ERREUR (${err.code}): ${err.message}`);
}

btn.addEventListener("click", async () => {
  btn.style.display = "none";
  loading.style.display = "block";

  navigator.geolocation.getCurrentPosition(success, error, options);

  btn.style.display = "block";
  loading.style.display = "none";
});
