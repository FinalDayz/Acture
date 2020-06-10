import environmentVars from "./environmentVars";

export default {
    //hier een lijst van alle apidestinations, gebruikt dit incombinatie met de httpclient :)
    login: {destination: '/api/users/login', type: 'POST'},
    register: {destination: '/api/users/register', type: 'POST'},
    getAllUsers: {destination: '/api/users/', type: 'GET'},
    getInOrActiveUsers: {destination: '/api/users/active/', type: 'GET'},
    activateUser: {destination: '/api/users/activateUser/', type: 'PATCH'},
    deleteUser: {destination: '/api/users/', type: 'DELETE'},
    changeUserRole: {destination: '/api/users/changeRole/', type: 'POST'},

    followUsers: {destination: '/api/follow/', type: 'GET'},
    changeFollow: {destination: '/api/follow/', type: 'PATCH'},

    deletePost: {destination: '/api/feedposts/', type: 'DELETE'},
    getUserBlogs: {destination: '/api/feedposts/user-blogs/', type: 'POST'},

    getFeed: {destination: '/api/feedposts/feed', type: 'POST'},
    getEvents: {destination: '/api/feedposts/events', type: 'POST'},

    
    apiIp: environmentVars.address + ":" + environmentVars.port,
    timeoutTimings: 7000, //in miliseconds
};
