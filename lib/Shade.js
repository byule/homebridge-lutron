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
exports.Shade = void 0;
const Common_1 = require("./Common");
/**
 * Creates a shade device.
 * @private
 */
class Shade extends Common_1.Common {
    /**
     * Creates a shade device.
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
            return this.homebridge.hap.Characteristic.PositionState.STOPPED;
        };
        /**
         * Fetches the current position when Homebridge asks for it.
         *
         * @returns A characteristic value.
         */
        this.onGetPosition = () => {
            this.log.debug(`Shade Get Position: ${this.device.name} ${this.device.status.state}`);
            return this.device.status.level || 0;
        };
        /**
         * Updates the device when a change comes in from Homebridge.
         *
         * @param value The characteristic value from Homebrtidge.
         */
        this.onSetPosition = (value) => __awaiter(this, void 0, void 0, function* () {
            const level = (value || 0);
            const state = level > 0 ? "Open" : "Closed";
            this.log.debug(`Shade Set Position: ${this.device.name} ${level}`);
            yield this.device.set({ state, level });
        });
        this.service =
            this.accessory.getService(this.homebridge.hap.Service.WindowCovering) ||
                this.accessory.addService(this.homebridge.hap.Service.WindowCovering, this.device.name);
        this.service.addCharacteristic(this.homebridge.hap.Characteristic.ConfiguredName);
        this.service.setCharacteristic(this.homebridge.hap.Characteristic.Name, this.device.name);
        this.service.setCharacteristic(this.homebridge.hap.Characteristic.ConfiguredName, this.device.name);
        this.service.getCharacteristic(this.homebridge.hap.Characteristic.CurrentPosition).onGet(this.onGetPosition);
        this.service.getCharacteristic(this.homebridge.hap.Characteristic.PositionState).onGet(this.onGetState);
        this.service
            .getCharacteristic(this.homebridge.hap.Characteristic.TargetPosition)
            .onGet(this.onGetPosition)
            .onSet(this.onSetPosition);
    }
    /**
     * Updates Homebridge accessory when an update comes from the device.
     *
     * @param state The current dimmer state.
     */
    onUpdate(state) {
        this.log.debug(`Shade: ${this.device.name} Position: ${state.level}`);
        this.service.updateCharacteristic(this.homebridge.hap.Characteristic.TargetPosition, state.level || 0);
    }
}
exports.Shade = Shade;
