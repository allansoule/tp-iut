import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Devs } from 'app/shared/model/devs.model';
import { DevsService } from './devs.service';
import { DevsComponent } from './devs.component';
import { DevsDetailComponent } from './devs-detail.component';
import { DevsUpdateComponent } from './devs-update.component';
import { DevsDeletePopupComponent } from './devs-delete-dialog.component';
import { IDevs } from 'app/shared/model/devs.model';

@Injectable({ providedIn: 'root' })
export class DevsResolve implements Resolve<IDevs> {
    constructor(private service: DevsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Devs> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Devs>) => response.ok),
                map((devs: HttpResponse<Devs>) => devs.body)
            );
        }
        return of(new Devs());
    }
}

export const devsRoute: Routes = [
    {
        path: 'devs',
        component: DevsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tpiutjhipsterApp.devs.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'devs/:id/view',
        component: DevsDetailComponent,
        resolve: {
            devs: DevsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tpiutjhipsterApp.devs.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'devs/new',
        component: DevsUpdateComponent,
        resolve: {
            devs: DevsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tpiutjhipsterApp.devs.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'devs/:id/edit',
        component: DevsUpdateComponent,
        resolve: {
            devs: DevsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tpiutjhipsterApp.devs.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const devsPopupRoute: Routes = [
    {
        path: 'devs/:id/delete',
        component: DevsDeletePopupComponent,
        resolve: {
            devs: DevsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tpiutjhipsterApp.devs.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
