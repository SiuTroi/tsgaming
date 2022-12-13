const userInit = {}

const UserReducer = (state = userInit, action) => {
    switch(action.type) {
        case "USER_LOGIN": 
            const { userid, username, email, password } = action.payload;
            return {
                userid: userid,
                username: username,
                email: email,
                password: password
            }
        case "USER_SIGNUP": 
            const { usersignupid, signupusername, signupemail, signuppassword, historycheckout} = action.payload;
            return {
                userid: usersignupid,
                username: signupusername,
                email: signupemail,
                password: signuppassword,
                historycheckout: historycheckout
            }
        case "USER_LOGOUT": 
            return {
                userid: "",
                username: "",
                email: "",
                password: ""
            }
        default:
            return state
    }
}

export default UserReducer