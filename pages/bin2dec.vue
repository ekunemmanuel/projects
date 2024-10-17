<template>
  <div class="grid place-items-center min-h-screen">
    <div>
      <div>
        <h1 class="text-3xl font-bold mb-4">Binary to Decimal</h1>
        <div class="flex items-center space-x-4">
          <UInput
            v-model="bin"
            type="number"
            placeholder="Enter a binary number"
          />
          <UButton @click="binaryToDecimal">Convert</UButton>
        </div>
        <div class="mt-4">
          <p class="text-lg font-bold">Result:</p>
          <p class="text-xl">{{ binResult }}</p>
        </div>
      </div>
      <div class="mt-8">
        <h1 class="text-3xl font-bold mb-4">Decimal to Binary</h1>
        <div class="flex items-center space-x-4">
          <UInput
            v-model="dec"
            type="number"
            placeholder="Enter a decimal number"
            step="1"
          />
          <UButton @click="decimalToBinary">Convert</UButton>
        </div>
        <div class="mt-4">
          <p class="text-lg font-bold">Result:</p>
          <p class="text-xl">{{ decResult }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const binResult = ref<number>();
const decResult = ref<number>();
const bin = ref<string>();
const dec = ref<number>();
function binaryToDecimal() {
  let decimal = 0;
  // Check if the input is empty
  if (!bin.value) {
    alert("Please enter a binary number");
    return;
  }
  // Check if the input is a valid binary number
  if (!/^[0-1]+$/.test(bin.value)) {
    alert("Please enter a valid binary number");
    return;
  }
  // Convert the binary number to a string
  bin.value = bin.value.toString();
  // Get the length of the binary string
  const length = bin.value.length;
  console.log("length", length);

  // Loop through the binary string
  for (let i = 0; i < length; i++) {
    // Get the bit at the current index
    const bit = bin.value[i];

    console.log({
      "decimal for that bit": Math.pow(2, length - 1 - i),
      bit,
      "index for the bit": i,
      "power for the bit": length - 1 - i,
    });

    // If the bit is 1, we calculate its decimal value
    if (bit === "1") {
      let power = length - 1 - i;
      decimal += Math.pow(2, power); // 2^power
    }
  }

  binResult.value = decimal;
}

function decimalToBinary() {
  const init = dec.value
  // Check if the input is empty
  if (!dec.value) {
    alert("Please enter a number");
    return;
  }
  // Check if the input is a valid whole number
  if (dec.value < 0) {
    alert("Please enter a positive number");
    return;
  } else if (!Number.isInteger(dec.value)) {
    alert("Please enter a whole number");
    return;
  }
  let binary = "";

  while (dec.value > 0) {
    const reminder = dec.value % 2;
    binary = reminder + binary; // Add remainder to the left of the string
    dec.value = Math.floor(dec.value / 2); // Divide by 2 and update the dec variable
  }

  /*
  dec = 10 
  is 10 > 0 true
  reminder = 10 % 2 meaning (10 / 2 = 5 r 0) takes the reminder 0 
  binary = 0 + ""
  binary = "0"
  dec = 10 / 2 
  dec = 5 

  which then repeat until dec becomes 0. Leading to it breaking out of the while loop because 0 is not greater than 0 
  
  decResult = "1010" 

  */
  dec.value = init
  decResult.value = parseInt(binary);
}

useHead({
  title: "Binary to Decimal",
  meta: [
    {
      name: "description",
      content: "Convert a binary number to a decimal number",
    },
  ],
});
</script>

<style scoped></style>
