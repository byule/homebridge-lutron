import * as Leap from "@mkellsy/leap-client";
import { API, Logging } from "homebridge";
import { Action, Button } from "@mkellsy/hap-device";
import { Common } from "./Common";
import { Device } from "./Device";
/**
 * Creates a keypad device.
 * @private
 */
export declare class Keypad extends Common<Leap.Keypad> implements Device {
    private services;
    /**
     * Creates a keypad device.
     *
     * @param homebridge A reference to the Homebridge API.
     * @param device A reference to the discovered device.
     * @param log A refrence to the Homebridge logger.
     */
    constructor(homebridge: API, device: Leap.Keypad, log: Logging);
    /**
     * Invokes an action when a button is pressed.
     *
     * @param button The current button where the action was invoked.
     * @param action The action invoked (press, release, ...).
     */
    onAction(button: Button, action: Action): void;
}
//# sourceMappingURL=Keypad.d.ts.map