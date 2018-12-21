/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TpiutjhipsterTestModule } from '../../../test.module';
import { DevsComponent } from 'app/entities/devs/devs.component';
import { DevsService } from 'app/entities/devs/devs.service';
import { Devs } from 'app/shared/model/devs.model';

describe('Component Tests', () => {
    describe('Devs Management Component', () => {
        let comp: DevsComponent;
        let fixture: ComponentFixture<DevsComponent>;
        let service: DevsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TpiutjhipsterTestModule],
                declarations: [DevsComponent],
                providers: []
            })
                .overrideTemplate(DevsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DevsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DevsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Devs(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.devs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
