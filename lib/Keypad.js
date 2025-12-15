"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keypad = void 0;
const Common_1 = require("./Common");
/**
 * Creates a keypad device.
 * @private
 */
class Keypad extends Common_1.Common {
    /**
     * Creates a keypad device.
     *
     * @param homebridge A reference to the Homebridge API.
     * @param device A reference to the discovered device.
     * @param log A refrence to the Homebridge logger.
     */
    constructor(homebridge, device, log) {
        super(homebridge, device, log);
        this.services = new Map();
        const labelService = this.accessory.getService(this.homebridge.hap.Service.ServiceLabel) ||
            this.accessory.addService(this.homebridge.hap.Service.ServiceLabel);
        labelService.setCharacteristic(this.homebridge.hap.Characteristic.ServiceLabelNamespace, this.homebridge.hap.Characteristic.ServiceLabelNamespace.ARABIC_NUMERALS);
        for (const button of device.buttons) {
            const service = this.accessory.getServiceById(this.homebridge.hap.Service.StatelessProgrammableSwitch, button.name) ||
                this.accessory.addService(this.homebridge.hap.Service.StatelessProgrammableSwitch, button.name, button.name);
            service.addCharacteristic(this.homebridge.hap.Characteristic.ConfiguredName);
            service.addLinkedService(labelService);
            service.setCharacteristic(this.homebridge.hap.Characteristic.Name, button.name);
            service.setCharacteristic(this.homebridge.hap.Characteristic.ConfiguredName, button.name);
            service.setCharacteristic(this.homebridge.hap.Characteristic.ServiceLabelIndex, button.index);
            service.getCharacteristic(this.homebridge.hap.Characteristic.ProgrammableSwitchEvent).setProps({
                maxValue: button.supportsLongPress === false
                    ? this.homebridge.hap.Characteristic.ProgrammableSwitchEvent.DOUBLE_PRESS
                    : this.homebridge.hap.Characteristic.ProgrammableSwitchEvent.LONG_PRESS,
            });
            this.services.set(button.id, service);
        }
    }
    /**
     * Invokes an action when a button is pressed.
     *
     * @param button The current button where the action was invoked.
     * @param action The action invoked (press, release, ...).
     */
    onAction(button, action) {
        const service = this.services.get(button.id);
        const characteristic = service === null || service === void 0 ? void 0 : service.getCharacteristic(this.homebridge.hap.Characteristic.ProgrammableSwitchEvent);
        if (service != null && characteristic != null) {
            switch (action) {
                case "Press":
                    this.log.debug(`Keypad: ${this.device.name} ${button.name} Pressed`);
                    characteristic.updateValue(this.homebridge.hap.Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS);
                    break;
                case "DoublePress":
                    this.log.debug(`Keypad: ${this.device.name} ${button.name} Double Pressed`);
                    characteristic.updateValue(this.homebridge.hap.Characteristic.ProgrammableSwitchEvent.DOUBLE_PRESS);
                    break;
                case "LongPress":
                    this.log.debug(`Keypad: ${this.device.name} ${button.name} Long Pressed`);
                    characteristic.updateValue(this.homebridge.hap.Characteristic.ProgrammableSwitchEvent.LONG_PRESS);
                    break;
            }
        }
    }
}
exports.Keypad = Keypad;
