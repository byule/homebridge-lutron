"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timeclock = void 0;
const Common_1 = require("./Common");
/**
 * Creates a timeclock device.
 * @private
 */
class Timeclock extends Common_1.Common {
    /**
     * Creates a timeclock device.
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
            this.log.debug(`Timeclock get state: ${this.device.name} ${this.device.status.state}`);
            return this.device.status.state === "On";
        };
        const name = `${this.device.name} (Timeclock)`;
        this.service =
            this.accessory.getService(this.homebridge.hap.Service.Switch) ||
                this.accessory.addService(this.homebridge.hap.Service.Switch, name);
        this.service.addCharacteristic(this.homebridge.hap.Characteristic.ConfiguredName);
        this.service.setCharacteristic(this.homebridge.hap.Characteristic.Name, name);
        this.service.setCharacteristic(this.homebridge.hap.Characteristic.ConfiguredName, this.device.name);
        this.service.getCharacteristic(this.homebridge.hap.Characteristic.On).onGet(this.onGetState);
    }
    /**
     * Updates Homebridge accessory when an update comes from the device.
     *
     * @param state The current dimmer state.
     */
    onUpdate(state) {
        this.log.debug(`Timeclock: ${this.device.name} state: ${state.state}`);
        this.service.updateCharacteristic(this.homebridge.hap.Characteristic.On, state.state === "On");
    }
}
exports.Timeclock = Timeclock;
