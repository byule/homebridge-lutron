import * as Leap from "@mkellsy/leap-client";
import { API, Logging } from "homebridge";
import { Common } from "./Common";
import { Device } from "./Device";
/**
 * Creates a switch device.
 * @private
 */
export declare class Switch extends Common<Leap.Switch> implements Device {
    private service;
    /**
     * Creates a switch device.
     *
     * @param homebridge A reference to the Homebridge API.
     * @param device A reference to the discovered device.
     * @param log A refrence to the Homebridge logger.
     */
    constructor(homebridge: API, device: Leap.Switch, log: Logging);
    /**
     * Updates Homebridge accessory when an update comes from the device.
     *
     * @param state The current switch state.
     */
    onUpdate(state: Leap.SwitchState): void;
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
}
//# sourceMappingURL=Switch.d.ts.map