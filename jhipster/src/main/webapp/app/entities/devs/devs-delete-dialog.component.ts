import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDevs } from 'app/shared/model/devs.model';
import { DevsService } from './devs.service';

@Component({
    selector: 'jhi-devs-delete-dialog',
    templateUrl: './devs-delete-dialog.component.html'
})
export class DevsDeleteDialogComponent {
    devs: IDevs;

    constructor(protected devsService: DevsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.devsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'devsListModification',
                content: 'Deleted an devs'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-devs-delete-popup',
    template: ''
})
export class DevsDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ devs }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DevsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.devs = devs;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
