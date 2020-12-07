var express = require('express');
var router = express.Router();
const axios = require('axios');

module.exports = function (passport) {
    router.get(
        '/form',
        passport.authenticate('provider', {
            scope: 'login inquiry transfer',
            auth_type: '0',
            response_type: 'code',
            state: 'b80BLsfigm9OokPTjy03elbJqRHOfGSY',
        })
    );

    router.get(
        '/login',
        passport.authenticate('provider', {
            scope: 'login inquiry transfer',
            auth_type: '1',
            response_type: 'code',
            state: 'b80BLsfigm9OokPTjy03elbJqRHOfGSY',
        })
    );

    router.get(
        '/callback',
        passport.authenticate('provider', { successRedirect: '/', failureRedirect: '/auth/login' }, (res, req) => {

        })
    );

    // router.get(
    //     '/userInfo',
    //     passport.authenticate('provider', {
    //         user_seq_no: '1100765464',
    //     }, (req, res) =>{
    //         res.send('userInfo')
    //     })
    // );

    router.get('/userInfo', function (req, res, next) {
    axios
        .get('https://testapi.openbanking.or.kr/oauth/2.0/user/me', {
            params: {
                user_seq_no: '1100765464',
                access_token: ''
            },
        })
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
});

    router.get('/logout', (req, res) => {
        req.logout();
        res.send('logout');
    });

    return router;
};
