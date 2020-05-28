import enviromentsVars from "./environmentVars";

export default {
    //hier een lijst van alle apidestinations, gebruikt dit incombinatie met de httpclient :)
    login: {destination: '/api/users/login', type: 'POST'},
    register: {destination: '/api/users/register', type: 'POST'},
    inactive: {},

    //dit is de defaults van de api server (verander dit naar je home pc)
    apiServer: enviromentsVars.address + ":" + enviromentsVars.port,
    timeoutTimings: 7000, //in miliseconds
};
