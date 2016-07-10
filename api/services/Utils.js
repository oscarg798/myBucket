const Utils = {
	isNull:isNull,
	validateParams:validateParams
}

module.exports = Utils;

function isNull(obj) {
    return (obj === undefined || typeof obj === 'undefined' || obj === null);
}

function validateParams(req, paramsNames) {
    for (var i = 0; i < paramsNames.length; i++) {
        if (Utils.isNull(req.param(paramsNames[i]))) {
            return false;
        }
    }
    return true;
}

