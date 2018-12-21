/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EntrepriseComponentsPage, EntrepriseDeleteDialog, EntrepriseUpdatePage } from './entreprise.page-object';

const expect = chai.expect;

describe('Entreprise e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let entrepriseUpdatePage: EntrepriseUpdatePage;
    let entrepriseComponentsPage: EntrepriseComponentsPage;
    let entrepriseDeleteDialog: EntrepriseDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Entreprises', async () => {
        await navBarPage.goToEntity('entreprise');
        entrepriseComponentsPage = new EntrepriseComponentsPage();
        expect(await entrepriseComponentsPage.getTitle()).to.eq('tpiutjhipsterApp.entreprise.home.title');
    });

    it('should load create Entreprise page', async () => {
        await entrepriseComponentsPage.clickOnCreateButton();
        entrepriseUpdatePage = new EntrepriseUpdatePage();
        expect(await entrepriseUpdatePage.getPageTitle()).to.eq('tpiutjhipsterApp.entreprise.home.createOrEditLabel');
        await entrepriseUpdatePage.cancel();
    });

    it('should create and save Entreprises', async () => {
        const nbButtonsBeforeCreate = await entrepriseComponentsPage.countDeleteButtons();

        await entrepriseComponentsPage.clickOnCreateButton();
        await promise.all([entrepriseUpdatePage.setNomInput('nom'), entrepriseUpdatePage.setLieuInput('lieu')]);
        expect(await entrepriseUpdatePage.getNomInput()).to.eq('nom');
        expect(await entrepriseUpdatePage.getLieuInput()).to.eq('lieu');
        await entrepriseUpdatePage.save();
        expect(await entrepriseUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await entrepriseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Entreprise', async () => {
        const nbButtonsBeforeDelete = await entrepriseComponentsPage.countDeleteButtons();
        await entrepriseComponentsPage.clickOnLastDeleteButton();

        entrepriseDeleteDialog = new EntrepriseDeleteDialog();
        expect(await entrepriseDeleteDialog.getDialogTitle()).to.eq('tpiutjhipsterApp.entreprise.delete.question');
        await entrepriseDeleteDialog.clickOnConfirmButton();

        expect(await entrepriseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
