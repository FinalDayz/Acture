import environmentVars from "./environmentVars";

export default {
    //hier een lijst van alle apidestinations, gebruikt dit incombinatie met de httpclient :)
    login: {destination: '/api/users/login', type: 'POST'},
    register: {destination: '/api/users/register', type: 'POST'},
    getAllUsers: {destination: '/api/users/', type: 'GET'},
    getInOrActiveUsers: {destination: '/api/users/active/', type: 'GET'},
    activateUser: {destination: '/api/users/activateUser/', type: 'PATCH'},

    apiIp: environmentVars.address + ":" + environmentVars.port,
    timeoutTimings: 7000, //in miliseconds
};
