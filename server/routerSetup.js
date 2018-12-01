const router = require('express').Router();

require('./components/categories/api.js')(router);
require('./components/users/api.js')(router);
require('./components/roles/api.js')(router);

module.exports = router;
