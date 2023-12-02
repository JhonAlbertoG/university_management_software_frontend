export const formatGroupsRes = (groups) => {
    let newGroupList = {};
    for (let group of groups) {
        for (let user of group) {
            if (Object.keys(newGroupList).includes(user.group_id.toString())) {
                newGroupList[user.group_id].push({ "user_id": user.user_id });
            } else {
                newGroupList[user.group_id] = [{ "user_id": user.user_id }];
            }
        }
    }
    return newGroupList;
}

export const setAllResInOneElement = (formattedGroups, subjectsByGroupsId, usersByGroupId) => {
    /*
    [
     {subject: {...},
     groups: [{group_id:[{student},{student},...]}, {...}, {...},],
    }   
    ]
    */

    //  Map through subjectsByGroupsId and add subjects to groupsWithSubjectsAndUsers
    let groupsWithSubjectsAndUsers = [];
    let addedSubjects = [];
    let addedGroups = [];
    let groupSpecs = {};
    for (let element = 0; element < subjectsByGroupsId.length; element++) {
        // console.log("in iteration: ", subjectsByGroupsId[element].group_id)
        groupSpecs = subjectsByGroupsId[element];
        if (!addedSubjects.includes(subjectsByGroupsId[element].subject.id)) {
            groupsWithSubjectsAndUsers.push({
                // list_index: element,
                subject: groupSpecs.subject,
                groups: [{ [groupSpecs.group_id]: usersByGroupId[groupSpecs.group_id] }]
            });
            addedSubjects.push(groupSpecs.subject.id);
            // console.log("added subjects: ", addedSubjects);
            // console.log("added groups: ", addedGroups);
        } else {

            // console.log('groupSpec multiple gorups: ', groupSpecs, "in iteration: ", subjectsByGroupsId[element])
            let addedSubjectWithGroups = groupsWithSubjectsAndUsers.find((info) =>
                info.subject.id === groupSpecs.subject.id)
            // console.log(addedSubjectWithGroups)
            addedSubjectWithGroups.groups.push({ [groupSpecs.group_id]: usersByGroupId[groupSpecs.group_id] });
            // for(let addedGroup of addedSubjectWithGroups.groups){
            //     if(Object.keys(addedGroup)[0] === groupSpecs.subject.id && ){
            //         addedGroup.groups.push({ [groupSpecs.group_id]: usersByGroupId[groupSpecs.group_id] });
            //     }
            // }
            // // console.log("find group: ", addedGroup);
            // addedGroup.groups.push({ [groupSpecs.group_id]: usersByGroupId[groupSpecs.group_id] });
            // subjectsWithMoreThanTwoGroups.push({ subject_id: groupSpecs.subject.id, group_id: groupSpecs.group_id });
        }
        addedGroups.push(groupSpecs.group_id);
    }

    // for (let group of subjectsByGroupsId) {
    //     group.users = usersByGroupId[group.group_id];
    // }
    // return subjectsByGroupsId;
    return groupsWithSubjectsAndUsers
}

export const getTokenKeyName = (keys, param) => {
    for (let key of keys) {
        if (!key.includes("expiracy") && key.includes(param)) {
            return key;
        }
    }
}


export const toggleBakcgroundColor = (elementId) => {
    let div = document.getElementById(elementId);
    let allElements = document.getElementsByClassName("group-container");
    if (div && allElements) {
        for (let element of allElements) {
            element.style.backgroundColor = "#FFFFFF";
        }
        if (div.style.backgroundColor === "#85FE36") {
            div.style.backgroundColor = "#FFFFFF";
        } else {
            div.style.backgroundColor = "#85FE36";
        }
    }
}

export const formattGroupClassesToshow = (classes) => {
    const formattedClasses = {}
    for (let groupClass of classes.classes) {
        if (!Object.keys(formattedClasses).includes(groupClass.date)) {
            formattedClasses[groupClass.date] = [`${groupClass.start_time} a ${groupClass.end_time}`]
        } else {
            formattedClasses[groupClass.date].push(`${groupClass.start_time} a ${groupClass.end_time}`)
        }
    }
    return formattedClasses

}



export const addNote = () => {
    var notesContainerDocObj = document.getElementById('notes-def-container');
    var numDivs = notesContainerDocObj.children.length;
    var idDiv = 'div_' + numDivs;

    var newNote = document.createElement('div');
    newNote.className = 'note-specs d-flex my-2';
    newNote.id = idDiv;

    var noteName = document.createElement('input');
    noteName.type = 'text';
    noteName.className = 'form-control mx-2 note-name-input';


    var notePercentage = document.createElement('input');
    notePercentage.type = 'number';
    notePercentage.className = 'form-control mx-2 w-25 note-percentage-input';

    var deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.className = 'deleteBtn btn btn-danger text-white';
    deleteBtn.onclick = function () {
        notesContainerDocObj.removeChild(newNote);
    };

    newNote.appendChild(noteName);
    newNote.appendChild(notePercentage);
    newNote.appendChild(deleteBtn);

    notesContainerDocObj.appendChild(newNote);

}

export const getAddedNotes = () => {
    var contenedor = document.getElementById('notes-def-container');
    if (contenedor !== null) {

        var divs = contenedor.getElementsByClassName('note-specs');
        var resultados = {};
        for (var i = 0; i < divs.length; i++) {
            var idDiv = divs[i].id.split('_')[1]; // Obtiene el número del ID

            var nameInput = divs[i].getElementsByClassName('note-name-input')[0];
            var percentageInputs = divs[i].getElementsByClassName('note-percentage-input')[0];

            var nameValue = nameInput.value; // Valor del primer input
            var percentageValue = parseFloat(percentageInputs.value).toFixed(2); // Valor del segundo input

            resultados[idDiv] = {
                'name': nameValue,
                'percentage_in_group': parseFloat(percentageValue).toFixed(2)
            };
        }

        return resultados;
    }
    else {
        return {}
    }
}

export const deleteHeaders = (idTabla, textosCabeceras) => {
    var cabeceras = document.querySelectorAll('#' + idTabla + ' thead th');
    cabeceras.forEach(function (cabecera) {
        if (!textosCabeceras.includes(cabecera.textContent)) {
            cabecera.remove();
        }
    });
}


export const cleanTable = (idTabla) => {
    var registros = document.querySelector('#' + idTabla + ' tbody');
    if (typeof registros !== "undefined" && registros !== null) {
        while (registros.firstChild) {
            registros.removeChild(registros.firstChild);
        }
    }
}


export function compareTwoObjects(newInfo, fetchedInfo) {
    console.log("Información actualizada: ", newInfo)
    console.log("Información fetcheada: ", fetchedInfo)
    return JSON.stringify(newInfo) !== JSON.stringify(fetchedInfo) ? true : false
}


