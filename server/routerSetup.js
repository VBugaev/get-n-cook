const router = require('express').Router();

require('./components/recipes/api.js')(router);
require('./components/ingredients/api.js')(router);
require('./components/categories/api.js')(router);
require('./components/users/api.js')(router);
require('./components/roles/api.js')(router);
require('./components/images/api.js')(router);

module.exports = router;
