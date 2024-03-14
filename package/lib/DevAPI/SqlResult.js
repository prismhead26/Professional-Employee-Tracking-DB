/*
 * Copyright (c) 2018, 2023, Oracle and/or its affiliates.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License, version 2.0, as
 * published by the Free Software Foundation.
 *
 * This program is also distributed with certain software (including
 * but not limited to OpenSSL) that is licensed under separate terms,
 * as designated in a particular file or component or in included license
 * documentation.  The authors of MySQL hereby grant you an
 * additional permission to link the program and your derivative works
 * with the separately licensed software that they have included with
 * MySQL.
 *
 * Without limiting anything contained in the foregoing, this file,
 * which is part of MySQL Connector/Node.js, is also subject to the
 * Universal FOSS Exception, version 1.0, a copy of which can be found at
 * http://oss.oracle.com/licenses/universal-foss-exception.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License, version 2.0, for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin St, Fifth Floor, Boston, MA 02110-1301  USA
 */

'use strict';

const uint64 = require('../Protocol/Wrappers/ScalarValues/uint64');
const rowResult = require('./RowResult');

/**
 * API for raw SQL queries.
 * @module SqlResult
 * @mixes module:RowResult
 */

/**
 * @private
 * @alias module:SqlResult
 * @param {BigInt} [generatedInsertId] - The first AUTO_INCREMENT value
 * generated by the statement.
 * @param {int64.Type} [integerType] - The convertion mode selected by the
 * application to handle integer values in result sets for the current session.
 * @param {Array<module:Column>} [metadata] - A list containing metadata of
 * each column.
 * @param {Array<Array<*>>} [results] - The list of rows (each one a list of
 * column values in and of itself).
 * @param {BigInt} [rowsAffected] - The number of rows affected by the
 * statement.
 * @param {Array<Warning>} [warnings] - The list of warnings generated by the
 * statement.
 * @returns {module:SqlResult}
 */
function SqlResult ({ generatedInsertId = 0n, integerType, metadata, results, rowsAffected, warnings } = {}) {
    return {
        ...rowResult({ integerType, metadata, results, rowsAffected, warnings }),
        /**
         * Retrieve the number of documents affected by the operation.
         * @function
         * @name module:SqlResult#getAffectedItemsCount
         * @returns {int64} The number of rows.
         */
        getAffectedItemsCount () {
            return uint64.create(rowsAffected, { type: integerType }).valueOf();
        },

        /**
         * Retrieve the first <code>AUTO INCREMENT</code> value generated by the statement.
         * @function
         * @name module:SqlResult#getAutoIncrementValue
         * @returns {int64} The first value.
         */
        getAutoIncrementValue () {
            return uint64.create(generatedInsertId, { type: integerType }).valueOf();
        },

        /**
         * Checks if the result set contains additional data.
         * @function
         * @name module:SqlResult#hasData
         * @returns {boolean}
         */
        hasData () {
            return this.getResults().length > 0;
        },

        /**
         * Returns the entire result set (without flushing) as a JavaScript Arrray.
         * @function
         * @name module:SqlResult#toArray
         * @returns {Array}
         */
        toArray () {
            return this.getResults().map(result => result.map(row => row.toArray({ integerType })));
        }
    };
}

module.exports = SqlResult;