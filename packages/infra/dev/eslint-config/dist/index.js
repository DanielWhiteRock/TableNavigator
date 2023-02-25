"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const service_1 = __importDefault(require("./src/service"));
const asset_mapping_1 = __importDefault(require("./src/asset-mapping"));
const cli_1 = __importDefault(require("./src/cli"));
module.exports = {
    service: service_1.default,
    assetMapping: asset_mapping_1.default,
    cli: cli_1.default,
};
//# sourceMappingURL=index.js.map