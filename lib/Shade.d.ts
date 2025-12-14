import * as Leap from "@mkellsy/leap-client";
import { API, Logging } from "homebridge";
import { Common } from "./Common";
import { Device } from "./Device";
/**
 * Creates a shade device.
 * @private
 */
export declare class Shade extends Common<Leap.Shade> implements Device {
    private service;
    /**
     * Creates a shade device.
     *
     * @param homebridge A reference to the Homebridge API.
     * @param device A reference to the discovered device.
     * @param log A refrence to the Homebridge logger.
     */
    constructor(homebridge: API, device: Leap.Shade, log: Logging);
    /**
     * Updates Homebridge accessory when an update comes from the device.
     *
     * @param state The current dimmer state.
     */
    onUpdate(state: Leap.ShadeState): void;
    /**
     * Fetches the current state when Homebridge asks for it.
     *
     * @returns A characteristic value.
     */
    private onGetState;
    /**
     * Fetches the current position when Homebridge asks for it.
     *
     * @returns A characteristic value.
     */
    private onGetPosition;
    /**
     * Updates the device when a change comes in from Homebridge.
     *
     * @param value The characteristic value from Homebrtidge.
     */
    private onSetPosition;
}
//# sourceMappingURL=Shade.d.ts.map