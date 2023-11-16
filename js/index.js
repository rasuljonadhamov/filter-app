// import { data } from "./data.js";
const tbody = document.getElementById("tbody");
const cars = document.getElementById("cars");
const searchEl = document.getElementById("search");
const filter = document.getElementById("filter-status");
const colorfilter = document.getElementById("filter-color");
const yearfilter = document.getElementById("filter-year");
const pricefilter = document.getElementById("filter-price");
const btn = document.getElementById("btn");
const nameInput = document.getElementById("name");
const yearInput = document.getElementById("year");
const priceInput = document.getElementById("price");
const colorInput = document.getElementById("color");
const formInput = document.querySelector(".createForm");
const deleteBtns = document.querySelectorAll(".delete");
const updateBtns = document.querySelectorAll(".update");

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
                    <td>
                      <span class="delete">Delete</span>
                      <span class="update">Update</span>
                    </td>
               </tr>
          `;
    lists += tr;
  });

  tbody.innerHTML += lists;
}

function validate() {
  if (!nameInput.value) {
    nameInput.style.outlineColor = "red";
    nameInput.focus();
    return;
  }

  if (!yearInput.value) {
    yearInput.style.outlineColor = "red";
    yearInput.focus();
    return;
  }

  if (
    yearInput.value < 1950 ||
    yearInput.value > new Date().getFullYear() + 1
  ) {
    alert("Yilni to'g'ri kiriting");
    yearInput.value = "";
    yearInput.focus();
    return;
  }

  if (!colorInput.value) {
    colorInput.style.outlineColor = "red";
    colorInput.focus();
    return;
  }

  if (!priceInput.value) {
    priceInput.style.outlineColor = "red";
    priceInput.focus();
    return;
  }

  if (priceInput.value < 100) {
    alert("Narhni to'g'ri kiriting");
    priceInput.value = "";
    priceInput.focus();
    return;
  }
}

// Filter functions
filter.addEventListener("change", function () {
  let selectedStatus = this.value;
  let cars = data.filter((el) => {
    return el.status == selectedStatus;
  });
  createRows(cars);
});

colorfilter.addEventListener("change", function () {
  const colorSelected = this.value;
  let colors = data.filter((el) => {
    return el.color == colorSelected;
  });
  createRows(colors);
});

yearfilter.addEventListener("change", function () {
  let yearSelected = Number(this.value);
  let yearsCarVal = data.filter((el) => {
    if (yearSelected == 2010) {
      return el.year < 2010;
    } else if (yearSelected == 2020) {
      return el.year > 2009 && el.year < 2020;
    } else {
      return el.year > 2019;
    }
  });
  createRows(yearsCarVal);
});

pricefilter.addEventListener("change", function () {
  let priceSelected = Number(this.value);
  let priceCarVal = data.filter((el) => {
    if (priceSelected == 4000) {
      return el.price < 3900;
    } else if (priceSelected == 5000) {
      return el.price > 3900 && el.price < 5000;
    } else {
      return el.price > 4900;
    }
  });
  createRows(priceCarVal);
});

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
document.addEventListener("DOMContentLoaded", function () {
  let data = localStorage.getItem("cars")
    ? JSON.parse(localStorage.getItem("cars"))
    : [];

  if (data.length) {
    createRows(data);
  }
});

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

btn &&
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    validate();
    let data = [];

    let car = {
      id: data.length + 1,
      name: nameInput.value,
      year: yearInput.value,
      color: colorInput.value,
      price: priceInput.value,
      status: "active",
    };

    data.push(car);

    localStorage.setItem("cars", JSON.stringify(data));
    formInput.reset();
    createRows(data);
  });
