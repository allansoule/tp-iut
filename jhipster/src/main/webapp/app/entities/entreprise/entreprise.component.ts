import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEntreprise } from 'app/shared/model/entreprise.model';
import { AccountService } from 'app/core';
import { EntrepriseService } from './entreprise.service';

@Component({
    selector: 'jhi-entreprise',
    templateUrl: './entreprise.component.html'
})
export class EntrepriseComponent implements OnInit, OnDestroy {
    entreprises: IEntreprise[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected entrepriseService: EntrepriseService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.entrepriseService.query().subscribe(
            (res: HttpResponse<IEntreprise[]>) => {
                this.entreprises = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEntreprises();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEntreprise) {
        return item.id;
    }

    registerChangeInEntreprises() {
        this.eventSubscriber = this.eventManager.subscribe('entrepriseListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
