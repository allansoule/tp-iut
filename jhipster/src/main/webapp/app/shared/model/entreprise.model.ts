import { IDevs } from 'app/shared/model//devs.model';

export interface IEntreprise {
    id?: number;
    nom?: string;
    lieu?: string;
    devs?: IDevs[];
}

export class Entreprise implements IEntreprise {
    constructor(public id?: number, public nom?: string, public lieu?: string, public devs?: IDevs[]) {}
}
