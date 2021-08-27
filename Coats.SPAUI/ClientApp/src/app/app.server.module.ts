import { NgModule } from '@angular/core';
//import { ServerModule } from '@angular/platform-server';
//import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

/*[AppModule, ServerModule, ModuleMapLoaderModule],*/

@NgModule({
    imports: [AppModule],
    bootstrap: [AppComponent]
})
export class AppServerModule { }
