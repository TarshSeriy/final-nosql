document.addEventListener("DOMContentLoaded", () => {
    const registerBtn = document.getElementById("register-btn");
    const loginBtn = document.getElementById("login-btn");

    if (registerBtn) {
        registerBtn.addEventListener("click", async () => {
            const name = document.getElementById("reg-name").value;
            const email = document.getElementById("reg-email").value;
            const password = document.getElementById("reg-password").value;

            if (!name || !email || !password) {
                alert("Please fill in all fields.");
                return;
            }

            const userData = { name, email, password };

            try {
                const response = await fetch("/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                });

                if (!response.ok) {
                    throw new Error("Registration failed");
                }

                alert("Registration successful! Please log in.");
                window.location.href = "login.html";
            } catch (error) {
                console.error("Error:", error);
                alert("Registration error. Please try again.");
            }
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", async () => {
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;

            if (!email || !password) {
                alert("Please fill in all fields.");
                return;
            }

            const credentials = { email, password };

            try {
                const response = await fetch("/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(credentials),
                });

                if (!response.ok) {
                    throw new Error("Login failed");
                }

                alert("Login successful!");
                window.location.href = "index.html";
            } catch (error) {
                console.error("Error:", error);
                alert("Login error. Please try again.");
            }
        });
    }
});
