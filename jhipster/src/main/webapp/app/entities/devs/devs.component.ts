import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDevs } from 'app/shared/model/devs.model';
import { AccountService } from 'app/core';
import { DevsService } from './devs.service';

@Component({
    selector: 'jhi-devs',
    templateUrl: './devs.component.html'
})
export class DevsComponent implements OnInit, OnDestroy {
    devs: IDevs[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected devsService: DevsService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.devsService.query().subscribe(
            (res: HttpResponse<IDevs[]>) => {
                this.devs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDevs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDevs) {
        return item.id;
    }

    registerChangeInDevs() {
        this.eventSubscriber = this.eventManager.subscribe('devsListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
