var Promise = require('bluebird'),
    notifier = require('node-notifier'),
    backend = module.exports = {};


backend.alert = function(opts){
    return new Promise(function(alrt_resolve, alrt_reject){
        var result = {};
        notifier.notify(opts,function(err, response){
            result["err"] = err;
            result["response"] = response;
            alrt_reject(result);
        });
        alrt_resolve();
    })
}
