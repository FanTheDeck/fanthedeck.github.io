const generateKeyBtn = document.querySelector("#generate-key-btn");
const keyInfoDiv = document.querySelector("#key-info");
const understandCheckbox = document.querySelector("#understand-checkbox");
const keyDate = document.querySelector("#giveawayDate");
const keyPassword = document.querySelector("#giveawayPassword");

const iv = [ 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,35, 36 ];

function isValid(str) {
    return /^[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}$/.test(str);
}

function keyToHex(str) {
	var arr1 = [];
	for (var n = 0, l = str.length; n < l; n ++) {
		var hex = Number(str.charCodeAt(n)).toString(16);
		arr1.push(hex);
	}
	return arr1.join('');
}

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

      var title = keyTitleArray[0];
      var key = keyTitleArray[1];

      var encryptedBytes = Uint8Array.from(atob(key), c => c.charCodeAt(0));
      try {
        var aesCbc = new aesjs.ModeOfOperation.cbc(aesjs.utils.hex.toBytes(keyToHex(keyPassword.value)), iv);
      }
      catch (err) {
        keyInfoDiv.innerHTML = "<p>Invalid password</p>";
        return;
      }
      var decryptedBytes = aesCbc.decrypt(encryptedBytes);
      var key = aesjs.utils.utf8.fromBytes(decryptedBytes);
      var key = key.replace(/[^\x20-\x7F]/g, "");
      if (isValid(key)) {
        const redeemUrl = `https://store.steampowered.com/account/registerkey?key=${key}`;
        keyInfoDiv.innerHTML = `
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Key:</strong> ${key}</p>
          <p><a href="${redeemUrl}" target="_blank">Click here to redeem the game</a></p>
        `;
      } else {
        keyInfoDiv.innerHTML = "<p>Invalid password</p>";
      }


      
    })
    .catch(err => console.log(err));
}

generateKeyBtn.addEventListener("click", generateKey);