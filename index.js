const validateSuperKey = () => {
  const superKey = document.getElementById("superkey").value;

  if (!superKey) {
    alert("Please enter your super key.");
    return false;
  }

  return true;
};

// Function to generate a strong password
document.getElementById("generate-password").onclick = function (e) {
  e.preventDefault();

  if (!validateSuperKey()) return;

  let length = 16;
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  let password = "";
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  array.forEach((num) => (password += charset[num % charset.length]));
  document.getElementById("password").value = password;
};

// Function save password
document.getElementById("save-password").onclick = function (e) {
  e.preventDefault();

  if (!validateSuperKey()) return;

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  localStorage.setItem(username, password);
  
  alert("Password saved successfully!");
};

// Function to encrypt password
document.getElementById("encrypt-password").onclick = function (e) {
  e.preventDefault();

  if (!validateSuperKey()) return;

  const superKey = document.getElementById("superkey").value;
  const password = document.getElementById("password").value;

  const encrypted = CryptoJS.AES.encrypt(password, superKey).toString();

  document.getElementById("password").value = encrypted;
};

// Function to retrieve and decrypt password
document.getElementById("decrypt-password").onclick = function (e) {
  e.preventDefault();

  if (!validateSuperKey()) return;

  const superKey = document.getElementById("superkey").value; // secret key
  const encrypted = document.getElementById("password").value; // encrypted password

  if (!encrypted) {
    alert("No password found!");
    return;
  }

  const bytes = CryptoJS.AES.decrypt(encrypted, superKey);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);

  if (!decrypted) {
    alert("Decryption failed! Check your super key.");
    return;
  }  

  document.getElementById("password").value = decrypted;
};
