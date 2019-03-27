import { PipeTransform } from '@angular/core';
import { Icon } from './icon';
export declare class SearchIconPipe implements PipeTransform {
    transform(value: Icon[], search: string): any;
    clean(value: string): string;
}
