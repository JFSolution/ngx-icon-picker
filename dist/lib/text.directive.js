"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TextDirective = /** @class */ (function () {
    function TextDirective() {
        this.newValue = new core_1.EventEmitter();
    }
    TextDirective.prototype.changeInput = function (value) {
        this.newValue.emit(value);
    };
    __decorate([
        core_1.Output('newValue'),
        __metadata("design:type", Object)
    ], TextDirective.prototype, "newValue", void 0);
    __decorate([
        core_1.Input('text'),
        __metadata("design:type", Object)
    ], TextDirective.prototype, "text", void 0);
    TextDirective = __decorate([
        core_1.Directive({
            selector: '[text]',
            host: {
                '(input)': 'changeInput($event.target.value)'
            }
        })
    ], TextDirective);
    return TextDirective;
}());
exports.TextDirective = TextDirective;
//# sourceMappingURL=text.directive.js.map