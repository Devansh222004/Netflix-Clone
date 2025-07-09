// FAQ Toggle
let accordian = document.getElementsByClassName("FAQ__title");
for (let i = 0; i < accordian.length; i++) {
  accordian[i].addEventListener("click", function () {
    if (this.childNodes[1].classList.contains("fa-plus")) {
      this.childNodes[1].classList.remove("fa-plus");
      this.childNodes[1].classList.add("fa-times");
    } else {
      this.childNodes[1].classList.remove("fa-times");
      this.childNodes[1].classList.add("fa-plus");
    }
    let content = this.nextElementSibling;
    content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
  });
}

// Login handling
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("inputEmail").value.trim();
  const password = document.getElementById("inputPassword").value.trim();
  if (email.length > 3 && password.length > 3) {
    localStorage.setItem("user", JSON.stringify({ email }));
    alert("Login successful!");
    window.location.href = "get.html";
  } else {
    alert("Please enter valid credentials.");
  }
}