import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TpiutjhipsterSharedModule } from 'app/shared';
import {
    EntrepriseComponent,
    EntrepriseDetailComponent,
    EntrepriseUpdateComponent,
    EntrepriseDeletePopupComponent,
    EntrepriseDeleteDialogComponent,
    entrepriseRoute,
    entreprisePopupRoute
} from './';

const ENTITY_STATES = [...entrepriseRoute, ...entreprisePopupRoute];

@NgModule({
    imports: [TpiutjhipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EntrepriseComponent,
        EntrepriseDetailComponent,
        EntrepriseUpdateComponent,
        EntrepriseDeleteDialogComponent,
        EntrepriseDeletePopupComponent
    ],
    entryComponents: [EntrepriseComponent, EntrepriseUpdateComponent, EntrepriseDeleteDialogComponent, EntrepriseDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TpiutjhipsterEntrepriseModule {}
