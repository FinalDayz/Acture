export default {
    //hier een lijst van alle apidestinations, gebruikt dit incombinatie met de httpclient :)
    login: {destination: '/api/users/login', type: 'POST'}, register: {destination: '/api/users/register', type: 'POST'},

    //dit is de default ip van de api server
    apiServer: 'http://192.168.178.55:3000',
};