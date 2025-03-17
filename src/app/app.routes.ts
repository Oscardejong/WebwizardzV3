import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DomainComponent } from './pages/domain/domain.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { AccountComponent } from './pages/account/account.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';


export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },

    {
        path: 'dashboard',
        component: DashboardComponent
    },

    {
        path: 'domain',
        component: DomainComponent
    },

    {
        path: 'payments',
        component: PaymentsComponent
    },

    {
        path: 'account',
        component: AccountComponent
    },

    {
        path: 'analytics',
        component: AnalyticsComponent
    },


];
