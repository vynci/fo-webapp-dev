webpackJsonp([7],{

/***/ "../../../../../src/app/layout/kiosk/kiosk-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__kiosk_component__ = __webpack_require__("../../../../../src/app/layout/kiosk/kiosk.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KioskRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__kiosk_component__["a" /* KioskComponent */] }
];
var KioskRoutingModule = (function () {
    function KioskRoutingModule() {
    }
    return KioskRoutingModule;
}());
KioskRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]]
    })
], KioskRoutingModule);

//# sourceMappingURL=kiosk-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/layout/kiosk/kiosk.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n    <div class=\"row\">\n        <div class=\"col col-sm-4\">\n            <div class=\"value-container\">\n                <div class=\"sensor-value\">{{sensorReadings.roll}}°</div>\n                <div class=\"label-container label-blue\">Roll</div>\n            </div>\n            <div class=\"value-container\">\n                <div class=\"sensor-value\">{{sensorReadings.pitch}}°</div>\n                <div class=\"label-container label-green\">Pitch</div>\n            </div>\n            <div class=\"value-container\">\n                <div class=\"sensor-value\">{{sensorReadings.heading}}°</div>\n                <div class=\"label-container label-orange\">Heading</div>\n            </div>\n        </div>\n        <div class=\"col col-sm-4\">\n            <div class=\"value-container\">\n                <div class=\"sensor-value\">{{sensorReadings.rollAcceleration}} °/s<sup>2</sup></div>\n                <div class=\"label-container label-blue\">Roll Acceleration</div>\n            </div>\n            <div class=\"value-container\">\n                <div class=\"sensor-value\">{{sensorReadings.pitchAcceleration}} °/s<sup>2</sup></div>\n                <div class=\"label-container label-green\">Pitch Acceleration</div>\n            </div>\n            <div class=\"value-container\">\n                <div class=\"sensor-value\">{{sensorReadings.headingAcceleration}} °/s<sup>2</sup></div>\n                <div class=\"label-container label-orange\">Heading Acceleration</div>\n            </div>            \n        </div>\n        <div class=\"col col-sm-4\">\n            <div class=\"value-container\">\n                <div class=\"sensor-value\">100%</div>\n                <div class=\"label-container label-gray\">Battery Status</div>\n            </div>\n            <div class=\"value-container\">\n                <div class=\"sensor-value\">10 Hz</div>\n                <div class=\"label-container label-gray\">Data Rate</div>\n            </div>\n            <div class=\"value-container\">\n                <div class=\"sensor-value\">{{sensorReadings.rssi}} RSSI</div>\n                <div class=\"label-container label-gray\">Signal Strength</div>\n            </div>            \n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/layout/kiosk/kiosk.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".value-container {\n  text-align: center;\n  border: 2px solid;\n  padding-top: 20px;\n  margin-bottom: 26px; }\n\n.sensor-value {\n  font-size: 36px;\n  font-weight: bold; }\n\n.label-container {\n  font-size: 16px;\n  color: white;\n  padding-bottom: 1px;\n  padding-top: 1px;\n  font-weight: bold; }\n\n.label-blue {\n  background: #3498db; }\n\n.label-green {\n  background: #2ecc71; }\n\n.label-orange {\n  background: #f0ad4e; }\n\n.label-gray {\n  background: gray; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/kiosk/kiosk.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router_animations__ = __webpack_require__("../../../../../src/app/router.animations.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_helper_service__ = __webpack_require__("../../../../../src/app/services/helper.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_sensorStream_service__ = __webpack_require__("../../../../../src/app/services/sensorStream.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KioskComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var KioskComponent = (function () {
    function KioskComponent(_helperService, modalService, _sensorStreamService) {
        this._helperService = _helperService;
        this.modalService = modalService;
        this._sensorStreamService = _sensorStreamService;
        this.sensorReadings = {
            heading: 0,
            pitch: 0,
            roll: 0,
            headingAcceleration: 0,
            pitchAcceleration: 0,
            rollAcceleration: 0,
            rssi: 0
        };
    }
    KioskComponent.prototype.iniateWebSockets = function () {
        var _this = this;
        this.connection = this._sensorStreamService.getMessages('1001').subscribe(function (message) {
            var tmp = message.toString();
            var buffer = tmp.split(',');
            var sensorId = buffer[0].toString();
            _this.sensorReadings['roll'] = parseFloat(buffer[3]);
            _this.sensorReadings['pitch'] = parseFloat(buffer[2]);
            _this.sensorReadings['heading'] = parseFloat(buffer[1]);
            _this.sensorReadings['rollAcceleration'] = parseFloat(buffer[6]);
            _this.sensorReadings['pitchAcceleration'] = parseFloat(buffer[5]);
            _this.sensorReadings['headingAcceleration'] = parseFloat(buffer[4]);
            _this.sensorReadings['rssi'] = parseFloat(buffer[7]);
        });
    };
    KioskComponent.prototype.ngOnInit = function () {
        this.iniateWebSockets();
    };
    KioskComponent.prototype.ngOnDestroy = function () {
        if (this.connection) {
            this.connection.unsubscribe();
        }
    };
    return KioskComponent;
}());
KioskComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-kiosk',
        template: __webpack_require__("../../../../../src/app/layout/kiosk/kiosk.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/kiosk/kiosk.component.scss")],
        animations: [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__router_animations__["a" /* routerTransition */])()],
        providers: [__WEBPACK_IMPORTED_MODULE_3__services_helper_service__["a" /* HelperService */], __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["c" /* NgbModal */], __WEBPACK_IMPORTED_MODULE_4__services_sensorStream_service__["a" /* SensorStreamService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_helper_service__["a" /* HelperService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_helper_service__["a" /* HelperService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["c" /* NgbModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["c" /* NgbModal */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__services_sensorStream_service__["a" /* SensorStreamService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_sensorStream_service__["a" /* SensorStreamService */]) === "function" && _c || Object])
], KioskComponent);

var _a, _b, _c;
//# sourceMappingURL=kiosk.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/kiosk/kiosk.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__kiosk_routing_module__ = __webpack_require__("../../../../../src/app/layout/kiosk/kiosk-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__kiosk_component__ = __webpack_require__("../../../../../src/app/layout/kiosk/kiosk.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared__ = __webpack_require__("../../../../../src/app/shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KioskModule", function() { return KioskModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var KioskModule = (function () {
    function KioskModule() {
    }
    return KioskModule;
}());
KioskModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["h" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_2__kiosk_routing_module__["a" /* KioskRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_4__shared__["b" /* PageHeaderModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_3__kiosk_component__["a" /* KioskComponent */]]
    })
], KioskModule);

//# sourceMappingURL=kiosk.module.js.map

/***/ })

});
//# sourceMappingURL=7.chunk.js.map