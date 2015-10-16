var Promise = require('bluebird'),
    notifier = require('nw-notify'),
    backend = module.exports = {};

    notifier.setConfig({
        displayTime: 6000
    });

backend.alert = function(opts){
    return new Promise(function(alrt_resolve, alrt_reject){
        notifier.notify(opts);
        alrt_resolve();
    })
};

backend.shutdown = function(){
    notifier.closeAll();
};