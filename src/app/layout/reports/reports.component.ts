import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SensorLogService } from '../../services/sensorLog.service';
import { HelperService } from '../../services/helper.service';
import { WidgetService } from '../../services/widget.service';
import { JSONToCSV } from '../../services/JSONToCSV.service';
import { WidgetModel } from './widget-model';

@Component({
    selector: 'app-tables',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss'],
    animations: [routerTransition()],
    providers: [SensorLogService,WidgetService,JSONToCSV,HelperService]
})
export class ReportsComponent implements OnInit {
    public defaultPagination: number;
    public currentPage: number;
    public paginationSize: number;
    public disabledPagination: number;
    public isDisabled: boolean;
    public isLoading:boolean = false;
    public isShowGraph:boolean = false;
    public showGraphButtonLabel:string = 'Show Graph';
    public csvButtonLabel:string = 'CSV';

    public timeModel = {hour: 13, minute: 30};
    public dateModel:any;

    public meridian = true;
    public isReportGenerated: boolean = false;
    public closeResult: string;    

    public sensorLogs:Array<Object> = [];
    public widgets:Array<WidgetModel> = [];
    private dateNow = new Date();

    public dateFilter:any = {
        from: this.dateNow,
        to: this.dateNow
    };

    private globalFilter:any;
    public tableRowLimit:number = 10;
    public collectionSize:number;

    public currentSensorId:string = 'null';
    public currentWidgetName:string = 'null';

    public dateFilterType:string;

    constructor(
        private modalService: NgbModal,
        private _sensorLogService: SensorLogService,
        private _widgetService: WidgetService,
        private _helperService: HelperService,
        private _jsonToCSVService : JSONToCSV
    ) {
        this.defaultPagination = 1;
        this.currentPage = 1;
        this.paginationSize = 1;
        this.disabledPagination = 1;
        this.isDisabled = true;        
    }

    public lineChartLabels: Array<any>;

    public lineChartColor: Array<any> = [
        { // blue
            backgroundColor: '#3498db',
            borderColor: '#3498db',
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // green
            backgroundColor: '#2ecc71',
            borderColor: '#2ecc71',
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }      

    ]; 

    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';
    
    public chartData = [
        { data: [0.1, -0.1, 0.1, -0.1, 0.1, 0, -0.1, 0.1, -0.1, 0.1], label: 'Roll', fill:false},
        { data: [0.1, -0.1, 0.1, -0.1, 0.1, 0, -0.1, 0.1, -0.1, 0.1], label: 'Pitch', fill:false}
        
    ]    

    public lineChartOptions: any = {
        responsive: true,
        animation: {
            duration: 100
        },
        legend: {
            display: false
        },        
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Degrees'
                }                
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Date - Time'
                }                
            }]            

        }        
    };

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
            var d = new Date();
            var n = d.getTimezoneOffset();
            n = n / 60
            date.setHours(date.getHours() + n)
        }

        var date:any = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + this.formatAMPM(date);
        return date;
    }   

    public downloadCSV():void{
        this.csvButtonLabel = 'Loading...';
        this._sensorLogService.get(this.globalFilter, 0, 25000)
        .subscribe(data => {
            var now = new Date();
            var filename = now.toISOString();
            this.csvButtonLabel = 'CSV';
            this._jsonToCSVService.Convert(data.data, 'report-' + filename + '.csv');
        });        
    }

    public hideGraph():void{
        this.isShowGraph = false;      
    }  

    public showGraph():void{
        this.isShowGraph = false;
        this.showGraphButtonLabel = 'Loading...';
        this._sensorLogService.get(this.globalFilter, 0, 10000)
        .subscribe(data => {
            console.log(data);
            this.isShowGraph = true;
            this.showGraphButtonLabel = 'Show Graph';
            this.lineChartLabels = [];
            this.chartData[0].data = [];
            this.chartData[1].data = [];
            data.data.forEach((obj) => {
                this.chartData[0].data.push(obj.roll);
                this.chartData[1].data.push(obj.pitch);
                this.lineChartLabels.push(this.formatDate(obj.createdDate));                            
            });
        });        
    }    

    public onPageChange(event:number):void{
        var skip = (event - 1) * this.tableRowLimit

        this._sensorLogService.get(this.globalFilter, skip, this.tableRowLimit)
        .subscribe(data => {
            this.sensorLogs = data.data;
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

	private fetchWidgets():void{
        this._widgetService.getAll()
        .subscribe(data => {
            this.widgets = data.data;
        });
    }  

	private fetchLogs():void{
        this.isLoading = true;
        this.isShowGraph = false;

        this.globalFilter = {
            createdDate : {
                $lte : this.dateFilter.to,
                $gte : this.dateFilter.from,
            },
            sensorId : this.currentSensorId
        }

        this._sensorLogService.get(this.globalFilter, 0, this.tableRowLimit)
        .subscribe(data => {
            this.currentPage = 1;
            this.sensorLogs = data.data;
        });

        this._sensorLogService.count(this.globalFilter)
        .subscribe(data => {
            this.collectionSize = data.data;
            this.isLoading = false;
        });

        this.widgets.forEach((widget) => {
            if(widget.sensorId === this.currentSensorId){
                this.currentWidgetName = widget.name
            }
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

    private syncTime(){
        var data = new Date();
        var timeData;
        timeData = data.toString();
        data = timeData.split(' ');
        timeData = data[0] + ' ' + data[1] + ' ' + data[2] + ' ' + data[4] + ' UTC ' + data[3];        

        console.log(timeData);

        this._helperService.setTime(timeData)
        .subscribe(data => {
            console.log(data);
        });        
    }

    ngOnInit() { 
        this.initiateDateToFilter();
        this.fetchWidgets();
    }
}
