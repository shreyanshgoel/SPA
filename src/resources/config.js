/**
 * This file is used to determine the API url according to the environment set
 */
const hostname = window && window.location && window.location.hostname;
//dont put slash in end
const LOCAL_SERVER_URL = 'https://api.spacexdata.com/v3';
const STAGING_SERVER_URL = '';
const PRODUCTION_SERVER_URL = '';
const ENVIRONMENT = {
    LOCAL: 'local',
    STAGING: 'staging',
    PRODUCTION: 'production'
};
const environment = () => {
    if (/localhost/i.test(hostname) || (hostname === '127.0.0.1'))
        return ENVIRONMENT.LOCAL;
    else if (/dev/i.test(hostname) || /staging.com/i.test(hostname))
        return ENVIRONMENT.STAGING;
    else
        return ENVIRONMENT.PRODUCTION;
};

module.exports = {
    ENVIRONMENTS: ENVIRONMENT,
    environment: environment,
    getAPIUrl: () => {
        const env = environment();
        if (env === ENVIRONMENT.LOCAL)
            return LOCAL_SERVER_URL;
        else if (env === ENVIRONMENT.STAGING)
            return STAGING_SERVER_URL;
        else
            return PRODUCTION_SERVER_URL;
    },
    BASE_URL: '/api/'
}

