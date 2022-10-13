/**
 *
 * Copyright (c) 2022 - FuixLabs
 *
 * @author Nguyen Minh Tam / ngmitam@ferdon.io
 */

/**
 *
 * @param {config} config
 * @param {JsonWebTokenModule} jwt
 * @constructor
 */
function LocalTokenGenerator(config, jwt) {
    const self = this;
    this.privateKey = null;

    this.jwt = jwt;

    this.jwtOptions = {
        algorithm: config.authentication.jwt.algorithm,
        expiresIn: config.authentication.jwt.short.expiresIn,
    };

    this.config = config;
    const { privateKey } = this.config.authentication.jwt;
    self.privateKey = privateKey;

    this.getToken = (content) => {
        const { jwtOptions } = self;
        if (content.rememberMe) {
            jwtOptions.expiresIn = config.authentication.jwt.long.expiresIn;
        }
        return jwt.sign(content, self.privateKey, jwtOptions);
    };
}

module.exports = LocalTokenGenerator;
