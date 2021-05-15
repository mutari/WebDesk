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

export function getHead() {
    return document.querySelector('head');
}

export function addHeadScript(src: string) {
    var script = document.createElement('script');
    
    script.src = src;

    getHead().appendChild(script);
}