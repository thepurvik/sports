import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterLeague'
})
export class FilterLeaguePipe implements PipeTransform {

  transform(items: any[], filterLeague: any): any {
    var filterItem: any = [];
    if (!filterLeague) {
      return items;
    }
    if (items?.length > 0) {
      items.forEach(element => {
        if (element.league == filterLeague) {
          filterItem.push(element);
        }
      });
    }

    return filterItem;
  }

}
