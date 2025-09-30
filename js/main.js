// Redirigir al login al cerrar sesión
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function() {
        window.location.href = 'login.html';
      });
    }
  }, 300); // Espera breve para cargar el header
});
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


// Variable global para almacenar productos
let allProducts = [];

// Función para mostrar productos en el contenedor
function renderProducts(products) {
  let container = document.getElementById('products-container');
  container.innerHTML = ""; // limpiar antes de renderizar

  products.forEach(product => {
    let card = `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p><strong>Precio:</strong> $${product.price.toLocaleString()}</p>
        <p><strong>Kilometraje:</strong> ${product.kilometraje}</p>
        <p><em>${product.category}</em></p>
        <button class="interest-btn" data-product="${product.name}">Me interesa</button>
      </div>
    `;
    container.innerHTML += card;
  });

  // Vuelve a enlazar eventos de interés cada vez que se rendericen productos
  attachInterestEvents();
}

// Cargar productos desde JSON
function loadProducts() {
  fetch('data/products.json')
    .then(res => res.json())
    .then(products => {
      allProducts = products;        // Guardar todos los productos
      renderProducts(allProducts);   // Mostrar todos al inicio
    })
    .catch(err => console.error("Error al cargar productos:", err));
}

// Filtrar productos (función global)
function filterProducts(category) {
  if (category === 'all') {
    renderProducts(allProducts);
  } else {
    let filtered = allProducts.filter(p => {
      // Permite coincidencias parciales en categorías separadas por coma
      return p.category.split(',').map(c => c.trim().toLowerCase()).includes(category.toLowerCase());
    });
    renderProducts(filtered);
  }
}

// Modal y eventos de interés
function attachInterestEvents() {
  const modal = document.getElementById("contact-modal");
  const selectedProductText = document.getElementById("selected-product");
  const form = document.getElementById("advisor-form");

  if (!modal || !selectedProductText || !form) {
    console.error("No se encontró el modal o alguno de sus elementos.");
    return;
  }

  document.querySelectorAll(".interest-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const productName = btn.getAttribute("data-product");
      selectedProductText.textContent = "Producto seleccionado: " + productName;
      modal.style.display = "flex"; // mostrar modal
    });
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Formulario enviado. Pronto nos pondremos en contacto.");
    modal.style.display = "none";
    form.reset();
  });
}


// Ejecutar al inicio
loadProducts();
