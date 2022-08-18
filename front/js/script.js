//Indication de l'emplacement du code injecté = section 'items'
const sectionItems = document.getElementById("items");

//Récupération des produits de l'API en format json
fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then(apiProducts => {
//Injection sur la page des produits récupérés avec une boucle "for"
        for(product of apiProducts) { 
            sectionItems.innerHTML += 
                `<a href="./product.html?id=${product.id}">
                    <article>
                        <img src=${product.imageUrl} alt=${product.altText}>
                        <h3 class="productName">${product.name}</h3>
                        <p classe="productDescription">${product.description}</p>
                    </article>
                </a>`
        };
    })
//Retour d'un message s'il y a une erreur
    .catch(error => "Erreur : " + error);

