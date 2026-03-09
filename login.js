const loginButton = document.getElementById('login-button');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('login-error');

loginButton.addEventListener('click', () => {

const username = usernameInput.value.trim();
const password = passwordInput.value.trim();

if(username === '' || password === '')
{
loginError.style.display = 'block';
}

else
{
loginError.style.display = 'none';

localStorage.setItem('currentUser', username);

window.location.href = 'todo.html';
}

});