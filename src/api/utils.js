const URL = "https://api-colombia.com/api/v1/Department"

export const getDepartments = async () => {
    try {
        const response = await fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        if (response.ok) {
            const data = await response.json();
            const fields = ["id", "name"];
            let prunedData = data.map((data) => {
                for (let key in data) {
                    if (!fields.includes(key)) {
                        delete data[key];
                    }
                }
                return data;
            })
            return prunedData;
        } else {
            throw new Error("Invalid request: ", response.status, response.statusText);
        }
    }
    catch (error) {
        console.log(error);
    }
}

export const getCitiesByDepartmentId = async (departmentId) => {
    try {
        const response = await fetch(URL + "/" + departmentId + "/cities", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        if (response.ok) {
            const data = await response.json();
            const fields = ["id", "name"];
            let prunedData = data.map((data) => {
                for (let key in data) {
                    if (!fields.includes(key)) {
                        delete data[key];
                    }
                }
                return data;
            })
            return prunedData;
        } else {
            throw new Error("Invalid request: ", response.status, response.statusText);
        }
    }
    catch (error) {
        console.log(error);
    }
}