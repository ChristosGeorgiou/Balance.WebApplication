import { Routes } from "@angular/router";

import { MainComponent } from "@balnc/report/components/_main/main.component";
import { OverviewComponent } from "@balnc/report/components/overview/overview.component";
import { ReportComponent } from "@balnc/report/components/report/report.component";

import { ReportService } from '@balnc/report/services/report.service';
import { LoginComponent } from "@balnc/report/components/login/login.component";
import { ReportGuard } from "@balnc/report/guards/report.guard";
import { ReportsComponent } from "@balnc/report/components/reports/reports.component";

const routes: Routes = [{
  path: '',
  component: MainComponent,
  resolve: {
    ReportService
  },
  children: [
    { path: 'login', component: LoginComponent },
    {
      path: 'view',
      canActivate: [ReportGuard],
      component: ReportsComponent,
      children: [
        { path: 'overview', component: OverviewComponent },
        {
          path: ':id',
          component: ReportComponent
        }
      ]
    },
    { path: '', redirectTo: "view/overview" },
  ],
}]

export const ReportRoutes = routes
