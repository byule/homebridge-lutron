import * as Leap from "@mkellsy/leap-client";
import { API, Logging } from "homebridge";
import { Common } from "./Common";
import { Device } from "./Device";
/**
 * Creates a dimmer device.
 * @private
 */
export declare class Dimmer extends Common<Leap.Dimmer> implements Device {
    private service;
    /**
     * Creates a dimmer device.
     *
     * @param homebridge A reference to the Homebridge API.
     * @param device A reference to the discovered device.
     * @param log A refrence to the Homebridge logger.
     */
    constructor(homebridge: API, device: Leap.Dimmer, log: Logging);
    /**
     * Updates Homebridge accessory when an update comes from the device.
     *
     * @param state The current dimmer state.
     */
    onUpdate(state: Leap.DimmerState): void;
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
}
//# sourceMappingURL=Dimmer.d.ts.map