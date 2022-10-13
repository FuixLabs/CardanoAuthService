const basicInfo = require('./basicInfo');
const servers = require('./servers');
const tags = require('./tags');
const components = require('./components');

const app = require('./app');
const auth = require('./auth');

const paths = { ...app, ...auth };

module.exports = {
    ...basicInfo,
    ...servers,
    ...tags,
    ...components,
    ...{ paths: paths },
};
