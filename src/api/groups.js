const URL = "http://localhost:8000/groups/api/group/";


export const getSubjectByGroupId = async (groupId, token) => {
    try {
        const response = await fetch(URL + groupId + "/subject_by_group/", {
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
            throw new Error("Invalid Credentials: ", response.status, response.statusText, response);
        }
    } catch (error) {
        console.log(error);
    }

}