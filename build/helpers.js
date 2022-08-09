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
exports.waitForSelector = exports.wait = exports.type = exports.tidalSelect = exports.rand = exports.pressedEnter = exports.press = exports.goToPage = exports.getTimePlayer = exports.get = exports.disableAlert = exports.click = exports.album = void 0;
var albums_1 = require("./albums");
var wait = function (time) { return new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res(true);
                return [2 /*return*/];
            });
        }); }, time);
        return [2 /*return*/];
    });
}); }); };
exports.wait = wait;
var rand = function (max, min) {
    if (min === void 0) { min = 0; }
    return Math.floor(Math.random() * Math.floor(max + 1 - min)) + min;
};
exports.rand = rand;
var waitForSelector = function (R, selector, time) {
    if (time === void 0) { time = 60; }
    return new Promise(function (res, rej) {
        var inter;
        var timeToWait = setTimeout(function () {
            clearInterval(inter);
            res(false);
        }, time * 1000);
        inter = setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
            var el, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = R;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, R.evaluate({ expression: 'document.querySelector(\'' + selector + '\')' })];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        el = _a;
                        if (el.result.objectId) {
                            res(true);
                            clearInterval(inter);
                            clearTimeout(timeToWait);
                        }
                        return [2 /*return*/];
                }
            });
        }); }, 500);
    });
};
exports.waitForSelector = waitForSelector;
var click = function (R, selector, time, exitOnError) {
    if (exitOnError === void 0) { exitOnError = true; }
    return new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
        var wfs, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = R;
                    if (!_a) return [3 /*break*/, 2];
                    return [4 /*yield*/, waitForSelector(R, selector, time)];
                case 1:
                    _a = (_c.sent());
                    _c.label = 2;
                case 2:
                    wfs = _a;
                    return [4 /*yield*/, wait(rand(5, 1) * 1000)];
                case 3:
                    _c.sent();
                    _b = R;
                    if (!_b) return [3 /*break*/, 5];
                    return [4 /*yield*/, R.evaluate({ expression: 'document.querySelectorAll(\'' + selector + '\')[0].click()' })];
                case 4:
                    _b = (_c.sent());
                    _c.label = 5;
                case 5:
                    _b;
                    res(wfs);
                    return [2 /*return*/];
            }
        });
    }); });
};
exports.click = click;
var type = function (R, value, selector) { return new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
    var randVar, typeExpression, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, waitForSelector(R, selector)];
            case 1:
                _b.sent();
                return [4 /*yield*/, wait(rand(3, 1) * 1000)];
            case 2:
                _b.sent();
                randVar = rand(10000);
                typeExpression = "\n\t\t\tconst setValue".concat(randVar, " = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;\n\t\t\tconst event").concat(randVar, " = new Event('input', { bubbles: true });\n\n\t\t\tsetValue").concat(randVar, ".call(document.querySelector('").concat(selector, "'), '").concat(value, "');\n\t\t\tdocument.querySelector('").concat(selector, "').dispatchEvent(event").concat(randVar, ");\n\t\t");
                _a = R;
                if (!_a) return [3 /*break*/, 4];
                return [4 /*yield*/, R.evaluate({ expression: typeExpression })];
            case 3:
                _a = (_b.sent());
                _b.label = 4;
            case 4:
                _a;
                res(true);
                return [2 /*return*/];
        }
    });
}); }); };
exports.type = type;
var getTimePlayer = function (R, S) { return __awaiter(void 0, void 0, void 0, function () {
    var e, _a, time;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = R;
                if (!_a) return [3 /*break*/, 2];
                return [4 /*yield*/, R.evaluate({ expression: "document.querySelector('".concat(S.timeLine, "') && document.querySelector('").concat(S.timeLine, "').innerText") })];
            case 1:
                _a = (_b.sent());
                _b.label = 2;
            case 2:
                e = _a;
                time = e.result.value && S.callback(e.result.value);
                return [2 /*return*/, time];
        }
    });
}); };
exports.getTimePlayer = getTimePlayer;
var goToPage = function (url, P, S) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, wait(rand(5, 3) * 1000)];
            case 1:
                _a.sent();
                return [4 /*yield*/, P.navigate({ url: url })];
            case 2:
                _a.sent();
                return [4 /*yield*/, P.loadEventFired()];
            case 3:
                _a.sent();
                return [4 /*yield*/, wait(rand(5, 3) * 1000)];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.goToPage = goToPage;
var press = function (I, key) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (closed) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, wait(rand(5, 3) * 1000)];
            case 1:
                _a.sent();
                return [4 /*yield*/, I.dispatchKeyEvent({
                        type: 'keyDown',
                        key: key,
                        code: key,
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, wait(rand(500, 100))];
            case 3:
                _a.sent();
                return [4 /*yield*/, I.dispatchKeyEvent({
                        type: 'keyUp',
                        key: key,
                        code: key,
                    })];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.press = press;
var pressedEnter = function (I) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, I.dispatchKeyEvent({ "type": "rawKeyDown", "windowsVirtualKeyCode": 13, "unmodifiedText": "\r", "text": "\r" })];
            case 1:
                _a.sent();
                return [4 /*yield*/, wait(rand(500, 100))];
            case 2:
                _a.sent();
                return [4 /*yield*/, I.dispatchKeyEvent({ "type": "char", "windowsVirtualKeyCode": 13, "unmodifiedText": "\r", "text": "\r" })];
            case 3:
                _a.sent();
                return [4 /*yield*/, wait(rand(500, 100))];
            case 4:
                _a.sent();
                return [4 /*yield*/, I.dispatchKeyEvent({ "type": "keyUp", "windowsVirtualKeyCode": 13, "unmodifiedText": "\r", "text": "\r" })];
            case 5:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.pressedEnter = pressedEnter;
var disableAlert = function (R) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, R];
            case 1:
                (_a.sent()) && R.evaluate({ expression: "window.alert = () => { };" });
                return [2 /*return*/];
        }
    });
}); };
exports.disableAlert = disableAlert;
var album = function (player) {
    var als = albums_1.albums[player];
    var albumUrl = als[rand(als.length - 1)];
    return albumUrl;
};
exports.album = album;
var tidalSelect = function (R) { return new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
    var expression, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                expression = "\n\t\tconst rand = (max, min = 0) => {\n\t\t\treturn Math.floor(Math.random() * Math.floor(max) + min);\n\t\t}\n\n\t\tconst artist = document.querySelectorAll('[class*=\"artistContainer\"]')\n\n\t\tif(artist?.length > 0) {\n\t\t\tsetTimeout(() => {\n\t\t\t\tartist[rand(artist.length)].click()\n\t\t\t}, 1000 * 1);\n\t\t\tsetTimeout(() => {\n\t\t\t\tartist[rand(artist.length)].click()\n\t\t\t}, 1000 * 2);\n\t\t\tsetTimeout(() => {\n\t\t\t\tartist[rand(artist.length)].click()\n\t\t\t}, 1000 * 3);\n\n\t\t\tsetTimeout(() => {\n\t\t\t\tdocument.querySelector('[class*=\"continueButtonContainer\"] button').click()\n\t\t\t}, 1000 * 4);\n\t\t}\n\t\t";
                _a = R;
                if (!_a) return [3 /*break*/, 2];
                return [4 /*yield*/, R.evaluate({ expression: expression })];
            case 1:
                _a = (_b.sent());
                _b.label = 2;
            case 2:
                _a;
                res(true);
                return [2 /*return*/];
        }
    });
}); }); };
exports.tidalSelect = tidalSelect;
var get = function (R, selector, getter) {
    if (getter === void 0) { getter = 'innerHTML'; }
    return __awaiter(void 0, void 0, void 0, function () {
        var expression, e, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, wait(rand(5, 3) * 1000)];
                case 1:
                    _b.sent();
                    expression = "document.querySelector('".concat(selector, "') && document.querySelector('").concat(selector, "')['").concat(getter, "']");
                    _a = R;
                    if (!_a) return [3 /*break*/, 3];
                    return [4 /*yield*/, R.evaluate({ expression: expression })];
                case 2:
                    _a = (_b.sent());
                    _b.label = 3;
                case 3:
                    e = _a;
                    return [2 /*return*/, e.result.value];
            }
        });
    });
};
exports.get = get;
