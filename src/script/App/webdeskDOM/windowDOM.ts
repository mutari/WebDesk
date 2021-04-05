
export class windowDOM {

    name: string;
    app_id: string;

    getPanelDiv() : HTMLDivElement {
        let AppDiv = document.createElement('div');
        AppDiv.setAttribute('class', `app-${this.name}`);
        AppDiv.setAttribute('style', 'height: 100%;')
        return AppDiv;
    }

    setAppId(app_id: string) {
        this.app_id = app_id;
    }

}