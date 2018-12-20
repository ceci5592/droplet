document.addEventListener("DOMContentLoaded", init);

let urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);
let id = urlParams.get("id");

let singleurl;
let single;

let postTemplate = document.querySelector("[data-template]");
let postContainer = document.querySelector(".container");

let banner = [];

let banner_1 = document.querySelector(".banner_1");
let banner_2 = document.querySelector(".banner_2");
let banner_3 = document.querySelector(".banner_3");

function init() {
    getJSON();
    banner_1_func();
}

async function getJSON() {
    singleurl =
        "https://www.rebeccamortensen.dk/kea/lasaite/wp-json/wp/v2/products";

    console.log(id);

    let jsonData = await fetch(singleurl + "/" + id);

    single = await jsonData.json();

    visProducts();
}

function visProducts() {
    postContainer.innerHTML = "";

    console.log(single);

    document.querySelector("[data-price]").textContent = single.acf.price;
    document.querySelector("[data-title]").textContent = single.acf.name;
    document.querySelector("[data-img]").setAttribute("src", single.acf.image);
    document.querySelector("[data-colour]").textContent = single.acf.colour;
    document.querySelector("[data-size]").textContent = single.acf.size;
    document.querySelector("[data-desc]").textContent = single.acf.description;
}

function myDropMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it

window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
            }
        }
    }
};

function banner_1_func() {
    console.log("banner 1");

    banner_1.style.display = "block";
    banner_2.style.display = "none";
    banner_3.style.display = "none";

    setTimeout(banner_2_func, 5000);
}

function banner_2_func() {
    console.log("banner 2");

    banner_1.style.display = "none";
    banner_2.style.display = "block";
    banner_3.style.display = "none";

    setTimeout(banner_3_func, 5000);
}

function banner_3_func() {
    console.log("banner 3");

    banner_1.style.display = "none";
    banner_2.style.display = "none";
    banner_3.style.display = "block";

    setTimeout(banner_1_func, 5000);
}
