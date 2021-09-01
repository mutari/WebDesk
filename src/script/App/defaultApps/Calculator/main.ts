import { App } from "../../App";
import { windowMouseEvent } from "../../Events/windowMouseEvent";
import { Point } from "../../../Tools/point";

export class AppCalculator extends App {

    constructor() {
        super('Calculator', 'http://www.iconarchive.com/download/i98291/dakirby309/simply-styled/File-Explorer.ico');

        this.render = true;
    }

    getPanelHtml(): HTMLElement {
        let AppDiv = this.getPanelDiv();

        AppDiv.innerHTML = `

            <div class="Calculator">
                <div id="example1">
                    <h1>Calculator</h1>
                    <p>count: 0</p>
                    <button onClick="test()">click me</button>
                </div>
            <div>
        `

        this.addScript(/*jsx*/`
            
            let number2 = 0;

            function test() {
                number2++;
                app.querySelector('p').innerHTML = 'count: ' + number;
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