import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KioskRoutingModule } from './kiosk-routing.module';
import { KioskComponent } from './kiosk.component';
import { PageHeaderModule } from './../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        NgbModule.forRoot(),
        FormsModule,
        KioskRoutingModule,
        PageHeaderModule
    ],
    declarations: [KioskComponent]
})
export class KioskModule { }
