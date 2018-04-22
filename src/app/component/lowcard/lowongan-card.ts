import {Component, Input, OnInit, ViewEncapsulation, EventEmitter, ViewChild} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { MatPaginator } from '@angular/material';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'lowcard-list',
    templateUrl: './lowongan-card.html',
    styleUrls: ['./lowongan-card.scss']
})
export class LowcardComponent implements OnInit {

    @Input() Lowker: EventEmitter<any[]>;
    @Input() filter : EventEmitter<string>;
    constructor() {}
    ngOnInit() {}

}
