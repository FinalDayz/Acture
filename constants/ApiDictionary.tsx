export default {
    //hier een lijst van alle apidestinations, gebruikt dit incombinatie met de httpclient :)
    login: {destination: '/api/users/login', type: 'POST'},

    //dit is de defaults van de api server (verander dit naar je home pc)
    apiServer: 'http://192.168.178.248:3000',
    timeoutTimings: 7000, //in miliseconds
};