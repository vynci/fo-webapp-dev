webpackJsonp([8],{

/***/ "../../../../../src/app/layout/form/form-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__form_component__ = __webpack_require__("../../../../../src/app/layout/form/form.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__form_component__["a" /* FormComponent */] }
];
var FormRoutingModule = (function () {
    function FormRoutingModule() {
    }
    return FormRoutingModule;
}());
FormRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]]
    })
], FormRoutingModule);

//# sourceMappingURL=form-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/layout/form/form.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"isSuccess && isResult\" class=\"alert alert-success\">\n    <strong>Success!</strong> Applied settings.\n</div>\n<div *ngIf=\"!isSuccess && isResult\" class=\"alert alert-danger\">\n    <strong>Failed!</strong> Something went wrong.\n</div>\n<div *ngIf=\"isSoftwareUpdateSuccess && isSoftwareUpdateResult\" class=\"alert alert-success\">\n    <strong>Success!</strong> Software update completed. Please reboot for changes to take effect.\n</div>\n\n<div class=\"row\">\n    <div class=\"col col-sm-4\">\n        <div class=\"card mb-3\">\n            <div class=\"card-header\">\n                System Reboot                    \n            </div>\n            <div class=\"card-block\">\n                <button type=\"button\" (click)=\"open(rebootWidgetContent)\" class=\"btn btn-warning btn-block\">Reboot</button> \n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"col col-sm-4\">\n        <div class=\"card mb-3\">\n            <div class=\"card-header\">\n                Date - Time                   \n            </div>\n            <div class=\"card-block\">\n                <button type=\"button\" class=\"btn btn-outline-primary btn-block\"  (click)=\"openDateFilterModal('To'); open(content)\">{{formatDate(dateFilter.to)}}</button>             \n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"col col-sm-4\">\n        <div class=\"card mb-3\">\n            <div class=\"card-header\">\n                WIFI AP Settings                    \n            </div>\n            <div class=\"card-block\">\n                <form role=\"form\">\n                    <fieldset class=\"form-group\">\n                        <label>SSID</label>\n                        <input name=\"ssid\" [(ngModel)]=\"wifi.newssid\" class=\"form-control\" placeholder=\"first-ocean-AP\">\n                    </fieldset>\n                    <fieldset class=\"form-group\">\n                        <label>Password</label>\n                        <input name=\"password\" [(ngModel)]=\"wifi.newpass\" class=\"form-control\" placeholder=\"password1\">\n                    </fieldset>                            \n                </form>\n                <button type=\"button\" (click)=\"saveWifiCreds()\" class=\"btn btn-primary btn-block\">Save</button>                     \n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"col col-sm-4\">\n        <div class=\"card mb-3\">\n            <div class=\"card-header\">\n                Software v1.3                  \n            </div>\n            <div class=\"card-block\">\n                <select class=\"form-control\">\n                    <option>Via USB Flashdrive</option>                    \n                    <option>Via Internet Update</option>\n                </select>                \n                <br>\n                <button type=\"button\" (click)=\"softwareUpdate()\" class=\"btn btn-info btn-block\">{{softwareUpdateStatus}}</button> \n            </div>\n        </div>\n    </div>\n</div>\n\n<ng-template #rebootWidgetContent let-c=\"close\" let-d=\"dismiss\">\n    <div class=\"modal-header\">\n        <h4 class=\"modal-title\">Reboot Module</h4>\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body\">\n        <p>Do you want to continue?</p>                               \n    </div>\n    <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-warning\" (click)=\"systemExecute(); c('Close click')\">Reboot</button>\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"c('Close click')\">Cancel</button>\n    </div>\n</ng-template>\n\n<ng-template #content let-c=\"close\" let-d=\"dismiss\">\n    <div class=\"modal-header\">\n        <h4 class=\"modal-title\">System Time Settings</h4>\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body\">\n        <h5>Date</h5>\n        <div class=\"input-group\">\n            <input class=\"form-control\" placeholder=\"yyyy-mm-dd\"\n                name=\"dp\" [(ngModel)]=\"dateModel\" ngbDatepicker #d1=\"ngbDatepicker\">\n            <div class=\"input-group-addon\" (click)=\"d1.toggle()\" >\n                <span class=\"fa fa-calendar\"></span>\n            </div>\n        </div>\n        <br>\n        <h5>Time</h5>\n        <ngb-timepicker [(ngModel)]=\"timeModel\" [meridian]=\"meridian\"></ngb-timepicker>\n        \n    </div>\n    <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"applyDateFilter(); c('Close click')\">Apply</button>\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"c('Close click')\">Cancel</button>\n    </div>\n</ng-template>"

/***/ }),

/***/ "../../../../../src/app/layout/form/form.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/form/form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router_animations__ = __webpack_require__("../../../../../src/app/router.animations.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_helper_service__ = __webpack_require__("../../../../../src/app/services/helper.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FormComponent = (function () {
    function FormComponent(_helperService, modalService) {
        this._helperService = _helperService;
        this.modalService = modalService;
        this.timeModel = { hour: 13, minute: 30 };
        this.dateNow = new Date();
        this.isSuccess = false;
        this.isResult = false;
        this.isSoftwareUpdateSuccess = false;
        this.isSoftwareUpdateResult = false;
        this.softwareUpdateStatus = 'Update';
        this.wifi = {
            oldssid: 'first-ocean-AP',
            oldpass: 'password1',
            newssid: '',
            newpass: ''
        };
        this.dateFilter = {
            from: this.dateNow,
            to: this.dateNow
        };
    }
    FormComponent.prototype.systemExecute = function (type) {
        console.log(type);
        this._helperService.systemReboot('reboot')
            .subscribe(function (data) {
            console.log(data);
        });
    };
    FormComponent.prototype.saveWifiCreds = function () {
        var _this = this;
        console.log(this.wifi);
        this.isResult = true;
        this.isSuccess = true;
        setTimeout(function () {
            _this.isResult = false;
        }, 3000);
        // this._helperService.setWifi(this.wifi)
        // .subscribe(data => {
        //     this.isResult = true;
        //     this.isSuccess = true;
        //     setTimeout(()=>{
        //         this.isResult = false;
        //     },3000);
        // });                 
    };
    FormComponent.prototype.softwareUpdate = function () {
        var _this = this;
        this.softwareUpdateStatus = 'Downloading...';
        this._helperService.softwareUpdate('online')
            .subscribe(function (data) {
            _this.isSoftwareUpdateResult = true;
            _this.isSoftwareUpdateSuccess = true;
            _this.softwareUpdateStatus = 'Update';
            setTimeout(function () {
                _this.isSoftwareUpdateResult = false;
                _this.isSoftwareUpdateSuccess = false;
            }, 3000);
        });
    };
    FormComponent.prototype.syncTime = function () {
        var _this = this;
        var timeData = this.dateFilter.to;
        console.log(timeData);
        this._helperService.setTime(timeData)
            .subscribe(function (data) {
            console.log(data);
            _this.isResult = true;
            _this.isSuccess = true;
            setTimeout(function () {
                _this.isResult = false;
            }, 3000);
        });
    };
    FormComponent.prototype.open = function (content, id) {
        var _this = this;
        this.modalService.open(content).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    FormComponent.prototype.formatDate = function (date) {
        if (typeof date !== 'object') {
            date = new Date(date);
            var d = new Date();
            var n = d.getTimezoneOffset();
            n = n / 60;
            date.setHours(date.getHours() + n);
        }
        var date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + this.formatAMPM(date);
        return date;
    };
    FormComponent.prototype.openDateFilterModal = function (type) {
        this.dateFilterType = type;
        this.dateModel = {
            year: this.dateFilter[type.toLowerCase()].getFullYear(),
            month: this.dateFilter[type.toLowerCase()].getMonth() + 1,
            day: this.dateFilter[type.toLowerCase()].getDate()
        };
        this.timeModel = {
            hour: this.dateFilter[type.toLowerCase()].getHours(),
            minute: this.dateFilter[type.toLowerCase()].getMinutes(),
        };
    };
    FormComponent.prototype.applyDateFilter = function () {
        var tmpDate = new Date(this.dateModel.year + ' ' + this.dateModel.month + ' ' + this.dateModel.day + ' ' + this.timeModel.hour + ':' + this.timeModel.minute);
        if (this.dateFilterType === 'From') {
            this.dateFilter.from = tmpDate;
        }
        else {
            this.dateFilter.to = tmpDate;
        }
        this.syncTime();
    };
    FormComponent.prototype.formatAMPM = function (date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    };
    FormComponent.prototype.getDismissReason = function (reason) {
        if (reason === __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["b" /* ModalDismissReasons */].ESC) {
            return 'by pressing ESC';
        }
        else if (reason === __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["b" /* ModalDismissReasons */].BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    FormComponent.prototype.ngOnInit = function () {
    };
    return FormComponent;
}());
FormComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-form',
        template: __webpack_require__("../../../../../src/app/layout/form/form.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/form/form.component.scss")],
        animations: [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__router_animations__["a" /* routerTransition */])()],
        providers: [__WEBPACK_IMPORTED_MODULE_3__services_helper_service__["a" /* HelperService */], __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["c" /* NgbModal */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_helper_service__["a" /* HelperService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_helper_service__["a" /* HelperService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["c" /* NgbModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["c" /* NgbModal */]) === "function" && _b || Object])
], FormComponent);

var _a, _b;
//# sourceMappingURL=form.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/form/form.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__form_routing_module__ = __webpack_require__("../../../../../src/app/layout/form/form-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__form_component__ = __webpack_require__("../../../../../src/app/layout/form/form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared__ = __webpack_require__("../../../../../src/app/shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormModule", function() { return FormModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var FormModule = (function () {
    function FormModule() {
    }
    return FormModule;
}());
FormModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["h" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_2__form_routing_module__["a" /* FormRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_4__shared__["b" /* PageHeaderModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_3__form_component__["a" /* FormComponent */]]
    })
], FormModule);

//# sourceMappingURL=form.module.js.map

/***/ })

});
//# sourceMappingURL=8.chunk.js.map