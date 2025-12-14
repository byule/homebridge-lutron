import * as Console from "js-logger";
import { Command } from "commander";
/**
 * Defines a logger instance.
 * @private
 */
export type Log = Console.ILogger;
/**
 * Extends the js logger and configures its output.
 * @private
 */
export declare abstract class Logger {
    /**
     * Configures the logger based on CLI arguments.
     *
     * @param program Reference to the CLI command processor.
     */
    static configure(program: Command): void;
    /**
     * A reference to the global logger instance.
     *
     * @returns Logger instance.
     */
    static get log(): Console.GlobalLogger;
    /**
     * Creates or fetches a named logger instance.
     *
     * @param name The desired name for an instance.
     *
     * @returns Logger instance.
     */
    static get(name: string): Console.ILogger;
    /**
     * Formats non-string objects for printing to the logger.
     *
     * @param value An object to print.
     *
     * @returns A string suitable for logging.
     */
    static inspect(value: object): string;
}
//# sourceMappingURL=Logger.d.ts.map