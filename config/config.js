"use strict";

!(function() {

    var key = '';

    ////////// SETTING ENVIRONMENT VARIABLES ////////////
    const config = {
      PORT: process.env.PORT,
      PGUSER: process.env.PGUSER,
      PGDATABASE: process.env.PGDATABASE,
      PGHOST: process.env.PGHOST,
      PGPASSWORD: process.env.PGPASSWORD,
      PGPORT: process.env.PGPORT
    };

    ///////// LOGGING ENVIRONMENT CONFIGURATIONS //////////
    console.log('\n\n\t >>> Environment Variables Configurations :')

    for (key in config) {
        console.log('\t\t' + key + ': ' + (/PASSWORD|SECRET|PWD/i.test(key) ? "***" : config[key]));
    }

    ///////// EXPORT MODULE //////////
    module.exports = config;

})();
