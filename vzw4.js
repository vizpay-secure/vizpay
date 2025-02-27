(function() {
    // Function to update all buttons
    function updateButtons() {
        document.querySelectorAll(".Cartbtn").forEach(button => {
            if (!button.dataset.updated) { // Ensure we don’t modify the button multiple times
                const amountText = button.innerText.trim();
                const amount = amountText.replace(/\D/g, ""); // Extract only numbers
                
                const newBaseUrl = "https://example.com/payment?amount=";
                button.href = newBaseUrl + amount;
                button.dataset.updated = "true"; // Mark as updated to avoid duplicate updates
            }
        });
    }

    // Run initially in case buttons already exist
    updateButtons();

    // Observe changes in the document body for new buttons
    const observer = new MutationObserver(updateButtons);
    observer.observe(document.body, { childList: true, subtree: true });
})();
