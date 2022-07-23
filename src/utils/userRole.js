let isAdmin=() =>{
    console.log("callde ais admin")
    let role = localStorage.getItem("ROLE_OF_USER")
    if (role === "ADMIN") {
        return true
    } else {
        return false
    }
}
export default{
    isAdmin
}
