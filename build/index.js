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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var go_1 = require("./go");
var shelljs_1 = __importDefault(require("shelljs"));
var props = process.argv;
var arg = props[2];
var max = Number(props[3] || 1);
var checkAccount = props[4] || 'none';
shelljs_1.default.exec('rm -rf /root/puppet/puppet/', { async: true });
shelljs_1.default.exec('killall chrome');
var status = Array(max).fill(false);
var infiniteLoop = function (i) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, go_1.go)(process.argv, String(i))
                // shell.exec(`node build/go.js ${arg} ${max} ${checkAccount} ${i}`, async () => {
                // shell.exec('git pull')
            ];
            case 1:
                _a.sent();
                // shell.exec(`node build/go.js ${arg} ${max} ${checkAccount} ${i}`, async () => {
                // shell.exec('git pull')
                status[i] = false;
                process.env["pid".concat(i)] = '';
                return [2 /*return*/];
        }
    });
}); };
var _loop_1 = function (a) {
    process.env["pid".concat(a)] = '';
    if (!status[a]) {
        // console.log('go a', a)
        status[a] = true;
        infiniteLoop(a);
    }
    setInterval(function () {
        if (!status[a]) {
            status[a] = true;
            infiniteLoop(a);
        }
    }, 1000 * 60 * 5);
};
for (var a = 0; a < max; a++) {
    _loop_1(a);
}
