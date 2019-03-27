"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var icon_picker_service_1 = require("./icon-picker.service");
var icon_picker_component_1 = require("./icon-picker.component");
var icon_picker_directive_1 = require("./icon-picker.directive");
var text_directive_1 = require("./text.directive");
var search_icon_pipe_1 = require("./search-icon.pipe");
var IconPickerModule = /** @class */ (function () {
    function IconPickerModule() {
    }
    IconPickerModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            providers: [
                icon_picker_service_1.IconPickerService
            ],
            declarations: [
                icon_picker_component_1.IconPickerComponent,
                icon_picker_directive_1.IconPickerDirective,
                text_directive_1.TextDirective,
                search_icon_pipe_1.SearchIconPipe
            ],
            exports: [
                icon_picker_directive_1.IconPickerDirective
            ],
            entryComponents: [
                icon_picker_component_1.IconPickerComponent
            ]
        })
    ], IconPickerModule);
    return IconPickerModule;
}());
exports.IconPickerModule = IconPickerModule;
//# sourceMappingURL=icon-picker.module.js.map