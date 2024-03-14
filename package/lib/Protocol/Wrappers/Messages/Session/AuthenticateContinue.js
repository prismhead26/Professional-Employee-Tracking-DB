/*
 * Copyright (c) 2020, 2021, Oracle and/or its affiliates.
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

const AuthenticateContinueStub = require('../../../Stubs/mysqlx_session_pb').AuthenticateContinue;
const ServerMessagesStub = require('../../../Stubs/mysqlx_pb').ServerMessages.Type;
const tokenizable = require('../../Traits/Tokenizable');
const serializable = require('../../Traits/Serializable');
const bytes = require('../../ScalarValues/bytes');
const wraps = require('../../Traits/Wraps');

/**
 * @private
 * @alias module:adapters.Mysqlx.Session.AuthenticateContinue
 * @param {proto.Mysqlx.Session.AuthenticateContinue} proto - protobuf stub
 * @returns {module:adapters.Mysqlx.Session.AuthenticateContinue}
 */
function AuthenticateContinue (proto) {
    return Object.assign({}, tokenizable(proto), serializable(proto), wraps(proto));
}

/**
 * Creates and wraps a Mysqlx.Session.AuthenticateContinue instance with a given token.
 * @returns {module:adapters.Mysqlx.Session.AuthenticateContinue}
 */
AuthenticateContinue.create = function (token) {
    const proto = new AuthenticateContinueStub();
    proto.setAuthData(bytes.create(token).valueOf());

    return AuthenticateContinue(proto);
};

/**
 * Creates a wrapper from a raw X Protocol message payload.
 * @returns {module:adapters.Mysqlx.Session.AuthenticateContinue}
 */
AuthenticateContinue.deserialize = function (buffer) {
    return AuthenticateContinue(AuthenticateContinueStub.deserializeBinary(bytes.deserialize(buffer)));
};

AuthenticateContinue.MESSAGE_ID = ServerMessagesStub.SESS_AUTHENTICATE_CONTINUE;

module.exports = AuthenticateContinue;
