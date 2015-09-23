// Declare internals


var internals = {};


exports.register = function (server, options, next) {

    server.auth.scheme('passthrough', internals.implementation);
    return next();
};


exports.register.attributes = {
    pkg: require('../package.json')
};


internals.implementation = function (server, options) {

    var scheme = {
        authenticate: function (request, reply) {

            var credentials = {};

            // If we want to add dummy scopes inside the credentials,
            // define pass-scope header in request object, i.e. pass-scope = 'admin' for single scope
            // or pass-scope = 'admin, user, wizard' for multiple scopes
            for (var key in request.headers) {
                if (key.indexOf('pass-') === 0) {
                    var val = request.headers[key];
                    val = val.split(',');
                    val.forEach(function (v) {

                        v = v.trim();
                    });
                    credentials[key.substring('pass-'.length)] = val;
                }
            }
            var result = {
                credentials: credentials
            };
            reply.continue(result);
        }
    };

    return scheme;

};
