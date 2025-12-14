"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Accessories = void 0;
const HAP = __importStar(require("@mkellsy/hap-device"));
const Platform_1 = require("./Platform");
const Contact_1 = require("./Contact");
const Dimmer_1 = require("./Dimmer");
const Fan_1 = require("./Fan");
const Keypad_1 = require("./Keypad");
const Occupancy_1 = require("./Occupancy");
const Shade_1 = require("./Shade");
const Strip_1 = require("./Strip");
const Switch_1 = require("./Switch");
const Timeclock_1 = require("./Timeclock");
/**
 * Accessory factory.
 * @private
 */
class Accessories {
    /**
     * Creates respective devices from a common device discovery.
     *
     * @param homebridge A reference to the Homebridge API.
     * @param device A reference to the common device object.
     * @param config A reference to the plugin configuration.
     * @param log A reference to the Homebridge logger.
     *
     * @returns A device or undefined if not configured.
     */
    static create(homebridge, device, config, log) {
        switch (device.type) {
            case HAP.DeviceType.Contact:
                if (config.cco === false) {
                    return undefined;
                }
                return new Contact_1.Contact(homebridge, device, log);
            case HAP.DeviceType.Dimmer:
                if (config.dimmers === false) {
                    return undefined;
                }
                return new Dimmer_1.Dimmer(homebridge, device, log);
            case HAP.DeviceType.Fan:
                if (config.fans === false) {
                    return undefined;
                }
                return new Fan_1.Fan(homebridge, device, log);
            case HAP.DeviceType.Keypad:
                if (config.keypads === false) {
                    return undefined;
                }
                return new Keypad_1.Keypad(homebridge, device, log);
            case HAP.DeviceType.Occupancy:
                if (config.sensors === false) {
                    return undefined;
                }
                return new Occupancy_1.Occupancy(homebridge, device, log);
            case HAP.DeviceType.Remote:
                if (config.remotes === false) {
                    return undefined;
                }
                return new Keypad_1.Keypad(homebridge, device, log);
            case HAP.DeviceType.Shade:
                if (config.shades === false) {
                    return undefined;
                }
                return new Shade_1.Shade(homebridge, device, log);
            case HAP.DeviceType.Strip:
                if (config.strips === false) {
                    return undefined;
                }
                return new Strip_1.Strip(homebridge, device, log);
            case HAP.DeviceType.Switch:
                if (config.switches === false) {
                    return undefined;
                }
                return new Switch_1.Switch(homebridge, device, log);
            case HAP.DeviceType.Timeclock:
                if (config.timeclocks === false) {
                    return undefined;
                }
                return new Timeclock_1.Timeclock(homebridge, device, log);
        }
        return undefined;
    }
    /**
     * Fetches an internally cached device.
     *
     * @param homebridge A reference to the Homebridge API.
     * @param device A reference to the common device object.
     *
     * @returns The cached device or undefined if not available.
     */
    static get(homebridge, device) {
        const id = homebridge.hap.uuid.generate(device.id);
        return Platform_1.devices.get(id);
    }
    /**
     * Removes an internally cached device.
     *
     * @param homebridge A reference to the Homebridge API.
     * @param device A reference to the common device object.
     */
    static remove(homebridge, device) {
        const id = homebridge.hap.uuid.generate(device.id);
        const accessory = Platform_1.accessories.get(id);
        if (accessory != null) {
            homebridge.unregisterPlatformAccessories(Platform_1.plugin, Platform_1.platform, [accessory]);
        }
    }
}
exports.Accessories = Accessories;
