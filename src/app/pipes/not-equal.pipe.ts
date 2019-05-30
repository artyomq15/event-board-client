import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'notEqual'
})
export class NotEqualPipe implements PipeTransform {
    public transform(value: any, compare: any): boolean {
        return value !== compare;
    }
}
