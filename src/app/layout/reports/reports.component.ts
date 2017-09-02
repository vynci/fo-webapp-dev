import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-tables',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss'],
    animations: [routerTransition()]
})
export class ReportsComponent implements OnInit {
    public defaultPagination: number;
    public advancedPagination: number;
    public paginationSize: number;
    public disabledPagination: number;
    public isDisabled: boolean;

    public isReportGenerated: boolean = false;

    constructor() {
        this.defaultPagination = 1;
        this.advancedPagination = 1;
        this.paginationSize = 1;
        this.disabledPagination = 1;
        this.isDisabled = true;        
     }

    public generateReport(): void {
        console.log('generate!');
        this.isReportGenerated = true;
    }
    ngOnInit() { }
}
