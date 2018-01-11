class TestController {
    constructor(router, app) {
        router.get('/', function(req, res) {
           res.send("Hello world from TestController at "+ __dirname + __filename );
        });
    }
}


module.exports = TestController
