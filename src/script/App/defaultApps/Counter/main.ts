import { App } from "../../App";
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

            <div class="Counter">
                <div id="example1">
                    <h1>hello world</h1>
                    <p id="p-8127481274">cont: 0</p>
                    <button onClick="test()">click me</button>
                </div>
            <div>
        `

        this.addScript(/*jsx*/`
            
            let number = 0;

            function test() {
                number++;
            }
            
        `);

        return AppDiv;
    }

    windowEvent(event: windowMouseEvent): void {
        
    }

    mouseMoveEvent(point: Point): void {

    }

    windowLoadedEvent(): void {
        console.log('loaded');
    }

}