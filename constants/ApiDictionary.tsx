export default {
    //hier een lijst van alle apidestinations, gebruikt dit incombinatie met de httpclient :)
    login: {destination: '/api/users/login', type: 'POST'},
    addPost: {destination: '/api/users/add/post', type: 'POST'},
    getAllCategories: {destination: 'api/feed/getAllCategories', type: 'GET'},

    //dit is de default ip van de api server
    apiServer: 'http://localhost:3000',
};
