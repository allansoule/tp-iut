import { IEntreprise } from 'app/shared/model//entreprise.model';

export interface IDevs {
    id?: number;
    nom?: string;
    prenom?: string;
    adresse?: string;
    entreprise?: IEntreprise;
}

export class Devs implements IDevs {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public adresse?: string,
        public entreprise?: IEntreprise
    ) {}
}
