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
exports.Dimmer = void 0;
const Common_1 = require("./Common");
/**
 * Creates a dimmer device.
 * @private
 */
class Dimmer extends Common_1.Common {
    /**
     * Creates a dimmer device.
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
            this.log.debug(`Dimmer Get State: ${this.device.name} ${this.device.status.state}`);
            return this.device.status.state === "On";
        };
        /**
         * Updates the device when a change comes in from Homebridge.
         *
         * @param value The characteristic value from Homebrtidge.
         */
        this.onSetState = (value) => __awaiter(this, void 0, void 0, function* () {
            const state = value ? "On" : "Off";
            const level = value ? 100 : 0;
            if (this.device.status.state !== state || this.device.status.level !== level) {
                this.log.debug(`Dimmer Set State: ${this.device.name} ${state}`);
                this.log.debug(`Dimmer Set Brightness: ${this.device.name} ${level}`);
                yield this.device.set({ state, level });
            }
        });
        /**
         * Fetches the current brightness when Homebridge asks for it.
         *
         * @returns A characteristic value.
         */
        this.onGetBrightness = () => {
            this.log.debug(`Dimmer Get Brightness: ${this.device.name} ${this.device.status.level || 0}`);
            return this.device.status.level || 0;
        };
        /**
         * Updates the device when a change comes in from Homebridge.
         *
         * @param value The characteristic value from Homebrtidge.
         */
        this.onSetBrightness = (value) => __awaiter(this, void 0, void 0, function* () {
            const level = (value || 0);
            const state = level > 0 ? "On" : "Off";
            this.log.debug(`Dimmer Set State: ${this.device.name} ${state}`);
            this.log.debug(`Dimmer Set Brightness: ${this.device.name} ${level}`);
            yield this.device.set({ state, level });
        });
        this.service =
            this.accessory.getService(this.homebridge.hap.Service.Lightbulb) ||
                this.accessory.addService(this.homebridge.hap.Service.Lightbulb, this.device.name);
        this.service.addCharacteristic(this.homebridge.hap.Characteristic.ConfiguredName);
        this.service.setCharacteristic(this.homebridge.hap.Characteristic.Name, this.device.name);
        this.service.setCharacteristic(this.homebridge.hap.Characteristic.ConfiguredName, this.device.name);
        this.service
            .getCharacteristic(this.homebridge.hap.Characteristic.On)
            .onGet(this.onGetState)
            .onSet(this.onSetState);
        this.service
            .getCharacteristic(this.homebridge.hap.Characteristic.Brightness)
            .onGet(this.onGetBrightness)
            .onSet(this.onSetBrightness);
    }
    /**
     * Updates Homebridge accessory when an update comes from the device.
     *
     * @param state The current dimmer state.
     */
    onUpdate(state) {
        this.log.debug(`Dimmer: ${this.device.name} State: ${state.state}`);
        this.log.debug(`Dimmer: ${this.device.name} Brightness: ${state.level || 0}`);
        this.service.updateCharacteristic(this.homebridge.hap.Characteristic.On, state.state === "On");
        this.service.updateCharacteristic(this.homebridge.hap.Characteristic.Brightness, state.level || 0);
    }
}
exports.Dimmer = Dimmer;
