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
            .then(items => itemElement(cart, items))
            .catch(error => "Erreur : " + error);

        //Intégration des éléments dans le DOM
        function itemElement(items) {
            document.getElementById("cart__items").innerHTML +=
            `<article class="cart__item" data-id=${items.selectedId} 
            data-color=${items.selectedColor}>
                <div class="cart__item__img">
                    <img src=${items.imageUrl} alt=${items.altTxt}>
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${items.name}</h2>
                        <p>${items.selectedColor}</p>
                        <p>${items.price}</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${items.selectedQuantity}">
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