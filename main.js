function buttonClick() {
    var brandQuery = document.getElementById("searchMakeup").value;
    var typeQuery = document.getElementById("searchType").value;

    fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brandQuery}&product_type=${typeQuery}`)
        .then((response) => {
            if (response.status === 404) {
                throw new Error("No products found for the given criteria.");
            }
            return response.json();
        })
        .then((data) => {
            var displayContainer = document.getElementById("display");
            displayContainer.innerHTML = ""; // Clear previous content

            if (data.length > 0) {
                data.forEach((product) => {
                    var productDiv = document.createElement("div");
                    productDiv.className = "product-box";

                    var productImage = document.createElement("img");
                    productImage.src = product.image_link;
                    var brandInfo = document.createElement("p");
                    brandInfo.textContent = `Brand: ${product.brand}`;
                    var typeInfo = document.createElement("p");
                    typeInfo.textContent = `Type: ${product.product_type}`;
                    var rating = document.createElement("p");
                    rating.textContent = `Rating: ${product.rating}`;

                    var viewDetailsButton = document.createElement("button");
                    viewDetailsButton.className = "view-details-button";
                    viewDetailsButton.textContent = "View Details";

                    viewDetailsButton.addEventListener("click", function () {
                        localStorage.setItem("selectedProduct", JSON.stringify(product));
                        window.location.href = "details.html"; // Redirect to another page
                    });

                    productDiv.appendChild(productImage);
                    productDiv.appendChild(brandInfo);
                    productDiv.appendChild(typeInfo);
                    productDiv.appendChild(rating);
                    productDiv.appendChild(viewDetailsButton);

                    displayContainer.appendChild(productDiv);
                });
            } else {
                displayContainer.textContent = "No products found for the given criteria.";
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}
