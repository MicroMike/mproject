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
var copy_1 = require("./helpers/copy");
var helpers_1 = require("./helpers/helpers");
var colors = require('colors');
var userConnect = function (_a) {
    var P = _a.P, R = _a.R, I = _a.I, S = _a.S, account = _a.account, check = _a.check, socketEmit = _a.socketEmit;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, player, login, pass, isTidal, isSpotify, isAmazon, isNapster, isApple, alb, isLogged, _b, amazonReLogBody, _c, loginRegex, amazonReLog, _d, outNoLogging, outErrorConnect, _e, spotifyLogError, logSuccess, delTidal, error_1;
                    return __generator(this, function (_f) {
                        switch (_f.label) {
                            case 0:
                                _f.trys.push([0, 56, , 57]);
                                _a = account.split(':'), player = _a[0], login = _a[1], pass = _a[2];
                                isTidal = player === 'tidal';
                                isSpotify = player === 'spotify';
                                isAmazon = player === 'amazon';
                                isNapster = player === 'napster';
                                isApple = player === 'apple';
                                alb = (0, helpers_1.album)(player);
                                return [4 /*yield*/, (0, helpers_1.goToPage)(alb, P)];
                            case 1:
                                _f.sent();
                                if (!(player === 'apple')) return [3 /*break*/, 3];
                                return [4 /*yield*/, (0, helpers_1.disableAlert)(R)];
                            case 2:
                                _f.sent();
                                _f.label = 3;
                            case 3:
                                _b = !check;
                                if (!_b) return [3 /*break*/, 5];
                                return [4 /*yield*/, (0, helpers_1.waitForSelector)(R, S.noNeedLog, 30)];
                            case 4:
                                _b = (_f.sent());
                                _f.label = 5;
                            case 5:
                                isLogged = _b;
                                if (!!isLogged) return [3 /*break*/, 41];
                                // @ts-ignore
                                check && console.log('need log'.green, player, login);
                                if (!isAmazon) return [3 /*break*/, 7];
                                return [4 /*yield*/, P.navigate({ url: 'https://music.amazon.fr/forceSignIn?useHorizonte=true' })];
                            case 6:
                                _f.sent();
                                P.loadEventFired();
                                return [3 /*break*/, 12];
                            case 7:
                                if (!isNapster) return [3 /*break*/, 10];
                                return [4 /*yield*/, P.navigate({ url: 'https://web.napster.com/auth/login' })];
                            case 8:
                                _f.sent();
                                return [4 /*yield*/, P.loadEventFired()];
                            case 9:
                                _f.sent();
                                return [3 /*break*/, 12];
                            case 10: return [4 /*yield*/, (0, helpers_1.click)(R, S.gotoLog)];
                            case 11:
                                _f.sent();
                                _f.label = 12;
                            case 12:
                                if (!isApple) return [3 /*break*/, 25];
                                return [4 /*yield*/, (0, helpers_1.wait)((0, helpers_1.rand)(5, 3) * 1000)];
                            case 13:
                                _f.sent();
                                return [4 /*yield*/, (0, helpers_1.press)(I, 'Tab')];
                            case 14:
                                _f.sent();
                                return [4 /*yield*/, (0, helpers_1.wait)((0, helpers_1.rand)(5, 3) * 1000)];
                            case 15:
                                _f.sent();
                                return [4 /*yield*/, (0, helpers_1.press)(I, 'Tab')];
                            case 16:
                                _f.sent();
                                return [4 /*yield*/, (0, helpers_1.wait)((0, helpers_1.rand)(5, 3) * 1000)];
                            case 17:
                                _f.sent();
                                return [4 /*yield*/, I.insertText({
                                        text: login,
                                    })];
                            case 18:
                                _f.sent();
                                return [4 /*yield*/, (0, helpers_1.wait)((0, helpers_1.rand)(5, 3) * 1000)];
                            case 19:
                                _f.sent();
                                return [4 /*yield*/, (0, helpers_1.pressedEnter)(I)];
                            case 20:
                                _f.sent();
                                return [4 /*yield*/, (0, helpers_1.wait)((0, helpers_1.rand)(5, 3) * 1000)];
                            case 21:
                                _f.sent();
                                return [4 /*yield*/, I.insertText({
                                        text: pass,
                                    })];
                            case 22:
                                _f.sent();
                                return [4 /*yield*/, (0, helpers_1.wait)((0, helpers_1.rand)(5, 3) * 1000)];
                            case 23:
                                _f.sent();
                                return [4 /*yield*/, (0, helpers_1.pressedEnter)(I)];
                            case 24:
                                _f.sent();
                                return [3 /*break*/, 41];
                            case 25:
                                _c = isAmazon;
                                if (!_c) return [3 /*break*/, 27];
                                return [4 /*yield*/, (0, helpers_1.get)(R, 'body', 'innerText')];
                            case 26:
                                _c = (_f.sent());
                                _f.label = 27;
                            case 27:
                                amazonReLogBody = _c;
                                loginRegex = new RegExp(login);
                                amazonReLog = amazonReLogBody && loginRegex.test(amazonReLogBody);
                                if (!amazonReLog) return [3 /*break*/, 28];
                                console.log('amazonReLog');
                                return [3 /*break*/, 35];
                            case 28: return [4 /*yield*/, I.dispatchMouseEvent({
                                    type: 'mousePressed',
                                    button: 'left',
                                    x: 315,
                                    y: 390
                                })];
                            case 29:
                                _f.sent();
                                return [4 /*yield*/, (0, helpers_1.waitForSelector)(R, S.email, 30)];
                            case 30:
                                _f.sent();
                                return [4 /*yield*/, (0, helpers_1.type)(R, login, S.email)];
                            case 31:
                                _f.sent();
                                _d = isTidal;
                                if (!_d) return [3 /*break*/, 33];
                                return [4 /*yield*/, (0, helpers_1.click)(R, S.next)];
                            case 32:
                                _d = (_f.sent());
                                _f.label = 33;
                            case 33:
                                _d;
                                return [4 /*yield*/, (0, helpers_1.waitForSelector)(R, S.loginError, 5)];
                            case 34:
                                outNoLogging = _f.sent();
                                if (outNoLogging) {
                                    if (isTidal) {
                                        throw 'del';
                                    }
                                    throw 'out_no_logging';
                                }
                                _f.label = 35;
                            case 35: return [4 /*yield*/, (0, helpers_1.type)(R, pass, S.pass)];
                            case 36:
                                _f.sent();
                                return [4 /*yield*/, (0, helpers_1.click)(R, S.connectBtn)];
                            case 37:
                                _f.sent();
                                return [4 /*yield*/, (0, helpers_1.waitForSelector)(R, S.loginError, 10)];
                            case 38:
                                outErrorConnect = _f.sent();
                                if (outErrorConnect) {
                                    if (isTidal) {
                                        throw 'del';
                                    }
                                    throw 'out_error_connect';
                                }
                                _e = isTidal;
                                if (!_e) return [3 /*break*/, 40];
                                return [4 /*yield*/, (0, helpers_1.tidalSelect)(R)];
                            case 39:
                                _e = (_f.sent());
                                _f.label = 40;
                            case 40:
                                _e;
                                _f.label = 41;
                            case 41: return [4 /*yield*/, (0, helpers_1.wait)((0, helpers_1.rand)(5, 3) * 1000)];
                            case 42:
                                _f.sent();
                                return [4 /*yield*/, (0, helpers_1.get)(R, 'body', 'innerText')];
                            case 43:
                                spotifyLogError = _f.sent();
                                if (spotifyLogError && /Incorrect/.test(spotifyLogError)) {
                                    console.log('SPOTIFY_LOG_ERROR', spotifyLogError);
                                    throw 'out_log_error';
                                }
                                return [4 /*yield*/, (0, helpers_1.waitForSelector)(R, S.noNeedLog, 120)];
                            case 44:
                                logSuccess = _f.sent();
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
                                if (!(isSpotify || isTidal)) return [3 /*break*/, 46];
                                return [4 /*yield*/, (0, helpers_1.click)(R, '#onetrust-accept-btn-handler', 5)];
                            case 45:
                                _f.sent();
                                _f.label = 46;
                            case 46: return [4 /*yield*/, (0, helpers_1.goToPage)(alb, P)];
                            case 47:
                                _f.sent();
                                return [4 /*yield*/, (0, helpers_1.wait)((0, helpers_1.rand)(5, 3) * 1000)];
                            case 48:
                                _f.sent();
                                return [4 /*yield*/, I.dispatchMouseEvent({
                                        type: 'mousePressed',
                                        button: 'left',
                                        x: 315,
                                        y: 390
                                    })];
                            case 49:
                                _f.sent();
                                return [4 /*yield*/, (0, helpers_1.wait)((0, helpers_1.rand)(5, 3) * 1000)];
                            case 50:
                                _f.sent();
                                return [4 /*yield*/, (0, helpers_1.click)(R, S.play)];
                            case 51:
                                _f.sent();
                                return [4 /*yield*/, (0, helpers_1.wait)((0, helpers_1.rand)(5, 3) * 1000)];
                            case 52:
                                _f.sent();
                                socketEmit('playerInfos', { time: 'PLAY', ok: true });
                                return [4 /*yield*/, (0, helpers_1.wait)((0, helpers_1.rand)(5, 3) * 1000)];
                            case 53:
                                _f.sent();
                                (0, copy_1.copyBack)(player, login);
                                if (!isTidal) return [3 /*break*/, 55];
                                return [4 /*yield*/, (0, helpers_1.get)(R, '.ReactModal__Overlay', 'innerText')];
                            case 54:
                                delTidal = _f.sent();
                                if (/expired/.test(delTidal)) {
                                    throw 'del';
                                }
                                _f.label = 55;
                            case 55:
                                res({ alb: alb });
                                return [3 /*break*/, 57];
                            case 56:
                                error_1 = _f.sent();
                                rej({ error: error_1 });
                                return [3 /*break*/, 57];
                            case 57: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
};
exports.userConnect = userConnect;
