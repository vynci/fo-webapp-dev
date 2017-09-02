import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashRoutingModule } from './dash-routing.module';
import { DashComponent } from './dash.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        NgbModule.forRoot(),
        DashRoutingModule,
        PageHeaderModule
    ],
    declarations: [DashComponent]
})
export class DashModule { }