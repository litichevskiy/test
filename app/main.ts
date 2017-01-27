import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { DataService } from './data.service';
import { Data } from './data.service';
// const platform = platformBrowserDynamic();
// platform.bootstrapModule(AppModule);

export function main(d : any) {

    // debugger
    let _data = new Data();
    _data.items = d;

    platformBrowserDynamic(

        [{provide: '_data.items', useValue: _data }, DataService]

    ).bootstrapModule( AppModule );
}