import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SensorStreamService } from './sensorStream.service';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
    animations: [routerTransition()],
    providers: [SensorStreamService]
})
export class ChartsComponent implements OnInit {

    public messages = [];
    private connection;
    public message;

    constructor(
        private modalService: NgbModal,
        private sensorStreamService: SensorStreamService
    ){}

    private pitchTmpData:Array<number> = [0,0,0,0,0,0,0,0,0,0];
    private rollTmpData:Array<number> = [0,0,0,0,0,0,0,0,0,0];

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
                    suggestedMin: -3,
                    suggestedMax: 3
                }
            }]
        }        
    };

    public lineChartColors: Array<any> = [
        { // grey
            backgroundColor: 'white',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
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

    private getRandomArbitrary(min:any, max:any): any {
        return Math.random() * (max - min) + min;
    }

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

    ngOnInit() {
        // this.intervalProcess = setInterval(() => {
        //     this.data.unshift(this.data[9]);
        //     this.data.pop();

        //     const clone = JSON.parse(JSON.stringify(this.testData[0].pitchChart));
        //     clone[0].data = this.data;
        //     this.testData[0].pitchChart = clone;

        // }, 250);

        this.connection = this.sensorStreamService.getMessages().subscribe(message => {
            var tmp = message.toString();
            var buffer = tmp.split(',');
            var roll = parseFloat(buffer[2]);
            var pitch = parseFloat(buffer[1]);

            this.pitchTmpData.unshift(pitch);
            this.pitchTmpData.pop();

            this.rollTmpData.unshift(roll);
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
	}
    
}
