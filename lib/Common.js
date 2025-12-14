"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Common = void 0;
const Platform_1 = require("./Platform");
/**
 * Defines common functionallity for a device.
 * @private
 */
class Common {
    /**
     * Creates a common device.
     *
     * @param homebridge A reference to the Homebridge API.
     * @param device A reference to the discovered device.
     * @param log A refrence to the Homebridge logger.
     */
    constructor(homebridge, device, log) {
        this.log = log;
        this.homebridge = homebridge;
        this.device = device;
        this.id = this.homebridge.hap.uuid.generate(this.device.id);
        this.accessory = Platform_1.accessories.get(this.id) || new this.homebridge.platformAccessory(device.name, this.id);
        this.accessory
            .getService(this.homebridge.hap.Service.AccessoryInformation)
            .setCharacteristic(this.homebridge.hap.Characteristic.Manufacturer, this.device.manufacturer)
            .setCharacteristic(this.homebridge.hap.Characteristic.Model, this.device.type)
            .setCharacteristic(this.homebridge.hap.Characteristic.SerialNumber, this.device.id);
    }
    /**
     * Registers a device and if not cached, it will also inform Homebridge
     * about the device.
     */
    register() {
        Platform_1.devices.set(this.id, this);
        if (Platform_1.accessories.has(this.id)) {
            return;
        }
        this.log.debug(`Register accessory: ${this.device.name}`);
        Platform_1.accessories.set(this.id, this.accessory);
        this.homebridge.registerPlatformAccessories(Platform_1.plugin, Platform_1.platform, [this.accessory]);
    }
}
exports.Common = Common;
