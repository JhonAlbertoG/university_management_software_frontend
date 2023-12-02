const URL = "http://localhost:8000/subjects/api/grades/";

// TODO: create the createGrade function

export const createGrade = async (grade, token) => {
    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(grade)
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

// export const getGradesByGradeGroup = async (gradeGroup, token) => {
//     try {
//         const response = await fetch(URL + gradeGroup + "/grades_by_grade_group", {
//             method: "GET",
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             },
//         });
//         if (response.ok) {
//             const data = response.json();
//             return data;
//         } else {
//             throw new Error("Invalid identification: ", response.status, response.statusText, response);
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

export const getGradesByUser = async (userId, token) => {
    try {
        const response = await fetch(URL + userId + "/grades_by_user", {
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
