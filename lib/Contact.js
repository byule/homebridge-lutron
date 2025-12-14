"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const Common_1 = require("./Common");
/**
 * Creates a CCO device.
 * @private
 */
class Contact extends Common_1.Common {
    /**
     * Creates a CCO device.
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
            this.log.debug(`Contact Get State: ${this.device.name} ${this.device.status.state}`);
            return this.device.status.state === "Closed";
        };
        /**
         * Updates the device when a change comes in from Homebridge.
         *
         * @param value The characteristic value from Homebrtidge.
         */
        this.onSetState = (value) => __awaiter(this, void 0, void 0, function* () {
            this.log.debug(`Contact Set State: ${this.device.name} ${value ? "Closed" : "Open"}`);
            yield this.device.set({ state: value ? "Closed" : "Open" });
        });
        this.service =
            this.accessory.getService(this.homebridge.hap.Service.Switch) ||
                this.accessory.addService(this.homebridge.hap.Service.Switch, this.device.name);
        this.service.addCharacteristic(this.homebridge.hap.Characteristic.ConfiguredName);
        this.service.setCharacteristic(this.homebridge.hap.Characteristic.Name, this.device.name);
        this.service.setCharacteristic(this.homebridge.hap.Characteristic.ConfiguredName, this.device.name);
        this.service
            .getCharacteristic(this.homebridge.hap.Characteristic.On)
            .onGet(this.onGetState)
            .onSet(this.onSetState);
    }
    /**
     * Updates Homebridge accessory when an update comes from the device.
     *
     * @param state The current dimmer state.
     */
    onUpdate(state) {
        this.log.debug(`Contact: ${this.device.name} State: ${state.state}`);
        this.service.updateCharacteristic(this.homebridge.hap.Characteristic.On, state.state === "Closed");
    }
}
exports.Contact = Contact;
