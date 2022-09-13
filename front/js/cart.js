//Conversion chaîne JSON en objet JS + récupération des données du LocalStorage
const productId = JSON.parse(localStorage.getItem("productResult"));

// Si : le panier (LocalStorage) est vide, affichage d'un message
if (productId === null) {
    document.querySelector("h1").textContent = `Votre panier est vide.`;
}

// Sinon : le panier contient des produits
else {
    for (let cart of productId) {
        //Récuprération des informations des produits séléctionnés sur l'API
        fetch(`http://localhost:3000/api/products`)
            .then(response => response.json())
            .then(items => itemElement(items))
            .catch(error => "Erreur : " + error);
        
        //Intégration des éléments dans le DOM
        function itemElement(items) {
            for (let item of items) {
                document.getElementById("cart__items").innerHTML +=
                `<article class="cart__item" data-id=${cart.selectedId} 
                data-color=${cart.selectedColor}>
                    <div class="cart__item__img">
                        <img src=${item.imageUrl} alt=${item.altTxt}>
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${item.name}</h2>
                            <p>${cart.selectedColor}</p>
                            <p>${item.price}</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart.selectedQuantity}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>`
            }
        }
    }
}


//-------------------- Gestion des quantités + suppression produit + calcul des prix --------------------//
//Modification des quantités
function changeQuantity() {
    const inputs = document.querySelectorAll("itemQuantity");

    for (let input of inputs) {
        // Ecoute de l'input pour faire les modifications du client
        input.addEventListener("change", (e) => {
             
        } )
    }
}