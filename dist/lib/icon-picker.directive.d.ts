import { OnInit, OnChanges, EventEmitter, ElementRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
export declare class IconPickerDirective implements OnInit, OnChanges {
    private vcRef;
    private el;
    private cfr;
    iconPicker: string;
    ipPlaceHolder: string;
    ipPosition: string;
    ipFallbackIcon: string;
    ipHeight: string;
    ipMaxHeight: string;
    ipWidth: string;
    ipIconPack: string[];
    iconPickerSelect: EventEmitter<string>;
    private dialog;
    private created;
    private ignoreChanges;
    constructor(vcRef: ViewContainerRef, el: ElementRef, cfr: ComponentFactoryResolver);
    ngOnChanges(changes: any): void;
    ngOnInit(): void;
    onClick(): void;
    openDialog(): void;
    iconSelected(icon: string): void;
}
