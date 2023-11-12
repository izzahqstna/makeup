document.addEventListener("DOMContentLoaded", function () {
    // Maximum number of items in the wishlist
    const maxWishlistItems = 5;

    // Retrieve the wishlist from localStorage
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Get the wishlist container
    const wishlistContainer = document.getElementById("wishlist");

    // Check if the wishlist is empty
    if (wishlist.length > 0) {
        // Ensure the wishlist doesn't exceed the maximum limit
        if (wishlist.length > maxWishlistItems) {
            wishlist = wishlist.slice(wishlist.length - maxWishlistItems);
        }

        wishlist.forEach((product, index) => {
            const productDiv = document.createElement("div");
            productDiv.className = "product-box";

            const productImage = document.createElement("img");
            productImage.src = product.image_link;

            const brandInfo = document.createElement("p");
            brandInfo.textContent = `Brand: ${product.brand}`;

            const nameInfo = document.createElement("p");
            nameInfo.textContent = `Name: ${product.name}`;

            const priceInfo = document.createElement("p");
            priceInfo.textContent = `Price: Rm${product.price}`;

            const typeInfo = document.createElement("p");
            typeInfo.textContent = `Type: ${product.product_type}`;

            // Add an input field for editing the quantity
            const quantityInput = document.createElement("input");
            quantityInput.type = "number";
            quantityInput.value = product.quantity || 1;
            quantityInput.min = 1;
            quantityInput.max = 99;

            // Add an "Edit" button
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.className = "styled-button"; // Add the class for styling
            editButton.addEventListener("click", () => {
                // Update the quantity of the product in the wishlist
                const newQuantity = parseInt(quantityInput.value, 10);
                wishlist[index].quantity = newQuantity;
                updateWishlist();
                window.alert("Item edited successfully!");
            });

            // Add a "Delete" button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "styled-button"; // Add the class for styling
            deleteButton.addEventListener("click", () => {
                // Remove the item from the wishlist
                wishlist.splice(index, 1);
                updateWishlist();
                window.alert("Item deleted successfully!");
            });

            productDiv.appendChild(productImage);
            productDiv.appendChild(brandInfo);
            productDiv.appendChild(nameInfo);
            productDiv.appendChild(priceInfo);
            productDiv.appendChild(typeInfo);
            productDiv.appendChild(quantityInput);
            productDiv.appendChild(editButton);
            productDiv.appendChild(deleteButton);

            wishlistContainer.appendChild(productDiv);
        });
    } else {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "Your wishlist is empty.";
        wishlistContainer.appendChild(emptyMessage);
    }

    // Function to update the wishlist in localStorage and refresh the display
    function updateWishlist() {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        wishlistContainer.innerHTML = ""; // Clear the current display
        document.location.reload(); // Reload the page to display the updated wishlist
    }

    // Add an event listener to the Back button
    const backButton = document.getElementById("backButton");
    backButton.addEventListener("click", function () {
        // Navigate back to the index.html page
        window.location.href = "index.html";
    });
});
