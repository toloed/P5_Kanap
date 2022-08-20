// Récupération des paramètres URL de l'id
//const paramsString = window.location.href; // Renvoie les infos URL du document
const searchParams = new URL(window.location.href); // Instancie un nouvel objet URLSearchParams qui permet la lecture sur la requête URL
const product = searchParams.searchParams.get("id"); // Accès à la requête URL : renvoie la valeur "id"

// Récupération d'un produit via son id
fetch(`http://localhost:3000/api/products/${product}`)
    .then(response => response.json())
    .then(product => getProduct(product))
    .catch(error => "Erreur : " + error);

// Intégration dans le DOM des produits extraits de l'API
function getProduct(product) {
    //Insertion des éléments dans le DOM
    document.querySelector(".item__img").innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    document.getElementById("title").innerHTML = `${product.name}`;
    document.getElementById("price").innerHTML = `${product.price}`;
    document.getElementById("description").innerHTML = `${product.description}`;
    
    //Ajout des options de couleur via une boucle forEach
    id.colors.forEach(color => {
        const optionColor = document.createElement("option");
        doncument.getElementById("colors")
            .appendChild(optionColor);
        optionColor.value = color;
        optionColor.textContent = color;
    });
}

function newFunction(product) {
    const itemImg = document.createElement("img");
    document.querySelector(".item__img")
        .appendChild(itemImg);
    itemImg.src = product.imageUrl;
    itemImg.alt = product.altTxt;
}
