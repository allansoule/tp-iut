/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TpiutjhipsterTestModule } from '../../../test.module';
import { DevsDeleteDialogComponent } from 'app/entities/devs/devs-delete-dialog.component';
import { DevsService } from 'app/entities/devs/devs.service';

describe('Component Tests', () => {
    describe('Devs Management Delete Component', () => {
        let comp: DevsDeleteDialogComponent;
        let fixture: ComponentFixture<DevsDeleteDialogComponent>;
        let service: DevsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TpiutjhipsterTestModule],
                declarations: [DevsDeleteDialogComponent]
            })
                .overrideTemplate(DevsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DevsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DevsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
