import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDevs } from 'app/shared/model/devs.model';

@Component({
    selector: 'jhi-devs-detail',
    templateUrl: './devs-detail.component.html'
})
export class DevsDetailComponent implements OnInit {
    devs: IDevs;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ devs }) => {
            this.devs = devs;
        });
    }

    previousState() {
        window.history.back();
    }
}
