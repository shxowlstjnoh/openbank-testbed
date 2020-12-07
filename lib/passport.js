module.exports = function (app) {
    const passport = require('passport');
    const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(function (user, done) {
        // 로그인에 성공한 것을 session store에 저장하는 역할
        // 로그인함수에서도 콜이 됨
        console.log('serializeUser', user);
        done(null, user); //사용자 식별자
    });

    passport.deserializeUser(function (user, done) {
        //브라우저 refresh할때마다 호출됨
        // var user = db.get('users').find({ id: id }).value();
        console.log('deserializeUser', user);
        done(null, user);
    });

    passport.use(
        'provider',
        new OAuth2Strategy(
            {
                authorizationURL: 'https://testapi.openbanking.or.kr/oauth/2.0/authorize',
                tokenURL: 'https://testapi.openbanking.or.kr/oauth/2.0/token',
                clientID: 'cmApiSmViROeNzcKtyn6bTj1m8z7Ghu563wlETnb',
                clientSecret: 'LUvgXiHYoqllE028bcQYGfME4UbGZm7Lws9Uiox9',
                callbackURL: 'http://localhost:3000/auth/callback',
            },
            function (accessToken, refreshToken, results, profile, done) {
                const res = { ...results };
                console.log(`result: ${JSON.stringify(res)}`);
                return done(null, {accessToken});
            }
        )
    );

    return passport;
};
