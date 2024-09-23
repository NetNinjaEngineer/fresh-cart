import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'trimText',
    standalone: true
})
export class TrimTextPipe implements PipeTransform {

    transform(value: string, noOfWordsToTake: number): string {
        return value.split(' ').splice(0, noOfWordsToTake).join(' ');
    }

}
