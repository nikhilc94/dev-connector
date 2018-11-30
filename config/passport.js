
const mongoose = require('mongoose');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


const User = mongoose.model('users');
const keys = require('../config/keys');


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.secret
};


module.exports = passport => {
    try {
        passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
            const user = await User.findById(jwt_payload.id);
            return done(null, user ? user : false);
        }));
    }
    catch (error) {
        console.log(error);
    }
}

