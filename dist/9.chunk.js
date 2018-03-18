webpackJsonp([9],{

/***/ "../../../../../src/app/layout/dashboard/dashboard-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_component__ = __webpack_require__("../../../../../src/app/layout/dashboard/dashboard.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__dashboard_component__["a" /* DashboardComponent */] }
];
var DashboardRoutingModule = (function () {
    function DashboardRoutingModule() {
    }
    return DashboardRoutingModule;
}());
DashboardRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]]
    })
], DashboardRoutingModule);

//# sourceMappingURL=dashboard-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/layout/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n    <div class=\"row control-header\"> \n        <div class=\"col col-sm-4\"></div>\n        <div class=\"col col-sm-4\">           \n        </div>\n        <div class=\"col col-sm-4\">\n            <div class=\"row\">\n                <div class=\"col col-sm-6\">\n                    <select class=\"form-control\" [ngModel]=\"selectedDashboard\" (ngModelChange)=\"onDashboardSelect($event)\" name=\"sel2\">\n                        <option value=\"{{widget.sensorId}}\" *ngFor=\"let widget of widgets\">{{widget.name}}</option>\n                    </select>                     \n                </div>\n                <div class=\"col col-sm-6\">\n                    <button type=\"button\" class=\"btn btn-primary btn-block\" (click)=\"open(addWidgetContent, 0, null, 'add')\"><i class=\"fa fa-plus\"></i> Add Widget</button>\n                </div>\n            </div>            \n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col col-sm-4\">\n            <div class=\"component-container graph-height\">\n                <div class=\"component-header label-green\">\n                    <div class=\"row\">\n                        <div class=\"col col-sm-4\">Pitch: <strong>{{sensorWidget.pitchChart[0].data[0] || '0'}} °</strong></div>\n                        <div class=\"col col-sm-3\">Max: <strong>{{sensorMaxAverage.pitch.max}}</strong></div>\n                        <div class=\"col col-sm-3\">Ave: <strong>{{sensorMaxAverage.pitch.average}} °</strong></div>\n                        <div class=\"col col-sm-2\" style=\"text-align:center;\">\n                            <span class=\"component-setting\" (click)=\"open(editWidgetContent, 1, 'pitch', 'edit')\"><i class=\"fa fa-cog\"></i></span> \n                        </div>\n                    </div>\n                </div>\n                <canvas baseChart height=\"115\" [datasets]=\"sensorWidget.pitchChart\"  [labels]=\"graphSettings.pitch.yaxis\" [options]=\"graphSettings.pitch.lineChart\" [colors]=\"pitchChartColor\" [legend]=\"lineChartLegend\" [chartType]=\"lineChartType\" (chartHover)=\"chartHovered($event)\" (chartClick)=\"chartClicked($event)\"></canvas>\n            </div>\n            <div class=\"component-container graph-height\">\n                <div class=\"component-header label-blue\">\n                    <div class=\"row\">\n                        <div class=\"col col-sm-4\">Roll: <strong>{{sensorWidget.rollChart[0].data[0] || '0'}} °</strong></div>\n                        <div class=\"col col-sm-3\">Max: <strong>{{sensorMaxAverage.roll.max}}</strong></div>\n                        <div class=\"col col-sm-3\">Ave: <strong>{{sensorMaxAverage.roll.average}} °</strong></div>\n                        <div class=\"col col-sm-2\" style=\"text-align:center;\">\n                            <span class=\"component-setting\" (click)=\"open(editWidgetContent, 1, 'roll', 'edit')\"><i class=\"fa fa-cog\"></i></span> \n                        </div>\n                    </div>                    \n                </div>\n                <canvas baseChart height=\"115\" [datasets]=\"sensorWidget.rollChart\" [labels]=\"graphSettings.roll.yaxis\" [options]=\"graphSettings.roll.lineChart\" [colors]=\"rollChartColor\" [legend]=\"lineChartLegend\" [chartType]=\"lineChartType\" (chartHover)=\"chartHovered($event)\" (chartClick)=\"chartClicked($event)\"></canvas>                \n            </div>\n            <div class=\"component-container graph-height\">\n                <div class=\"component-header label-orange\">\n                    <div class=\"row\">\n                        <div class=\"col col-sm-4\">Heading: <strong>{{sensorWidget.headingChart[0].data[0] || '0'}} °</strong></div>\n                        <div class=\"col col-sm-3\">Max: <strong>{{sensorMaxAverage.heading.max}}</strong></div>\n                        <div class=\"col col-sm-3\">Ave: <strong>{{sensorMaxAverage.heading.average}}</strong></div>\n                        <div class=\"col col-sm-2\" style=\"text-align:center;\">\n                            <span class=\"component-setting\" (click)=\"open(editWidgetContent, 1, 'heading', 'edit')\"><i class=\"fa fa-cog\"></i></span> \n                        </div>\n                    </div>                    \n                </div>\n                <canvas baseChart height=\"115\" [datasets]=\"sensorWidget.headingChart\" [labels]=\"graphSettings.heading.yaxis\" [options]=\"graphSettings.heading.lineChart\" [colors]=\"headingChartColor\" [legend]=\"lineChartLegend\" [chartType]=\"lineChartType\" (chartHover)=\"chartHovered($event)\" (chartClick)=\"chartClicked($event)\"></canvas>\n            </div>\n        </div>\n\n        <div class=\"col col-sm-4\">\n            <div class=\"component-container graph-height\">\n                <div class=\"component-header label-green\">\n                    <div class=\"row\">\n                        <div class=\"col col-sm-4\">Pitch Accel: <strong>{{sensorWidget.pitchAccelerationChart[0].data[0] || '0'}} °/s<sup>2</sup></strong></div>\n                        <div class=\"col col-sm-3\">Max: <strong>{{sensorMaxAverage.pitchAcceleration.max}}</strong></div>\n                        <div class=\"col col-sm-3\">Ave: <strong>{{sensorMaxAverage.pitchAcceleration.average}}</strong></div>\n                        <div class=\"col col-sm-2\" style=\"text-align:center;\">\n                            <span class=\"component-setting\" (click)=\"open(editWidgetContent, 1, 'pitchAcceleration', 'edit')\"><i class=\"fa fa-cog\"></i></span> \n                        </div>\n                    </div>                    \n                </div>\n                <canvas baseChart height=\"115\" [datasets]=\"sensorWidget.pitchAccelerationChart\" [labels]=\"graphSettings.pitchAcceleration.yaxis\" [options]=\"graphSettings.pitchAcceleration.lineChart\" [colors]=\"pitchChartColor\" [legend]=\"lineChartLegend\" [chartType]=\"lineChartType\" (chartHover)=\"chartHovered($event)\" (chartClick)=\"chartClicked($event)\"></canvas>\n            </div>\n            <div class=\"component-container graph-height\">\n                <div class=\"component-header label-blue\">\n                    <div class=\"row\">\n                        <div class=\"col col-sm-4\">Roll Accel: <strong>{{sensorWidget.rollAccelerationChart[0].data[0] || '0'}} °/s<sup>2</sup></strong></div>\n                        <div class=\"col col-sm-3\">Max: <strong>{{sensorMaxAverage.rollAcceleration.max}}</strong></div>\n                        <div class=\"col col-sm-3\">Ave: <strong>{{sensorMaxAverage.rollAcceleration.average}}</strong></div>\n                        <div class=\"col col-sm-2\" style=\"text-align:center;\">\n                            <span class=\"component-setting\" (click)=\"open(editWidgetContent, 1, 'rollAcceleration', 'edit')\"><i class=\"fa fa-cog\"></i></span> \n                        </div>\n                    </div>                    \n                </div>\n                <canvas baseChart height=\"115\" [datasets]=\"sensorWidget.rollAccelerationChart\" [labels]=\"graphSettings.rollAcceleration.yaxis\" [options]=\"graphSettings.rollAcceleration.lineChart\" [colors]=\"rollChartColor\" [legend]=\"lineChartLegend\" [chartType]=\"lineChartType\" (chartHover)=\"chartHovered($event)\" (chartClick)=\"chartClicked($event)\"></canvas>                \n            </div>\n            <div class=\"component-container graph-height\">\n                <div class=\"component-header label-orange\">\n                    <div class=\"row\">\n                        <div class=\"col col-sm-4\">Heading Accel: <strong>{{sensorWidget.headingAccelerationChart[0].data[0] || '0'}} °/s<sup>2</sup></strong></div>\n                        <div class=\"col col-sm-3\">Max: <strong>{{sensorMaxAverage.headingAcceleration.max}}</strong></div>\n                        <div class=\"col col-sm-3\">Ave: <strong>{{sensorMaxAverage.headingAcceleration.average}}</strong></div>\n                        <div class=\"col col-sm-2\" style=\"text-align:center;\">\n                            <span class=\"component-setting\" (click)=\"open(editWidgetContent, 1, 'headingAcceleration', 'edit')\"><i class=\"fa fa-cog\"></i></span> \n                        </div>\n                    </div>                    \n                </div>\n                <canvas baseChart height=\"115\" [datasets]=\"sensorWidget.headingAccelerationChart\" [labels]=\"graphSettings.headingAcceleration.yaxis\" [options]=\"graphSettings.headingAcceleration.lineChart\" [colors]=\"headingChartColor\" [legend]=\"lineChartLegend\" [chartType]=\"lineChartType\" (chartHover)=\"chartHovered($event)\" (chartClick)=\"chartClicked($event)\"></canvas>\n            </div>        \n        </div>\n        <div class=\"col col-sm-4\">\n            <div class=\"component-container non-graph-height\">\n                <div class=\"component-header label-gray\">3D Model</div>\n                <div class=\"component-console\">\n                    <geometry-cube texture=\"/assets/textures/crate.gif\"\n                    [size]=\"200\"\n                    [rotationSpeedX]=\"sensorReadings.roll\"\n                    [rotationSpeedY]=\"sensorReadings.heading\"\n                    [rotationSpeedZ]=\"sensorReadings.pitch\"\n                    [cameraZ]=\"400\"\n                    [fieldOfView]=\"70\"\n                    [nearClipping]=\"1\"\n                    [farClipping]=\"1000\"></geometry-cube>                    \n                </div>\n            </div>\n            <div class=\"component-container non-graph-height\">\n                <div class=\"component-header label-gray\">\n                    <div class=\"row\">\n                        <div class=\"col col-sm-3\"><strong>Console</strong> </div>                    \n                        <div class=\"col col-sm-3\"><i class=\"fa fa-battery\"></i> : <strong>100%</strong></div>\n                        <div class=\"col col-sm-3\"><i class=\"fa fa-exchange\"></i> : <strong>10 Hz</strong></div>\n                        <div class=\"col col-sm-3\"><i class=\"fa fa-signal\"></i> : <strong>{{sensorReadings.rssi}} RSSI</strong></div>  \n                    </div>                  \n                </div>\n                <div #console class=\"component-console console-setting\">\n                    <div *ngFor=\"let item of consoleList\"><strong>{{item.time}}</strong> : <span [style.color]='item.color'>{{item.value}}</span></div>                                                          \n                </div>    \n            </div>            \n        </div>\n    </div>\n    <div class=\"row\"></div>\n    <div class=\"row\"></div>\n</div>\n\n<ng-template #editWidgetContent let-c=\"close\" let-d=\"dismiss\">\n    <div class=\"modal-header\">\n        <h4 class=\"modal-title\"><span style=\"text-transform:capitalize;\">{{widgetModalTitle}}</span>  Graph Settings</h4>\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body\">\n        <h5>Treshold Indicator Values</h5>\n        <br>\n        <div class=\"row\">\n            <div class=\"col col-sm-6\">\n                <form role=\"form\">\n                    <fieldset class=\"form-group\">\n                        <label>Minimum Angle</label>\n                        <input type=\"number\" [(ngModel)]=\"currentMinMax.minimum\" name=\"rollMin\" max=\"0\" min=\"-180\" class=\"form-control\" placeholder=\"0\">\n                    </fieldset>                           \n                </form> \n            </div>  \n            <div class=\"col col-sm-6\">\n                <form role=\"form\">\n                    <fieldset class=\"form-group\">\n                        <label>Maximum Angle</label>\n                        <input type=\"number\" [(ngModel)]=\"currentMinMax.maximum\" name=\"rollMax\" max=\"180\" min=\"0\" class=\"form-control\" placeholder=\"0\">\n                    </fieldset>                         \n                </form> \n            </div>  \n        </div>\n        <br>\n        <h5>Timeline Interval</h5>\n        <br>        \n        <div>\n            <select class=\"form-control\" [ngModel]=\"selectedInterval\" (ngModelChange)=\"onIntervalSelect($event)\" name=\"sel2\">\n                <option [value]=\"1000\">1 Second</option>                    \n                <option [value]=\"60000\">1 Minute</option>\n                <option [value]=\"120000\">2 Minutes</option>\n                <option [value]=\"180000\">3 Minutes</option>\n                <option [value]=\"240000\">4 Minutes</option>\n                <option [value]=\"300000\">5 Minutes</option>\n            </select>             \n        </div>                               \n    </div>\n    <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"saveGraphSetting(); c('Close click')\">Save</button>\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"c('Close click')\">Cancel</button>\n    </div>\n</ng-template>\n\n<ng-template #addWidgetContent let-c=\"close\" let-d=\"dismiss\">\n    <div class=\"modal-header\">\n        <h4 class=\"modal-title\">Add Sensor Widget</h4>\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body\">\n        <form role=\"form\">\n            <fieldset class=\"form-group\">\n                <label>ID</label>\n                <input class=\"form-control\" placeholder=\"ex: 1234-5678-90\" [(ngModel)]=\"newWidget.sensorId\" name=\"sensorId\" >\n            </fieldset>\n            <fieldset class=\"form-group\">\n                <label>Name</label>\n                <input class=\"form-control\" placeholder=\"ex: Sensor A\" [(ngModel)]=\"newWidget.name\" name=\"name\" >\n            </fieldset>                            \n        </form>                                \n    </div>\n    <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"createWidget(); c('Close click')\">Save</button>\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"c('Close click')\">Cancel</button>\n    </div>\n</ng-template>"

/***/ }),

/***/ "../../../../../src/app/layout/dashboard/dashboard.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".graph-height {\n  height: 250px; }\n\n.non-graph-height {\n  height: 385px; }\n\n.component-header {\n  height: 30px;\n  margin-bottom: 10px;\n  color: white;\n  text-align: left;\n  padding-left: 10px;\n  padding-top: 2px;\n  border-bottom: 1px solid #444; }\n\n.component-container {\n  border: 1px solid #444;\n  margin-bottom: 20px; }\n\n.component-console {\n  background: black;\n  height: 92%; }\n\n.console-setting {\n  color: #2ecc71;\n  padding: 8px;\n  overflow-y: scroll;\n  font-size: 14px; }\n\n.component-indicators {\n  margin-right: 10px; }\n\n.component-setting {\n  color: white;\n  cursor: pointer;\n  font-weight: bold;\n  font-size: 18px; }\n\n.label-blue {\n  background: #3498db; }\n\n.label-green {\n  background: #2ecc71; }\n\n.label-orange {\n  background: #f0ad4e; }\n\n.label-gray {\n  height: 8% !important;\n  margin-bottom: 0px !important;\n  background: gray; }\n\n.control-header {\n  margin-bottom: 20px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router_animations__ = __webpack_require__("../../../../../src/app/router.animations.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_helper_service__ = __webpack_require__("../../../../../src/app/services/helper.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_sensorStream_service__ = __webpack_require__("../../../../../src/app/services/sensorStream.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_widgetSetting_service__ = __webpack_require__("../../../../../src/app/services/widgetSetting.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_widget_service__ = __webpack_require__("../../../../../src/app/services/widget.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var DashboardComponent = (function () {
    function DashboardComponent(_helperService, modalService, _sensorStreamService, _widgetSettingService, _widgetService) {
        this._helperService = _helperService;
        this.modalService = modalService;
        this._sensorStreamService = _sensorStreamService;
        this._widgetSettingService = _widgetSettingService;
        this._widgetService = _widgetService;
        this.heartStatus = 'init';
        this.widgets = [];
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
        this.consoleList = [];
        this.currentWidgetSetting = {
            widgetId: '',
            rollMin: -10,
            rollMax: 10,
            pitchMin: -20,
            pitchMax: 20,
            headingMin: -30,
            headingMax: 80,
            isDegrees: true
        };
        this.currentMinMax = {
            minimum: -30,
            maximum: 30
        };
        this.minMaxFlag = {
            pitch: false,
            roll: false,
            heading: false
        };
        this.sensorWidget = {
            rollChart: [
                { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], fill: false }
            ],
            pitchChart: [
                { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], fill: false }
            ],
            headingChart: [
                { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], fill: false }
            ],
            pitchAccelerationChart: [
                { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], fill: false }
            ],
            rollAccelerationChart: [
                { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], fill: false }
            ],
            headingAccelerationChart: [
                { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], fill: false }
            ]
        };
        this.sensorMaxAverage = {
            roll: {
                max: 0,
                average: 0
            },
            pitch: {
                max: 0,
                average: 0
            },
            heading: {
                max: 0,
                average: 0
            },
            rollAcceleration: {
                max: 0,
                average: 0
            },
            pitchAcceleration: {
                max: 0,
                average: 0
            },
            headingAcceleration: {
                max: 0,
                average: 0
            }
        };
        this.sensorReadings = {
            heading: 0,
            pitch: 0,
            roll: 0,
            headingAcceleration: 0,
            pitchAcceleration: 0,
            rollAcceleration: 0,
            rssi: 0
        };
        this.lineChartType = 'line';
        this.lineChartLegend = true;
        this.lineChartLabels = ['0', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
        this.selectedInterval = 1000;
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
        this.lineChartAccelerationOptions = {
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
        this.graphSettings = {
            pitch: {
                yaxis: this.lineChartLabels,
                lineChart: this.lineChartOptions,
                interval: 1000
            },
            roll: {
                yaxis: this.lineChartLabels,
                lineChart: this.lineChartOptions,
                interval: 1000
            },
            heading: {
                yaxis: this.lineChartLabels,
                lineChart: this.lineChartOptions,
                interval: 1000
            },
            pitchAcceleration: {
                yaxis: this.lineChartLabels,
                lineChart: this.lineChartAccelerationOptions,
                interval: 1000
            },
            rollAcceleration: {
                yaxis: this.lineChartLabels,
                lineChart: this.lineChartAccelerationOptions,
                interval: 1000
            },
            headingAcceleration: {
                yaxis: this.lineChartLabels,
                lineChart: this.lineChartAccelerationOptions,
                interval: 1000
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
    }
    DashboardComponent.prototype.open = function (content, id, title, type) {
        var _this = this;
        if (type === 'edit') {
            this.widgetModalTitle = title;
            this.currentGraphSetting = title;
            this.selectedInterval = this.graphSettings[title].interval;
            this.currentMinMax = {
                minimum: this.currentWidgetSetting[title + 'Min'],
                maximum: this.currentWidgetSetting[title + 'Max']
            };
        }
        this.modalService.open(content).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    DashboardComponent.prototype.getDismissReason = function (reason) {
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
    DashboardComponent.prototype.generateYLabel = function (limit, isLabel) {
        var x = [];
        for (var i = 0; i < limit; i++) {
            if ((i % 100) === 0) {
                if (isLabel) {
                    x.push(i);
                }
                else {
                    x.push(null);
                }
            }
        }
        return x;
    };
    DashboardComponent.prototype.saveGraphSetting = function () {
        this.graphSettings[this.currentGraphSetting].interval = this.selectedInterval;
        this.graphSettings[this.currentGraphSetting].yaxis = this.generateYLabel(this.selectedInterval, true);
        this.currentWidgetSetting[this.currentGraphSetting + 'Min'] = this.currentMinMax.minimum;
        this.currentWidgetSetting[this.currentGraphSetting + 'Max'] = this.currentMinMax.maximum;
        this.connection.unsubscribe();
        this.iniateWebSockets(this.selectedDashboard);
        // this._widgetSettingService.update(this.currentWidgetSetting)
        // .subscribe(data => {
        //     this.connection.unsubscribe();
        //     this.iniateWebSockets();
        // });    
    };
    DashboardComponent.prototype.onIntervalSelect = function (newValue) {
        this.selectedInterval = newValue;
    };
    DashboardComponent.prototype.onDashboardSelect = function (newValue) {
        this.destroyWebsockets();
        this.selectedDashboard = newValue;
        this.setupHeartBeat(newValue);
        this.iniateWebSockets(newValue);
        this.appendToConsole(newValue + ' Dashboard Initialized', '');
    };
    DashboardComponent.prototype.calculate = function (set) {
        var values = set.map(Math.abs);
        var sum = values.reduce(function (previous, current) { return current += previous; });
        var average = sum / values.length;
        var maximum = Math.max.apply(null, values);
        return {
            max: maximum,
            average: average.toFixed(2)
        };
    };
    DashboardComponent.prototype.processMaxAverage = function () {
        this.sensorMaxAverage = {
            roll: this.calculate(this.sensorWidget.rollChart[0].data),
            pitch: this.calculate(this.sensorWidget.pitchChart[0].data),
            heading: this.calculate(this.sensorWidget.headingChart[0].data),
            rollAcceleration: this.calculate(this.sensorWidget.rollAccelerationChart[0].data),
            pitchAcceleration: this.calculate(this.sensorWidget.pitchAccelerationChart[0].data),
            headingAcceleration: this.calculate(this.sensorWidget.headingAccelerationChart[0].data)
        };
    };
    DashboardComponent.prototype.getDateTime = function (date) {
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };
    DashboardComponent.prototype.appendToConsole = function (message, color) {
        this.consoleList.push({
            time: this.getDateTime(new Date()),
            value: message.toString(),
            color: color
        });
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    };
    DashboardComponent.prototype.checkThreshold = function (sensorReadings) {
        if (this.sensorReadings['roll'] > this.currentWidgetSetting.rollMax && !this.minMaxFlag['roll']) {
            this.minMaxFlag['roll'] = true;
            this.appendToConsole('Roll above maximum threshold.', 'red');
        }
        else if (this.sensorReadings['roll'] < this.currentWidgetSetting.rollMin && !this.minMaxFlag['roll']) {
            this.minMaxFlag['roll'] = true;
            this.appendToConsole('Roll below minimum threshold.', 'red');
        }
        else if (this.sensorReadings['roll'] > this.currentWidgetSetting.rollMin && this.sensorReadings['roll'] < this.currentWidgetSetting.rollMax) {
            if (this.minMaxFlag['roll']) {
                this.minMaxFlag['roll'] = false;
                this.appendToConsole('Roll angle back to normal.', '');
            }
        }
        if (this.sensorReadings['pitch'] > this.currentWidgetSetting.pitchMax && !this.minMaxFlag['pitch']) {
            this.minMaxFlag['pitch'] = true;
            this.appendToConsole('Pitch above maximum threshold.', 'red');
        }
        else if (this.sensorReadings['pitch'] < this.currentWidgetSetting.pitchMin && !this.minMaxFlag['pitch']) {
            this.minMaxFlag['pitch'] = true;
            this.appendToConsole('Pitch below minimum threshold.', 'red');
        }
        else if (this.sensorReadings['pitch'] > this.currentWidgetSetting.pitchMin && this.sensorReadings['pitch'] < this.currentWidgetSetting.pitchMax) {
            if (this.minMaxFlag['pitch']) {
                this.minMaxFlag['pitch'] = false;
                this.appendToConsole('Pitch angle back to normal.', '');
            }
        }
        if (this.sensorReadings['heading'] > this.currentWidgetSetting.headingMax && !this.minMaxFlag['heading']) {
            this.minMaxFlag['heading'] = true;
            this.appendToConsole('Heading above maximum threshold.', 'red');
        }
        else if (this.sensorReadings['heading'] < this.currentWidgetSetting.headingMin && !this.minMaxFlag['heading']) {
            this.minMaxFlag['heading'] = true;
            this.appendToConsole('Heading below minimum threshold.', 'red');
        }
        else if (this.sensorReadings['heading'] > this.currentWidgetSetting.headingMin && this.sensorReadings['heading'] < this.currentWidgetSetting.headingMax) {
            if (this.minMaxFlag['heading']) {
                this.minMaxFlag['heading'] = false;
                this.appendToConsole('Heading angle back to normal.', '');
            }
        }
    };
    DashboardComponent.prototype.iniateWebSockets = function (id) {
        var _this = this;
        var pitchTmpData2 = this.generateYLabel(this.graphSettings.pitch.interval, false);
        var rollTmpData2 = this.generateYLabel(this.graphSettings.roll.interval, false);
        var headingTmpData2 = this.generateYLabel(this.graphSettings.heading.interval, false);
        var pitchAccelerationTmpData2 = this.generateYLabel(this.graphSettings.pitchAcceleration.interval, false);
        ;
        var rollAccelerationTmpData2 = this.generateYLabel(this.graphSettings.rollAcceleration.interval, false);
        ;
        var headingAccelerationTmpData2 = this.generateYLabel(this.graphSettings.headingAcceleration.interval, false);
        ;
        this.connection = this._sensorStreamService.getMessages(id).subscribe(function (message) {
            var tmp = message.toString();
            var buffer = tmp.split(',');
            var sensorId = buffer[0].toString();
            _this.sensorReadings['roll'] = parseFloat(buffer[3]) || _this.sensorReadings['roll'];
            _this.sensorReadings['pitch'] = parseFloat(buffer[2]) || _this.sensorReadings['pitch'];
            _this.sensorReadings['heading'] = parseFloat(buffer[1]) || _this.sensorReadings['heading'];
            _this.sensorReadings['rollAcceleration'] = parseFloat(buffer[6]);
            _this.sensorReadings['pitchAcceleration'] = parseFloat(buffer[5]);
            _this.sensorReadings['headingAcceleration'] = parseFloat(buffer[4]);
            _this.sensorReadings['rssi'] = parseFloat(buffer[7]);
            _this.checkThreshold(_this.sensorReadings);
            pitchTmpData2.unshift(_this.sensorReadings['pitch']);
            pitchTmpData2.pop();
            rollTmpData2.unshift(_this.sensorReadings['roll']);
            rollTmpData2.pop();
            headingTmpData2.unshift(_this.sensorReadings['heading']);
            headingTmpData2.pop();
            pitchAccelerationTmpData2.unshift(_this.sensorReadings['pitchAcceleration']);
            pitchAccelerationTmpData2.pop();
            rollAccelerationTmpData2.unshift(_this.sensorReadings['rollAcceleration']);
            rollAccelerationTmpData2.pop();
            headingAccelerationTmpData2.unshift(_this.sensorReadings['headingAcceleration']);
            headingAccelerationTmpData2.pop();
            var cloneData = JSON.parse(JSON.stringify(_this.sensorWidget.pitchChart));
            cloneData[0].data = pitchTmpData2;
            _this.sensorWidget.pitchChart = cloneData;
            cloneData = JSON.parse(JSON.stringify(_this.sensorWidget.rollChart));
            cloneData[0].data = rollTmpData2;
            _this.sensorWidget.rollChart = cloneData;
            cloneData = JSON.parse(JSON.stringify(_this.sensorWidget.headingChart));
            cloneData[0].data = headingTmpData2;
            _this.sensorWidget.headingChart = cloneData;
            cloneData = JSON.parse(JSON.stringify(_this.sensorWidget.pitchAccelerationChart));
            cloneData[0].data = pitchAccelerationTmpData2;
            _this.sensorWidget.pitchAccelerationChart = cloneData;
            cloneData = JSON.parse(JSON.stringify(_this.sensorWidget.rollAccelerationChart));
            cloneData[0].data = rollAccelerationTmpData2;
            _this.sensorWidget.rollAccelerationChart = cloneData;
            cloneData = JSON.parse(JSON.stringify(_this.sensorWidget.headingAccelerationChart));
            cloneData[0].data = headingAccelerationTmpData2;
            _this.sensorWidget.headingAccelerationChart = cloneData;
            _this.processMaxAverage();
        });
    };
    DashboardComponent.prototype.setupHeartBeat = function (id) {
        var _this = this;
        this.heartbeat = this._sensorStreamService.heartBeat(id).subscribe(function (message) {
            if (message !== 'healthy') {
                if (_this.heartStatus === 'init' || _this.heartStatus === 'healthy') {
                    _this.appendToConsole('No incoming data (disconnected or out of range).', 'red');
                    _this.heartStatus = 'disconnected';
                }
            }
            else {
                if (_this.heartStatus === 'init' || _this.heartStatus === 'disconnected') {
                    _this.appendToConsole('Datagram healthy.', '');
                    _this.heartStatus = 'healthy';
                }
            }
        });
    };
    DashboardComponent.prototype.createWidget = function () {
        var _this = this;
        this._widgetService.create(this.newWidget)
            .subscribe(function (data) {
            _this.newWidgetSetting.widgetId = data.data._id;
            _this._widgetSettingService.create(_this.newWidgetSetting)
                .subscribe(function (data) {
                _this.destroyWebsockets();
                _this.fetchWidgets();
                _this.clearAddSensorWidgetForm();
            });
        });
    };
    DashboardComponent.prototype.clearAddSensorWidgetForm = function () {
        this.newWidget = {
            sensorId: '',
            dashboardId: '0',
            type: 'motion-sensor',
            description: 'default'
        };
    };
    DashboardComponent.prototype.fetchWidgets = function () {
        var _this = this;
        this._widgetService.getAll()
            .subscribe(function (data) {
            var widgets = data.data;
            var output = [];
            var tmp = {};
            _this.widgets = widgets;
            _this.selectedDashboard = widgets[0].sensorId;
            _this.setupHeartBeat(widgets[0].sensorId);
            _this.iniateWebSockets(widgets[0].sensorId);
            _this.appendToConsole('Dashboard(' + _this.selectedDashboard + ') Initialized', '');
            console.log(data);
        });
    };
    DashboardComponent.prototype.destroyWebsockets = function () {
        if (this.connection) {
            this.connection.unsubscribe();
        }
        if (this.heartbeat) {
            this.heartbeat.unsubscribe();
        }
    };
    DashboardComponent.prototype.ngOnInit = function () {
        this.fetchWidgets();
    };
    DashboardComponent.prototype.ngOnDestroy = function () {
        this.destroyWebsockets();
    };
    return DashboardComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('console'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], DashboardComponent.prototype, "myScrollContainer", void 0);
DashboardComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-dashboard',
        template: __webpack_require__("../../../../../src/app/layout/dashboard/dashboard.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/dashboard/dashboard.component.scss")],
        animations: [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__router_animations__["a" /* routerTransition */])()],
        providers: [__WEBPACK_IMPORTED_MODULE_3__services_helper_service__["a" /* HelperService */], __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["c" /* NgbModal */], __WEBPACK_IMPORTED_MODULE_4__services_sensorStream_service__["a" /* SensorStreamService */], __WEBPACK_IMPORTED_MODULE_5__services_widgetSetting_service__["a" /* WidgetSettingService */], __WEBPACK_IMPORTED_MODULE_6__services_widget_service__["a" /* WidgetService */]]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_helper_service__["a" /* HelperService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_helper_service__["a" /* HelperService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["c" /* NgbModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["c" /* NgbModal */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_sensorStream_service__["a" /* SensorStreamService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_sensorStream_service__["a" /* SensorStreamService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__services_widgetSetting_service__["a" /* WidgetSettingService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_widgetSetting_service__["a" /* WidgetSettingService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__services_widget_service__["a" /* WidgetService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_widget_service__["a" /* WidgetService */]) === "function" && _f || Object])
], DashboardComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/dashboard/dashboard.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_charts__ = __webpack_require__("../../../../ng2-charts/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared__ = __webpack_require__("../../../../../src/app/shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dashboard_routing_module__ = __webpack_require__("../../../../../src/app/layout/dashboard/dashboard-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dashboard_component__ = __webpack_require__("../../../../../src/app/layout/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__3DModel_3DModel_component__ = __webpack_require__("../../../../../src/app/layout/3DModel/3DModel.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var DashboardModule = (function () {
    function DashboardModule() {
    }
    return DashboardModule;
}());
DashboardModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["h" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_8__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_2_ng2_charts__["ChartsModule"],
            __WEBPACK_IMPORTED_MODULE_5__dashboard_routing_module__["a" /* DashboardRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_4__shared__["b" /* PageHeaderModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_6__dashboard_component__["a" /* DashboardComponent */], __WEBPACK_IMPORTED_MODULE_7__3DModel_3DModel_component__["a" /* ThreeModelComponent */]]
    })
], DashboardModule);

//# sourceMappingURL=dashboard.module.js.map

/***/ })

});
//# sourceMappingURL=9.chunk.js.map