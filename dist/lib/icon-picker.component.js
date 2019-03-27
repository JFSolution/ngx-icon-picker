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
var icon_picker_service_1 = require("./icon-picker.service");
var icon_1 = require("./icon");
var IconPickerComponent = /** @class */ (function () {
    function IconPickerComponent(el, cdr, service) {
        this.el = el;
        this.cdr = cdr;
        this.service = service;
        this.iconType = icon_1.IconType;
        this.dialogArrowSize = 10;
        this.icons = [];
        this.search = '';
    }
    IconPickerComponent.prototype.setDialog = function (instance, elementRef, icon, ipPosition, ipHeight, ipMaxHeight, ipWidth, ipPlaceHolder, ipFallbackIcon, ipIconPack) {
        this.directiveInstance = instance;
        this.setInitialIcon(icon);
        this.directiveElementRef = elementRef;
        this.ipPosition = ipPosition;
        this.ipHeight = parseInt(ipHeight);
        this.ipMaxHeight = parseInt(ipMaxHeight);
        this.ipWidth = parseInt(ipWidth);
        if (!this.ipWidth) {
            this.ipWidth = elementRef.nativeElement.offsetWidth;
        }
        this.ipPlaceHolder = ipPlaceHolder;
        this.ipFallbackIcon = ipFallbackIcon;
        this.ipIconPack = ipIconPack;
    };
    IconPickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.icons = this.service.getIcons(this.ipIconPack);
        this.listenerMouseDown = function (event) { return _this.onMouseDown(event); };
        this.listenerResize = function () { return _this.onResize(); };
        this.openDialog(this.initialIcon);
    };
    IconPickerComponent.prototype.setInitialIcon = function (icon) {
        this.initialIcon = icon;
        this.selectedIcon = this.icons.find(function (el) { return el ? "fa fa-" + el.id === icon || "glyphicon glyphicon-" + el.id === icon || "" + el.id === icon : false; });
        if (this.selectedIcon && icon !== this.ipFallbackIcon) {
            this.search = this.selectedIcon.id;
        }
        else {
            this.search = '';
        }
    };
    IconPickerComponent.prototype.openDialog = function (icon) {
        this.setInitialIcon(icon);
        this.openIconPicker();
    };
    IconPickerComponent.prototype.setSearch = function (val) {
        this.search = val;
    };
    IconPickerComponent.prototype.selectIcon = function (icon) {
        if (icon.type === icon_1.IconType.FONT_AWESEOME) {
            this.directiveInstance.iconSelected("fa fa-" + icon.id);
        }
        else if (icon.type === icon_1.IconType.BOOTSTRAP) {
            this.directiveInstance.iconSelected("glyphicon glyphicon-" + icon.id);
        }
        else if (icon.type === icon_1.IconType.FONT_AWESEOME5) {
            this.directiveInstance.iconSelected("" + icon.id);
        }
        this.closeIconPicker();
    };
    IconPickerComponent.prototype.onMouseDown = function (event) {
        if (!this.isDescendant(this.el.nativeElement, event.target) && event.target != this.directiveElementRef.nativeElement) {
            this.closeIconPicker();
        }
    };
    IconPickerComponent.prototype.openIconPicker = function () {
        var _this = this;
        if (!this.show) {
            this.show = true;
            this.hidden = true;
            setTimeout(function () {
                _this.setDialogPosition();
                _this.hidden = false;
                _this.cdr.detectChanges();
            }, 0);
            document.addEventListener('mousedown', this.listenerMouseDown);
            window.addEventListener('resize', this.listenerResize);
        }
    };
    IconPickerComponent.prototype.closeIconPicker = function () {
        if (this.show) {
            this.show = false;
            document.removeEventListener('mousedown', this.listenerMouseDown);
            window.removeEventListener('resize', this.listenerResize);
            this.cdr.detectChanges();
        }
    };
    IconPickerComponent.prototype.onResize = function () {
        if (this.position === 'fixed') {
            this.setDialogPosition();
        }
    };
    IconPickerComponent.prototype.setDialogPosition = function () {
        var dialogHeight = this.dialogElement.nativeElement.offsetHeight;
        var node = this.directiveElementRef.nativeElement, position = 'static', transform = '';
        var parentNode = null, transformNode = null, style = null;
        while (node !== null && node.tagName !== 'HTML') {
            style = window.getComputedStyle(node);
            position = style.getPropertyValue('position');
            transform = style.getPropertyValue('transform');
            if (position !== 'static' && parentNode === null) {
                parentNode = node;
            }
            if (transform && transform !== 'none' && transformNode === null) {
                transformNode = node;
            }
            if (position === 'fixed') {
                parentNode = transformNode;
                break;
            }
            node = node.parentNode;
        }
        var boxDirective = this.createBox(this.directiveElementRef.nativeElement, (position !== 'fixed'));
        if (position !== 'fixed' || parentNode) {
            if (parentNode === null) {
                parentNode = node;
            }
            var boxParent = this.createBox(parentNode, true);
            this.top = boxDirective.top - boxParent.top;
            this.left = boxDirective.left - boxParent.left;
        }
        else {
            this.top = boxDirective.top;
            this.left = boxDirective.left;
        }
        if (position === 'fixed') {
            this.position = 'fixed';
        }
        if (this.ipPosition === 'left') {
            this.left -= this.ipWidth + this.dialogArrowSize - 2;
        }
        else if (this.ipPosition === 'top') {
            this.top -= dialogHeight + this.dialogArrowSize;
            this.arrowTop = dialogHeight - 1;
        }
        else if (this.ipPosition === 'bottom') {
            this.top += boxDirective.height + this.dialogArrowSize;
        }
        else {
            this.left += boxDirective.width + this.dialogArrowSize - 2;
        }
    };
    IconPickerComponent.prototype.isDescendant = function (parent, child) {
        var node = child.parentNode;
        while (node !== null) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    };
    IconPickerComponent.prototype.createBox = function (element, offset) {
        return {
            top: element.getBoundingClientRect().top + (offset ? window.pageYOffset : 0),
            left: element.getBoundingClientRect().left + (offset ? window.pageXOffset : 0),
            width: element.offsetWidth,
            height: element.offsetHeight
        };
    };
    __decorate([
        core_1.ViewChild('dialogPopup'),
        __metadata("design:type", Object)
    ], IconPickerComponent.prototype, "dialogElement", void 0);
    IconPickerComponent = __decorate([
        core_1.Component({
            selector: 'icon-picker',
            templateUrl: './icon-picker.component.html',
            styleUrls: ['./icon-picker.component.css']
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.ChangeDetectorRef,
            icon_picker_service_1.IconPickerService])
    ], IconPickerComponent);
    return IconPickerComponent;
}());
exports.IconPickerComponent = IconPickerComponent;
//# sourceMappingURL=icon-picker.component.js.map