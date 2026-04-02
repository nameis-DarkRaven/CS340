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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var dao_1 = require("./dao");
var dao = new dao_1.FollowDAO();
function test() {
    return __awaiter(this, void 0, void 0, function () {
        var i, i, item, updated, page1, page2, fpage1, fpage2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 1;
                    _a.label = 1;
                case 1:
                    if (!(i <= 25)) return [3 /*break*/, 4];
                    return [4 /*yield*/, dao.putItem({
                            follower_handle: "@FredFlintstone",
                            follower_name: "Fred Flintstone",
                            followee_handle: "@User".concat(i),
                            followee_name: "User ".concat(i),
                        })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    i = 1;
                    _a.label = 5;
                case 5:
                    if (!(i <= 25)) return [3 /*break*/, 8];
                    return [4 /*yield*/, dao.putItem({
                            follower_handle: "@Follower".concat(i),
                            follower_name: "Follower ".concat(i),
                            followee_handle: "@ClintEastwood",
                            followee_name: "Clint Eastwood",
                        })];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 5];
                case 8: return [4 /*yield*/, dao.getItem("@FredFlintstone", "@User1")];
                case 9:
                    item = _a.sent();
                    console.log(item);
                    return [4 /*yield*/, dao.updateItem("@FredFlintstone", "@User1", "Fred UPDATED", "User1 UPDATED")];
                case 10:
                    updated = _a.sent();
                    console.log(updated);
                    console.log("\n--- FOLLOWEES PAGE 1 ---");
                    return [4 /*yield*/, dao.getPageOfFollowees("@FredFlintstone", 10, undefined)];
                case 11:
                    page1 = _a.sent();
                    console.log(page1);
                    console.log("\n--- FOLLOWEES PAGE 2 ---");
                    return [4 /*yield*/, dao.getPageOfFollowees("@FredFlintstone", 10, page1.lastKey)];
                case 12:
                    page2 = _a.sent();
                    console.log(page2);
                    console.log("\n--- FOLLOWERS PAGE 1 ---");
                    return [4 /*yield*/, dao.getPageOfFollowers("@ClintEastwood", 10, undefined)];
                case 13:
                    fpage1 = _a.sent();
                    console.log(fpage1);
                    console.log("\n--- FOLLOWERS PAGE 2 ---");
                    return [4 /*yield*/, dao.getPageOfFollowers("@ClintEastwood", 10, fpage1.lastKey)];
                case 14:
                    fpage2 = _a.sent();
                    console.log(fpage2);
                    return [4 /*yield*/, dao.deleteItem("@FredFlintstone", "@User1")];
                case 15:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
test();
