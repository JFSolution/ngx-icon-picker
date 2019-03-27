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
            template: '<div class="icon-picker" #dialogPopup [hidden]="!show" [style.visibility]="this.hidden ? \'hidden\' : \'visible\'" [style.height.px]="ipHeight" [style.width.px]="ipWidth" [style.top.px]="top" [style.left.px]="left" [style.position]="position"><div class="arrow arrow-{{ipPosition}}" [style.top.px]="arrowTop"></div><div class="icon-search"><input type="text" class="form-control input-sm" [text] [value]="search" (newValue)="setSearch($event)" [placeholder]="ipPlaceHolder"></div><div class="icon-grid" [ngStyle]="{\'max-height.px\': ipMaxHeight}"><div *ngFor="let icon of icons | searchIcon:search"><button *ngIf="icon" class="btn btn-default" type="button" title="{{ icon.name }}" [ngClass]="{active : icon === selectedIcon}" (click)="selectIcon(icon)"><span *ngIf="icon.type === iconType.FONT_AWESEOME" class="fa fa-{{icon.id}}"></span> <span *ngIf="icon.type === iconType.BOOTSTRAP" class="glyphicon glyphicon-{{icon.id}}"></span> <span *ngIf="icon.type === iconType.FONT_AWESEOME5" class="{{icon.id}}"></span></button></div></div></div>',
            styles: ['.icon-picker *{box-sizing:border-box;margin:0;font-size:11px}.icon-picker{position:absolute;z-index:100000;top:250px;left:30px;width:230px;height:auto;border:1px solid #777;cursor:default;background-color:#fff;user-select:none}.icon-picker i{position:relative;cursor:default}.icon-picker .arrow{position:absolute;z-index:999999;width:0;height:0;border-style:solid}.icon-picker .arrow-right{top:10px;left:-20px;border-width:5px 10px;border-color:transparent #777 transparent transparent}.icon-picker .arrow-left{top:10px;left:100%;border-width:5px 10px;border-color:transparent transparent transparent #777}.icon-picker .arrow-bottom{top:-20px;left:10px;border-width:10px 5px;border-color:transparent transparent #777}.icon-picker .arrow-top{left:10px;border-width:10px 5px;border-color:#777 transparent transparent}.icon-picker div.icon-search{padding:5px}.icon-picker div.icon-grid{display:flex;overflow-y:auto;flex-direction:row;flex-wrap:wrap;padding:5px}.icon-picker div.icon-grid div{margin:2px}.icon-picker div.icon-grid div button{width:33px;padding:6px 10px}.icon-picker div.cursor-sv{position:relative;width:15px;height:15px;border-radius:50%;border:1px solid #ddd;cursor:default}.icon-picker div.cursor{position:relative;width:16px;height:16px;border-radius:50%;border:2px solid #222;cursor:default}']
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.ChangeDetectorRef,
            icon_picker_service_1.IconPickerService])
    ], IconPickerComponent);
    return IconPickerComponent;
}());
exports.IconPickerComponent = IconPickerComponent;
//# sourceMappingURL=icon-picker.component.js.map