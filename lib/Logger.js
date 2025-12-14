"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const Console = __importStar(require("js-logger"));
const colors_1 = __importDefault(require("colors"));
const util_1 = require("util");
/**
 * Extends the js logger and configures its output.
 * @private
 */
class Logger {
    /**
     * Configures the logger based on CLI arguments.
     *
     * @param program Reference to the CLI command processor.
     */
    static configure(program) {
        const formatter = (messages, context) => {
            if (context.name != null) {
                messages.unshift(colors_1.default.cyan(context.name));
            }
            messages.unshift(colors_1.default.dim(new Date().toLocaleTimeString()));
        };
        if (program.opts().debug) {
            Console.setDefaults({ defaultLevel: Console.default.DEBUG, formatter });
        }
        else {
            Console.setDefaults({ defaultLevel: Console.default.INFO, formatter });
        }
    }
    /**
     * A reference to the global logger instance.
     *
     * @returns Logger instance.
     */
    static get log() {
        return Console.default;
    }
    /**
     * Creates or fetches a named logger instance.
     *
     * @param name The desired name for an instance.
     *
     * @returns Logger instance.
     */
    static get(name) {
        return Console.get(name);
    }
    /**
     * Formats non-string objects for printing to the logger.
     *
     * @param value An object to print.
     *
     * @returns A string suitable for logging.
     */
    static inspect(value) {
        return colors_1.default.dim((0, util_1.inspect)(value, {
            showHidden: false,
            depth: Infinity,
            colors: true,
            compact: true,
            breakLength: Infinity,
        }));
    }
}
exports.Logger = Logger;
