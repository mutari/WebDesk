export abstract class EventListener {

    constructor() {
        document.addEventListener('click', e => this.onClick(e) );
        document.addEventListener('mousedown', e => this.onMouseDown(e) );
    }

    abstract onClick(event: any) : void;

    abstract onMouseDown(event: any) : void;

}