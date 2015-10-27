var
    Promise = require('bluebird'),
    dbstore = require("nedb"),
    path = require("path"),
    moment = require('moment'),
    dataPath = "",
    alerts_db = "",
    dnr_db = "",
    db = {},
    _gut = module.exports = {},

    init_db = function(){
        alerts_db = path.join(dataPath, 'alerts.db');
        dnr_db = path.join(dataPath, 'dnr.db');
        db = {
            alerts : new dbstore({filename:alerts_db,autoload:true}),
            dnr : new dbstore({filename:dnr_db,autoload:true})
        };
    }
;

_gut.setDataPath = function(path){
    dataPath = path;
    init_db();
};

_gut.saveToDb = function(dbname,obj){
    return new Promise(function(stdb_resolve, stdb_reject){
        obj["_timestamp"] = moment().toISOString();
        db[dbname].insert(obj,function(err,newDoc){
            stdb_resolve(newDoc);
        });
    })
};

_gut.loadFromDb = function(dbname,func,opts){
    return new Promise(function(lfdb_resolve, lfdb_reject){
        db[dbname][func](opts,function(err,docs){
            lfdb_resolve(docs);
        })
    });
}

_gut.addAlert = function(alert){
    alert["_timestamp"] = moment().toISOString();
    db.alerts.insert(alert);
};
