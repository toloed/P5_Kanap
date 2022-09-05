//--------------------Importation du produit séléctionné en page d'accueil-------------------//
// Récupération des paramètres URL de l'id
const searchParams = new URL(window.location.href); 
const product = searchParams.searchParams.get("id");

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
    product.colors.forEach(color => {
        const optionColor = document.createElement("option");
        document.getElementById("colors")
            .appendChild(optionColor);
        optionColor.value = color;
        optionColor.textContent = color;
    });
}

//--------------------Ajout au panier/LocalStorage--------------------//
// Récupération des informations de l'API nécessaires à l'ajout au panier (id/couleur/quantité)
const productId = product;
const productColor = document.getElementById("colors");
const productQuantity = document.getElementById("quantity");
console.log(productId);
// Ecoute  du click du bouton html "ajouter au panier" 
const button = document.getElementById("addToCart");
button.addEventListener("click", function() {
    // Références des éléments du produit sélectionné
    const selectedProduct = {
        selectedId: productId,
        selectedColor: productColor.value,
        selectedQuantity: productQuantity.value,
    };
    
    function addToCart() {
        productFinal.push(selectedProduct); // Ajout de l'élément
        localStorage.setItem("productResult", JSON.stringify(productFinal)); // Stock les données + conversion objet JS en chaîne JSON
        alert("Votre produit à été ajouté au panier!");
    }

    //Conversion chaîne JSON en objet JS + récupération des données
    let productFinal = JSON.parse(localStorage.getItem("productResult"));

    // Si : Vérification de l'option de couleur
    if (selectedProduct.selectedColor == "") {
    alert("Merci de séléctionner une couleur proposée");
    }

    // Si : Vérification de la quantité comprise entre 1 et 100
    else if (selectedProduct.selectedQuantity < 1 || selectedProduct.selectedQuantity > 100) {
        alert("Merci de renseigner une quantité comprise entre 1 et 100");
    }

    // Sinon :
    else {
        // Si : le panier ne contient pas de produit 
        if (productFinal == null) {
            productFinal = []; // Création d'un tableau vide
            addToCart();
        }

        // Si : le panier contient déjà des produits
        else if (productFinal != null) {
            // Parcours du LocalStorage pour trouver les éléments demandés
            let foundProduct = productFinal.find(
                (element) => // Vérifie que les 2 produits on la même id ET la même couleur
                    element.selectedId === selectedProduct.selectedId &&
                    element.selectedColor === selectedProduct.selectedColor
            );

            // Si : le panier contient un produit avec id+couleur identiques, incrémentation de la nouvelle quantité au LocalStorage
            if (foundProduct) {
                let newQuantity = parseInt(foundProduct.selectedQuantity) + parseInt(selectedProduct.selectedQuantity);
                foundProduct.selectedQuantity = newQuantity;
                localStorage.setItem("productResult", JSON.stringify(productFinal));
                alert(`Votre panier contient désormais ${foundProduct.selectedQuantity} exemplaires de ce produit`);
            }

            // Sinon : le panier ne contient pas de produit avec la même id+couleur, ajout du produit
            else {
                addToCart();
            }
        }

    }
})
