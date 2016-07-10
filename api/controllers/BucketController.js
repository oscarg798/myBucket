/**
 * BucketController
 *
 * @description :: Server-side logic for managing buckets
 */

var BucketController = {
    addSubFolder: addSubFolder
};

module.exports = BucketController;

var q = require('q');

function updateBucketSubfolder(bucketFound, name) {
    var deferred = q.defer();

    var arr = bucketFound.subfolders;
    if(Utils.isNull(arr)){
    	arr = [name];
    }else{
    	arr.push(name)
    }

    sails.log.info('updating ' + bucketFound.id);

    Bucket.update({
        id: bucketFound.id
    }, {
        subfolders: arr
    }, function(err, bucketsUpdated) {
        if (err) {
            sails.log.info('error updating bucket ' + err);
            deferred.reject(err);
        } else {
        	sails.log.info('bucket updated ');
            deferred.resolve(bucketsUpdated[0]);
        }

    });

    return deferred.promise;
}

function addSubFolder(req, res) {
    const paramsNames = ['name', 'bucketId'];
    if (!Utils.validateParams(req, paramsNames)) {
        return res.json(400, {
            status: 'failed',
            message: 'you must send the parameters'
        });
    }

    Bucket.findOne({
        id: req.param('bucketId')
    }, function(err, bucketFound) {

        if (err) {
            return res.json(500, {
                status: 'failed',
                message: 'Something went wrong.',
                error: err
            });
        }

        if (!bucketFound) {
            return res.json(412, {
                status: 'failed',
                message: 'The bucketId specified does not belong to any know bucket'
            });

        }

        updateBucketSubfolder(bucketFound, req.param('name'))
            .then(function(bucket) {
                return res.json(200, {
                    status: 'success',
                    bucket: bucket
                });

            }).catch(function(err) {
                sails.log.error(new Error('catch update' + err))
                return res.json(500, {
                    status: 'failed',
                    message: 'Something went wrong.',
                    error: err
                });


            });


    });

}