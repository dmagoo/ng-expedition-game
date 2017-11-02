import { Pipe, PipeTransform } from '@angular/core';
import { Color, getColorName } from '../game/card';
@Pipe({
    name: 'cardcolor'
})
export class CardColorPipe implements PipeTransform {
    transform(color: Color): string {
        return getColorName(color);
    }
}
