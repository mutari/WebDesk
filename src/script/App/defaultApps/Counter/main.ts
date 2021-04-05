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
        console.log('awkfoawofkop')
        let HTML = compileHandlebars(html, { btn: "click me" });
        let AppDiv = this.getPanelDiv();

        let window = document.createElement('iframe');
        window.setAttribute('width', '100%');
        window.setAttribute('height', '100%');

        let wHTML = /*html*/`
            <h4>this is a test</h4>
            <script>console.log('hello wrold');</script>
        `

        window.onload = function() {
            let window_document = window.contentWindow.document;
            window_document.open();
            window_document.write(wHTML);
            window_document.close();
        }
        window.src = 'about:blank';
        AppDiv.append(window);

        return AppDiv;
    }

    windowEvent(event: windowMouseEvent): void {
        
    }

    mouseMoveEvent(point: Point): void {

    }

}