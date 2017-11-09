import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '../game/card';
@Pipe({
    name: 'sortcards',
    //without this, the hand will not refresh in the view
    pure: false
})
export class SortCardsPipe implements PipeTransform {
    transform(cards: Array<Card>): Array<Card> {
        console.log('transform');
        console.log(cards);
        console.log(cards.concat);
        return cards.concat().sort(function(a,b) {

            let ret = a.color - b.color;

            if(ret !== 0) {
                return ret;
            }

            return a.value - b.value;

            
        });
    }
}
