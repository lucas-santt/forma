function getData() {
    return {
        username: document.getElementById("username-input").value,
        password: document.getElementById("password-input").value
    }
}

async function LogIn(data) {
    const res = await fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if(res.ok) {
        window.location.href = "/";
    }
 }

async function SignUp() {
    const data = getData();

    const res = await fetch("/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if(res.ok) {
        LogIn(data);
    }
}

async function SignIn() {
    LogIn(getData());
}