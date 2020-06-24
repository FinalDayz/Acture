import environmentVars from "./environmentVars";

export default {
    //hier een lijst van alle apidestinations, gebruikt dit incombinatie met de httpclient :)
    //GET gebruik je alleen bij bodyless, alle andere type vormen zijn bodyfull
    //GET POST UPDATE DELETE
    login: {destination: '/api/users/login', type: 'POST'},
    changePassword: {destination: '/api/users/changePassword', type: 'POST'},
    register: {destination: '/api/users/register', type: 'POST'},
    getAllUsers: {destination: '/api/users/', type: 'GET'},
    getInOrActiveUsers: {destination: '/api/users/active/', type: 'GET'},
    activateUser: {destination: '/api/users/activateUser/', type: 'PATCH'},
    deleteUser: {destination: '/api/users/', type: 'DELETE'},
    resetPassword: {destination: '/api/users/resetPassword', type: 'PATCH'},
    changeUserRole: {destination: '/api/users/changeRole/', type: 'POST'},
    

    addPost: {destination: '/api/feed/addPost/', type: 'POST'},
    editPost: {destination: '/api/feed/editPost', type: 'PATCH'},
    getAllCategories: {destination: '/api/feed/getAllCategories', type: 'GET'},
    getPostToEdit:{destination: '/api/feed/getPostToEdit' , type: 'GET'},
    getAttendance: {destination: '/api/attendance/getAttendance/', type: 'GET'},

    //vergeet niet id in de header te pompen
    getUserById: {destination: '/api/users/byid/', type: 'GET'},
    getStartupById: {destination: '/api/startup/byid/', type: 'GET'},
    getStartupsByUserId: {destination: '/api/startup/byuserid/', type: 'GET'},


    followUsers: {destination: '/api/follow/', type: 'GET'},
    changeFollow: {destination: '/api/follow/', type: 'PATCH'},
    changeStartupFollow: {destination: '/api/startup/', type: 'PATCH'},

    deletePost: {destination: '/api/feedposts/', type: 'DELETE'},
    getUserBlogs: {destination: '/api/feedposts/user-blogs/', type: 'POST'},
    insertAttendant: {destination: '/api/attendance/addAttendant/', type: 'POST'},

    getFeed: {destination: '/api/feedposts/feed', type: 'POST'},
    getGlobalFeed: {destination: '/api/feedposts/globalFeed', type: 'POST'},
    getEvents: {destination: '/api/feedposts/events', type: 'POST'},
    getGuides: {destination: '/api/feedposts/guides', type: 'POST'},
    getBlogs: {destination: '/api/feedposts/blogs', type: 'POST'},
    getUserPosts: {destination:'/api/feedposts/getUserPosts/', type: 'GET'},

    getPrivacySettings: {destination: '/api/privacy/', type: 'GET'},
    getUserDetails: {destination: '/api/users/getUserDetails', type: 'GET'},
    changePrivacySettings: {destination: '/api/privacy/', type: 'POST'},
    updateUserDetails: {destination: '/api/users/updateUserDetails', type: 'PATCH'},


    apiIp: environmentVars.address + ":" + environmentVars.port,
    timeoutTimings: 20000, //in miliseconds
};
