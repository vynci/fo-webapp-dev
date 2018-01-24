import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'dashboard', loadChildren: './dash/dash.module#DashModule' },
            { path: 'reports', loadChildren: './reports/reports.module#ReportsModule' },
            { path: 'settings', loadChildren: './form/form.module#FormModule' },
            { path: 'kiosk', loadChildren: './kiosk/kiosk.module#KioskModule' },
            { path: 'dashboard2', loadChildren: './dashboard/dashboard.module#DashboardModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
