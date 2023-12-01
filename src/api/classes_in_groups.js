const URL = "http://localhost:8000/groups/api/classesingroup/";


export const getClassesInGroup = async (groupId, token) => {
    try {
        const response = await fetch(URL + groupId + "/classes_in_group/", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            const data = response.json();
            return data;
        } else {
            throw new Error("Invalid request data / credentials: ", response.status, response.statusText, response);
        }
    } catch (error) {
        console.log(error);
    }
};