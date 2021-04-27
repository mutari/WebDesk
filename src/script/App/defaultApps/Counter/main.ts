import { App } from "../../App";
import { html } from "./main.handlebars";
import { compileHandlebars } from '../../../Tools/Tools';
import { windowMouseEvent } from "../../Events/windowMouseEvent";
import { Point } from "../../../Tools/point";

export class AppCounter extends App {

    constructor() {
        super('Counter', 'http://www.iconarchive.com/download/i98291/dakirby309/simply-styled/File-Explorer.ico');

        this.render = true;
    }

    getPanelHtml(): HTMLElement {
        let AppDiv = this.getPanelDiv();

        AppDiv.innerHTML = `
            <div><h1>hello world</h1></div>
        `

        this.addScript(`
            console.log('hello wrold 12u9389128349');
        `);

        return AppDiv;
    }

    windowEvent(event: windowMouseEvent): void {
        
    }

    mouseMoveEvent(point: Point): void {

    }

}