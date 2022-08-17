//Indication de l'emplacement du code injecté = section 'items'
const sectionItems = document.querySelector('items');

//Récupération des produits de l'API en format json
fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then(apiProducts => productsList(apiProducts))
    .catch(error => ("Erreur : " + error));

function productsList(apiProducts) {
    apiProducts.forEach((product) => {
        console.table(product);

    const itemsLink = 
        document.createElement("a");
        document.querySelector(".items");
        itemsLink.appendChild(itemsLink);
        itemsLink.href = `../html/product.html?id=${product._id}`;

    const itemsArticle =
        document.createElement("article");
        itemsLink.appendChild(itemsArticle);

    const itemsImg =
        document.createElement("img");
        itemsArticle.appendChild(itemsImg);
        itemsImg.src = product.imgUrl;
        itemsImg.alt = product.altText;

    const itemsTitle =
        document.createElement("h3");
        itemsArticle.appendChild(itemsTitle);
        itemsTitle.innerHTML = product.name;

    const itemsDescription =
        document.createElement("p");
        itemsArticle.appendChild(itemsDescription);
        itemsDescription.innerHTML = product.description;
})}

