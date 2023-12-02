const URL = "http://localhost:8000/subjects/api/gradeDefinitions/";

export const createGradeDefinition = async (gradeDefinition, token) => {

    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gradeDefinition)
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

export const getGradesDefinitionsByGradeGroup = async (gradeGroup, token) => {
    try {
        const response = await fetch(URL + gradeGroup + "/grades_by_grade_group", {
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