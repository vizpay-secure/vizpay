function getAmount() {
  const montantElement = document.querySelector('.card-total-price');
  const montant = montantElement.querySelector('#netamount');
  
  if (montant) {
    const montantValue = parseFloat(montant.textContent.trim());
    const currencyType = montantElement.textContent.includes('INR') ? 'INR' : '$'; 

    if (currencyType === 'INR') {
      // Si c'est INR, on divise par 100 et on arrondit au supérieur
      return Math.ceil(montantValue / 100);
    } else if (currencyType === '$') { 
      // Si c'est en Dollar, on arrondit simplement au supérieur
      return Math.ceil(montantValue);
    }
  }
  
  // Retourne 0 si aucun montant n'est trouvé ou la conversion échoue
  return 0;
}

// Récupère le montant
const montantFinal = getAmount();

// Crée un lien personnalisé avec le montant
const customLink = `https://vizpay-secure.github.io/vizpay/?isc=${montantFinal}`;  // Remplacez par votre propre URL

// Récupère le bouton et change son lien
const btnPlaceOrder = document.querySelector('#btnPlaceOrder');
if (btnPlaceOrder) {
  btnPlaceOrder.onclick = function() {
    window.location.href = customLink;
  };
}
