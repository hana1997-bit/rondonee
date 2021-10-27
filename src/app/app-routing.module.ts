import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllUserComponent } from './all-user/all-user.component';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { ModifierPassComponent } from './modifier-pass/modifier-pass.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UploadComponent } from './upload/upload.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: UserLoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'reset',
    component: ResetPasswordComponent,
  },
  {
    path: 'all',
    component: AllUserComponent,
  },
  {
    path: 'newPass/:token/:id',
    component: NewPasswordComponent,
  },
  {
    path: 'users/:id',
    component: UploadComponent,
  },
  {
    path: 'register',
    component: UserRegisterComponent,
    data: {
      title: 'Register user'
    }
  },
  {
    path:'modifier/:id',
    component:ModifierPassComponent
  },
  // {
  //   path: 'UserLogin',
  //   component: UserLoginComponent,
  //   data: {
  //     title: 'Login user'
  //   }
  // },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'editors',
        loadChildren: () => import('./views/editors/editors.module').then(m => m.EditorsModule)
      },
      {
        path: 'forms',
        loadChildren: () => import('./views/forms/forms.module').then(m => m.FormsModule)
      },
      {
        path: 'google-maps',
        loadChildren: () => import('./views/google-maps/google-maps.module').then(m => m.GoogleMapsModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'plugins',
        loadChildren: () => import('./views/plugins/plugins.module').then(m => m.PluginsModule)
      },
      {
        path: 'tables',
        loadChildren: () => import('./views/tables/tables.module').then(m => m.TablesModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'apps',
        loadChildren: () => import('./views/apps/apps.module').then(m => m.AppsModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
