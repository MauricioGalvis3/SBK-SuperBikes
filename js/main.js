// =======================
// CARGA DE FRAGMENTOS
// =======================
function loadComponent(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
    })
    .catch(err => console.error(`Error cargando ${file}:`, err));
}

loadComponent('header-container', 'components/header.html');
loadComponent('footer-container', 'components/footer.html');
loadComponent('sidebar-container', 'components/sidebar.html');

// =======================
// VARIABLES GLOBALES
// =======================
let allProducts = [];

// =======================
// RENDERIZAR PRODUCTOS
// =======================
function renderProducts(products) {
  const container = document.getElementById('products-container');
  let html = "";

  products.forEach(product => {
    html += `
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
  });

  container.innerHTML = html;

  // Reenlazar eventos cada vez que se renderizan productos
  attachInterestEvents();
}

// =======================
// CARGAR PRODUCTOS DESDE JSON
// =======================
function loadProducts() {
  fetch('data/products.json')
    .then(res => res.json())
    .then(products => {
      allProducts = products;
      renderProducts(allProducts);
    })
    .catch(err => console.error("Error al cargar productos:", err));
}

// =======================
// FILTRAR PRODUCTOS
// =======================
window.filterProducts = function (category) {
  if (category === 'all') {
    renderProducts(allProducts);
  } else {
    const filtered = allProducts.filter(p => {
      if (!p.category) return false;
      if (Array.isArray(p.category)) {
        return p.category.map(c => c.trim().toLowerCase()).includes(category.toLowerCase().trim());
      } else if (typeof p.category === 'string') {
        return p.category.toLowerCase().split(',').map(c => c.trim()).includes(category.toLowerCase().trim());
      }
      return false;
    });
    renderProducts(filtered);
  }
};

// =======================
// MODAL: "ME INTERESA"
// =======================
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
      modal.style.display = "flex";
    });
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const phoneInput = form.querySelector('input[type="tel"]');
    const phoneRegex = /^\+?\d{7,15}$/; 
    if (phoneInput && !phoneRegex.test(phoneInput.value.trim())) {
      phoneInput.value = '';
      phoneInput.focus();
      phoneInput.setCustomValidity('Ingrese un número válido (solo dígitos, opcional +).');
      phoneInput.reportValidity();
      return;
    }
    if (phoneInput) phoneInput.setCustomValidity('');
    alert("Formulario enviado. Pronto nos pondremos en contacto.");
    modal.style.display = "none";
    form.reset();
  });
}

// =======================
// EVENTOS AL INICIO
// =======================
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    // Modal de contacto directo
    const contactBtn = Array.from(document.querySelectorAll('nav .header-btn'))
      .find(btn => btn.textContent.trim().toLowerCase() === 'contacto');
    const directContactModal = document.getElementById('direct-contact-modal');
    const closeContactModal = document.getElementById('close-contact-modal');

    if (contactBtn && directContactModal) {
      contactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        directContactModal.style.display = 'flex';
      });
    }

    if (closeContactModal) {
      closeContactModal.addEventListener('click', () => {
        directContactModal.style.display = 'none';
      });
    }

    window.addEventListener('click', (e) => {
      if (e.target === directContactModal) {
        directContactModal.style.display = 'none';
      }
    });

    // Logout redirige al login
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        window.location.href = 'login.html';
      });
    }
  }, 300);

  // Cargar productos
  loadProducts();
});
