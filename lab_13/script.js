async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    
    if (data.token) {
        localStorage.setItem("access_token", data.token);
        localStorage.setItem("user_first_name", data.firstName);
        window.location.href = "dashboad.html";
    } else {
        const error = document.getElementById("error");
        error.innerText = data.message || "Помилка логіну";
    }
}

async function checkLogin() {
    const token = localStorage.getItem("access_token");
    const firstName = localStorage.getItem("user_first_name");
    if (token)
        {
        if (window.location.pathname.includes("index.html")) {
            window.location.href = "dashboad.html";
        } else if (window.location.pathname.includes("dashboad.html")) {
            document.getElementById("username").innerText = `Привіт, ${firstName}`;
            insertUsers();
        }
    } else 
    {
        if (!window.location.pathname.includes("index.html")) {
            window.location.href = "index.html";
        }
    }
}






async function insertUsers() {
    const response = await fetch("https://dummyjson.com/users");
    const { users } = await response.json();
    const usersContainer = document.getElementById("users");
    usersContainer.innerHTML = "";
    users.forEach((user) => {
        const userDiv = document.createElement("div");
        userDiv.innerHTML = `
            <h3>${user.username}</h3>
            <p>Ім'я: ${user.firstName}</p>
            <p>Прізвище: ${user.lastName}</p>
        `;


        usersContainer.appendChild(userDiv);
    });
}
function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_first_name");
    window.location.href = "index.html";
}

checkLogin();