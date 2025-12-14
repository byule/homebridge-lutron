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
exports.Platform = exports.plugin = exports.platform = exports.devices = exports.accessories = void 0;
const Leap = __importStar(require("@mkellsy/leap-client"));
const Accessories_1 = require("./Accessories");
const Config_1 = require("./Config");
const accessories = new Map();
exports.accessories = accessories;
const devices = new Map();
exports.devices = devices;
const platform = "Lutron";
exports.platform = platform;
const plugin = "@mkellsy/homebridge-lutron";
exports.plugin = plugin;
/**
 * Impliments a Homebridge platform plugin.
 * @private
 */
class Platform {
    /**
     * Creates an instance to this plugin.
     *
     * @param log A reference to the Homebridge logger.
     * @param config A reference to this plugin's config.
     * @param homebridge A reference to the Homebridge API.
     */
    constructor(log, config, homebridge) {
        /*
         * mDNS discovery listener. This will create devices when found and will
         * register with Homebridge or re-initialize the accessory if it is from
         * the cache.
         */
        this.onAvailable = (devices) => {
            for (const device of devices) {
                const accessory = Accessories_1.Accessories.create(this.homebridge, device, this.config, this.log);
                accessory === null || accessory === void 0 ? void 0 : accessory.register();
                this.log.debug(`${device.type} available ${device.name}`);
                if (accessory == null) {
                    Accessories_1.Accessories.remove(this.homebridge, device);
                }
            }
        };
        /*
         * Button press listener. This recieves actions from remotes and relays to
         * Homebridge.
         */
        this.onAction = (device, button, action) => {
            const accessory = Accessories_1.Accessories.get(this.homebridge, device);
            if (accessory == null || accessory.onAction == null) {
                return;
            }
            accessory.onAction(button, action);
        };
        /*
         * Device update listener. This recieves updates from the devices and will
         * relay the state to Homebridge.
         */
        this.onUpdate = (device, state) => {
            const accessory = Accessories_1.Accessories.get(this.homebridge, device);
            if (accessory == null || accessory.onUpdate == null) {
                return;
            }
            accessory.onUpdate(state);
        };
        this.log = log;
        this.config = Object.assign(Object.assign({}, Config_1.defaults), config);
        this.homebridge = homebridge;
        this.homebridge.on("didFinishLaunching", () => {
            Leap.connect().on("Available", this.onAvailable).on("Action", this.onAction).on("Update", this.onUpdate);
        });
    }
    /**
     * Function to call when Homebridge findes a cached accessory that is
     * associated to this plugin.
     *
     * Note these accessories do not have extended data, the plugin wwill need
     * to re-initialize the device, and re-bind any listeners.
     *
     * @param accessory A reference to the cached accessory.
     */
    configureAccessory(accessory) {
        accessories.set(accessory.UUID, accessory);
    }
}
exports.Platform = Platform;
