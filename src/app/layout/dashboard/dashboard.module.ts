import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PageHeaderModule } from './../../shared';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ThreeModelComponent } from '../3DModel/3DModel.component';

import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        NgbModule.forRoot(),
        FormsModule,
        Ng2Charts,
        DashboardRoutingModule,
        PageHeaderModule
    ],
    declarations: [DashboardComponent, ThreeModelComponent]
})
export class DashboardModule { }
