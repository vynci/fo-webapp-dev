import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(private translate: TranslateService, public router: Router) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992) {
                this.toggleSidebar();
            }
        });
    }

    public isKiosk:boolean = false;

    public select:any = {
        dashboard2 : '',
        reports : '',
        settings : ''
    }

    public selectPage(page:any){
        this.clearSelectedLink();
        this.select[page] = 'link-selected';
    }

    private clearSelectedLink() {
        this.select = {
            dashboard2 : '',
            reports : '',
            settings : ''
        }        
    }

    ngOnInit() {
        if(this.router.url === '/kiosk'){
            this.isKiosk = true;
        }

        var state:any = this.router.url;
        state = state.split('/');
        state = state[1];

        this.select[state] = 'link-selected';
        console.log(this.select);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('push-right');
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
