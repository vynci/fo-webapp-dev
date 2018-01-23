import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '../../services/helper.service';
import { SensorStreamService } from '../../services/sensorStream.service';
import { WidgetModel } from '../../models/widget-model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()],
    providers: [HelperService, NgbModal, SensorStreamService]
})
export class DashboardComponent implements OnInit {
    constructor(
        private _helperService: HelperService,
        private modalService: NgbModal,
        private _sensorStreamService: SensorStreamService
    ) { }

    private connection;
    private currentGraphSetting:string;

    public newWidget:any = {
        sensorId: '',
        dashboardId: '0',
        type: 'motion-sensor',
        description: 'default'
    }

    public sensorWidget:any = {
        rollChart : [
            {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], fill:false}
        ],
        pitchChart : [
            {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], fill:false}
        ],
        headingChart : [
            {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], fill:false}
        ],
        pitchAccelerationChart : [
            {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], fill:false}
        ],
        rollAccelerationChart : [
            {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], fill:false}
        ],
        headingAccelerationChart : [
            {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], fill:false}
        ]                                        
    };

    public sensorMaxAverage:any = {
        roll : {
            max : 0,
            average : 0
        },
        pitch : {
            max : 0,
            average : 0
        },
        heading : {
            max : 0,
            average : 0
        },
        rollAcceleration : {
            max : 0,
            average : 0
        },
        pitchAcceleration : {
            max : 0,
            average : 0
        },
        headingAcceleration : {
            max : 0,
            average : 0
        }                        
    }

    public sensorReadings = {
        heading : 0,
        pitch : 0,
        roll : 0,
        headingAcceleration : 0,
        pitchAcceleration : 0,
        rollAcceleration : 0,
        rssi : 0
    }

    public closeResult: string;
    public lineChartType: string = 'line';
    public lineChartLegend: boolean = true;
    public lineChartLabels: Array<any> = ['0', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
    public selectedInterval:any = 1000;
    public selectedDashboard:any = 1001;

    public widgetModalTitle:string;

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

    public lineChartAccelerationOptions: any = {
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
                    suggestedMin: -180,
                    suggestedMax: 180
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
    
    public graphSettings: any = {
        pitch : {
            yaxis: this.lineChartLabels,
            lineChart: this.lineChartOptions,
            interval : 1000
        },
        roll : {
            yaxis: this.lineChartLabels,
            lineChart: this.lineChartOptions,
            interval : 1000
        },
        heading : {
            yaxis: this.lineChartLabels,
            lineChart: this.lineChartOptions,
            interval : 1000
        },
        pitchAcceleration : {
            yaxis: this.lineChartLabels,
            lineChart: this.lineChartAccelerationOptions,
            interval : 1000
        },
        rollAcceleration : {
            yaxis: this.lineChartLabels,
            lineChart: this.lineChartAccelerationOptions,
            interval : 1000
        },
        headingAcceleration : {
            yaxis: this.lineChartLabels,
            lineChart: this.lineChartAccelerationOptions,
            interval : 1000
        }
    }

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
    
    public open(content, id, title:string, type:string) {
        if(type === 'edit'){
            this.widgetModalTitle = title;
            this.currentGraphSetting = title;
            this.selectedInterval = this.graphSettings[title].interval;
        }

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

    private generateYLabel(limit:number, isLabel:boolean):any{
        var x = [];

        for(var i=0;i < limit; i++){
            if((i % 100) === 0)
            {
                if(isLabel){
                    x.push(i);    
                }else{
                    x.push(null);
                }
            }
        }
        return x;
    }    

    public saveGraphSetting() {
        this.graphSettings[this.currentGraphSetting].interval = this.selectedInterval
        this.graphSettings[this.currentGraphSetting].yaxis = this.generateYLabel(this.selectedInterval, true);
        this.connection.unsubscribe();
        this.iniateWebSockets();        
    }

    public onIntervalSelect(newValue) {
        this.selectedInterval = newValue;
    }       

    public onDashboardSelect(newValue) {
        this.selectedDashboard = newValue;
    }    

    private calculate(set:any): any{
        let values = set.map(Math.abs);
        let sum = values.reduce((previous, current) => current += previous);
        let average = sum / values.length;
        let maximum = Math.max.apply(null, values);

        return {
            max : maximum,
            average : average.toFixed(2)
        };
    }

    private processMaxAverage() {
        this.sensorMaxAverage = {
            roll : this.calculate(this.sensorWidget.rollChart[0].data),
            pitch : this.calculate(this.sensorWidget.pitchChart[0].data),
            heading : this.calculate(this.sensorWidget.headingChart[0].data),
            rollAcceleration : this.calculate(this.sensorWidget.rollAccelerationChart[0].data),
            pitchAcceleration : this.calculate(this.sensorWidget.pitchAccelerationChart[0].data),
            headingAcceleration : this.calculate(this.sensorWidget.headingAccelerationChart[0].data)                        
        }
    }

    private iniateWebSockets(){
        var pitchTmpData2 = this.generateYLabel(this.graphSettings.pitch.interval, false);
        var rollTmpData2 = this.generateYLabel(this.graphSettings.roll.interval, false);
        var headingTmpData2 = this.generateYLabel(this.graphSettings.heading.interval, false);

        var pitchAccelerationTmpData2 = this.generateYLabel(this.graphSettings.pitchAcceleration.interval, false);;
        var rollAccelerationTmpData2 = this.generateYLabel(this.graphSettings.rollAcceleration.interval, false);;
        var headingAccelerationTmpData2 = this.generateYLabel(this.graphSettings.headingAcceleration.interval, false);;        

        this.connection = this._sensorStreamService.getMessages('1001').subscribe(message => {
            var tmp = message.toString();
            var buffer = tmp.split(',');
            var sensorId = buffer[0].toString();

            this.sensorReadings['roll'] = parseFloat(buffer[3]) || this.sensorReadings['roll'];
            this.sensorReadings['pitch'] = parseFloat(buffer[2]) || this.sensorReadings['pitch'];
            this.sensorReadings['heading'] = parseFloat(buffer[1]) || this.sensorReadings['heading'];
            
            this.sensorReadings['rollAcceleration'] = parseFloat(buffer[6]);
            this.sensorReadings['pitchAcceleration'] = parseFloat(buffer[5]);
            this.sensorReadings['headingAcceleration'] = parseFloat(buffer[4]);   
            
            this.sensorReadings['rssi'] = parseFloat(buffer[7]);

            pitchTmpData2.unshift(this.sensorReadings['pitch']);
            pitchTmpData2.pop();

            rollTmpData2.unshift(this.sensorReadings['roll']);
            rollTmpData2.pop();

            headingTmpData2.unshift(this.sensorReadings['heading']);
            headingTmpData2.pop();

            pitchAccelerationTmpData2.unshift(this.sensorReadings['pitchAcceleration']);
            pitchAccelerationTmpData2.pop();

            rollAccelerationTmpData2.unshift(this.sensorReadings['rollAcceleration']);
            rollAccelerationTmpData2.pop();            

            headingAccelerationTmpData2.unshift(this.sensorReadings['headingAcceleration']);
            headingAccelerationTmpData2.pop();            

            var cloneData = JSON.parse(JSON.stringify(this.sensorWidget.pitchChart));
            cloneData[0].data = pitchTmpData2;
            this.sensorWidget.pitchChart = cloneData;

            cloneData = JSON.parse(JSON.stringify(this.sensorWidget.rollChart));
            cloneData[0].data = rollTmpData2;
            this.sensorWidget.rollChart = cloneData;

            cloneData = JSON.parse(JSON.stringify(this.sensorWidget.headingChart));
            cloneData[0].data = headingTmpData2;
            this.sensorWidget.headingChart = cloneData;            

            cloneData = JSON.parse(JSON.stringify(this.sensorWidget.pitchAccelerationChart));
            cloneData[0].data = pitchAccelerationTmpData2;
            this.sensorWidget.pitchAccelerationChart = cloneData;             

            cloneData = JSON.parse(JSON.stringify(this.sensorWidget.rollAccelerationChart));
            cloneData[0].data = rollAccelerationTmpData2;
            this.sensorWidget.rollAccelerationChart = cloneData;            

            cloneData = JSON.parse(JSON.stringify(this.sensorWidget.headingAccelerationChart));
            cloneData[0].data = headingAccelerationTmpData2;
            this.sensorWidget.headingAccelerationChart = cloneData;              

            this.processMaxAverage();
        });
    }

    ngOnInit() {
        this.iniateWebSockets();
    }
}
