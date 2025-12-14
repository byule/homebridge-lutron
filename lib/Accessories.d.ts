import * as HAP from "@mkellsy/hap-device";
import { API, Logging, PlatformConfig } from "homebridge";
import { Device } from "./Device";
/**
 * Accessory factory.
 * @private
 */
export declare abstract class Accessories {
    /**
     * Creates respective devices from a common device discovery.
     *
     * @param homebridge A reference to the Homebridge API.
     * @param device A reference to the common device object.
     * @param config A reference to the plugin configuration.
     * @param log A reference to the Homebridge logger.
     *
     * @returns A device or undefined if not configured.
     */
    static create(homebridge: API, device: HAP.Device, config: PlatformConfig, log: Logging): Device | undefined;
    /**
     * Fetches an internally cached device.
     *
     * @param homebridge A reference to the Homebridge API.
     * @param device A reference to the common device object.
     *
     * @returns The cached device or undefined if not available.
     */
    static get(homebridge: API, device: HAP.Device): Device | undefined;
    /**
     * Removes an internally cached device.
     *
     * @param homebridge A reference to the Homebridge API.
     * @param device A reference to the common device object.
     */
    static remove(homebridge: API, device: HAP.Device): void;
}
//# sourceMappingURL=Accessories.d.ts.map