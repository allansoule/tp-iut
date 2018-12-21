import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEntreprise } from 'app/shared/model/entreprise.model';
import { EntrepriseService } from './entreprise.service';

@Component({
    selector: 'jhi-entreprise-update',
    templateUrl: './entreprise-update.component.html'
})
export class EntrepriseUpdateComponent implements OnInit {
    entreprise: IEntreprise;
    isSaving: boolean;

    constructor(protected entrepriseService: EntrepriseService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ entreprise }) => {
            this.entreprise = entreprise;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.entreprise.id !== undefined) {
            this.subscribeToSaveResponse(this.entrepriseService.update(this.entreprise));
        } else {
            this.subscribeToSaveResponse(this.entrepriseService.create(this.entreprise));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntreprise>>) {
        result.subscribe((res: HttpResponse<IEntreprise>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
