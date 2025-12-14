"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Occupancy = void 0;
const Common_1 = require("./Common");
/**
 * Creates an occupancy sensor device.
 * @private
 */
class Occupancy extends Common_1.Common {
    /**
     * Creates an occupancy sensor device.
     *
     * @param homebridge A reference to the Homebridge API.
     * @param device A reference to the discovered device.
     * @param log A refrence to the Homebridge logger.
     */
    constructor(homebridge, device, log) {
        super(homebridge, device, log);
        /**
         * Fetches the current state when Homebridge asks for it.
         *
         * @returns A characteristic value.
         */
        this.onGetState = () => {
            this.log.debug(`Occupancy Get State: ${this.device.name} ${this.device.status.state}`);
            return this.device.status.state === "Occupied";
        };
        this.service =
            this.accessory.getService(this.homebridge.hap.Service.OccupancySensor) ||
                this.accessory.addService(this.homebridge.hap.Service.OccupancySensor, this.device.name);
        this.service.addCharacteristic(this.homebridge.hap.Characteristic.ConfiguredName);
        this.service.setCharacteristic(this.homebridge.hap.Characteristic.Name, this.device.name);
        this.service.setCharacteristic(this.homebridge.hap.Characteristic.ConfiguredName, this.device.name);
        this.service.getCharacteristic(this.homebridge.hap.Characteristic.OccupancyDetected).onGet(this.onGetState);
    }
    /**
     * Updates Homebridge accessory when an update comes from the device.
     *
     * @param state The current occupancy sensor state.
     */
    onUpdate(state) {
        this.log.debug(`Occupancy: ${this.device.name} State: ${state.state === "Occupied" ? "Detected" : "Not Detected"}`);
        this.service.updateCharacteristic(this.homebridge.hap.Characteristic.OccupancyDetected, state.state === "Occupied");
    }
}
exports.Occupancy = Occupancy;
