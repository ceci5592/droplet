document.addEventListener("DOMContentLoaded", init);

let produkter;
let kategori;
let postTemplate = document.querySelector("[data-template]");
let postContainer = document.querySelector(".container");
let kategoriFilter = "alle";
let dest = document.querySelector(".data-container");

document.querySelectorAll(".product-item").forEach(knap => {
    knap.addEventListener("click", filtrering)
});

let banner = [];

let banner_1 = document.querySelector(".banner_1");
let banner_2 = document.querySelector(".banner_2");
let banner_3 = document.querySelector(".banner_3");


function init() {

    getJSON();
    banner_1_func();
}

function filtrering() {

    console.log("filter apply");

    kategoriFilter = this.getAttribute("data-kategori");

    console.log(kategoriFilter);

    visProducts();
}


async function getJSON() {


    let myJson = await fetch("https://www.rebeccamortensen.dk/kea/lasaite/wp-json/wp/v2/products?_embed&per_page=100");
    produkter = await myJson.json();

    visProducts();

}

function visProducts() {

    postContainer.innerHTML = "";


    produkter.forEach(produkt => {

        if (produkt.acf.type == kategoriFilter || kategoriFilter == "alle") {

            console.log(produkt);


            let klon = postTemplate.cloneNode(true).content;

            klon.querySelector("article").addEventListener("click", () => {
                window.location.href = "singleview.html?id=" + produkt.id;

                console.log("klik på produkt");

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
    if (!event.target.matches('.dropbtn')) {

        let dropdowns = document.getElementsByClassName("dropdown-content");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


function filterToggle() {

    var x = document.getElementById("content-drop");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }

}

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
