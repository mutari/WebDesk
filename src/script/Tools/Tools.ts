import * as Handlebars from './Handlebars';

export function makeid(length: number) :string {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 } 

export function getDesktop() {
    return document.querySelector('#desktop');
}

export function appendToDesktop(doc: HTMLElement) {
    getDesktop().append(doc)
}

export function clearDesktop() {
    getDesktop().innerHTML = "";
}

export function getNavBar() {
    return document.querySelector('#taskbar-icons');
}   

export function appendToNavBar(doc: HTMLElement) {
    getNavBar().append(doc);
}

export function compileHandlebars(html: string, data: object): string {
    // compile the template
    var template = Handlebars.compile(html);
    // execute the compiled template and print the output to the console
    return template(data);
}