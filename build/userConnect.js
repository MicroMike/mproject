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
exports.userConnect = void 0;
var copy_1 = require("./copy");
var helpers_1 = require("./helpers");
var colors = require('colors');
var userConnect = function (protocol, S, account, socketEmit, check) { return __awaiter(void 0, void 0, void 0, function () {
    var Network, Page, Runtime, DOM, Input, Browser, Target, N, P, R, D, B, I, T, _a, player, login, pass, isTidal, isSpotify, isAmazon, isNapster, isApple, alb, isLogged, _b, amazonReLog, _c, _d, _e, error, logSuccess, _f, _g, delTidal;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                Network = protocol.Network, Page = protocol.Page, Runtime = protocol.Runtime, DOM = protocol.DOM, Input = protocol.Input, Browser = protocol.Browser, Target = protocol.Target;
                N = Network;
                P = Page;
                R = Runtime;
                D = DOM;
                B = Browser;
                I = Input;
                T = Target;
                _a = account.split(':'), player = _a[0], login = _a[1], pass = _a[2];
                isTidal = player === 'tidal';
                isSpotify = player === 'spotify';
                isAmazon = player === 'amazon';
                isNapster = player === 'napster';
                isApple = player === 'apple';
                alb = (0, helpers_1.album)(player);
                return [4 /*yield*/, (0, helpers_1.goToPage)(alb, P, S)];
            case 1:
                _h.sent();
                if (player === 'apple') {
                    (0, helpers_1.disableAlert)(R);
                }
                _b = !check;
                if (!_b) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, helpers_1.waitForSelector)(R, S.noNeedLog, 30)];
            case 2:
                _b = (_h.sent());
                _h.label = 3;
            case 3:
                isLogged = _b;
                if (!!isLogged) return [3 /*break*/, 38];
                // @ts-ignore
                check && console.log('need log'.green, player, login);
                if (!isAmazon) return [3 /*break*/, 6];
                return [4 /*yield*/, P.navigate({ url: 'https://music.amazon.fr/forceSignIn?useHorizonte=true' })];
            case 4:
                _h.sent();
                return [4 /*yield*/, P.loadEventFired()];
            case 5:
                _h.sent();
                return [3 /*break*/, 11];
            case 6:
                if (!isNapster) return [3 /*break*/, 9];
                return [4 /*yield*/, P.navigate({ url: 'https://web.napster.com/auth/login' })];
            case 7:
                _h.sent();
                return [4 /*yield*/, P.loadEventFired()];
            case 8:
                _h.sent();
                return [3 /*break*/, 11];
            case 9: return [4 /*yield*/, (0, helpers_1.click)(R, S.gotoLog)];
            case 10:
                _h.sent();
                _h.label = 11;
            case 11:
                if (!isApple) return [3 /*break*/, 24];
                return [4 /*yield*/, (0, helpers_1.wait)((0, helpers_1.rand)(5, 3) * 1000)];
            case 12:
                _h.sent();
                return [4 /*yield*/, (0, helpers_1.press)(I, 'Tab')];
            case 13:
                _h.sent();
                return [4 /*yield*/, (0, helpers_1.wait)((0, helpers_1.rand)(5, 3) * 1000)];
            case 14:
                _h.sent();
                return [4 /*yield*/, (0, helpers_1.press)(I, 'Tab')];
            case 15:
                _h.sent();
                return [4 /*yield*/, (0, helpers_1.wait)((0, helpers_1.rand)(5, 3) * 1000)];
            case 16:
                _h.sent();
                return [4 /*yield*/, I.insertText({
                        text: login,
                    })];
            case 17:
                _h.sent();
                return [4 /*yield*/, (0, helpers_1.wait)((0, helpers_1.rand)(5, 3) * 1000)];
            case 18:
                _h.sent();
                return [4 /*yield*/, (0, helpers_1.pressedEnter)(I)];
            case 19:
                _h.sent();
                return [4 /*yield*/, (0, helpers_1.wait)((0, helpers_1.rand)(5, 3) * 1000)];
            case 20:
                _h.sent();
                return [4 /*yield*/, I.insertText({
                        text: pass,
                    })];
            case 21:
                _h.sent();
                return [4 /*yield*/, (0, helpers_1.wait)((0, helpers_1.rand)(5, 3) * 1000)];
            case 22:
                _h.sent();
                return [4 /*yield*/, (0, helpers_1.pressedEnter)(I)];
            case 23:
                _h.sent();
                return [3 /*break*/, 38];
            case 24: return [4 /*yield*/, (0, helpers_1.waitForSelector)(R, S.email, 120)];
            case 25:
                _h.sent();
                _c = isAmazon;
                if (!_c) return [3 /*break*/, 27];
                return [4 /*yield*/, (0, helpers_1.waitForSelector)(R, '#ap-credential-autofill-hint', 5)];
            case 26:
                _c = (_h.sent());
                _h.label = 27;
            case 27:
                amazonReLog = _c;
                return [4 /*yield*/, I.dispatchMouseEvent({
                        type: 'mousePressed',
                        button: 'left',
                        x: 315,
                        y: 390
                    })];
            case 28:
                _h.sent();
                _d = !amazonReLog;
                if (!_d) return [3 /*break*/, 30];
                return [4 /*yield*/, (0, helpers_1.type)(R, login, S.email)];
            case 29:
                _d = (_h.sent());
                _h.label = 30;
            case 30:
                _d;
                _e = isTidal;
                if (!_e) return [3 /*break*/, 32];
                return [4 /*yield*/, (0, helpers_1.click)(R, S.next)];
            case 31:
                _e = (_h.sent());
                _h.label = 32;
            case 32:
                _e;
                return [4 /*yield*/, (0, helpers_1.waitForSelector)(R, S.loginError, 10)];
            case 33:
                error = _h.sent();
                if (error) {
                    if (isTidal) {
                        throw 'del';
                    }
                    throw 'out_no_logging';
                }
                return [4 /*yield*/, (0, helpers_1.type)(R, pass, S.pass)];
            case 34:
                _h.sent();
                return [4 /*yield*/, (0, helpers_1.click)(R, S.connectBtn)];
            case 35:
                _h.sent();
                return [4 /*yield*/, (0, helpers_1.waitForSelector)(R, S.loginError, 10)];
            case 36:
                error = _h.sent();
                if (error) {
                    if (isTidal) {
                        throw 'del';
                    }
                    throw 'out_error_connect';
                }
                return [4 /*yield*/, (0, helpers_1.tidalSelect)(R)];
            case 37:
                _h.sent();
                _h.label = 38;
            case 38: return [4 /*yield*/, (0, helpers_1.wait)((0, helpers_1.rand)(5, 3) * 1000)];
            case 39:
                _h.sent();
                return [4 /*yield*/, (0, helpers_1.waitForSelector)(R, S.noNeedLog, 120)];
            case 40:
                logSuccess = _h.sent();
                if (!logSuccess) {
                    if (isTidal) {
                        throw 'tidalError';
                    }
                    throw 'out_log_error';
                }
                if (!isLogged) {
                    // @ts-ignore
                    console.log(login, 'log Success'.green);
                }
                else {
                    // @ts-ignore
                    console.log(login, 'log Success'.green, 'noNeedLog'.yellow);
                }
                socketEmit('playerInfos', { time: 'CONNECT', other: true });
                _f = isSpotify;
                if (!_f) return [3 /*break*/, 42];
                return [4 /*yield*/, (0, helpers_1.click)(R, '#onetrust-accept-btn-handler', 5)];
            case 41:
                _f = (_h.sent());
                _h.label = 42;
            case 42:
                _f;
                if (!(isAmazon || isNapster)) return [3 /*break*/, 44];
                return [4 /*yield*/, (0, helpers_1.goToPage)(alb, P, S)];
            case 43:
                _h.sent();
                _h.label = 44;
            case 44: return [4 /*yield*/, (0, helpers_1.wait)((0, helpers_1.rand)(5, 3) * 1000)];
            case 45:
                _h.sent();
                return [4 /*yield*/, I.dispatchMouseEvent({
                        type: 'mousePressed',
                        button: 'left',
                        x: 315,
                        y: 390
                    })];
            case 46:
                _h.sent();
                return [4 /*yield*/, (0, helpers_1.wait)((0, helpers_1.rand)(5, 3) * 1000)];
            case 47:
                _h.sent();
                return [4 /*yield*/, (0, helpers_1.click)(R, S.play)];
            case 48:
                _h.sent();
                return [4 /*yield*/, (0, helpers_1.wait)((0, helpers_1.rand)(5, 3) * 1000)];
            case 49:
                _h.sent();
                socketEmit('playerInfos', { time: 'PLAY', ok: true });
                return [4 /*yield*/, (0, helpers_1.wait)((0, helpers_1.rand)(5, 3) * 1000)];
            case 50:
                _h.sent();
                _g = !check;
                if (!_g) return [3 /*break*/, 52];
                return [4 /*yield*/, (0, copy_1.copyBack)(player, login)];
            case 51:
                _g = (_h.sent());
                _h.label = 52;
            case 52:
                _g;
                if (!isTidal) return [3 /*break*/, 54];
                return [4 /*yield*/, (0, helpers_1.get)(R, '.ReactModal__Overlay', 'innerText')];
            case 53:
                delTidal = _h.sent();
                if (/expired/.test(delTidal)) {
                    throw 'del';
                }
                _h.label = 54;
            case 54: return [2 /*return*/];
        }
    });
}); };
exports.userConnect = userConnect;
