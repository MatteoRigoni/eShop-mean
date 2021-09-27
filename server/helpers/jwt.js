const expressJwt = require('express-jwt');

function authJwt() {
    const secret = process.env.JWT_SECRET;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256'], // same of package jwttoken
        isRevoked: isRevoked
    }).unless({
        path: [
            // `${api}/users/login`,
            // `${api}/users/register`,
            // { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
            // { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
            // { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] }
            { url: /(.*)/ }
        ]
    });
}

async function isRevoked(req, payload, done) {
    const api = process.env.API_URL;

    if (!payload.isAdmin) {
        done(null, true);
    }

    done();
}

module.exports = authJwt;