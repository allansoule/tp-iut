import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TpiutjhipsterDevsModule } from './devs/devs.module';
import { TpiutjhipsterEntrepriseModule } from './entreprise/entreprise.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        TpiutjhipsterDevsModule,
        TpiutjhipsterEntrepriseModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TpiutjhipsterEntityModule {}
