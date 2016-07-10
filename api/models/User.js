/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        name: {
            type: 'String',
            required: true
        },
        email: {
            type: 'email',
            unique: true
        },
        username: {
            type: 'String',
            unique: true
        },
        encryptedPassword: {
            type: 'String'
        },
        buckets: {
            collection: 'Bucket',
            via: 'owner'
        },
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            delete obj.passwordConfirmation;
            delete obj._csrf;
            delete obj.encryptedPassword;
            return obj;

        }
    },
    beforeCreate: function(values, next) {
        var password = values.password;
        var passwordConfirmation = values.passwordConfirmation;

        require('bcrypt').hash(values.password, 512,
            function(err, encryptedPassword) {
                values.password = null;
                values.passwordConfirmation = null;
                values.encryptedPassword = encryptedPassword;

                next();
            });
    }
};