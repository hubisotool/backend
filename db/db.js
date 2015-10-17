var
    dbstore = require("nedb"),
    path = require("path"),
    moment = require('moment'),
    dataPath = "",
    alerts_db = "",
    db = {},
    _gut = module.exports = {},

    init_db = function(){
        alerts_db = path.join(dataPath, 'alerts.db');
        db = {
            alerts : new dbstore({filename:alerts_db,autoload:true})
        };
    }
;

_gut.setDataPath = function(path){
    dataPath = path;
    init_db();
};

_gut.addAlert = function(alert){
    alert["_iso8601_utc_timestamp"] = moment().toISOString();
    db.alerts.insert(alert);
};
