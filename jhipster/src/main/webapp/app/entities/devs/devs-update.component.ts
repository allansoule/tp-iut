import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDevs } from 'app/shared/model/devs.model';
import { DevsService } from './devs.service';
import { IEntreprise } from 'app/shared/model/entreprise.model';
import { EntrepriseService } from 'app/entities/entreprise';

@Component({
    selector: 'jhi-devs-update',
    templateUrl: './devs-update.component.html'
})
export class DevsUpdateComponent implements OnInit {
    devs: IDevs;
    isSaving: boolean;

    entreprises: IEntreprise[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected devsService: DevsService,
        protected entrepriseService: EntrepriseService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ devs }) => {
            this.devs = devs;
        });
        this.entrepriseService.query().subscribe(
            (res: HttpResponse<IEntreprise[]>) => {
                this.entreprises = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.devs.id !== undefined) {
            this.subscribeToSaveResponse(this.devsService.update(this.devs));
        } else {
            this.subscribeToSaveResponse(this.devsService.create(this.devs));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDevs>>) {
        result.subscribe((res: HttpResponse<IDevs>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackEntrepriseById(index: number, item: IEntreprise) {
        return item.id;
    }
}
