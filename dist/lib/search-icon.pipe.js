"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SearchIconPipe = /** @class */ (function () {
    function SearchIconPipe() {
    }
    SearchIconPipe.prototype.transform = function (value, search) {
        var _this = this;
        if (!search) {
            return value;
        }
        var searchValue = this.clean(search);
        return value.filter(function (icon) {
            var keep = false;
            if (icon.name) {
                keep = keep || _this.clean(icon.name).includes(searchValue);
            }
            if (icon.id) {
                keep = keep || _this.clean(icon.id).includes(searchValue);
            }
            if (icon.filter) {
                keep = keep || icon.filter.some(function (value) { return _this.clean(value).includes(searchValue); });
            }
            if (icon.aliases) {
                keep = keep || icon.aliases.some(function (value) { return _this.clean(value).includes(searchValue); });
            }
            return keep;
        });
    };
    SearchIconPipe.prototype.clean = function (value) {
        return value.trim().toLowerCase();
    };
    SearchIconPipe = __decorate([
        core_1.Pipe({
            name: 'searchIcon'
        })
    ], SearchIconPipe);
    return SearchIconPipe;
}());
exports.SearchIconPipe = SearchIconPipe;
//# sourceMappingURL=search-icon.pipe.js.map