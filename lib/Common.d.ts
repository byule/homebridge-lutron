import { API, Logging, PlatformAccessory } from "homebridge";
import { Device } from "@mkellsy/hap-device";
/**
 * Defines common functionallity for a device.
 * @private
 */
export declare abstract class Common<DEVICE extends Device> {
    readonly id: string;
    readonly accessory: PlatformAccessory;
    protected readonly log: Logging;
    protected readonly homebridge: API;
    protected readonly device: DEVICE;
    /**
     * Creates a common device.
     *
     * @param homebridge A reference to the Homebridge API.
     * @param device A reference to the discovered device.
     * @param log A refrence to the Homebridge logger.
     */
    constructor(homebridge: API, device: DEVICE, log: Logging);
    /**
     * Registers a device and if not cached, it will also inform Homebridge
     * about the device.
     */
    register(): void;
}
//# sourceMappingURL=Common.d.ts.map