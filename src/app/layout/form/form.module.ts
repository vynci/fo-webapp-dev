import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { PageHeaderModule } from './../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        NgbModule.forRoot(),
        FormsModule,
        FormRoutingModule,
        PageHeaderModule
    ],
    declarations: [FormComponent]
})
export class FormModule { }
