import environmentVars from "./environmentVars";

export default {
    //hier een lijst van alle apidestinations, gebruikt dit incombinatie met de httpclient :)
    login: {destination: '/api/users/login', type: 'POST'},
    register: {destination: '/api/users/register', type: 'POST'},
    getAllUsers: {destination: '/api/users/', type: 'GET'},
    getInactiveUsers: {destination: '/api/users/inactiveUsers/', type: 'GET'},
    activateUser: {destination: '/api/users/activateUser/', type: 'PATCH'},

    //dit is de defaults van de api server (verander dit naar je home pc)
    apiIp: environmentVars.address + ":" + environmentVars.port,
    timeoutTimings: 7000, //in miliseconds
};