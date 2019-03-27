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
var icon_picker_component_1 = require("./icon-picker.component");
var IconPickerDirective = /** @class */ (function () {
    function IconPickerDirective(vcRef, el, cfr) {
        this.vcRef = vcRef;
        this.el = el;
        this.cfr = cfr;
        this.ipPlaceHolder = 'Search icon...';
        this.ipPosition = 'right';
        this.ipFallbackIcon = 'fas fa-user';
        this.ipHeight = 'auto';
        this.ipMaxHeight = '200px';
        this.ipWidth = '230px';
        this.ipIconPack = ['bs', 'fa5'];
        this.iconPickerSelect = new core_1.EventEmitter(true);
        this.ignoreChanges = false;
        this.created = false;
    }
    IconPickerDirective.prototype.ngOnChanges = function (changes) {
        if (changes.iconPicker) {
            this.ignoreChanges = false;
        }
    };
    IconPickerDirective.prototype.ngOnInit = function () {
        this.iconPicker = this.iconPicker || this.ipFallbackIcon || '';
        this.iconPickerSelect.emit(this.iconPicker);
    };
    IconPickerDirective.prototype.onClick = function () {
        this.openDialog();
    };
    IconPickerDirective.prototype.openDialog = function () {
        if (!this.created) {
            this.created = true;
            var vcRef = this.vcRef;
            var compFactory = this.cfr.resolveComponentFactory(icon_picker_component_1.IconPickerComponent);
            var injector = core_1.ReflectiveInjector.fromResolvedProviders([], vcRef.parentInjector);
            var cmpRef = vcRef.createComponent(compFactory, 0, injector, []);
            cmpRef.instance.setDialog(this, this.el, this.iconPicker, this.ipPosition, this.ipHeight, this.ipMaxHeight, this.ipWidth, this.ipPlaceHolder, this.ipFallbackIcon, this.ipIconPack);
            this.dialog = cmpRef.instance;
            if (this.vcRef !== vcRef) {
                cmpRef.changeDetectorRef.detectChanges();
            }
        }
        else if (this.dialog) {
            this.dialog.openDialog(this.iconPicker);
        }
    };
    IconPickerDirective.prototype.iconSelected = function (icon) {
        this.iconPickerSelect.emit(icon);
    };
    __decorate([
        core_1.Input('iconPicker'),
        __metadata("design:type", String)
    ], IconPickerDirective.prototype, "iconPicker", void 0);
    __decorate([
        core_1.Input('ipPlaceHolder'),
        __metadata("design:type", Object)
    ], IconPickerDirective.prototype, "ipPlaceHolder", void 0);
    __decorate([
        core_1.Input('ipPosition'),
        __metadata("design:type", Object)
    ], IconPickerDirective.prototype, "ipPosition", void 0);
    __decorate([
        core_1.Input('ipFallbackIcon'),
        __metadata("design:type", Object)
    ], IconPickerDirective.prototype, "ipFallbackIcon", void 0);
    __decorate([
        core_1.Input('ipHeight'),
        __metadata("design:type", Object)
    ], IconPickerDirective.prototype, "ipHeight", void 0);
    __decorate([
        core_1.Input('ipMaxHeight'),
        __metadata("design:type", Object)
    ], IconPickerDirective.prototype, "ipMaxHeight", void 0);
    __decorate([
        core_1.Input('ipWidth'),
        __metadata("design:type", Object)
    ], IconPickerDirective.prototype, "ipWidth", void 0);
    __decorate([
        core_1.Input('ipIconPack'),
        __metadata("design:type", Object)
    ], IconPickerDirective.prototype, "ipIconPack", void 0);
    __decorate([
        core_1.Output('iconPickerSelect'),
        __metadata("design:type", Object)
    ], IconPickerDirective.prototype, "iconPickerSelect", void 0);
    IconPickerDirective = __decorate([
        core_1.Directive({
            selector: '[iconPicker]',
            host: {
                '(click)': 'onClick()'
            }
        }),
        __metadata("design:paramtypes", [core_1.ViewContainerRef,
            core_1.ElementRef,
            core_1.ComponentFactoryResolver])
    ], IconPickerDirective);
    return IconPickerDirective;
}());
exports.IconPickerDirective = IconPickerDirective;
//# sourceMappingURL=icon-picker.directive.js.map