const generateKeyBtn = document.querySelector("#generate-key-btn");
const keyInfoDiv = document.querySelector("#key-info");
const understandCheckbox = document.querySelector("#understand-checkbox");
const keyDate = document.querySelector("#giveawayDate");

function generateKey() {
  const keys = fetch("/keys.json")
    .then(response => response.text())
    .then((response) => {
      const keys = JSON.parse(response);
      if (!understandCheckbox.checked) {
        keyInfoDiv.innerHTML = "Please check the checkbox to confirm that you understand and agree to only redeem one key.";
        return;
      }

      const randomIndex = Math.floor(Math.random() * (keys[keyDate.value].length));
      const keyTitleArray = keys[keyDate.value][randomIndex];

      const title = keyTitleArray[0];
      const key = keyTitleArray[1];

      const redeemUrl = `https://store.steampowered.com/account/registerkey?key=${key}`;

      keyInfoDiv.innerHTML = `
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Key:</strong> ${key}</p>
        <p><a href="${redeemUrl}" target="_blank">Click here to redeem the game</a></p>
      `;
    })
    .catch(err => console.log(err));
}

generateKeyBtn.addEventListener("click", generateKey);