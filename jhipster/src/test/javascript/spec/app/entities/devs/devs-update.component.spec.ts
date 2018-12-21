/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TpiutjhipsterTestModule } from '../../../test.module';
import { DevsUpdateComponent } from 'app/entities/devs/devs-update.component';
import { DevsService } from 'app/entities/devs/devs.service';
import { Devs } from 'app/shared/model/devs.model';

describe('Component Tests', () => {
    describe('Devs Management Update Component', () => {
        let comp: DevsUpdateComponent;
        let fixture: ComponentFixture<DevsUpdateComponent>;
        let service: DevsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TpiutjhipsterTestModule],
                declarations: [DevsUpdateComponent]
            })
                .overrideTemplate(DevsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DevsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DevsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Devs(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.devs = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Devs();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.devs = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
