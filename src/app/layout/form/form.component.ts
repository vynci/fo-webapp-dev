import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '../../services/helper.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    animations: [routerTransition()],
    providers: [HelperService, NgbModal]
})
export class FormComponent implements OnInit {
    constructor(
        private _helperService: HelperService,
        private modalService: NgbModal,
    ) { }

    public dateFilterType:string;    
    public dateModel:any;
    public timeModel = {hour: 13, minute: 30};
    private dateNow = new Date();    
    public isSuccess:boolean = false;
    public isResult:boolean = false;

    public isSoftwareUpdateSuccess:boolean = false;
    public isSoftwareUpdateResult:boolean = false;

    public softwareUpdateStatus:string = 'Update';

    public wifi: any = {
        oldssid : 'first-ocean-AP',
        oldpass : 'password1',
        newssid : '',
        newpass : ''
    };

    public closeResult: string;

    public systemExecute(type) {
        console.log(type);
        this._helperService.systemReboot('reboot')
        .subscribe(data => {
            console.log(data);
        });        
    }

    public saveWifiCreds() {
        console.log(this.wifi);
        this.isResult = true;
        this.isSuccess = true;
        setTimeout(()=>{
            this.isResult = false;
        },3000);        
        // this._helperService.setWifi(this.wifi)
        // .subscribe(data => {
        //     this.isResult = true;
        //     this.isSuccess = true;
        //     setTimeout(()=>{
        //         this.isResult = false;
        //     },3000);
        // });                 
    }    

    public softwareUpdate() {
        this.softwareUpdateStatus = 'Downloading...';
        this._helperService.softwareUpdate('online')
        .subscribe(data => {
            this.isSoftwareUpdateResult = true;
            this.isSoftwareUpdateSuccess = true;
            this.softwareUpdateStatus = 'Update';
            setTimeout(()=>{
                this.isSoftwareUpdateResult = false;
                this.isSoftwareUpdateSuccess = false;
            },3000);
        });               
    }       

    public syncTime(){
        var timeData = this.dateFilter.to;
        console.log(timeData);

        this._helperService.setTime(timeData)
        .subscribe(data => {
            console.log(data);
            this.isResult = true;
            this.isSuccess = true;
            setTimeout(()=>{
                this.isResult = false;
            },3000);            
        });        
    } 

    public open(content, id) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    public dateFilter:any = {
        from: this.dateNow,
        to: this.dateNow
    };

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

        this.syncTime();
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

    }
}
