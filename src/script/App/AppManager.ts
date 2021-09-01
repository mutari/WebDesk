import { appendToDesktop, appendToNavBar, clearDesktop, addHeadScript } from "../Tools/Tools";
import { App } from "./App";
import { AppCounter } from "./defaultApps/Counter/main";
import { AppCalculator } from "./defaultApps/Calculator/main";
import { IO } from '../IO'

export class AppManager {

    Apps: App[] = [];

    constructor() { 
        IO.startMouseMoveEvent((obj: Object) => {
            this.loopApps((app: any) => {
                if(app.render)
                    app.inMouseMoveEvent(obj);
            })
        });

        this.loadStandarProgram();
        this.generateNavBarHtml();
        this.renderWindow();
    }

    onClick(event: any) {
        this.loopApps((app: any) => app.onClick(event));

        //this.renderWindow();
    }

    renderWindow() {
        clearDesktop();
        this.loopApps((app: any) => {
            if(app.render) {
                this.generateWindowHtml(app);
            }
        });
    }

    loadStandarProgram() {
        this.Apps.push(new AppCounter());
        this.Apps.push(new AppCalculator());
    }

    generateNavBarHtml() {
        this.loopApps((app: any) => {
            appendToNavBar(app.getNavBarHtml());
        })
    }

    generateWindowHtml(App: App) {
        appendToDesktop(App.getWindowHtml());
        App.windowLoaded();
    }

    private loopApps(__callback: Function) {
        for(var i = 0; i < this.Apps.length; i++) {
            __callback(this.Apps[i]);
        }
    }

}