const URL = "http://localhost:8000/auth/";

export const login = async (credentials) => {
    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Invalid Credentials: ", response.status);
        }
    }
    catch (error) {
        console.log(error);
    }
}


export const refreshToken = async (token) => {
    try {
        if (token === null) { return null; }
        else {
            const response = await fetch(URL + "refresh/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "refresh": token }),
            });
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error("Invalid Token: ", response.status);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}

