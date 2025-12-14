import * as Leap from "@mkellsy/leap-client";
import { API, Logging } from "homebridge";
import { Common } from "./Common";
import { Device } from "./Device";
/**
 * Creates a timeclock device.
 * @private
 */
export declare class Timeclock extends Common<Leap.Timeclock> implements Device {
    private service;
    /**
     * Creates a timeclock device.
     *
     * @param homebridge A reference to the Homebridge API.
     * @param device A reference to the discovered device.
     * @param log A refrence to the Homebridge logger.
     */
    constructor(homebridge: API, device: Leap.Timeclock, log: Logging);
    /**
     * Updates Homebridge accessory when an update comes from the device.
     *
     * @param state The current dimmer state.
     */
    onUpdate(state: Leap.TimeclockState): void;
    /**
     * Fetches the current state when Homebridge asks for it.
     *
     * @returns A characteristic value.
     */
    private onGetState;
}
//# sourceMappingURL=Timeclock.d.ts.map