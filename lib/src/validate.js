"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBrand = checkBrand;
exports.validateBrand = validateBrand;
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const brand_schema_json_1 = __importDefault(require("../schema/brand.schema.json"));
const ajv = new ajv_1.default({ allErrors: true, strict: false });
(0, ajv_formats_1.default)(ajv);
let validator;
function checkBrand(data) {
    validator ??= ajv.compile(brand_schema_json_1.default);
    const valid = validator(data);
    if (valid) {
        return { valid: true, errors: "" };
    }
    const errors = (validator.errors ?? [])
        .map((e) => `  - ${e.instancePath || "/"} ${e.message}`)
        .join("\n");
    return { valid: false, errors: `brand.json failed schema validation:\n${errors}` };
}
function validateBrand(data) {
    const result = checkBrand(data);
    if (!result.valid) {
        throw new Error(result.errors);
    }
    return data;
}
