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
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/profiles";
import "@pnp/sp/webs";
import "@pnp/sp/site-groups/web";
import "@pnp/sp/site-users/web";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/items/get-all";
import "@pnp/sp/items";
import "@pnp/sp/attachments";
var spservices = /** @class */ (function () {
    function spservices(context) {
        this.context = context;
    }
    // Add data to the list
    spservices.prototype.AddDataToList = function (item, listName) {
        return __awaiter(this, void 0, void 0, function () {
            var sp, list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sp = spfi().using(SPFx(this.context));
                        list = sp.web.lists.getByTitle(listName);
                        return [4 /*yield*/, list.items
                                .add(item)
                                .then(function () {
                                return true;
                            })
                                .catch(function (error) {
                                console.log(error);
                                return false;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // method to use pnp objects and get item by id, using item ID set from createNewItem method.
    spservices.prototype.getListItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sp, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sp = spfi().using(SPFx(this.context));
                        return [4 /*yield*/, sp.web.lists.getByTitle("UserDetails").items()];
                    case 1:
                        item = _a.sent();
                        return [2 /*return*/, item];
                }
            });
        });
    };
    // gets the list item
    spservices.prototype.GetListItemsAsync = function (listName, filterQuery) {
        return __awaiter(this, void 0, void 0, function () {
            var sp, list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sp = spfi().using(SPFx(this.context));
                        list = sp.web.lists.getByTitle(listName);
                        return [4 /*yield*/, list.items
                                .filter(filterQuery)
                                .orderBy('Id', false).top(1000)()
                                .then(function (response) {
                                return response;
                            }).catch(function (error) {
                                console.log(error);
                                return error;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    spservices.prototype.updateListItems = function (item, listName, id) {
        return __awaiter(this, void 0, void 0, function () {
            var sp, list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sp = spfi().using(SPFx(this.context));
                        list = sp.web.lists.getByTitle(listName);
                        return [4 /*yield*/, list.items.getById(id).update(item).then(function () {
                                return true;
                            }).catch(function (error) {
                                console.log(error);
                                return false;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return spservices;
}());
export default spservices;
//# sourceMappingURL=spservices.js.map