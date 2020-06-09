import environmentVars from "./environmentVars";

export default {
    //hier een lijst van alle apidestinations, gebruikt dit incombinatie met de httpclient :)
    login: {destination: '/api/users/login', type: 'POST'},
    register: {destination: '/api/users/register', type: 'POST'},
    getAllUsers: {destination: '/api/users/', type: 'GET'},
    getInOrActiveUsers: {destination: '/api/users/active/', type: 'GET'},
    activateUser: {destination: '/api/users/activateUser/', type: 'PATCH'},

    addPost: {destination: '/api/feed/addPost', type: 'POST'},
    getAllCategories: {destination: '/api/feed/getAllCategories', type: 'GET'},

    //dit is de defaults van de api server (verander dit naar je home pc)
    apiIp: environmentVars.address + ":" + environmentVars.port,
    timeoutTimings: 70000, //in miliseconds
};
