"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
process.setMaxListeners(Infinity);
var CDP = require('chrome-remote-interface');
var socketIo = require('socket.io-client');
var chromeConfig_1 = require("./config/chromeConfig");
var playerConfig_1 = require("./config/playerConfig");
var helpers_1 = require("./helpers/helpers");
var userConnect_1 = require("./userConnect");
var clientSocket = socketIo('http://216.158.239.199:3000', { transports: ['websocket'] });
var arg = process.argv[2];
var max = process.argv[3] || 1;
var checkAccount = process.argv[4];
var check = !!checkAccount || /check/i.test(arg);
var account = 'spotify:katie.williams@use.startmail.com:055625Ff';
var socketEmit = function (event, params) {
    // socket.emit(event, {
    // 	parentId,
    // 	streamId,
    // 	account,
    // 	...params,
    // });
};
var go = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, player, login, pass, appleGoToPage, S, launchChrome, chrome, options, protocol, Network, Page, Runtime, DOM, Input, Browser, Target, N, P, R, D, B, I, T, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = account.split(':'), player = _a[0], login = _a[1], pass = _a[2];
                appleGoToPage = function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(player === 'apple')) return [3 /*break*/, 2];
                                return [4 /*yield*/, (0, helpers_1.click)(R, S.pauseBtn, 1, false)];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); };
                S = (0, playerConfig_1.getConfig)(player);
                launchChrome = (0, chromeConfig_1.chromeConfig)(player, login);
                return [4 /*yield*/, launchChrome()];
            case 1:
                chrome = _b.sent();
                options = {
                    host: '127.0.0.1',
                    port: chrome.port
                };
                return [4 /*yield*/, (0, helpers_1.wait)(5 * 1000)];
            case 2:
                _b.sent();
                return [4 /*yield*/, CDP(options)];
            case 3:
                protocol = _b.sent();
                Network = protocol.Network, Page = protocol.Page, Runtime = protocol.Runtime, DOM = protocol.DOM, Input = protocol.Input, Browser = protocol.Browser, Target = protocol.Target;
                N = Network;
                P = Page;
                R = Runtime;
                D = DOM;
                B = Browser;
                I = Input;
                T = Target;
                _b.label = 4;
            case 4:
                _b.trys.push([4, 6, , 7]);
                return [4 /*yield*/, (0, userConnect_1.userConnect)(protocol, S, account, socketEmit, check)];
            case 5:
                _b.sent();
                return [3 /*break*/, 7];
            case 6:
                error_1 = _b.sent();
                console.log('error', error_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
go();
