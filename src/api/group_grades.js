const URL = "http://localhost:8000/subjects/api/gradeGroups/";

export const createGradeGroup = async (gradeGroup, token) => {
    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gradeGroup)
        });
        if (response.ok) {
            const data = response.json();
            return data;
        } else {
            throw new Error("Invalid notes definition: ", response.status, response.statusText, response);
        }
    } catch (error) {
        console.log(error);
    }
};

export const getGradeGroups = async (token) => {
    try {
        const response = await fetch(URL, {
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