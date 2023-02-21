import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})

export class TimeFormat {
    timeBrawls(data:any){
        var dateFix = moment(data, 'MM-DD-YYYY').format('MMM D, y');
        var time = data.substring(data.indexOf(',') + 1);
        return(dateFix+','+time);
    };
    timeBrawlsTransaction(data:any){
        var dateFix = moment(data, 'YYYY-MM-DD').format('MMM D, y');
        var time = data.substring(data.indexOf(' ') + 1);        
        return(dateFix+','+time);
    }
}