import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { MainfilterPipe } from './mainfilter.pipe';


import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { TypographyComponent }   from './typography/typography.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AmChartsModule } from "amcharts3-angular2";
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    TypographyComponent,
    MainfilterPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    HttpModule,
    FooterModule,
    FixedPluginModule,
    FormsModule,AmChartsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
