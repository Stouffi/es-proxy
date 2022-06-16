"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const express_1 = __importDefault(require("express"));
const aws4_1 = __importDefault(require("aws4"));
const app = (0, express_1.default)();
const esUrl = process.env['ES_URL'];
const accessKeyId = process.env['AWS_ACCESS_KEY_ID'];
const secretAccessKey = process.env['AWS_SECRET_ACCESS_KEY'];
app.use('/*', (0, express_http_proxy_1.default)(esUrl, { proxyReqOptDecorator(_, srcReq) {
        aws4_1.default.sign(srcReq, { accessKeyId, secretAccessKey });
        return srcReq;
    }, }));
