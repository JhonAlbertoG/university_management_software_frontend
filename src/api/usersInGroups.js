const URL = "http://localhost:8000/groups/api/usersingroup/";


export const getGroupsByIdentificationNumber = async (identificationNumber, token) => {
    try {
        const response = await fetch(URL + identificationNumber + "/groups_by_proffesor/", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Invalid Credentials: ", response.status, response.statusText, response);
        }
    }
    catch (error) {
        console.log(error);
    }
}