import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { TpiutjhipsterSharedLibsModule, TpiutjhipsterSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [TpiutjhipsterSharedLibsModule, TpiutjhipsterSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
  entryComponents: [JhiLoginModalComponent],
  exports: [TpiutjhipsterSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TpiutjhipsterSharedModule {
  static forRoot() {
    return {
      ngModule: TpiutjhipsterSharedModule
    };
  }
}
