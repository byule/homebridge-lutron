import { API, DynamicPlatformPlugin, Logging, PlatformAccessory, PlatformConfig } from "homebridge";
import { Device } from "./Device";
declare const accessories: Map<string, PlatformAccessory>;
declare const devices: Map<string, Device>;
declare const platform: string;
declare const plugin: string;
export { accessories, devices, platform, plugin };
/**
 * Impliments a Homebridge platform plugin.
 * @private
 */
export declare class Platform implements DynamicPlatformPlugin {
    private readonly log;
    private readonly config;
    private readonly homebridge;
    /**
     * Creates an instance to this plugin.
     *
     * @param log A reference to the Homebridge logger.
     * @param config A reference to this plugin's config.
     * @param homebridge A reference to the Homebridge API.
     */
    constructor(log: Logging, config: PlatformConfig, homebridge: API);
    /**
     * Function to call when Homebridge findes a cached accessory that is
     * associated to this plugin.
     *
     * Note these accessories do not have extended data, the plugin wwill need
     * to re-initialize the device, and re-bind any listeners.
     *
     * @param accessory A reference to the cached accessory.
     */
    configureAccessory(accessory: PlatformAccessory): void;
    private onAvailable;
    private onAction;
    private onUpdate;
}
//# sourceMappingURL=Platform.d.ts.map