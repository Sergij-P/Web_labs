document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const userList = document.getElementById('userList');
    const logoutButton = document.getElementById('logoutButton');

    const apiBase = 'https://dummyjson.com';
    const loadUsers = () => {
        return JSON.parse(localStorage.getItem('users')) || [];
    };
    const saveUsers = (users) => {
        localStorage.setItem('users', JSON.stringify(users));
    };
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;

            if (!username || !password) {
                alert('Будь ласка, заповніть всі поля!');
                return;
            }




            const users = loadUsers();
            if (users.some(user => user.username === username)) {
                alert('Користувач з таким іменем вже існує!');
                return;
            }
            users.push({ username, password });
            saveUsers(users);
            alert('Реєстрація успішна!');
            registerForm.reset();
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value;

            const users = loadUsers();
            const user = users.find(user => user.username === username && user.password === password);

            if (!user) {
                alert('Невірне ім\'я користувача або пароль!');
                return;
            }

            localStorage.setItem('currentUser', username);
            window.location.href = 'dashboad.html';
        });
    }
    if (userList) {
        const users = loadUsers();
        if (users.length === 0) {
            userList.innerHTML = '<li>Немає зареєстрованих користувачів.</li>';
        } else {
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = user.username;
                userList.appendChild(li);
            });
        }
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }
});
