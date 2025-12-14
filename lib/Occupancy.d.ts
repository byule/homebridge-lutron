import * as Leap from "@mkellsy/leap-client";
import { API, Logging } from "homebridge";
import { Common } from "./Common";
import { Device } from "./Device";
/**
 * Creates an occupancy sensor device.
 * @private
 */
export declare class Occupancy extends Common<Leap.Occupancy> implements Device {
    private service;
    /**
     * Creates an occupancy sensor device.
     *
     * @param homebridge A reference to the Homebridge API.
     * @param device A reference to the discovered device.
     * @param log A refrence to the Homebridge logger.
     */
    constructor(homebridge: API, device: Leap.Occupancy, log: Logging);
    /**
     * Updates Homebridge accessory when an update comes from the device.
     *
     * @param state The current occupancy sensor state.
     */
    onUpdate(state: Leap.OccupancyState): void;
    /**
     * Fetches the current state when Homebridge asks for it.
     *
     * @returns A characteristic value.
     */
    private onGetState;
}
//# sourceMappingURL=Occupancy.d.ts.map