"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const bson_1 = __importDefault(require("bson"));
const plugin_ui_utils_1 = require("@homebridge/plugin-ui-utils");
const leap_client_1 = require("@mkellsy/leap-client");
class UiServer extends plugin_ui_utils_1.HomebridgePluginUiServer {
    constructor() {
        super();
        this.onProcessors = () => {
            const pairing = path_1.default.resolve(os_1.default.homedir(), ".leap/pairing");
            if (fs_1.default.existsSync(pairing)) {
                const bytes = fs_1.default.readFileSync(pairing);
                const context = bson_1.default.deserialize(bytes);
                return Object.keys(context);
            }
            return [];
        };
        this.onPair = () => {
            return new Promise((resolve) => {
                (0, leap_client_1.pair)()
                    .then(() => {
                    resolve({ status: "success" });
                })
                    .catch((error) => {
                    resolve({ status: "fail", error: error.message });
                });
            });
        };
        this.onUnpair = () => {
            const pairing = path_1.default.resolve(os_1.default.homedir(), ".leap/pairing");
            if (fs_1.default.existsSync(pairing)) {
                const bytes = fs_1.default.readFileSync(pairing);
                const context = bson_1.default.deserialize(bytes);
                Object.keys(context).forEach((id) => {
                    const cache = path_1.default.resolve(os_1.default.homedir(), ".leap", id);
                    if (fs_1.default.existsSync(cache)) {
                        fs_1.default.rmSync(cache);
                    }
                });
                fs_1.default.rmSync(pairing);
                return "true";
            }
            return "false";
        };
        this.onRequest("/processors", this.onProcessors);
        this.onRequest("/pair", this.onPair);
        this.onRequest("/unpair", this.onUnpair);
        this.ready();
    }
}
(() => new UiServer())();
