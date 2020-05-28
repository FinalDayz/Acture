export default {
    //hier een lijst van alle apidestinations, gebruikt dit incombinatie met de httpclient :)
    login: {destination: '/api/users/login', type: 'POST'},
    feed: {destination: '/api/feedposts', type: 'GET'},

    //dit is de default ip van de api server
    apiServer: 'http://192.168.178.248:3000',
};