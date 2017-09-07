import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SensorLogService } from '../../services/sensorLog.service';
import { WidgetService } from '../../services/widget.service';

@Component({
    selector: 'app-tables',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss'],
    animations: [routerTransition()],
    providers: [SensorLogService,WidgetService]
})
export class ReportsComponent implements OnInit {
    public defaultPagination: number;
    public currentPage: number;
    public paginationSize: number;
    public disabledPagination: number;
    public isDisabled: boolean;

    public timeModel = {hour: 13, minute: 30};
    public dateModel:any;

    public meridian = true;
    public isReportGenerated: boolean = false;
    public closeResult: string;    

    public sensorLogs:Array<Object> = [];
    private dateNow = new Date();

    public dateFilter:any = {
        from: this.dateNow,
        to: this.dateNow
    };

    private globalFilter:any;
    public tableRowLimit:number = 10;
    public collectionSize:number;

    public currentSensorId:string = "1001";

    public dateFilterType:string;

    constructor(
        private modalService: NgbModal,
        private _sensorLogService: SensorLogService,
        private _widgetService: WidgetService
    ) {
        this.defaultPagination = 1;
        this.currentPage = 1;
        this.paginationSize = 1;
        this.disabledPagination = 1;
        this.isDisabled = true;        
     }

    public generateReport(): void {
        this.isReportGenerated = true;
        this.fetchLogs();
    }
    
    public open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    public openDateFilterModal(type:string):void{
        this.dateFilterType = type;
        this.dateModel = {
            year: this.dateFilter[type.toLowerCase()].getFullYear(), 
            month: this.dateFilter[type.toLowerCase()].getMonth() + 1, 
            day: this.dateFilter[type.toLowerCase()].getDate()
        };

        this.timeModel = {
            hour: this.dateFilter[type.toLowerCase()].getHours(),
            minute: this.dateFilter[type.toLowerCase()].getMinutes(),
        }
    }

    public applyDateFilter():void{
        var tmpDate = new Date(this.dateModel.year + ' ' + this.dateModel.month + ' ' + this.dateModel.day + ' ' + this.timeModel.hour + ':' + this.timeModel.minute );

        if(this.dateFilterType === 'From'){            
            this.dateFilter.from = tmpDate;                
        }else{
            this.dateFilter.to = tmpDate;
        }
    }    

    public formatDate(date:any):string{
        if(typeof date !== 'object' ){
            date = new Date(date);
        }

        var date:any = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + this.formatAMPM(date);
        return date;
    }   

    public downloadCSV():void{
        console.log('download CSV!');
    }

    public onPageChange(event:number):void{
        var skip = (event - 1) * this.tableRowLimit

        this._sensorLogService.getAll(this.globalFilter, skip, this.tableRowLimit)
        .subscribe(data => {
            this.sensorLogs = data.data;
            console.log(this.sensorLogs);
        });        
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }
    
	private fetchLogs():void{
        this.globalFilter = {
            createdDate : {
                $lte : this.dateFilter.to,
                $gte : this.dateFilter.from,
            },
            sensorId : this.currentSensorId
        }

        this._sensorLogService.getAll(this.globalFilter, 0, this.tableRowLimit)
        .subscribe(data => {
            this.currentPage = 1;
            this.sensorLogs = data.data;
        });

        this._sensorLogService.count(this.globalFilter)
        .subscribe(data => {
            this.collectionSize = data.data;
        });        
    }
    
    private formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    } 
    
    private initiateDateToFilter(){
        var now = new Date();
        now.setHours(23);
        now.setMinutes(59);        
        this.dateFilter.to = now;

        this.dateNow.setHours(0);
        this.dateNow.setMinutes(0);
        this.dateFilter.from = this.dateNow;
    }

    ngOnInit() { 
        this.initiateDateToFilter();
    }
}
