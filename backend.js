var
    Promise = require('bluebird'),
    notifier = require('nw-notify'),
    db = require("./db/db"),
    hubhb = require("hubhb"),
    backend = module.exports = {};

    notifier.setConfig({
        displayTime: 6000
    })
;

backend.alert = function(opts){
    return new Promise(function(alrt_resolve, alrt_reject){

        var
            in_notify = {
            title : opts.title || "",
            text : opts.text || opts.txt || opts.message || opts.msg || ""
            },

            in_db = {
                src : opts.src || "",
                title : opts.title || "",
                msg : opts.text || opts.txt || opts.message || opts.msg || ""
            }
        ;

        notifier.notify(in_notify);
        db.addAlert(in_db);
        alrt_resolve();
    })
};

backend.startup = function(opts){
    db.setDataPath(opts["datapath"]);
};

backend.saveToDb = function(dbname,obj){
    return db.saveToDb(dbname,obj);
}

backend.loadFromDb = function(dbname,func,opts){
    return db.loadFromDb(dbname,func,opts);
};

backend.execInDb = function(dbname,func,args){
    return db.execInDb(dbname,func,args);
};

backend.hubhb = hubhb;

backend.shutdown = function(){
    notifier.closeAll();
    hubhb.destroy();
};