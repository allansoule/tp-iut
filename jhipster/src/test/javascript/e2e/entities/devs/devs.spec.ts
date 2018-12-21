/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DevsComponentsPage, DevsDeleteDialog, DevsUpdatePage } from './devs.page-object';

const expect = chai.expect;

describe('Devs e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let devsUpdatePage: DevsUpdatePage;
    let devsComponentsPage: DevsComponentsPage;
    let devsDeleteDialog: DevsDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Devs', async () => {
        await navBarPage.goToEntity('devs');
        devsComponentsPage = new DevsComponentsPage();
        expect(await devsComponentsPage.getTitle()).to.eq('tpiutjhipsterApp.devs.home.title');
    });

    it('should load create Devs page', async () => {
        await devsComponentsPage.clickOnCreateButton();
        devsUpdatePage = new DevsUpdatePage();
        expect(await devsUpdatePage.getPageTitle()).to.eq('tpiutjhipsterApp.devs.home.createOrEditLabel');
        await devsUpdatePage.cancel();
    });

    it('should create and save Devs', async () => {
        const nbButtonsBeforeCreate = await devsComponentsPage.countDeleteButtons();

        await devsComponentsPage.clickOnCreateButton();
        await promise.all([
            devsUpdatePage.setNomInput('nom'),
            devsUpdatePage.setPrenomInput('prenom'),
            devsUpdatePage.setAdresseInput('adresse'),
            devsUpdatePage.entrepriseSelectLastOption()
        ]);
        expect(await devsUpdatePage.getNomInput()).to.eq('nom');
        expect(await devsUpdatePage.getPrenomInput()).to.eq('prenom');
        expect(await devsUpdatePage.getAdresseInput()).to.eq('adresse');
        await devsUpdatePage.save();
        expect(await devsUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await devsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Devs', async () => {
        const nbButtonsBeforeDelete = await devsComponentsPage.countDeleteButtons();
        await devsComponentsPage.clickOnLastDeleteButton();

        devsDeleteDialog = new DevsDeleteDialog();
        expect(await devsDeleteDialog.getDialogTitle()).to.eq('tpiutjhipsterApp.devs.delete.question');
        await devsDeleteDialog.clickOnConfirmButton();

        expect(await devsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
