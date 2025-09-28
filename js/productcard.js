document.addEventListener("DOMContentLoaded", () => {
  // Proteger acceso
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
    return;
  }

  // 👉 Aquí va tu lógica de renderizar productos desde products.json
});
