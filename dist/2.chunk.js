webpackJsonp([2],{

/***/ "../../../../../src/app/layout/dash/dash-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dash_component__ = __webpack_require__("../../../../../src/app/layout/dash/dash.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__dash_component__["a" /* DashComponent */] }
];
var DashRoutingModule = (function () {
    function DashRoutingModule() {
    }
    return DashRoutingModule;
}());
DashRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]]
    })
], DashRoutingModule);

//# sourceMappingURL=dash-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/layout/dash/dash.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n    <div class=\"row\">\n        <div class=\"col col-sm-3 add-widget-container\" style=\"text-align:left;\">\n            <div class=\"row\">\n                <div class=\"col col-sm-2\" style=\"padding-top: 5px;\">\n                    <span>Period:</span>\n                </div>\n                <div class=\"col col-sm-10\">\n                    <select class=\"form-control\" [ngModel]=\"selectedInterval\" (ngModelChange)=\"onIntervalSelect($event)\" name=\"sel2\">\n                        <option [value]=\"1000\">1 Second</option>                    \n                        <option [value]=\"60000\">1 Minute</option>\n                        <option [value]=\"120000\">2 Minutes</option>\n                        <option [value]=\"180000\">3 Minutes</option>\n                        <option [value]=\"240000\">4 Minutes</option>\n                        <option [value]=\"300000\">5 Minutes</option>\n                    </select> \n                </div>                \n            </div>\n        </div>        \n        <div class=\"col col-sm-3 add-widget-container\"></div>\n        <div class=\"col col-sm-6 add-widget-container\">\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"open(content)\"><i class=\"fa fa-plus\"></i> Add Widget</button>            \n        </div>\n    </div>\n    <div *ngIf=\"sensorWidgets.length == 0\" class=\"row\">\n        <div class=\"col col-sm-12\" style=\"padding-top:150px;\">\n            <p style=\"text-align:center;\">You currently have no widgets. Click <b>Add Widget</b> button to create one.</p>\n        </div>\n    </div>\n    <div class=\"row\" *ngFor=\"let sensor of sensorWidgets\">\n        <div class=\"col col-sm-12\">\n            <div class=\"card mb-3\">\n                <div class=\"card-header\">\n                    <div class=\"row\">\n                        <div class=\"col col-sm-6\">\n                            {{sensor.name}} ({{sensor.sensorId}}) \n                            <span>\n                                <i [ngClass]=\"getBatteryIndicator(sensor.battery)\" [style.color]=\"getBatteryStyle(sensor.battery)\" style=\"margin-left:10px;\"> \n                                    {{sensor.battery || 0}}%\n                                </i>\n                            </span>\n                        </div>\n                        <div class=\"col col-sm-6\" style=\"text-align:right;\">\n                            <button type=\"button\" class=\"btn btn-sm btn-outline-warning\" (click)=\"open(rebootWidgetContent, sensor._id)\"><i class=\"fa fa-power-off\"></i></button>                            \n                            <button type=\"button\" class=\"btn btn-sm btn-outline-info\" (click)=\"open(editWidgetContent, sensor._id)\"><i class=\"fa fa-cog\"></i></button>\n                            <button type=\"button\" class=\"btn btn-sm btn-outline-danger\" (click)=\"open(deleteWidgetContent, sensor._id)\"><i class=\"fa fa-trash\"></i></button>\n                        </div>\n                    </div>                    \n                </div>\n                <div class=\"card-block\">\n                    <div class=\"row\">\n                        <div class=\"col col-sm-6\">\n                            <div class=\"label-graph\">\n                                <div class=\"row\">\n                                    <div class=\"col col-sm-6\" style=\"text-align:right\">\n                                        <b>Roll</b>: <span [style.color]=\"getStyle(sensor, 'roll')\">{{sensor.rollChart[0].data[0] || '0'}}°</span>\n                                    </div>\n                                    <div class=\"col col-sm-6\" style=\"text-align:left\">\n                                        <b>Acceleration</b>: <span>{{calculateAcceleration(sensor.rollChart[0].data[0], sensor.rollChart[0].data[9])}}°/s<sup>2</sup></span>\n                                    </div>\n                                </div>\n                            </div>\n                            <canvas baseChart height=\"90\" [datasets]=\"sensor.rollChart\" [labels]=\"lineChartLabels\" [options]=\"lineChartOptions\" [colors]=\"rollChartColor\" [legend]=\"lineChartLegend\" [chartType]=\"lineChartType\" (chartHover)=\"chartHovered($event)\" (chartClick)=\"chartClicked($event)\">\n                            </canvas>\n                            <br>\n                            <div class=\"label-graph\">\n                                <div class=\"row\">\n                                    <div class=\"col col-sm-6\" style=\"text-align:right\">\n                                        <b>Pitch</b>: <span [style.color]=\"getStyle(sensor, 'pitch')\">{{sensor.pitchChart[0].data[0] || '0'}}°</span>\n                                    </div>\n                                    <div class=\"col col-sm-6\" style=\"text-align:left\">\n                                        <b>Acceleration</b>: <span>{{calculateAcceleration(sensor.pitchChart[0].data[0], sensor.pitchChart[0].data[9])}}°/s<sup>2</sup></span>\n                                    </div>\n                                </div>                            \n                            </div>\n                            <canvas baseChart height=\"90\" [datasets]=\"sensor.pitchChart\" [labels]=\"lineChartLabels\" [options]=\"lineChartOptions\" [colors]=\"pitchChartColor\" [legend]=\"lineChartLegend\" [chartType]=\"lineChartType\" (chartHover)=\"chartHovered($event)\" (chartClick)=\"chartClicked($event)\">\n                            </canvas>\n                            <br>\n                            <div class=\"label-graph\">\n                                <div class=\"row\">\n                                    <div class=\"col col-sm-6\" style=\"text-align:right\">\n                                        <b>Heading</b>: <span [style.color]=\"getStyle(sensor, 'heading')\">{{sensor.headingChart[0].data[0] || '0'}}°</span>\n                                    </div>\n                                    <div class=\"col col-sm-6\" style=\"text-align:left\">\n                                        <b>Acceleration</b>: <span>{{calculateAcceleration(sensor.headingChart[0].data[0], sensor.headingChart[0].data[9])}}°/s<sup>2</sup></span>\n                                    </div>\n                                </div>                                 \n                            </div>\n                            <canvas baseChart height=\"90\" [datasets]=\"sensor.headingChart\" [labels]=\"lineChartLabels\" [options]=\"lineChartOptions\" [colors]=\"headingChartColor\" [legend]=\"lineChartLegend\" [chartType]=\"lineChartType\" (chartHover)=\"chartHovered($event)\" (chartClick)=\"chartClicked($event)\">\n                            </canvas>                                                                                      \n                        </div>\n                        <div class=\"col col-sm-6\" style=\"text-align:center;\">\n                            <geometry-cube texture=\"/assets/textures/crate.gif\"\n                            [size]=\"200\"\n                            [rotationSpeedX]=\"sensor.rollChart[0]?.data[0]\"\n                            [rotationSpeedY]=\"sensor.headingChart[0]?.data[0]\"\n                            [rotationSpeedZ]=\"sensor.pitchChart[0]?.data[0]\"\n                            [cameraZ]=\"400\"\n                            [fieldOfView]=\"70\"\n                            [nearClipping]=\"1\"\n                            [farClipping]=\"1000\"></geometry-cube>\n                        </div>                    \n                    </div>                    \n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- modal templates -->\n\n<ng-template #content let-c=\"close\" let-d=\"dismiss\">\n    <div class=\"modal-header\">\n        <h4 class=\"modal-title\">Add Sensor Widget</h4>\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body\">\n        <form role=\"form\">\n            <fieldset class=\"form-group\">\n                <label>ID</label>\n                <input class=\"form-control\" placeholder=\"ex: 1234-5678-90\" [(ngModel)]=\"newWidget.sensorId\" name=\"sensorId\" >\n            </fieldset>\n            <fieldset class=\"form-group\">\n                <label>Name</label>\n                <input class=\"form-control\" placeholder=\"ex: Sensor A\" [(ngModel)]=\"newWidget.name\" name=\"name\" >\n            </fieldset>                            \n        </form>                                \n    </div>\n    <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"createWidget(); c('Close click')\">Save</button>\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"c('Close click')\">Cancel</button>\n    </div>\n</ng-template>\n\n<ng-template #editWidgetContent let-c=\"close\" let-d=\"dismiss\">\n    <div class=\"modal-header\">\n        <h4 class=\"modal-title\">Widget Settings</h4>\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body\">\n        <h5>Treshold Indicator Values</h5>\n        <br>\n        <div class=\"row\">\n            <div class=\"col col-sm-6\">\n                <form role=\"form\">\n                    <fieldset class=\"form-group\">\n                        <label>Roll (min)</label>\n                        <input type=\"number\" [(ngModel)]=\"currentWidgetSetting.rollMin\" name=\"rollMin\" max=\"180\" min=\"-180\" class=\"form-control\" placeholder=\"0\">\n                    </fieldset>\n                    <fieldset class=\"form-group\">\n                        <label>Pitch (min)</label>\n                        <input type=\"number\" [(ngModel)]=\"currentWidgetSetting.pitchMin\" name=\"pitchMin\" max=\"180\" min=\"-180\" class=\"form-control\" placeholder=\"0\">\n                    </fieldset>                            \n                </form> \n            </div>  \n            <div class=\"col col-sm-6\">\n                <form role=\"form\">\n                    <fieldset class=\"form-group\">\n                        <label>Roll (max)</label>\n                        <input type=\"number\" [(ngModel)]=\"currentWidgetSetting.rollMax\" name=\"rollMax\" max=\"180\" min=\"-180\" class=\"form-control\" placeholder=\"0\">\n                    </fieldset>\n                    <fieldset class=\"form-group\">\n                        <label>Pitch (max)</label>\n                        <input type=\"number\" [(ngModel)]=\"currentWidgetSetting.pitchMax\" name=\"pitchMax\" max=\"180\" min=\"-180\" class=\"form-control\" placeholder=\"0\">\n                    </fieldset>                            \n                </form> \n            </div>  \n        </div>\n                               \n    </div>\n    <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"updateWidgetSetting(); c('Close click')\">Save</button>\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"updateWidgetSetting(); c('Close click')\">Cancel</button>\n    </div>\n</ng-template> \n\n<ng-template #deleteWidgetContent let-c=\"close\" let-d=\"dismiss\">\n    <div class=\"modal-header\">\n        <h4 class=\"modal-title\">Delete Widget</h4>\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body\">\n        <p>Do you want to continue?</p>                               \n    </div>\n    <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-danger\" (click)=\"deleteWidget(); c('Close click')\">Delete</button>\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"c('Close click')\">Cancel</button>\n    </div>\n</ng-template>\n\n<ng-template #rebootWidgetContent let-c=\"close\" let-d=\"dismiss\">\n    <div class=\"modal-header\">\n        <h4 class=\"modal-title\">Reboot Module</h4>\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body\">\n        <p>Do you want to continue?</p>                               \n    </div>\n    <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-warning\" (click)=\"systemExecute('reboot'); c('Close click')\">Reboot</button>\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"c('Close click')\">Cancel</button>\n    </div>\n</ng-template>"

/***/ }),

/***/ "../../../../../src/app/layout/dash/dash.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".add-widget-container {\n  text-align: right;\n  margin-bottom: 30px; }\n\n.label-graph {\n  text-align: center; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/dash/dash.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router_animations__ = __webpack_require__("../../../../../src/app/router.animations.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sensorStream_service__ = __webpack_require__("../../../../../src/app/layout/dash/sensorStream.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_widget_service__ = __webpack_require__("../../../../../src/app/services/widget.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_helper_service__ = __webpack_require__("../../../../../src/app/services/helper.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_widgetSetting_service__ = __webpack_require__("../../../../../src/app/services/widgetSetting.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var DashComponent = (function () {
    function DashComponent(modalService, _sensorStreamService, _widgetService, _helperService, _widgetSettingService) {
        this.modalService = modalService;
        this._sensorStreamService = _sensorStreamService;
        this._widgetService = _widgetService;
        this._helperService = _helperService;
        this._widgetSettingService = _widgetSettingService;
        this.messages = [];
        this.pitchTmpData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.rollTmpData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.headingTmpData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.yLabelPlaceholderLimit = 60000;
        this.selectedInterval = this.yLabelPlaceholderLimit;
        this.currentWidgetSetting = {
            widgetId: '',
            rollMin: -90,
            rollMax: 90,
            pitchMin: -90,
            pitchMax: 90,
            isDegrees: true
        };
        this.newWidget = {
            sensorId: '',
            dashboardId: '0',
            type: 'motion-sensor',
            description: 'default'
        };
        this.newWidgetSetting = {
            widgetId: '',
            rollMin: -90,
            rollMax: 90,
            pitchMin: -90,
            pitchMax: 90,
            isDegrees: true,
        };
        this.sensorWidgets = [];
        this.intervalProcess = {};
        this.lineChartLabels = ['0', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
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
        this.pitchChartColor = [
            {
                backgroundColor: '#2ecc71',
                borderColor: '#2ecc71',
                pointBackgroundColor: 'transparent',
                pointBorderColor: 'transparent',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.rollChartColor = [
            {
                backgroundColor: '#3498db',
                borderColor: '#3498db',
                pointBackgroundColor: 'transparent',
                pointBorderColor: 'transparent',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.headingChartColor = [
            {
                backgroundColor: '#f0ad4e',
                borderColor: '#f0ad4e',
                pointBackgroundColor: 'transparent',
                pointBorderColor: 'transparent',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
    }
    DashComponent.prototype.open = function (content, id) {
        var _this = this;
        this.currentWidgetId = id;
        this._widgetSettingService.getByWidgetId(id)
            .subscribe(function (data) {
            _this.currentWidgeSettingtId = data.data._id;
            _this.currentWidgetSetting = data.data;
        });
        this.modalService.open(content).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    DashComponent.prototype.generateYLabel = function (limit, isLabel) {
        var x = [];
        for (var i = 0; i < limit; i++) {
            if ((i % 100) === 0) {
                if (isLabel) {
                    x.push(i);
                }
                else {
                    x.push(0);
                }
            }
        }
        return x;
    };
    DashComponent.prototype.getDismissReason = function (reason) {
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
    DashComponent.prototype.radiansToDegrees = function (num) {
        var result = num * (180 / Math.PI);
        result = parseFloat(result.toFixed(2));
        return result;
    };
    DashComponent.prototype.fetchWidgets = function () {
        var _this = this;
        this._widgetService.getAll()
            .subscribe(function (data) {
            var widgets = data.data;
            var output = [];
            var tmp = {};
            widgets.forEach(function (widget, idx) {
                _this._widgetSettingService.getByWidgetId(widget._id)
                    .subscribe(function (widgetSetting) {
                    widget.pitchChart = [
                        { data: [-0.1, 0.1, -0.1, 0.1, -0.1, 0, 0.1, -0.1, 0.1, 0.1], label: 'Pitch', fill: false }
                    ];
                    widget.rollChart = [
                        { data: [0.1, -0.1, 0.1, -0.1, 0.1, 0, -0.1, 0.1, -0.1, 0.1], label: 'Roll', fill: false }
                    ];
                    widget.headingChart = [
                        { data: [0.1, -0.1, 0.1, -0.1, 0.1, 0, -0.1, 0.1, -0.1, 0.1], label: 'Roll', fill: false }
                    ];
                    widget.pitchMax = widgetSetting.data.pitchMax;
                    widget.pitchMin = widgetSetting.data.pitchMin;
                    widget.rollMax = widgetSetting.data.rollMax;
                    widget.rollMin = widgetSetting.data.rollMin;
                    output.push(widget);
                    tmp[widget.sensorId] = idx;
                    if (idx === (widgets.length - 1)) {
                        _this.widgetSensorDirectory = tmp;
                        _this.sensorWidgets = output;
                        _this.iniateWebSockets();
                    }
                    ;
                });
            });
        });
    };
    DashComponent.prototype.onIntervalSelect = function (newValue) {
        this.yLabelPlaceholderLimit = newValue;
        this.connection.unsubscribe();
        this.fetchWidgets();
        this.lineChartLabels = this.generateYLabel(this.yLabelPlaceholderLimit, true);
    };
    DashComponent.prototype.createWidget = function () {
        var _this = this;
        this._widgetService.create(this.newWidget)
            .subscribe(function (data) {
            _this.newWidgetSetting.widgetId = data.data._id;
            _this._widgetSettingService.create(_this.newWidgetSetting)
                .subscribe(function (data) {
                _this.fetchWidgets();
                _this.clearAddSensorWidgetForm();
            });
        });
    };
    DashComponent.prototype.fetchWidgetSetting = function () {
        var _this = this;
        this._widgetSettingService.getByWidgetId('123')
            .subscribe(function (data) {
            _this.fetchWidgets();
        });
    };
    DashComponent.prototype.updateWidgetSetting = function () {
        var _this = this;
        this._widgetSettingService.update(this.currentWidgetSetting)
            .subscribe(function (data) {
            _this.fetchWidgets();
        });
    };
    DashComponent.prototype.deleteWidget = function () {
        var _this = this;
        var widgetId = this.currentWidgetId;
        var widgetSettingId = this.currentWidgeSettingtId;
        this._widgetService.delete(widgetId)
            .subscribe(function (data) {
            _this.fetchWidgets();
            _this._widgetSettingService.delete(widgetSettingId)
                .subscribe(function (data) {
                _this.fetchWidgets();
            });
        });
    };
    DashComponent.prototype.systemExecute = function (type) {
        console.log(type);
        this._sensorStreamService.sendMessage('reboot');
    };
    DashComponent.prototype.clearAddSensorWidgetForm = function () {
        this.newWidget = {
            sensorId: '',
            dashboardId: '0',
            type: 'motion-sensor',
            description: 'default'
        };
    };
    DashComponent.prototype.iniateWebSockets = function () {
        var _this = this;
        if (this.connection) {
            this.connection.unsubscribe();
        }
        var pitchTmpData2 = this.generateYLabel(this.yLabelPlaceholderLimit, false);
        var rollTmpData2 = this.generateYLabel(this.yLabelPlaceholderLimit, false);
        var headingTmpData2 = this.generateYLabel(this.yLabelPlaceholderLimit, false);
        this.connection = this._sensorStreamService.getMessages().subscribe(function (message) {
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
            _this.cleanSensorWidgets();
            _this.sensorWidgets[_this.widgetSensorDirectory[sensorId]].battery = _this.calculateBattery(battery);
            var pitchClone = JSON.parse(JSON.stringify(_this.sensorWidgets[_this.widgetSensorDirectory[sensorId]].pitchChart));
            pitchClone[0].data = pitchTmpData2;
            _this.sensorWidgets[_this.widgetSensorDirectory[sensorId]].pitchChart = pitchClone;
            var rollClone = JSON.parse(JSON.stringify(_this.sensorWidgets[_this.widgetSensorDirectory[sensorId]].rollChart));
            rollClone[0].data = rollTmpData2;
            _this.sensorWidgets[_this.widgetSensorDirectory[sensorId]].rollChart = rollClone;
            var headingClone = JSON.parse(JSON.stringify(_this.sensorWidgets[_this.widgetSensorDirectory[sensorId]].headingChart));
            headingClone[0].data = headingTmpData2;
            _this.sensorWidgets[_this.widgetSensorDirectory[sensorId]].headingChart = headingClone;
        });
    };
    DashComponent.prototype.calculateAcceleration = function (final, initial) {
        var result;
        result = ((final - initial) / 1).toFixed(2);
        result = Math.abs(result);
        return result;
    };
    DashComponent.prototype.calculateBattery = function (battery) {
        var result;
        var maxVoltage = 12;
        var minVoltage = 10;
        if (battery <= maxVoltage) {
            result = ((battery - minVoltage) / (maxVoltage - minVoltage)) * 100;
            result = Math.floor(result);
        }
        else {
            result = 100;
        }
        return result;
    };
    DashComponent.prototype.cleanSensorWidgets = function () {
        this.sensorWidgets[0].pitchChart[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.sensorWidgets[0].rollChart[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.sensorWidgets[0].headingChart[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        if (this.sensorWidgets[1]) {
            this.sensorWidgets[1].pitchChart[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.sensorWidgets[1].rollChart[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.sensorWidgets[1].headingChart[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
    };
    DashComponent.prototype.parseData = function (data) {
        var output = 0;
        if (data[0].data[0]) {
            output = data[0].data[0];
        }
        return output;
    };
    DashComponent.prototype.getBatteryStyle = function (data) {
        var color;
        if (data > 50 && data <= 100) {
            color = 'green';
        }
        else if (data > 25 && data <= 50) {
            color = 'orange';
        }
        else {
            color = 'red';
        }
        return color;
    };
    DashComponent.prototype.getBatteryIndicator = function (data) {
        var level = 'fa fa-battery-1';
        if (data > 90 && data <= 100) {
            level = 'fa fa-battery-4';
        }
        else if (data > 60 && data <= 89) {
            level = 'fa fa-battery-3';
        }
        else if (data > 30 && data <= 59) {
            level = 'fa fa-battery-2';
        }
        else if (data > 5 && data <= 29) {
            level = 'fa fa-battery-1';
        }
        else {
            level = 'fa fa-battery-0';
        }
        return level;
    };
    DashComponent.prototype.getStyle = function (data, type) {
        var color = "";
        var currentValue = data[type + 'Chart'][0].data[0];
        var threshold = {
            pitchMax: data.pitchMax,
            pitchMin: data.pitchMin,
            rollMax: data.rollMax,
            rollMin: data.rollMin
        };
        if (currentValue >= threshold[type + 'Max'] || currentValue <= threshold[type + 'Min']) {
            color = "red";
        }
        else if (currentValue >= (threshold[type + 'Max'] - (threshold[type + 'Max'] * .20)) || currentValue <= (threshold[type + 'Min'] - threshold[type + 'Min'] * .20)) {
            color = "orange";
        }
        return color;
    };
    DashComponent.prototype.syncTime = function () {
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
    DashComponent.prototype.ngOnInit = function () {
        this.fetchWidgets();
        this.lineChartLabels = this.generateYLabel(this.yLabelPlaceholderLimit, true);
    };
    DashComponent.prototype.ngOnDestroy = function () {
        if (this.intervalProcess) {
            clearInterval(this.intervalProcess);
        }
        if (this.connection) {
            this.connection.unsubscribe();
        }
    };
    return DashComponent;
}());
DashComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-charts',
        template: __webpack_require__("../../../../../src/app/layout/dash/dash.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/dash/dash.component.scss")],
        animations: [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__router_animations__["a" /* routerTransition */])()],
        providers: [__WEBPACK_IMPORTED_MODULE_3__sensorStream_service__["a" /* SensorStreamService */], __WEBPACK_IMPORTED_MODULE_4__services_widget_service__["a" /* WidgetService */], __WEBPACK_IMPORTED_MODULE_6__services_widgetSetting_service__["a" /* WidgetSettingService */], __WEBPACK_IMPORTED_MODULE_5__services_helper_service__["a" /* HelperService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["c" /* NgbModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["c" /* NgbModal */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__sensorStream_service__["a" /* SensorStreamService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__sensorStream_service__["a" /* SensorStreamService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__services_widget_service__["a" /* WidgetService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_widget_service__["a" /* WidgetService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__services_helper_service__["a" /* HelperService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_helper_service__["a" /* HelperService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__services_widgetSetting_service__["a" /* WidgetSettingService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_widgetSetting_service__["a" /* WidgetSettingService */]) === "function" && _e || Object])
], DashComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=dash.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/dash/dash.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_charts__ = __webpack_require__("../../../../ng2-charts/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dash_routing_module__ = __webpack_require__("../../../../../src/app/layout/dash/dash-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dash_component__ = __webpack_require__("../../../../../src/app/layout/dash/dash.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared__ = __webpack_require__("../../../../../src/app/shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__3DModel_3DModel_component__ = __webpack_require__("../../../../../src/app/layout/3DModel/3DModel.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashModule", function() { return DashModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var DashModule = (function () {
    function DashModule() {
    }
    return DashModule;
}());
DashModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["h" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2_ng2_charts__["ChartsModule"],
            __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_4__dash_routing_module__["a" /* DashRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_6__shared__["b" /* PageHeaderModule */],
            __WEBPACK_IMPORTED_MODULE_8__angular_forms__["a" /* FormsModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_5__dash_component__["a" /* DashComponent */], __WEBPACK_IMPORTED_MODULE_7__3DModel_3DModel_component__["a" /* ThreeModelComponent */]]
    })
], DashModule);

//# sourceMappingURL=dash.module.js.map

/***/ }),

/***/ "../../../../../src/app/layout/dash/sensorStream.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client__ = __webpack_require__("../../../../socket.io-client/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_socket_io_client__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SensorStreamService; });


var SensorStreamService = (function () {
    function SensorStreamService() {
        this.url = 'http://172.24.1.1:4444';
    }
    SensorStreamService.prototype.sendMessage = function (message) {
        this.socket.emit('hardware-command', message);
        return true;
    };
    SensorStreamService.prototype.getMessages = function () {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"](function (observer) {
            _this.socket = __WEBPACK_IMPORTED_MODULE_1_socket_io_client__(_this.url);
            _this.socket.on('fromPublicServer', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    return SensorStreamService;
}());

//# sourceMappingURL=sensorStream.service.js.map

/***/ })

});
//# sourceMappingURL=2.chunk.js.map