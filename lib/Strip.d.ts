import * as Leap from "@mkellsy/leap-client";
import { API, Logging } from "homebridge";
import { Common } from "./Common";
import { Device } from "./Device";
/**
 * Creates a light strip device.
 * @private
 */
export declare class Strip extends Common<Leap.Strip> implements Device {
    private service;
    /**
     * Creates a light strip device.
     *
     * @param homebridge A reference to the Homebridge API.
     * @param device A reference to the discovered device.
     * @param log A refrence to the Homebridge logger.
     */
    constructor(homebridge: API, device: Leap.Strip, log: Logging);
    /**
     * Updates Homebridge accessory when an update comes from the device.
     *
     * @param state The current dimmer state.
     */
    onUpdate(state: Leap.StripState): void;
    /**
     * Fetches the current state when Homebridge asks for it.
     *
     * @returns A characteristic value.
     */
    private onGetState;
    /**
     * Updates the device when a change comes in from Homebridge.
     *
     * @param value The characteristic value from Homebrtidge.
     */
    private onSetState;
    /**
     * Fetches the current brightness when Homebridge asks for it.
     *
     * @returns A characteristic value.
     */
    private onGetBrightness;
    /**
     * Updates the device when a change comes in from Homebridge.
     *
     * @param value The characteristic value from Homebrtidge.
     */
    private onSetBrightness;
    /**
     * Fetches the current color temperature when Homebridge asks for it.
     *
     * @returns A characteristic value.
     */
    private onGetTemperature;
    /**
     * Updates the device when a change comes in from Homebridge.
     *
     * @param value The characteristic value from Homebrtidge.
     */
    private onSetTemperature;
    private transformRange;
}
//# sourceMappingURL=Strip.d.ts.map