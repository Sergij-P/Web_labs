document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const loginURL = 'https://dummyjson.com/auth/login';
        const payload = {
            username: username,
            password: password
        };
        try 
        {
            const response = await fetch(loginURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }
            const data = await response.json();

            console.log('Login successful:', data);
            alert('Login successful! Token: ' + data.token);
            localStorage.setItem('userToken', data.token);
            window.location.href = 'dashboad.html';

        } catch (error) {
            console.error('Error during login:', error);
            alert('Error: ' + error.message);
        }
    });

    const registerLink = document.getElementById('register');
    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Register functionality is not implemented yet.');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const userList = document.getElementById('userList');
    const logoutButton = document.getElementById('logoutButton');
    const loadUsers = () => {
        return JSON.parse(localStorage.getItem('users')) || [];
    };
    if (userList) {
        const users = loadUsers();
        if (users.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'Немає зареєстрованих користувачів';
            userList.appendChild(li);
        } else {
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = user.username;
                userList.appendChild(li);
            });
        }
    }


    if (logoutButton)
        {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('userToken');
            window.location.href = 'index.html';
        });
    }
});
