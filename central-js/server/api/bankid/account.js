var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	var account = require('./account.controller');
	
	var config = require('../../config');
	var bankid = config.bankid;
	
	var options = {
		protocol: bankid.sProtocol_ResourceService_BankID,
		hostname: bankid.sHost_ResourceService_BankID,
		path: '/ResourceService',
		params: {
			client_id: bankid.client_id,
			client_secret: bankid.client_secret,
			access_token: req.query.access_token || null
		}
	};
	
	var callback = function(error, response, body) {
		res.send(body);
		res.end();
	}
	
	account.index(options, callback);
});

module.exports = router;