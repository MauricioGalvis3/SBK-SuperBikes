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
		event.preventDefault();
		if (
			$password.value === "1234" &&
			$username.value.trim().toLowerCase() === "andres"
		) {
			window.location.href = "index.html";
		} else {
			let msg = document.getElementById('login-message');
			if (!msg) {
				msg = document.createElement('div');
				msg.id = 'login-message';
				msg.style.color = 'red';
				msg.style.marginTop = '10px';
				$submit.parentNode.appendChild(msg);
			}
			msg.textContent = 'Usuario no encontrado, regístrate.';
		}
	}
});