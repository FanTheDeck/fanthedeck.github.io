const encryptedMessage = document.querySelector("#message");
const key = document.querySelector("#password");
const decryptedMessage = document.querySelector("#decrypted");
const decryptBtn = document.querySelector("#decrypt-button");

const iv = [ 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,35, 36 ];

function decrypt() {
    // Take encryptedMessage and key, then use aes-js to decrypt the message and set the output to decryptedMessage if it's valid, otherwise set it to "Invalid password"
    // encryptedMessage is base64 encoded, key is plain utf-8
    var encryptedBytes = Uint8Array.from(atob(encryptedMessage.value), c => c.charCodeAt(0));
    // Use CBC
    var aesCbc = new aesjs.ModeOfOperation.cbc(aesjs.utils.hex.toBytes(keyToHex(key.value)), iv);
    var decryptedBytes = aesCbc.decrypt(encryptedBytes);
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    var decryptedText = decryptedText.replace(/[^\x20-\x7F]/g, "");
    if (isValid(decryptedText)) {
        decryptedMessage.innerHTML = `<p>${decryptedText}</p>`;
    } else {
        decryptedMessage.innerHTML = "<p>Invalid password</p>";
    }
}

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

decryptBtn.addEventListener("click", decrypt);