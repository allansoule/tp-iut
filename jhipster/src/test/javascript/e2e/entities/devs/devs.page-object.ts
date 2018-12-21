import { element, by, ElementFinder } from 'protractor';

export class DevsComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-devs div table .btn-danger'));
    title = element.all(by.css('jhi-devs div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DevsUpdatePage {
    pageTitle = element(by.id('jhi-devs-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nomInput = element(by.id('field_nom'));
    prenomInput = element(by.id('field_prenom'));
    adresseInput = element(by.id('field_adresse'));
    entrepriseSelect = element(by.id('field_entreprise'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNomInput(nom) {
        await this.nomInput.sendKeys(nom);
    }

    async getNomInput() {
        return this.nomInput.getAttribute('value');
    }

    async setPrenomInput(prenom) {
        await this.prenomInput.sendKeys(prenom);
    }

    async getPrenomInput() {
        return this.prenomInput.getAttribute('value');
    }

    async setAdresseInput(adresse) {
        await this.adresseInput.sendKeys(adresse);
    }

    async getAdresseInput() {
        return this.adresseInput.getAttribute('value');
    }

    async entrepriseSelectLastOption() {
        await this.entrepriseSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async entrepriseSelectOption(option) {
        await this.entrepriseSelect.sendKeys(option);
    }

    getEntrepriseSelect(): ElementFinder {
        return this.entrepriseSelect;
    }

    async getEntrepriseSelectedOption() {
        return this.entrepriseSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class DevsDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-devs-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-devs'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
