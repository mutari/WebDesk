import './images/background/backgound-default.jpg';

import './css/desktop.scss';
import './css/taskbar.scss';
import './css/global.scss';

import { AppManager } from './script/App/AppManager';
import { EventListener } from './script/EventListener';

class Main extends EventListener {

    appManager: AppManager;

    constructor() {
        super();
        this.appManager = new AppManager();
        console.log(this)
    }

    onClick(event: any): void {
        this.appManager.onClick(event);
    }

    onMouseDown(event: any): void {

    }

}

let main = new Main();