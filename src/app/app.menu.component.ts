import {Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-menu',
    template: `
        <div class="menu">
            <ul class="layout-menu">
                <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
            </ul>
        </div>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[]=[  
        {label: 'Dashboards', icon: 'pi pi-chart-bar', routerLink:'/'}
    ]


    constructor(public app: AppMainComponent) {
        
    }

    indicadores: any[];
    gerencias: any[];

    

    ngOnInit() {
        
    }
    changeTheme(theme) {
        const themeLink: HTMLLinkElement = document.getElementById('theme-css') as HTMLLinkElement ;
        const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as HTMLLinkElement ;

        themeLink.href = 'assets/theme/theme-' + theme + '.css';
        layoutLink.href = 'assets/layout/css/layout-' + theme + '.css';
    }
}
