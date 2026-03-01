const loginButton = document.getElementById('login-button');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('login-error');

loginButton.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if(username === '' || password === '') {
        loginError.style.display = 'block'; // afficher message erreur
    } else {
        loginError.style.display = 'none';
        // Sauvegarde du username pour todo.js
        localStorage.setItem('currentUser', username);
        // redirection vers todo.html
        window.location.href = 'todo.html';
    }
});