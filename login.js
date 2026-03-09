const signInBtn = document.getElementById("signInBtn");
signInBtn.addEventListener("click", function () {
  const userName = document.getElementById("userName");
  const name = userName.value;

  const password = document.getElementById("password");
  const pass = password.value;

  if (name == "admin" && pass == "admin123") {
    alert("Sign In Success");
    // window.location.replace("./home.html");
    window.location.assign("./home.html");
  } else {
    alert("Sign In Failed!");
    return;
  }
});
