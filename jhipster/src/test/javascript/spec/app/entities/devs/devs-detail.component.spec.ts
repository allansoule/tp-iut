/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TpiutjhipsterTestModule } from '../../../test.module';
import { DevsDetailComponent } from 'app/entities/devs/devs-detail.component';
import { Devs } from 'app/shared/model/devs.model';

describe('Component Tests', () => {
    describe('Devs Management Detail Component', () => {
        let comp: DevsDetailComponent;
        let fixture: ComponentFixture<DevsDetailComponent>;
        const route = ({ data: of({ devs: new Devs(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TpiutjhipsterTestModule],
                declarations: [DevsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DevsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DevsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.devs).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
