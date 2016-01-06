var
    Promise = require('bluebird'),
    dbstore = require("nedb"),
    path = require("path"),
    moment = require('moment'),
    dbs = ["alerts","dnr","cim","config"],
    db = {},
    _gut = module.exports = {},

    init_db = function(){
        var i, max, db_name, db_path;
        for(i = 0, max = dbs.length; i <max; i+=1){
            db_name = dbs[i];
            db_path = path.join(dataPath, db_name+".db");
            db[db_name] = new dbstore({filename:db_path,autoload:true});
        }
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
};

//Must pass an array literal
_gut.execInDb = function(dbname,func,args){
    return new Promise(function(resolve, reject){
        if(typeof args === "undefined"){
            args=[{}];
        }
        var callback = function(err,docs){
            resolve(docs);
        };
        args.push(callback);
        db[dbname][func].apply(db[dbname],args);
    });
};

_gut.addAlert = function(alert){
    alert["_timestamp"] = moment().toISOString();
    db.alerts.insert(alert);
};
