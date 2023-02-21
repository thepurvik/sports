import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    
    if(!items) return [];

    if(!searchText) return items;

    return this.searchItems(items, searchText.toLowerCase());
   }

   private searchItems(items :any[], searchText: any): any[] {
     let results: any = [];
      items.forEach(it => {
        if (it?.team1_name?.toLowerCase().includes(searchText) || it?.team2_name?.toLowerCase().includes(searchText) ) {
            results.push(it);
        }
      });
      return results;
   }

}
