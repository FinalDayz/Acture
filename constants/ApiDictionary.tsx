export default {
    //hier een lijst van alle apidestinations, gebruikt dit incombinatie met de httpclient :)
    login: {destination: '/api/users/login', type: 'POST'},
    addPost: {destination: '/api/users/add/post', type: 'POST'},
    getAllCategories: {destination: 'api/feed/getAllCategories', type: 'GET'},

    //dit is de defaults van de api server (verander dit naar je home pc)
    timeoutTimings: 7000, //in miliseconds
    //dit is de default ip van de api server
    apiServer: 'http://192.168.178.32:3000',

};
