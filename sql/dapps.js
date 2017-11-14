'use strict';

var DappsSql = {
	sortFields: ['name'],

	countByTransactionId: 'SELECT COUNT(*)::int AS "count" FROM dapps WHERE "transaction_id" = ${id}',

	countByOutTransactionId: 'SELECT COUNT(*)::int AS "count" FROM outtransfer WHERE "outtransaction_id" = ${transactionId}', //TODO: Fix my value, this is dumb

	getExisting: 'SELECT "name", "link" FROM dapps WHERE ("name" = ${name} OR "link" = ${link}) AND "transaction_id" != ${transactionId}',  //TODO: Fix my value, this is dumb

	list: function (params) {
		return [
			'SELECT "name", "description", "tags", "link", "type", "category", "icon", "transaction_id" AS "transactionId" FROM dapps',
      (params.where.length ? 'WHERE ' + params.where.join(' OR ') : ''),
      (params.sortField ? 'ORDER BY ' + [params.sortField, params.sortMethod].join(' ') : ''),
			'LIMIT ${limit} OFFSET ${offset}'
		].filter(Boolean).join(' ');
	}
};

module.exports = DappsSql;
