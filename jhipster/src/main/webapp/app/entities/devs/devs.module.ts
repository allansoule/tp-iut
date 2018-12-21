import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TpiutjhipsterSharedModule } from 'app/shared';
import {
    DevsComponent,
    DevsDetailComponent,
    DevsUpdateComponent,
    DevsDeletePopupComponent,
    DevsDeleteDialogComponent,
    devsRoute,
    devsPopupRoute
} from './';

const ENTITY_STATES = [...devsRoute, ...devsPopupRoute];

@NgModule({
    imports: [TpiutjhipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [DevsComponent, DevsDetailComponent, DevsUpdateComponent, DevsDeleteDialogComponent, DevsDeletePopupComponent],
    entryComponents: [DevsComponent, DevsUpdateComponent, DevsDeleteDialogComponent, DevsDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TpiutjhipsterDevsModule {}
