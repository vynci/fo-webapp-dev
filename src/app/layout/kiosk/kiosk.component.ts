import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '../../services/helper.service';
import { SensorStreamService } from '../../services/sensorStream.service';

@Component({
    selector: 'app-kiosk',
    templateUrl: './kiosk.component.html',
    styleUrls: ['./kiosk.component.scss'],
    animations: [routerTransition()],
    providers: [HelperService, NgbModal, SensorStreamService]
})
export class KioskComponent implements OnInit {
    constructor(
        private _helperService: HelperService,
        private modalService: NgbModal,
        private _sensorStreamService: SensorStreamService
    ) { }

    private connection;
    public sensorReadings = {
        heading : 0,
        pitch : 0,
        roll : 0,
        headingAcceleration : 0,
        pitchAcceleration : 0,
        rollAcceleration : 0,
        rssi : 0
    }

    private iniateWebSockets(){
        this.connection = this._sensorStreamService.getMessages('1001').subscribe(message => {
            var tmp = message.toString();
            var buffer = tmp.split(',');
            var sensorId = buffer[0].toString();

            this.sensorReadings['roll'] = parseFloat(buffer[3]);
            this.sensorReadings['pitch'] = parseFloat(buffer[2]);
            this.sensorReadings['heading'] = parseFloat(buffer[1]);
            
            this.sensorReadings['rollAcceleration'] = parseFloat(buffer[6]);
            this.sensorReadings['pitchAcceleration'] = parseFloat(buffer[5]);
            this.sensorReadings['headingAcceleration'] = parseFloat(buffer[4]);   
            
            this.sensorReadings['rssi'] = parseFloat(buffer[7]);
        });
    }

    ngOnInit() {
        this.iniateWebSockets();
    }

	ngOnDestroy() {
        if(this.connection){
            this.connection.unsubscribe();
        }        
	}    
}
