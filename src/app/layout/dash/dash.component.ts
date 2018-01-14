import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SensorStreamService } from './sensorStream.service';
import { WidgetService } from '../../services/widget.service';
import { HelperService } from '../../services/helper.service';
import { WidgetSettingService } from '../../services/widgetSetting.service';
import { WidgetModel } from './widget-model';
import { SensorDirectory } from './sensor-directory-model';

@Component({
    selector: 'app-charts',
    templateUrl: './dash.component.html',
    styleUrls: ['./dash.component.scss'],
    animations: [routerTransition()],
    providers: [SensorStreamService, WidgetService, WidgetSettingService, HelperService]
})

export class DashComponent implements OnInit {

    public messages = [];
    private connection;
    public message;

    constructor(
        private modalService: NgbModal,
        private _sensorStreamService: SensorStreamService,
        private _widgetService: WidgetService,
        private _helperService: HelperService,
        private _widgetSettingService: WidgetSettingService
    ){}

    private pitchTmpData:Array<number> = [0,0,0,0,0,0,0,0,0,0];
    private rollTmpData:Array<number> = [0,0,0,0,0,0,0,0,0,0];
    private headingTmpData:Array<number> = [0,0,0,0,0,0,0,0,0,0];

    private prevBatteryResult:any;

    private currentWidgetId:string;
    private currentWidgeSettingtId:string;
    private widgetSensorDirectory:SensorDirectory;

    public yLabelPlaceholderLimit:number = 60000;
    public selectedInterval:any = this.yLabelPlaceholderLimit;

    public currentWidgetSetting:any = {
        widgetId: '',
        rollMin: -90,
        rollMax: 90,
        pitchMin: -90,
        pitchMax: 90,
        isDegrees: true        
    };
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

    public sensorWidgets:Array<WidgetModel> = [];    

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
                    suggestedMin: -10,
                    suggestedMax: 10
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
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];

    public rollChartColor: Array<any> = [
        { // blue
            backgroundColor: '#3498db',
            borderColor: '#3498db',
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];   
    
    public headingChartColor: Array<any> = [
        { // blue
            backgroundColor: '#f0ad4e',
            borderColor: '#f0ad4e',
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];    

    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';

    public closeResult: string;

    public open(content, id) {
        this.currentWidgetId = id;

        this._widgetSettingService.getByWidgetId(id)
        .subscribe(data => {
            this.currentWidgeSettingtId = data.data._id;
            this.currentWidgetSetting = data.data;
        }); 

        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private generateYLabel(limit:number, isLabel:boolean):any{
        var x = [];

        for(var i=0;i < limit; i++){
            if((i % 100) === 0)
            {
                if(isLabel){
                    x.push(i);    
                }else{
                    x.push(0);
                }
            }
        }
        return x;
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
            let widgets = data.data;
            let output = [];
            var tmp = {};         

            widgets.forEach((widget, idx) => {
                this._widgetSettingService.getByWidgetId(widget._id)
                .subscribe(widgetSetting => {
                    widget.pitchChart = [
                        { data: [-0.1, 0.1, -0.1, 0.1, -0.1, 0, 0.1, -0.1, 0.1, 0.1], label: 'Pitch', fill:false}
                    ];
                    widget.rollChart = [
                        { data: [0.1, -0.1, 0.1, -0.1, 0.1, 0, -0.1, 0.1, -0.1, 0.1], label: 'Roll', fill:false}
                    ];
                    widget.headingChart = [
                        { data: [0.1, -0.1, 0.1, -0.1, 0.1, 0, -0.1, 0.1, -0.1, 0.1], label: 'Roll', fill:false}
                    ];                

                    widget.pitchMax = widgetSetting.data.pitchMax;
                    widget.pitchMin = widgetSetting.data.pitchMin;
                    widget.rollMax = widgetSetting.data.rollMax;
                    widget.rollMin = widgetSetting.data.rollMin;

                    output.push(widget);

                    tmp[widget.sensorId] = idx;

                    if(idx === (widgets.length - 1)){
                        this.widgetSensorDirectory = tmp;
                        this.sensorWidgets = output;
                        this.iniateWebSockets();
                    };
                });                
            });


        });
    }  

    public onIntervalSelect(newValue) {
        this.yLabelPlaceholderLimit = newValue;
        this.connection.unsubscribe();
        this.fetchWidgets();
        this.lineChartLabels = this.generateYLabel(this.yLabelPlaceholderLimit, true);        
    }    

    public createWidget():void{
		this._widgetService.create(this.newWidget)
		.subscribe(data => {
            this.newWidgetSetting.widgetId = data.data._id;
            this._widgetSettingService.create(this.newWidgetSetting)
            .subscribe(data => {
                this.fetchWidgets();
                this.clearAddSensorWidgetForm()
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
        this._widgetSettingService.update(this.currentWidgetSetting)
        .subscribe(data => {
            this.fetchWidgets();
        });        
    }    

    public deleteWidget():void{
        var widgetId = this.currentWidgetId;
        var widgetSettingId = this.currentWidgeSettingtId;

		this._widgetService.delete(widgetId)
		.subscribe(data => {
            this.fetchWidgets();
            this._widgetSettingService.delete(widgetSettingId)
            .subscribe(data => {
                this.fetchWidgets();
            });            
		});    
    }

    public systemExecute(type) {
        console.log(type);
        this._sensorStreamService.sendMessage('reboot'); 
    }

    private clearAddSensorWidgetForm():void{
        this.newWidget =  {
            sensorId: '',
            dashboardId: '0',
            type: 'motion-sensor',
            description: 'default'
        }        
    }

    private iniateWebSockets():void{
        if(this.connection){
            this.connection.unsubscribe();
        } 

        var pitchTmpData2 = this.generateYLabel(this.yLabelPlaceholderLimit, false);
        var rollTmpData2 = this.generateYLabel(this.yLabelPlaceholderLimit, false);
        var headingTmpData2 = this.generateYLabel(this.yLabelPlaceholderLimit, false);

        this.connection = this._sensorStreamService.getMessages().subscribe(message => {
            var tmp = message.toString();
            var buffer = tmp.split(',');
            var sensorId = buffer[0].toString();

            var battery = parseFloat(buffer[4]) || 0;
            var roll = parseFloat(buffer[3]);
            var pitch = parseFloat(buffer[2]);
            var heading = parseFloat(buffer[1]);

            pitchTmpData2.unshift(pitch);
            pitchTmpData2.pop();

            rollTmpData2.unshift(roll);
            rollTmpData2.pop();

            headingTmpData2.unshift(heading);
            headingTmpData2.pop();

            this.cleanSensorWidgets();

            this.sensorWidgets[this.widgetSensorDirectory[sensorId]].battery = this.calculateBattery(battery);

            var pitchClone = JSON.parse(JSON.stringify(this.sensorWidgets[this.widgetSensorDirectory[sensorId]].pitchChart));
            pitchClone[0].data = pitchTmpData2;
            this.sensorWidgets[this.widgetSensorDirectory[sensorId]].pitchChart = pitchClone;
            
            var rollClone = JSON.parse(JSON.stringify(this.sensorWidgets[this.widgetSensorDirectory[sensorId]].rollChart));
            rollClone[0].data = rollTmpData2;
            this.sensorWidgets[this.widgetSensorDirectory[sensorId]].rollChart = rollClone;    

            const headingClone = JSON.parse(JSON.stringify(this.sensorWidgets[this.widgetSensorDirectory[sensorId]].headingChart));
            headingClone[0].data = headingTmpData2;
            this.sensorWidgets[this.widgetSensorDirectory[sensorId]].headingChart = headingClone;               
        });        
    }

    public calculateAcceleration(final:any, initial:any):any{
        var result;

        result = ((final - initial)/1).toFixed(2);
        result = Math.abs(result);

        return result;
    }

    private calculateBattery(battery:any){
        var result;
        var maxVoltage = 12;
        var minVoltage = 10;

        if(battery <= maxVoltage){
            result = ( (battery - minVoltage) / ( maxVoltage - minVoltage) ) * 100;
            result = Math.floor(result);
        }else{
            result = 100;
        }

        return result;
    }

    private cleanSensorWidgets(){
        this.sensorWidgets[0].pitchChart[0].data = [0,0,0,0,0,0,0,0,0,0];
        this.sensorWidgets[0].rollChart[0].data = [0,0,0,0,0,0,0,0,0,0];
        this.sensorWidgets[0].headingChart[0].data = [0,0,0,0,0,0,0,0,0,0];
        if(this.sensorWidgets[1]){
            this.sensorWidgets[1].pitchChart[0].data = [0,0,0,0,0,0,0,0,0,0];
            this.sensorWidgets[1].rollChart[0].data = [0,0,0,0,0,0,0,0,0,0];   
            this.sensorWidgets[1].headingChart[0].data = [0,0,0,0,0,0,0,0,0,0];    
        }    
    }    

    public parseData(data:any):any{
        let output = 0;

        if(data[0].data[0]){
            output = data[0].data[0];            
        }

        return output;
    }

    public getBatteryStyle(data:any){
        let color;

        if(data > 50 && data <= 100){
            color = 'green';
        }else if(data > 25 && data <= 50){
            color = 'orange';
        }else{
            color = 'red';
        } 

        return color;
    }

    public getBatteryIndicator(data:any){
        let level = 'fa fa-battery-1';

        if(data > 90 && data <= 100){
            level = 'fa fa-battery-4';
        }else if(data > 60 && data <= 89){
            level = 'fa fa-battery-3';
        }else if(data > 30 && data <= 59){
            level = 'fa fa-battery-2';
        }else if(data > 5 && data <= 29){
            level = 'fa fa-battery-1';
        }else{
            level = 'fa fa-battery-0';
        }         

        return level;
    }    

    public getStyle(data:any, type:string) {
        let color = "";
        let currentValue = data[type + 'Chart'][0].data[0];
        let threshold = {
            pitchMax : data.pitchMax,
            pitchMin : data.pitchMin,
            rollMax : data.rollMax,
            rollMin : data.rollMin
        }

        if(currentValue >= threshold[type + 'Max'] || currentValue <= threshold[type + 'Min']){
            color = "red";
        }else if(currentValue >= (threshold[type + 'Max'] - (threshold[type + 'Max'] * .20)) || currentValue <= (threshold[type + 'Min'] - threshold[type + 'Min'] * .20)){
            color = "orange";
        }

        return color;
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
        this.fetchWidgets();
        this.lineChartLabels = this.generateYLabel(this.yLabelPlaceholderLimit, true);
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
