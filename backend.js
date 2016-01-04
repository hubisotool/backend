var
    Promise = require('bluebird'),
    notifier = require('nw-notify'),
    db = require("./db/db"),
    hubhb = require("hubhb"),
    moment = require('moment'),
    debounce = function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },
    backend = module.exports = {};

    notifier.setConfig({
        displayTime: 6000
    })
;

backend.alert = debounce(function(opts){
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
        db.execInDb("alerts","find",[ { $and: [{ src: in_db.src }, { title: in_db.title }, {msg: in_db.msg}] } ]).then(function(alerts){
            if(alerts.length==0){
                notifier.notify(in_notify);
                db.addAlert(in_db);
                return;
            }

            alerts.sort(function(a,b){
                return moment(a["_timestamp"]).isAfter(b["_timestamp"]);
            });

            var alert = alerts[alerts.length-1],
                tt_check = moment().subtract(1,'s');

            if(tt_check.isBefore(alert._timestamp)){

            }else{
                notifier.notify(in_notify);
                db.addAlert(in_db);
            }

        });

        alrt_resolve();
    })
}
,1000,true);

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