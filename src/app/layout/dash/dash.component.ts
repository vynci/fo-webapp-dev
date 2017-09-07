import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SensorStreamService } from './sensorStream.service';
import { WidgetService } from '../../services/widget.service';
import { WidgetSettingService } from '../../services/widgetSetting.service';

@Component({
    selector: 'app-charts',
    templateUrl: './dash.component.html',
    styleUrls: ['./dash.component.scss'],
    animations: [routerTransition()],
    providers: [SensorStreamService, WidgetService, WidgetSettingService]
})
export class DashComponent implements OnInit {

    public messages = [];
    private connection;
    public message;

    constructor(
        private modalService: NgbModal,
        private _sensorStreamService: SensorStreamService,
        private _widgetService: WidgetService,
        private _widgetSettingService: WidgetSettingService
    ){}

    private pitchTmpData:Array<number> = [0,0,0,0,0,0,0,0,0,0];
    private rollTmpData:Array<number> = [0,0,0,0,0,0,0,0,0,0];

    public newWidget:any = {
        sensorId: '',
        dashboardId: '0',
        type: 'motion-sensor',
        description: 'default'
    }

    public newWidgetSetting:any = {
        widgetId: '',
        rollMin: -90,
        rollMax: 90,
        pitchMin: -90,
        pitchMax: 90,
        isDegrees: true,
    }    

    private intervalProcess:any = {};

    public lineChartLabels: Array<any> = ['0', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

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
                ticks: {
                    suggestedMin: -90,
                    suggestedMax: 90
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Degrees'
                }                
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Time (ms)'
                }                
            }]            

        }        
    };

    public pitchChartColor: Array<any> = [
        { // green
            backgroundColor: '#2ecc71',
            borderColor: '#2ecc71',
            pointBackgroundColor: 'gray',
            pointBorderColor: 'gray',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];

    public rollChartColor: Array<any> = [
        { // blue
            backgroundColor: '#3498db',
            borderColor: '#3498db',
            pointBackgroundColor: 'gray',
            pointBorderColor: 'gray',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];    

    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';

    public testData = [
        {
            id: '1',
            name: 'Sensor A',
            pitchChart: [
                { data: [-0.5, 0.4, -0.3, 0.2, -0.1, 0, 0.4, -0.3, 0.2, 0.1], label: 'Pitch', fill:false}
            ],
            rollChart: [
                { data: [0.5, -0.4, 0.3, -0.2, 0.1, 0, -0.4, 0.2, -0.1, 0.3], label: 'Roll', fill:false}
            ]            
        },
        {
            id: '2',
            name: 'Sensor B',
            pitchChart: [
                { data: [-0.5, 0.4, -0.3, 0.2, -0.1, 0, 0.4, -0.3, 0.2, 0.1], label: 'Pitch', fill:false}
            ],
            rollChart: [
                { data: [0.5, -0.4, 0.3, -0.2, 0.1, 0, -0.4, 0.2, -0.1, 0.3], label: 'Roll', fill:false}
            ]   
        }        
    ];

    // events
    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

    public closeResult: string;

    public open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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

    private radiansToDegrees(num: number){
        var result = num * (180 / Math.PI);
        result = parseFloat(result.toFixed(2));

        return result;
    }

	private fetchWidgets():void{
        this._widgetService.getAll()
        .subscribe(data => {
            
        });
    }  

    public createWidget():void{
        console.log(this.newWidget);
		this._widgetService.create(this.newWidget)
		.subscribe(data => {
            this._widgetSettingService.create(this.newWidgetSetting)
            .subscribe(data => {
                this.fetchWidgets();
            });            
		});          
    }

    public fetchWidgetSetting():void{
        this._widgetSettingService.getByWidgetId('123')
        .subscribe(data => {
            this.fetchWidgets();
        });        
    }  

    public updateWidgetSetting():void{
        this._widgetSettingService.update({})
        .subscribe(data => {
            this.fetchWidgets();
        });        
    }    

    public deleteWidget():void{
        var widgetId = '0';
        var widgetSettingId = '0';

		this._widgetService.delete(widgetId)
		.subscribe(data => {
            this._widgetSettingService.delete(widgetSettingId)
            .subscribe(data => {
                this.fetchWidgets();
            });            
		});    
    }

    ngOnInit() {
        this.connection = this._sensorStreamService.getMessages().subscribe(message => {
            var tmp = message.toString();
            var buffer = tmp.split(',');
            var roll = parseFloat(buffer[3]);
            var pitch = parseFloat(buffer[2]);

            this.pitchTmpData.unshift(this.radiansToDegrees(pitch));
            this.pitchTmpData.pop();

            this.rollTmpData.unshift(this.radiansToDegrees(roll));
            this.rollTmpData.pop();            

            const pitchClone = JSON.parse(JSON.stringify(this.testData[0].pitchChart));
            pitchClone[0].data = this.pitchTmpData;
            this.testData[0].pitchChart = pitchClone;
            
            const rollClone = JSON.parse(JSON.stringify(this.testData[0].rollChart));
            rollClone[0].data = this.rollTmpData;
            this.testData[0].rollChart = rollClone;             
        })        
    }

	ngOnDestroy() {
		if (this.intervalProcess) {
			clearInterval(this.intervalProcess);
        }

        if(this.connection){
            this.connection.unsubscribe();
        }        
	}
    
}
