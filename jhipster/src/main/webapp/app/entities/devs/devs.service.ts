import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDevs } from 'app/shared/model/devs.model';

type EntityResponseType = HttpResponse<IDevs>;
type EntityArrayResponseType = HttpResponse<IDevs[]>;

@Injectable({ providedIn: 'root' })
export class DevsService {
    public resourceUrl = SERVER_API_URL + 'api/devs';

    constructor(protected http: HttpClient) {}

    create(devs: IDevs): Observable<EntityResponseType> {
        return this.http.post<IDevs>(this.resourceUrl, devs, { observe: 'response' });
    }

    update(devs: IDevs): Observable<EntityResponseType> {
        return this.http.put<IDevs>(this.resourceUrl, devs, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDevs>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDevs[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
