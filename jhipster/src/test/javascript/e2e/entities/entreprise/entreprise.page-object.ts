import { element, by, ElementFinder } from 'protractor';

export class EntrepriseComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-entreprise div table .btn-danger'));
    title = element.all(by.css('jhi-entreprise div h2#page-heading span')).first();

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

export class EntrepriseUpdatePage {
    pageTitle = element(by.id('jhi-entreprise-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nomInput = element(by.id('field_nom'));
    lieuInput = element(by.id('field_lieu'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNomInput(nom) {
        await this.nomInput.sendKeys(nom);
    }

    async getNomInput() {
        return this.nomInput.getAttribute('value');
    }

    async setLieuInput(lieu) {
        await this.lieuInput.sendKeys(lieu);
    }

    async getLieuInput() {
        return this.lieuInput.getAttribute('value');
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

export class EntrepriseDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-entreprise-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-entreprise'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
