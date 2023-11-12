document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the selected product from localStorage
    const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

    if (selectedProduct) {
        const productImage = document.getElementById("productImage");
        productImage.src = selectedProduct.image_link;

        const brandInfo = document.getElementById("brandInfo");
        brandInfo.textContent = `Brand: ${selectedProduct.brand}`;

        const nameInfo = document.getElementById("nameInfo");
        nameInfo.textContent = `Name: ${selectedProduct.name}`;

        const priceInfo = document.getElementById("priceInfo");
        priceInfo.textContent = `Price: Rm${selectedProduct.price}`;

        const typeInfo = document.getElementById("typeInfo");
        typeInfo.textContent = `Type: ${selectedProduct.product_type}`;

        const descriptionInfo = document.getElementById("descriptionInfo");
        descriptionInfo.textContent = `Description: ${selectedProduct.description}`;

        const webLink = document.getElementById("weblink");
        webLink.textContent = `website Link: ${selectedProduct.website_link}`;

        const backButton = document.getElementById("backButton");
        backButton.addEventListener("click", function () {
            // Navigate back to the previous page
            window.history.back();
        });

        const addToWishlistButton = document.getElementById("addToWishlistButton");
        addToWishlistButton.addEventListener("click", function () {
            // Retrieve the current wishlist from localStorage or initialize an empty array
            const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

            // Add the selected product to the wishlist
            wishlist.push(selectedProduct);

            // Store the updated wishlist in localStorage
            localStorage.setItem("wishlist", JSON.stringify(wishlist));

            // Provide a confirmation to the user (you can use an alert or a more user-friendly UI)
            alert("Product added to your wishlist!");
        });
    } else {
        // Handle the case where the selected product is not found in localStorage
        const productDetails = document.getElementById("product-details");
        productDetails.textContent = "Product details not found.";
    }
});
