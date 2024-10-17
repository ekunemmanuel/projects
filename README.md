
function decimalToBinary() {
  let binary = "";

  if (dec.value === 0) return "0"; // Special case for 0

  while (dec.value > 0) {
    binary = (dec.value % 2) + binary; // Add remainder to the left of the string
    dec.value = Math.floor(dec.value / 2); // Divide by 2 and update decimal
  }

  result.value = parseInt(binary);
}