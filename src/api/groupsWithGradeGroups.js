const URL = "http://localhost:8000/subjects/api/groupWithGroupsOfGrades/";

export const getGradeGroupsByGroup = async (groupId, token) => {
    try {
        const response = await fetch(URL + groupId + "/grade_groups_by_group", {
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
            throw new Error("Invalid identification: ", response.status, response.statusText, response);
        }
    } catch (error) {
        console.log(error);
    }
}