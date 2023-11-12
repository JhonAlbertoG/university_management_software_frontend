export function changeSideMenuIconsColorOnMouseEnterLeave(elementId, color) {
    let icon = document.getElementById(elementId[0]);
    let link = document.getElementById(elementId[1]);
    // console.log(icon);
    if (icon !== null && link !== null) {
        icon.style.color = color;
        link.setAttribute("style", "color: " + color + " !important")
    }
}

// export function changePersonalInfoStyleBasedOnAuth(isUserAuthenticated){
//     if(isUserAuthenticated == true){

//     }else{

//     }
// }