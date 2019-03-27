import { EventEmitter } from '@angular/core';
export declare class TextDirective {
    newValue: EventEmitter<any>;
    text: any;
    changeInput(value: string): void;
}
