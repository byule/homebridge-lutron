"use strict";
/**
 * This is a plugin that exposes Lutron Caseta and Radio RA3 devices to Homebridge.
 *
 * @packageDocumentation
 */
const Platform_1 = require("./Platform");
module.exports = (homebridge) => {
    homebridge.registerPlatform(Platform_1.plugin, Platform_1.platform, Platform_1.Platform);
};
