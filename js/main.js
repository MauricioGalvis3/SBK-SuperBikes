// Cargar fragmentos dinámicos
function loadComponent(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
    });
}

loadComponent('header-container', 'components/header.html');
loadComponent('footer-container', 'components/footer.html');
loadComponent('sidebar-container', 'components/sidebar.html');
