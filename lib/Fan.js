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
exports.Fan = void 0;
const Common_1 = require("./Common");
/**
 * Creates a fan device.
 * @private
 */
class Fan extends Common_1.Common {
    /**
     * Creates a fan device.
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
            this.log.debug(`Fan Get State: ${this.device.name} ${this.device.status.state}`);
            return this.device.status.state === "On";
        };
        /**
         * Updates the device when a change comes in from Homebridge.
         *
         * @param value The characteristic value from Homebrtidge.
         */
        this.onSetState = (value) => __awaiter(this, void 0, void 0, function* () {
            const state = value ? "On" : "Off";
            const speed = value ? 7 : 0;
            if (this.device.status.state !== state || this.device.status.speed !== speed) {
                this.log.debug(`Fan Set State: ${this.device.name} ${state}`);
                this.log.debug(`Fan Set Speed: ${this.device.name} ${speed}`);
                yield this.device.set({ state, speed });
            }
        });
        /**
         * Fetches the current speed when Homebridge asks for it.
         *
         * @returns A characteristic value.
         */
        this.onGetSpeed = () => {
            const speed = Math.round((this.device.status.speed / 7) * 100);
            this.log.debug(`Fan Get Speed: ${this.device.name} ${this.device.status.speed}`);
            return speed;
        };
        /**
         * Updates the device when a change comes in from Homebridge.
         *
         * @param value The characteristic value from Homebrtidge.
         */
        this.onSetSpeed = (value) => __awaiter(this, void 0, void 0, function* () {
            const speed = Math.round(((value || 0) / 100) * 7);
            const state = speed > 0 ? "On" : "Off";
            if (this.device.status.state !== state || this.device.status.speed !== speed) {
                this.log.debug(`Fan Set State: ${this.device.name} ${state}`);
                this.log.debug(`Fan Set Speed: ${this.device.name} ${speed}`);
                yield this.device.set({ state, speed });
            }
        });
        this.service =
            this.accessory.getService(this.homebridge.hap.Service.Fan) ||
                this.accessory.addService(this.homebridge.hap.Service.Fan, this.device.name);
        this.service.addCharacteristic(this.homebridge.hap.Characteristic.ConfiguredName);
        this.service.setCharacteristic(this.homebridge.hap.Characteristic.Name, this.device.name);
        this.service.setCharacteristic(this.homebridge.hap.Characteristic.ConfiguredName, this.device.name);
        this.service
            .getCharacteristic(this.homebridge.hap.Characteristic.On)
            .onGet(this.onGetState)
            .onSet(this.onSetState);
        this.service
            .getCharacteristic(this.homebridge.hap.Characteristic.RotationSpeed)
            .onGet(this.onGetSpeed)
            .onSet(this.onSetSpeed);
    }
    /**
     * Updates Homebridge accessory when an update comes from the device.
     *
     * @param state The current fan state.
     */
    onUpdate(state) {
        const speed = Math.round((state.speed / 7) * 100);
        this.log.debug(`Fan: ${this.device.name} State: ${state.state}`);
        this.log.debug(`Fan: ${this.device.name} Speed: ${state.speed}`);
        this.service.updateCharacteristic(this.homebridge.hap.Characteristic.On, state.state === "On");
        this.service.updateCharacteristic(this.homebridge.hap.Characteristic.RotationSpeed, speed);
    }
}
exports.Fan = Fan;
