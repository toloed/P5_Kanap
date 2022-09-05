//Conversion chaîne JSON en objet JS + récupération des données du LocalStorage
const productId = JSON.parse(localStorage.getItem("productResult"));

console.log(productId);

// Si : le panier (LocalStorage) est vide, affichage d'un message
if (productId === null) {
    document.querySelector("h1").textContent = `Votre panier est vide.`;
    document.getElementsByClassName("cart__price").style.display = "none";
    document.getElementByClassName("cart__order").style.display = "none";
}

// Sinon : le panier contient des produits
else {
    for (let cart of productId) {
        //console.log(cart.selectedId);
        //let id = productId.selectedProduct;
        //console.log(productFinal);

        fetch(`http://localhost:3000/api/products/${productId}`)
            .then(response => response.json())
            .then(items => itemElement(items))
            .catch(error => "Erreur : " + error);

        function itemElement(items) {
            document.getElementById("cart__items").innerHTML +=
            `<article class="cart__item" data-id=${items.slectedId
            } data-color=${items.selectedColor}>
                <div class="cart__item__img">
                    <img src=${productId.imageUrl} alt=${productId.altTxt}>
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${productId.name}</h2>
                        <p>${items.selectedColor}</p>
                        <p>${productId.price}</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
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