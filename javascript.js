document.addEventListener("DOMContentLoaded", init);

let produkter;
let kategori;
let postTemplate = document.querySelector("[data-template]");
let postContainer = document.querySelector(".container");
let kategoriFilter = "alle";
let dest = document.querySelector(".data-container");
let basketNumber = 0;
let cartnumber = document.querySelector("#cart-number");

document.querySelectorAll(".product-item").forEach(knap => {
    knap.addEventListener("click", filtrering);
});

let banner = [];

let banner_1 = document.querySelector(".banner_1");
let banner_2 = document.querySelector(".banner_2");
let banner_3 = document.querySelector(".banner_3");

let template_id = document.querySelector("#template_id");

function init() {
    getJSON();
    banner_1_func();
}

function filtrering() {
    kategoriFilter = this.getAttribute("data-kategori");

    visProducts();
}

async function getJSON() {
    let myJson = await fetch(
        "https://www.rebeccamortensen.dk/kea/lasaite/wp-json/wp/v2/products?_embed&per_page=100"
    );
    produkter = await myJson.json();

    visProducts();
}

function visProducts() {
    postContainer.innerHTML = "";

    produkter.forEach(produkt => {
        if (produkt.acf.type == kategoriFilter || kategoriFilter == "alle") {
            let klon = postTemplate.cloneNode(true).content;

            klon.querySelector("article").addEventListener("click", e => {
                e.preventDefault();

                console.log(e);

                if (e.target.localName != "button") {
                    window.location.href = "singleview.html?id=" + produkt.id;

                }

            });

            // Basket kode
            klon
                .querySelector("article [data-id=template_id]")
                .addEventListener("click", e => {
                    e.preventDefault();
                    basketNumber++;
                    document.querySelector("#cart-number").textContent = basketNumber;
                    document.querySelector("#cart").href += "id=" + produkt.id + "&";
                    document.querySelector;
                    cartnumber.style.display = "flex";

                });

            klon.querySelector("[data-price]").textContent = produkt.acf.price;
            klon.querySelector("[data-title]").textContent = produkt.acf.name;
            klon.querySelector("[data-type]").textContent = produkt.acf.type;
            klon.querySelector("[data-img]").setAttribute("src", produkt.acf.image);

            postContainer.appendChild(klon);
        }
    });
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

function filterToggle() {
    var x = document.getElementById("content-drop");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function banner_1_func() {
    banner_1.style.display = "block";
    banner_2.style.display = "none";
    banner_3.style.display = "none";

    setTimeout(banner_2_func, 5000);
}

function banner_2_func() {
    banner_1.style.display = "none";
    banner_2.style.display = "block";
    banner_3.style.display = "none";

    setTimeout(banner_3_func, 5000);
}

function banner_3_func() {
    banner_1.style.display = "none";
    banner_2.style.display = "none";
    banner_3.style.display = "block";

    setTimeout(banner_1_func, 5000);
}
