/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const UserController = {
    signUp: create,
    createBucket: createBucket
};

module.exports = UserController;





function createBucket(req, res) {
    const paramsNames = ['name', 'owner'];
    if (!Utils.validateParams(req, paramsNames)) {
        return res.json(400, {
            status: 'failed',
            message: 'you must send the parameters'
        });
    }

    Bucket.create(req.allParams(), function(err, bucketCreated) {
        if (err) {
            return res.json(500, {
                status: 'failed',
                message: 'something went wrong, please try later',
                error:err
            });
        }

        return res.json(201, {
            status: 'success',
            bucket: bucketCreated
        });


    });

}


function create(req, res) {
    const paramsNames = ['name', 'email', 'username',
        'password', 'passwordConfirmation'
    ];
    if (!Utils.validateParams(req, paramsNames)) {
        return res.json(400, {
            status: 'failed',
            message: 'you must send the parameters'
        });
    }

    if (req.param('password') !== req.param('passwordConfirmation')) {
        return res.json(412, {
            status: 'failed',
            message: 'passwords must equal'
        });
    }

    User.create(req.allParams(), function(err, userCreated) {
        if (err) {
            return res.json(500, {
                status: 'failed',
                message: 'something went wrong.',
                error: err

            });
        }

        return res.json(201, {
            status: 'success',
            user: userCreated
        });

    });


}