import { windowMouseEvent } from './Events/windowMouseEvent';
import { makeid } from '../Tools/Tools';
import { Point } from '../Tools/point';
import { windowDOM } from './webdeskDOM/windowDOM';

export abstract class App extends windowDOM {

    name: string;
    icon_path: string;
    app_id: string;
    
    //window position
    hold: boolean = false;
    point: Point = { x: 200, y: 200};
    windowDiv: HTMLDivElement;
    offsetX: number;
    offsetY: number;

    //window render
    render: boolean = false;

    constructor(name: string, icon_path: string) {
        super();
        
        this.name = name;
        this.icon_path = icon_path;
        this.app_id = `app-${name}-${makeid(12)}`;
    }

    onClick(event: any) {
        if(event.toElement.id == `${this.app_id}-window-header` || event.toElement.id == `${this.app_id}-window-header-title`)
            this.inWindowEvent({ on: 'header',  x: event.x, y: event.y });
        else if(event.toElement.id == `${this.app_id}-window-header`)
            this.inWindowEvent({ on: 'header',  x: event.x, y: event.y });
        else if(event.toElement.id == `${this.app_id}-navbar-icon-img` || event.toElement.id == `${this.app_id}-navbar-icon`)
            this.toolbarEvent();
    }

    getWindowHtml() {
        //generating the window for the program
        this.windowDiv = document.createElement('div');
        this.windowDiv.setAttribute('class', 'window-main');
        this.windowDiv.setAttribute('id', `${this.app_id}`);
        this.windowDiv.style.top = `${this.point.y}px`;
        this.windowDiv.style.left = `${this.point.x}px`;

        //the window header
        let windowHeaderDiv = document.createElement('div');
        windowHeaderDiv.setAttribute('class', 'window-header');
        windowHeaderDiv.setAttribute('id', `${this.app_id}-window-header`)

        let windowHeaderTitle = document.createElement('div');
        windowHeaderTitle.setAttribute('class', 'window-header-title');
        windowHeaderTitle.setAttribute('id', `${this.app_id}-window-header-title`)
        windowHeaderTitle.innerHTML = this.name;
        windowHeaderDiv.append(windowHeaderTitle);

        //the panel that sub classes can add html to
        let windowPanelDiv = document.createElement('div');
        windowPanelDiv.setAttribute('class', 'window-panel');
        windowPanelDiv.append(this.getPanelHtml());
        windowPanelDiv.setAttribute('id', `${this.app_id}-window-panel`)
        
        //append ewerything together
        this.windowDiv.append(windowHeaderDiv);
        this.windowDiv.append(windowPanelDiv);

        return this.windowDiv;
    }

    getNavBarHtml() {
        let mainDiv = document.createElement('div');
        mainDiv.setAttribute('class', `taskbar-icon taskbar-app-${this.name}`)
        mainDiv.setAttribute('id', `${this.app_id}-navbar-icon`)
        let image = document.createElement('img');
        image.setAttribute('src', this.icon_path);
        image.setAttribute('alt', this.name);
        image.setAttribute('id', `${this.app_id}-navbar-icon-img`)
        mainDiv.append(image);
        return mainDiv;
    }

    private toolbarEvent() {
        let app = this.getApp();
        this.render = !this.render;
        if(this.render)
            app.style.display = "block";
        else
            app.style.display = "none";
        
    }

    abstract getPanelHtml() : HTMLElement;

    private inWindowEvent(event: windowMouseEvent) {

        if(event.on == 'header') {
            this.hold = !this.hold;
            this.offsetX = event.x - this.point.x;
            this.offsetY = event.y - this.point.y;
        }

        this.windowEvent(event);
    };

    inMouseMoveEvent(point: Point) {

        if(this.hold) {

            this.point.y = point.y - this.offsetY;
            this.point.x = point.x - this.offsetX;

            this.windowDiv.style.top = `${this.point.y}px`;
            this.windowDiv.style.left = `${this.point.x}px`;
        }

        this.mouseMoveEvent(point);
    }

    windowLoaded() {
        // set upp window scripts
        this.addScript(/*jsx*/`
            console.log('script 2 loaded')
            app = getWindow('${this.app_id}')
        `, true)

        this.windowLoadedEvent();
    }

    protected addScript(script_str: string, defer: boolean = false) {
        var script = document.createElement("script");
        script.defer = defer;

        script.innerHTML = script_str;

        this.windowDiv.appendChild(script);

    }

    protected addScriptSrc(script_src: string) {
        var script = document.createElement("script");

        script.src = script_src;

        this.windowDiv.appendChild(script);
    }

    private getApp() {
        return document.querySelector<HTMLElement>(`#${this.app_id}`);
    }

    abstract windowEvent(event: windowMouseEvent) : void;

    abstract mouseMoveEvent(point: Point): void;

    abstract windowLoadedEvent(): void;

}