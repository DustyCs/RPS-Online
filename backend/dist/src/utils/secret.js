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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB = exports.JWT_SECRET = exports.LOG_DIR = exports.APP_PORT = exports.IS_PRODUCTION = exports.ENVIRONMENT = void 0;
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
const _ = __importStar(require("lodash"));
dotenv.config();
exports.ENVIRONMENT = _.defaultTo(process.env.NODE_ENV, "development");
exports.IS_PRODUCTION = exports.ENVIRONMENT === "production";
exports.APP_PORT = _.defaultTo(process.env.APP_PORT, 5100);
exports.LOG_DIR = _.defaultTo(process.env.LOG_DIR, path.resolve(__dirname, "/logs"));
exports.JWT_SECRET = _.defaultTo(process.env.JWT_SECRET, "NoCal Sec R22");
exports.MONGODB = {
    USER: _.defaultTo(process.env.DB_USER, "root"),
    PASSWORD: _.defaultTo(process.env.DB_PASSWORD, "secret"),
    HOST: _.defaultTo(process.env.DB_HOST, "localhost"),
    NAME: _.defaultTo(process.env.DB_DATABASE, "test"),
    APPNAME: _.defaultTo(process.env.DB_APPNAME, "myApp")
};
