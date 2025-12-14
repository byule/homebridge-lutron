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
const Leap = __importStar(require("@mkellsy/leap-client"));
const colors_1 = __importDefault(require("colors"));
const Logger_1 = require("./Logger");
const commander_1 = require("commander");
const log = Logger_1.Logger.log;
/*
 * Adds the debug option to the CLI.
 */
commander_1.program.option("-d, --debug", "enable debug logging");
/*
 * Defines the pairing tool in the CLI.
 */
commander_1.program.command("pair").action(() => {
    Logger_1.Logger.configure(commander_1.program);
    console.log(colors_1.default.green("Press the pairing button on the main processor or smart bridge"));
    Leap.pair()
        .then(() => log.info("Processor paired"))
        .catch((error) => log.error(colors_1.default.red(error.message)))
        .finally(() => process.exit(0));
});
module.exports = function main(args) {
    commander_1.program.parse(args || process.argv);
};
