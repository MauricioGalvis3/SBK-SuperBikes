// Mostrar/ocultar contraseña
document.addEventListener('DOMContentLoaded', function() {
	const passwordInput = document.getElementById('password');
	const visibleCheckbox = document.getElementById('visible');
	if (passwordInput && visibleCheckbox) {
		visibleCheckbox.addEventListener('change', function() {
			passwordInput.type = this.checked ? 'text' : 'password';
		});
	}
});

document.addEventListener('click', function(event) {
	const passwordInput = document.getElementById('password');
	const visibleCheckbox = document.getElementById('visible');
	if (event.target === visibleCheckbox) {
		if (visibleCheckbox.checked === false) passwordInput.type = 'password';
		else passwordInput.type = 'text';
	}
});

const $submit = document.getElementById('submit');
const $password = document.getElementById('password');
const $username = document.getElementById('username');

document.addEventListener("click", (event) => {
	if (event.target === $submit) {
		if ($password.value === "1234" && $username.value === "Andres") {
			event.preventDefault();
			window.location.href = "index.html";
		}
	}
});