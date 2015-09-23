// Load modules

var Code = require('code');
var Hapi = require('hapi');
var Lab = require('lab');

// Test shortcuts
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('passthrough sceme', function () {

    it('returns a reply on successful auth', function (done) {

        var server = new Hapi.Server();
        server.connection();
        server.register(require('../'), function (err) {

            expect(err).to.not.exist();
            server.auth.strategy('default', 'passthrough');
            server.route({
                method: 'POST',
                path: '/pass',
                handler: function (request, reply) {

                    reply('ok');
                },
                config: {
                    auth: 'default'
                }
            });

            var request = {
                method: 'POST',
                url: 'http://pass.com:8080/pass',
                headers: {
                    'Pass-Scope': 'admin'
                }
            };
            server.inject(request, function (res) {

                expect(res.statusCode).to.equal(200);
                expect(res.payload).to.equal('ok');
                done();
            });
        });
    });

    it('returns a reply on successful auth with admin scope', function (done) {

        var server = new Hapi.Server();
        server.connection();
        server.register(require('../'), function (err) {

            expect(err).to.not.exist();
            server.auth.strategy('default', 'passthrough');
            server.route({
                method: 'POST',
                path: '/pass',
                handler: function (request, reply) {

                    reply('ok');
                },
                config: {
                    auth: {
                        strategy: 'default',
                        scope: 'admin'
                    }
                }
            });

            var request = {
                method: 'POST',
                url: 'http://pass.com:8080/pass',
                headers: {
                    'Pass-Scope': 'admin'
                }
            };
            server.inject(request, function (res) {

                expect(res.statusCode).to.equal(200);
                expect(res.payload).to.equal('ok');
                done();
            });
        });
    });
});
