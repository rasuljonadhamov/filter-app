import { data } from "./data.js";
const tbody = document.getElementById("tbody");
const cars = document.getElementById("cars");
const searchEl = document.getElementById("search");
const filter = document.getElementById("filter-status");

function createRows(data) {
  let lists = "";
  tbody.innerHTML = "";
  data.forEach((el) => {
    let {
      id,
      name = "Mavjud emas",
      year = "",
      price = "",
      color = "Mavjud emas",
      status = "",
    } = el;
    if (status == "active") {
      status = "Sotuvda mavjud";
    }

    if (status == "inactive") {
      status = "Sotuvda mavjud emas";
    }

    let tr = `
               <tr>
                    <td>${id}</td>
                    <td>${name}</td>
                    <td>${year}</td>
                    <td>${color}</td>
                    <td>${price}</td>
                    <td>${status}</td>
               </tr>
          `;
    lists += tr;
  });

  tbody.innerHTML += lists;
}

filter.addEventListener("change", function () {
  let selectedStatus = this.value;
  let cars = data.filter((el) => {
    return el.status == selectedStatus;
  });
  createRows(cars);
});

// 1. narx oraligi
// 2. yillar boyicha
// 3. rangi

cars.addEventListener("change", function () {
  let selectedCar = this.value;
  let selectedCars = data.filter((el) => {
    return el.name == selectedCar;
  });
  createRows(selectedCars);

  if (this.value === "all") {
    createRows(data);
  }
});

window.onload = function (params) {
  if (data.length) {
    createRows(data);
  }
};

searchEl.addEventListener("input", function () {
  let searchInput = searchEl.value.toLowerCase();
  let items = document.getElementsByTagName("td");

  for (let i = 0; i < items.length; i++) {
    let itemInnerText = items[i].innerText.toLowerCase();

    if (itemInnerText.includes(searchInput)) {
      items[i].style.display = "block";
    } else {
      items[i].style.display = "none";
    }
  }
});
