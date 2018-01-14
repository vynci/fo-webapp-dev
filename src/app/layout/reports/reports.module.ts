import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { ReportsComponent } from './reports.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        ReportsRoutingModule,
        PageHeaderModule,
        FormsModule,
        Ng2Charts,
        ReactiveFormsModule,
        NgbModule.forRoot()        
    ],
    declarations: [ReportsComponent]
})
export class ReportsModule { }
