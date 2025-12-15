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
            const supportsLongPress = button.supportsLongPress;
            service.getCharacteristic(this.homebridge.hap.Characteristic.ProgrammableSwitchEvent).setProps({
                maxValue: supportsLongPress === false
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
        console.log(`[KEYPAD ACTION] ${this.device.name} - ${button.name} - ${action}`);
        this.log.info(`Keypad: ${this.device.name} ${button.name} ${action}`);
        const service = this.services.get(button.id);
        const characteristic = service === null || service === void 0 ? void 0 : service.getCharacteristic(this.homebridge.hap.Characteristic.ProgrammableSwitchEvent);
        if (service != null && characteristic != null) {
            switch (action) {
                case "Press":
                    characteristic.updateValue(this.homebridge.hap.Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS);
                    break;
                case "DoublePress":
                    characteristic.updateValue(this.homebridge.hap.Characteristic.ProgrammableSwitchEvent.DOUBLE_PRESS);
                    break;
                case "LongPress":
                    characteristic.updateValue(this.homebridge.hap.Characteristic.ProgrammableSwitchEvent.LONG_PRESS);
                    break;
            }
        }
        else {
            console.log(`[KEYPAD ACTION ERROR] Service or characteristic not found for button ${button.id}`);
        }
    }
}
exports.Keypad = Keypad;
