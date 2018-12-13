document.addEventListener("DOMContentLoaded", getJSON);


let pictures;
let postTemplate = document.querySelector("[data-template]");
let postContainer = document.querySelector(".container");


async function getJSON() {

    console.log("json");

    let myJson = await fetch("https://www.rebeccamortensen.dk/kea/lasaite/wp-json/wp/v2/frontpage");
    pictures = await myJson.json();

    visProducts();

}

function visProducts() {


    // postContainer.innerHTML = "";

    pictures.forEach(picture => {


        let klon = postTemplate.cloneNode(true).content;

        klon.querySelector("[data-img]").setAttribute("src", picture.acf.image);

        postContainer.appendChild(klon);

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
