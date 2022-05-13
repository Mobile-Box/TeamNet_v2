import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import {ConnApiService} from "../../../../../services/conn-api/conn-api.service";
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  //Constants
  public maxZip = environment.maxZip;
  public maxInput = environment.maxInput;
  public maxInputIban = environment.maxInputIban;
  public maxInputSocialSecurityNumber = environment.maxInputSocialSecurityNumber;
  public maxInputTaxIdentification = environment.maxInputTaxIdentification;
  public maxInputGrossSalary = environment.maxInputGrossSalary;
  public maxInputWagePerHour = environment.maxInputWagePerHour;
  public maxInputHoursPerWeek = environment.maxInputHoursPerWeek;
  public maxInputBirthday = environment.maxInputBirthday;
  public maxInputStart = environment.maxInputStart;
  public maxInputEnd = environment.maxInputEnd;

  // Urls
  private kTeamMember = "38";
  private urlTeamMember = 'team/main/';
  private urlSave = 'team/main';
  private urlRegionStates = 'region/states';

  // FormBuilder
  fgTeamMember = this.formBuilder.group({
    cPrename: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
    cSurname: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
    cEmail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'), Validators.maxLength(this.maxInput)]],
    cMailCompany: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'), Validators.maxLength(this.maxInput)]],
    cTrelloUsername: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
    cPhoneMobile: ['', [Validators.maxLength(this.maxInput)]],
    cPhoneFixedLine: ['', [Validators.maxLength(this.maxInput)]],
    cShippingStreet: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
    cShippingStreetNumber: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
    cShippingZip: ['', [Validators.required, Validators.minLength(this.maxZip), Validators.maxLength(this.maxZip)]],
    cShippingCity: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
    nHoursPerWeek: ['', [Validators.required, Validators.maxLength(this.maxInputHoursPerWeek)]],
    nWagePerHour: ['', [Validators.required, Validators.maxLength(this.maxInputWagePerHour)]],
    nGrossSalary: ['', [Validators.required, Validators.maxLength(this.maxInputGrossSalary)]],
    cTaxIdentification: ['', [Validators.required, Validators.maxLength(this.maxInputTaxIdentification)]],
    cHealthInsurance: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
    cSocialSecurtiyNumber: ['', [Validators.required, Validators.maxLength(this.maxInputSocialSecurityNumber)]],
    cNationality: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
    tConfession: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
    cBank: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
    cIban: ['', [Validators.required, Validators.maxLength(this.maxInputIban)]],
    nVacation: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
  });

  // Variables
  bChanged = true;
  dataTeamMember;
  bSubmitted = false;
  oState = null;
  lStates = [];
  oRelationship = null;
  lRelationship = [];
  oTitle = null;
  lTitles: any[] = [{cName: 'Herr'}, {cName: 'Frau'}, {cName: 'Herr Dr.'}, {cName: 'Frau Dr.'},];
  bAddressFormally: boolean = true;


  constructor(private connApi: ConnApiService, private formBuilder: FormBuilder, public alertController: AlertController, public toastController: ToastController) { }

  ngOnInit() {

    // teamMember
    this.connApi.safeGet(this.urlTeamMember+this.kTeamMember).subscribe((response) => {
      this.dataTeamMember = response.body;

      // controls
      this.fgTeamMember.controls['cPrename'].setValue(this.dataTeamMember.cPrename);

      // console
      console.log(this.dataTeamMember);
    })

    // region
    this.loadStates();
  }

  buttonClick() {
    console.log("button clicked");
  }

  // Methods
  get errorControl() {
    return this.fgTeamMember.controls;
  }

  onChangeAddress() {

  }

  onToggleFormally($event: any) {

  }

  onChange() {

  }

  onSave() {


    //this.bSubmitted = true;

    // check for invalid input
    /*
    if (!this.fgTeamMember.valid || this.oState == null || this.oRelationship == null || this.oTitle == null) {
      console.log(this.oState);
      console.log(this.oRelationship);
      console.log(this.oTitle);
      this.alertInvalid();
      return;
    }
     */


    // prepare data
    let collector =
      {
        kTeam: this.kTeamMember,
        cPrename: this.fgTeamMember.get('cPrename').value,
        /*
        cSurName: this.fgTeamMember.get('cSurname').value,
        cTitle: this.oTitle.cTitle,
        bAddressFormally: this.bAddressFormally ? 1 : 0,
        cMailCompany: this.fgTeamMember.get('cMailCompany').value,
        cTrelloUsername: this.fgTeamMember.get('cTrelloUsername').value,
        cPhoneMobile: this.fgTeamMember.get('cPhoneMobile').value,
        cPhoneFixedLine: this.fgTeamMember.get('cPhoneFixedLine').value,
        cShippingStreet: this.fgTeamMember.get('cShippingStreet').value,
        cShippingStreetNumber: this.fgTeamMember.get('cShippingStreetNumber').value,
        cShippingZip: this.fgTeamMember.get('cShippingZip').value,
        cShippingCity: this.fgTeamMember.get('cShippingCity').value,
        nHoursPerWeek: this.fgTeamMember.get('nHoursPerWeek').value,
        nWagePerHour: this.fgTeamMember.get('nWagePerHour').value,
        nGrossSalary: this.fgTeamMember.get('nGrossSalary').value,
        cTaxIdentification: this.fgTeamMember.get('cTaxIdentification').value,
        cHealthInsurance: this.fgTeamMember.get('cHealthInsurance').value,
        cSocialSecurtiyNumber: this.fgTeamMember.get('cSocialSecurtiyNumber').value,
        cNationality: this.fgTeamMember.get('cNationality').value,
        tConfession: this.fgTeamMember.get('tConfession').value,
        cBank: this.fgTeamMember.get('cBank').value,
        cIban: this.fgTeamMember.get('cIban').value,
        nVacation: this.fgTeamMember.get('nVacation').value,
        dBirthday: this.dataTeamMember.dBirthday,
        dStart: this.dataTeamMember.dStart,
        dEnd: this.dataTeamMember.dEnd,
         */


      };

    //console.log(collector);

    // send data
    this.connApi.safePost(this.urlSave, collector).subscribe((data: HttpResponse<any>) => {
      this.toastSaved();
      console.log("TTTEST");
    }, error => {
      //console.log(error);
    });



  }

  loadStates() {
      this.connApi.safeGet(this.urlRegionStates+'/1').subscribe((response : HttpResponse<any>) => {
        this.lStates = response.body
        console.log(response);
        // state
        this.lStates.forEach(state => {
          if (state.id == this.dataTeamMember.kState) {
            this.oState = state;
          }
        })
      }, error => {
        //console.log(error);
      })
  }

  // Toasts
  async toastSaved() {
    const toast = await this.toastController.create({
      message: 'Deine Daten wurden erfolgreich gespeichert.',
      duration: 2500,
      cssClass: 'my-toast',
      position: 'bottom'
    });
    await toast.present();
  }

  // Alerts
  async alertInvalid() {
    const alert = await this.alertController.create({
      header: 'Fehlerhafte Eingabe',
      message: 'Bitte überprüfe deine Daten und korrigiere diese an den markierten Stellen.',
      cssClass: 'my-alert',
      buttons: ['Ok']
    });

    await alert.present();
  }

  async alertCollectorNameForgiven() {
    const alert = await this.alertController.create({
      header: 'Sammlername vergeben',
      message: 'Ihre Daten konnten nicht gespeichert werden. Bitte geben Sie einen anderen Sammlernamen ein.',
      cssClass: 'my-alert',
      buttons: ['Ok']
    });

    await alert.present();
  }

}
