webpackJsonp([1],{

/***/ "../../../../../src/app/layout/reports/reports-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reports_component__ = __webpack_require__("../../../../../src/app/layout/reports/reports.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportsRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__reports_component__["a" /* ReportsComponent */] }
];
var ReportsRoutingModule = (function () {
    function ReportsRoutingModule() {
    }
    return ReportsRoutingModule;
}());
ReportsRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]]
    })
], ReportsRoutingModule);

//# sourceMappingURL=reports-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/layout/reports/reports.component.html":
/***/ (function(module, exports) {

module.exports = "<h3>Reports</h3><br>\n<div class=\"row\">\n    <div class=\"col-sm-3\">\n        <form class=\"form-inline mb-4\">\n            <div class=\"form-group\">\n                <div class=\"input-group\">\n                    <label for=\"\" style=\"margin-right: 5px;\"><b>From:</b></label>\n                    <button type=\"button\" class=\"btn btn-outline-primary btn-block\"  (click)=\"openDateFilterModal('From'); open(content)\">{{formatDate(dateFilter.from)}}</button>\n                </div>                \n            </div>\n        </form>\n    </div>\n    <div class=\"col-sm-3\">\n        <form class=\"form-inline mb-4\">\n            <div class=\"form-group\">\n                <div class=\"input-group\">\n                    <label for=\"\" style=\"margin-right: 5px;\"><b>To:</b></label>\n                    <button type=\"button\" class=\"btn btn-outline-primary btn-block\"  (click)=\"openDateFilterModal('To'); open(content)\">{{formatDate(dateFilter.to)}}</button>\n                </div>   \n            </div>\n        </form>         \n    </div>\n    <div class=\"col-sm-3\">\n        <div class=\"form-group\">\n            <select class=\"form-control\" [(ngModel)]=\"currentSensorId\">\n                <option value=\"null\" selected disabled>Choose Sensor</option>\n                <option value=\"{{widget.sensorId}}\" *ngFor=\"let widget of widgets\">{{widget.name}} - {{widget.sensorId}}</option>\n            </select>\n        </div>\n    </div>        \n    <div class=\"col-sm-3\">\n        <div class=\"form-group\">\n            <button type=\"button\" [disabled]=\"currentSensorId === 'null'\" class=\"btn btn-success btn-block\" (click)=\"generateReport()\">Generate</button>\n        </div>             \n    </div>        \n</div>    \n\n<br>\n<div *ngIf=\"!isReportGenerated\" class=\"row\" style=\"margin-top: 250px;\">\n    <div class=\"col col-lg-12\">\n        <p style=\"text-align:center;\">Empty Report. <b>Choose</b> a sensor, and click <b>Generate</b> button to create one.</p>\n    </div>\n</div>\n\n<div *ngIf=\"isReportGenerated\" class=\"row\">\n    <div class=\"col col-lg-12\">\n        <div class=\"card mb-3\">\n            <div class=\"card-header\">\n                <div class=\"row\">\n                    <div class=\"col col-sm-6\">\n                        Report for {{currentWidgetName}}\n                    </div>\n                    <div class=\"col col-sm-6\" style=\"text-align:right;\">\n                        <!-- <button type=\"button\" class=\"btn btn-sm btn-outline-danger\">PDF</button> -->\n                        <button type=\"button\" [disabled]=\"sensorLogs == 0\" (click)=\"downloadCSV()\" class=\"btn btn-sm btn-outline-warning\">{{csvButtonLabel}}</button>\n                    </div>\n                </div>                \n            </div>\n            <div class=\"card-block table-responsive\">\n                <div style=\"text-align:center;\" *ngIf=\"sensorLogs != 0 && !isLoading\">\n                    <button type=\"button\" *ngIf=\"!isShowGraph\" (click)=\"showGraph()\" class=\"btn btn-primary\">{{showGraphButtonLabel}}</button>\n                    <button type=\"button\" *ngIf=\"isShowGraph\" (click)=\"hideGraph()\" class=\"btn btn-primary\">Hide Graph</button>\n                </div>\n\n                <div *ngIf=\"isShowGraph\">\n                    <canvas baseChart height=\"90\" [datasets]=\"chartData\" [labels]=\"lineChartLabels\" [options]=\"lineChartOptions\" [colors]=\"lineChartColor\" [legend]=\"lineChartLegend\" [chartType]=\"lineChartType\" (chartHover)=\"chartHovered($event)\">\n                    </canvas>                    \n                </div>\n\n                <div *ngIf=\"sensorLogs != 0 && !isLoading\" class=\"row\">\n                    <div class=\"col col-sm-9\"></div>                    \n                    <div class=\"col col-sm-3\">\n                        <label for=\"\"><b>Rows per page</b></label>\n                        <select class=\"form-control\" [(ngModel)]=\"tableRowLimit\" (ngModelChange)=\"generateReport()\">\n                            <option value=\"10\">10</option>\n                            <option value=\"15\">15</option>\n                            <option value=\"25\">25</option>\n                            <option value=\"50\">50</option>\n                            <option value=\"100\">100</option>\n                        </select>        \n                    </div>\n                </div>  \n                <br>              \n                <div>\n                    <p *ngIf=\"sensorLogs == 0 && !isLoading\" style=\"text-align:center;\">No Results Found. Please try again with other sensors or date range.</p>\n                    <p *ngIf=\"isLoading\" style=\"text-align:center;\">Loading...</p>\n                </div>\n                <div *ngIf=\"sensorLogs != 0 && !isLoading\">\n                    <table class=\"table table-bordered table-hover table-striped\">\n                        <thead>\n                        <tr>\n                            <th>Date</th>\n                            <th style=\"color:gray\">Heading</th>\n                            <th style=\"color:#2ecc71\">Pitch</th>\n                            <th style=\"color:#3498db\">Roll</th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                            <tr *ngFor=\"let log of sensorLogs\">\n                                <td>{{formatDate(log.createdDate)}}</td>\n                                <td>{{log.heading}}°</td>\n                                <td>{{log.pitch}}°</td>\n                                <td>{{log.roll}}°</td>\n                            </tr>                                                                                                       \n                        </tbody>\n                    </table>\n                    <ngb-pagination *ngIf=\"sensorLogs != 0\" [collectionSize]=\"collectionSize\" [(page)]=\"currentPage\" (pageChange)=\"onPageChange($event)\" [pageSize]=\"tableRowLimit\" [maxSize]=\"5\" [rotate]=\"true\" [boundaryLinks]=\"true\"></ngb-pagination>\n                    <span>Total Results: <b>{{collectionSize || 0}}</b></span>                    \n                </div>\n            </div>\n        </div>        \n    </div>\n</div>\n\n<!-- modal templates -->\n\n<ng-template #content let-c=\"close\" let-d=\"dismiss\">\n    <div class=\"modal-header\">\n        <h4 class=\"modal-title\">{{dateFilterType}}</h4>\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body\">\n        <h5>Date</h5>\n        <div class=\"input-group\">\n            <input class=\"form-control\" placeholder=\"yyyy-mm-dd\"\n                name=\"dp\" [(ngModel)]=\"dateModel\" ngbDatepicker #d1=\"ngbDatepicker\">\n            <div class=\"input-group-addon\" (click)=\"d1.toggle()\" >\n                <span class=\"fa fa-calendar\"></span>\n            </div>\n        </div>\n        <br>\n        <h5>Time</h5>\n        <ngb-timepicker [(ngModel)]=\"timeModel\" [meridian]=\"meridian\"></ngb-timepicker>\n        \n    </div>\n    <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"applyDateFilter(); c('Close click')\">Apply</button>\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"applyDateFilter(); c('Close click')\">Cancel</button>\n    </div>\n</ng-template>\n\n\n"

/***/ }),

/***/ "../../../../../src/app/layout/reports/reports.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "tr {\n  font-size: 0.9em; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/reports/reports.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router_animations__ = __webpack_require__("../../../../../src/app/router.animations.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_sensorLog_service__ = __webpack_require__("../../../../../src/app/services/sensorLog.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_helper_service__ = __webpack_require__("../../../../../src/app/services/helper.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_widget_service__ = __webpack_require__("../../../../../src/app/services/widget.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_JSONToCSV_service__ = __webpack_require__("../../../../../src/app/services/JSONToCSV.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ReportsComponent = (function () {
    function ReportsComponent(modalService, _sensorLogService, _widgetService, _helperService, _jsonToCSVService) {
        this.modalService = modalService;
        this._sensorLogService = _sensorLogService;
        this._widgetService = _widgetService;
        this._helperService = _helperService;
        this._jsonToCSVService = _jsonToCSVService;
        this.isLoading = false;
        this.isShowGraph = false;
        this.showGraphButtonLabel = 'Show Graph';
        this.csvButtonLabel = 'CSV';
        this.timeModel = { hour: 13, minute: 30 };
        this.meridian = true;
        this.isReportGenerated = false;
        this.sensorLogs = [];
        this.widgets = [];
        this.dateNow = new Date();
        this.dateFilter = {
            from: this.dateNow,
            to: this.dateNow
        };
        this.tableRowLimit = 10;
        this.currentSensorId = 'null';
        this.currentWidgetName = 'null';
        this.lineChartColor = [
            {
                backgroundColor: '#3498db',
                borderColor: '#3498db',
                pointBackgroundColor: 'transparent',
                pointBorderColor: 'transparent',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            {
                backgroundColor: '#2ecc71',
                borderColor: '#2ecc71',
                pointBackgroundColor: 'transparent',
                pointBorderColor: 'transparent',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        this.chartData = [
            { data: [0.1, -0.1, 0.1, -0.1, 0.1, 0, -0.1, 0.1, -0.1, 0.1], label: 'Roll', fill: false },
            { data: [0.1, -0.1, 0.1, -0.1, 0.1, 0, -0.1, 0.1, -0.1, 0.1], label: 'Pitch', fill: false }
        ];
        this.lineChartOptions = {
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
        this.defaultPagination = 1;
        this.currentPage = 1;
        this.paginationSize = 1;
        this.disabledPagination = 1;
        this.isDisabled = true;
    }
    ReportsComponent.prototype.generateReport = function () {
        this.isReportGenerated = true;
        this.fetchLogs();
    };
    ReportsComponent.prototype.open = function (content) {
        var _this = this;
        this.modalService.open(content).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    ReportsComponent.prototype.openDateFilterModal = function (type) {
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
    ReportsComponent.prototype.applyDateFilter = function () {
        var tmpDate = new Date(this.dateModel.year + ' ' + this.dateModel.month + ' ' + this.dateModel.day + ' ' + this.timeModel.hour + ':' + this.timeModel.minute);
        if (this.dateFilterType === 'From') {
            this.dateFilter.from = tmpDate;
        }
        else {
            this.dateFilter.to = tmpDate;
        }
    };
    ReportsComponent.prototype.formatDate = function (date) {
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
    ReportsComponent.prototype.downloadCSV = function () {
        var _this = this;
        this.csvButtonLabel = 'Loading...';
        this._sensorLogService.get(this.globalFilter, 0, 25000)
            .subscribe(function (data) {
            var now = new Date();
            var filename = now.toISOString();
            _this.csvButtonLabel = 'CSV';
            _this._jsonToCSVService.Convert(data.data, 'report-' + filename + '.csv');
        });
    };
    ReportsComponent.prototype.hideGraph = function () {
        this.isShowGraph = false;
    };
    ReportsComponent.prototype.showGraph = function () {
        var _this = this;
        this.isShowGraph = false;
        this.showGraphButtonLabel = 'Loading...';
        this._sensorLogService.get(this.globalFilter, 0, 10000)
            .subscribe(function (data) {
            console.log(data);
            _this.isShowGraph = true;
            _this.showGraphButtonLabel = 'Show Graph';
            _this.lineChartLabels = [];
            _this.chartData[0].data = [];
            _this.chartData[1].data = [];
            data.data.forEach(function (obj) {
                _this.chartData[0].data.push(obj.roll);
                _this.chartData[1].data.push(obj.pitch);
                _this.lineChartLabels.push(_this.formatDate(obj.createdDate));
            });
        });
    };
    ReportsComponent.prototype.onPageChange = function (event) {
        var _this = this;
        var skip = (event - 1) * this.tableRowLimit;
        this._sensorLogService.get(this.globalFilter, skip, this.tableRowLimit)
            .subscribe(function (data) {
            _this.sensorLogs = data.data;
        });
    };
    ReportsComponent.prototype.getDismissReason = function (reason) {
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
    ReportsComponent.prototype.fetchWidgets = function () {
        var _this = this;
        this._widgetService.getAll()
            .subscribe(function (data) {
            _this.widgets = data.data;
        });
    };
    ReportsComponent.prototype.fetchLogs = function () {
        var _this = this;
        this.isLoading = true;
        this.isShowGraph = false;
        this.globalFilter = {
            createdDate: {
                $lte: this.dateFilter.to,
                $gte: this.dateFilter.from,
            },
            sensorId: this.currentSensorId
        };
        this._sensorLogService.get(this.globalFilter, 0, this.tableRowLimit)
            .subscribe(function (data) {
            _this.currentPage = 1;
            _this.sensorLogs = data.data;
        });
        this._sensorLogService.count(this.globalFilter)
            .subscribe(function (data) {
            _this.collectionSize = data.data;
            _this.isLoading = false;
        });
        this.widgets.forEach(function (widget) {
            if (widget.sensorId === _this.currentSensorId) {
                _this.currentWidgetName = widget.name;
            }
        });
    };
    ReportsComponent.prototype.formatAMPM = function (date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    };
    ReportsComponent.prototype.initiateDateToFilter = function () {
        var now = new Date();
        now.setHours(23);
        now.setMinutes(59);
        this.dateFilter.to = now;
        this.dateNow.setHours(0);
        this.dateNow.setMinutes(0);
        this.dateFilter.from = this.dateNow;
    };
    ReportsComponent.prototype.syncTime = function () {
        var data = new Date();
        var timeData;
        timeData = data.toString();
        data = timeData.split(' ');
        timeData = data[0] + ' ' + data[1] + ' ' + data[2] + ' ' + data[4] + ' UTC ' + data[3];
        console.log(timeData);
        this._helperService.setTime(timeData)
            .subscribe(function (data) {
            console.log(data);
        });
    };
    ReportsComponent.prototype.ngOnInit = function () {
        this.initiateDateToFilter();
        this.fetchWidgets();
    };
    return ReportsComponent;
}());
ReportsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-tables',
        template: __webpack_require__("../../../../../src/app/layout/reports/reports.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/reports/reports.component.scss")],
        animations: [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__router_animations__["a" /* routerTransition */])()],
        providers: [__WEBPACK_IMPORTED_MODULE_3__services_sensorLog_service__["a" /* SensorLogService */], __WEBPACK_IMPORTED_MODULE_5__services_widget_service__["a" /* WidgetService */], __WEBPACK_IMPORTED_MODULE_6__services_JSONToCSV_service__["a" /* JSONToCSV */], __WEBPACK_IMPORTED_MODULE_4__services_helper_service__["a" /* HelperService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["c" /* NgbModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["c" /* NgbModal */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_sensorLog_service__["a" /* SensorLogService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_sensorLog_service__["a" /* SensorLogService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__services_widget_service__["a" /* WidgetService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_widget_service__["a" /* WidgetService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_helper_service__["a" /* HelperService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_helper_service__["a" /* HelperService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__services_JSONToCSV_service__["a" /* JSONToCSV */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_JSONToCSV_service__["a" /* JSONToCSV */]) === "function" && _e || Object])
], ReportsComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=reports.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/reports/reports.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_charts__ = __webpack_require__("../../../../ng2-charts/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__reports_component__ = __webpack_require__("../../../../../src/app/layout/reports/reports.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__reports_routing_module__ = __webpack_require__("../../../../../src/app/layout/reports/reports-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared__ = __webpack_require__("../../../../../src/app/shared/index.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportsModule", function() { return ReportsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var ReportsModule = (function () {
    function ReportsModule() {
    }
    return ReportsModule;
}());
ReportsModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["h" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_6__reports_routing_module__["a" /* ReportsRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_7__shared__["b" /* PageHeaderModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4_ng2_charts__["ChartsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot()
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_5__reports_component__["a" /* ReportsComponent */]]
    })
], ReportsModule);

//# sourceMappingURL=reports.module.js.map

/***/ }),

/***/ "../../../../../src/app/services/JSONToCSV.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JSONToCSV; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var JSONToCSV = (function () {
    function JSONToCSV() {
    }
    JSONToCSV.prototype.contains = function (data, subData) {
        var string = data;
        var substring = subData;
        return string.indexOf(substring) !== -1;
    };
    JSONToCSV.prototype.AddValue = function (Row, Value) {
        var Comma = ',';
        if (Row === '')
            Comma = '';
        return Row + Comma + Value;
    };
    JSONToCSV.prototype.GetHeader = function (Item) {
        var Row = '';
        for (var Key in Item) {
            Row = this.AddValue(Row, Key);
        }
        return Row + '\r\n';
    };
    JSONToCSV.prototype.GetRow = function (Item) {
        var Row = '';
        for (var Key in Item) {
            var tmp = Item[Key];
            if (tmp === '' || tmp === null) {
                tmp = 'n/a';
            }
            if (this.contains(tmp.toString(), ';')) {
                tmp = tmp.replace(/;/g, "-");
            }
            Row = this.AddValue(Row, tmp);
        }
        return Row + '\r\n';
    };
    JSONToCSV.prototype.GetPropCount = function (Item) {
        return Object.keys(Item).length;
    };
    JSONToCSV.prototype.Convert = function (Data, Filename) {
        var CSV = '';
        var ColumnsObject = null;
        for (var _i = 0, Data_1 = Data; _i < Data_1.length; _i++) {
            var Item = Data_1[_i];
            if ((ColumnsObject == null) || (this.GetPropCount(Item) > this.GetPropCount(ColumnsObject))) {
                ColumnsObject = Item;
            }
            CSV = CSV + this.GetRow(Item);
        }
        CSV = this.GetHeader(ColumnsObject) + CSV;
        var CSVBlob = new Blob([CSV], { type: 'text/csv' });
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(CSVBlob, Filename);
        }
        else {
            // window.open(URL.createObjectURL(CSVBlob));
            var url = window.URL.createObjectURL(CSVBlob);
            var Anchor = document.createElement('a');
            Anchor.setAttribute('style', 'display:none;');
            document.body.appendChild(Anchor);
            Anchor.href = url;
            Anchor.download = Filename;
            Anchor.click();
        }
    };
    return JSONToCSV;
}());
JSONToCSV = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], JSONToCSV);

//# sourceMappingURL=JSONToCSV.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/sensorLog.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__env_config__ = __webpack_require__("../../../../../src/app/services/env.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SensorLogService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SensorLogService = (function () {
    function SensorLogService(http) {
        this.http = http;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
        this.endpoint = __WEBPACK_IMPORTED_MODULE_2__env_config__["a" /* Config */];
        this.url = this.endpoint + 'sensor-log';
        this.options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: this.headers });
    }
    SensorLogService.prototype.get = function (data, skip, limit) {
        var filter = JSON.stringify(data);
        var search = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* URLSearchParams */]('filter=' + filter);
        search.append('limit', limit.toString());
        search.append('skip', skip.toString());
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: this.headers, search: search });
        return this.http.get(this.url, options)
            .map(function (response) { return response.json(); });
    };
    SensorLogService.prototype.getAll = function () {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: this.headers });
        return this.http.get(this.url, options)
            .map(function (response) { return response.json(); });
    };
    SensorLogService.prototype.count = function (data) {
        var filter = JSON.stringify(data);
        var search = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* URLSearchParams */]('filter=' + filter);
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: this.headers, search: search });
        return this.http.get(this.url + '-count', options)
            .map(function (response) { return response.json(); });
    };
    SensorLogService.prototype.create = function (data) {
        var body = data;
        return this.http.post(this.url, JSON.stringify(body), { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    SensorLogService.prototype.update = function (data) {
        var body = data;
        var url = this.url + '/' + body._id;
        return this.http.put(url, JSON.stringify(body), { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    SensorLogService.prototype.delete = function (id) {
        var url = this.url + '/' + id;
        return this.http.delete(url, { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    return SensorLogService;
}());
SensorLogService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], SensorLogService);

var _a;
//# sourceMappingURL=sensorLog.service.js.map

/***/ })

});
//# sourceMappingURL=1.chunk.js.map