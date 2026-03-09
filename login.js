const signInBtn = document.getElementById("signInBtn");
signInBtn.addEventListener("click", function () {
  const userName = document.getElementById("userName");
  const name = userName.value;

  const password = document.getElementById("password");
  const pass = password.value;

  if (name == "admin" && pass == "admin123") {
    alert("Sign In Success");
    // window.location.replace("./home.html");
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("username", name);

    window.location.assign("./home.html");
  } else {
    alert("Sign In Failed!");
    return;
  }
});
