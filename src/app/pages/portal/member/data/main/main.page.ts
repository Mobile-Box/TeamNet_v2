import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {ConnApiService} from "../../../../../services/conn-api/conn-api.service";

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
  private kTeamMember = "37";
  private urlTeamMember = 'team/main/';

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
  dataTeamMember;
  bSubmitted = false;
  oState = null;
  lStates = [];
  oRelationship = null;
  lRelationship = [];
  oTitle = null;
  lTitles: any[] = [{cName: 'Herr'}, {cName: 'Frau'}, {cName: 'Herr Dr.'}, {cName: 'Frau Dr.'},];
  bPersonally: boolean = true;


  constructor(private connApi: ConnApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    // teamMember
    this.connApi.safeGet(this.urlTeamMember+this.kTeamMember).subscribe((response) => {
      this.dataTeamMember = response.body;
      let teamMember = response.body;
      console.log(teamMember);
    })

    this.fgTeamMember.controls['cPrename'].setValue("Test-Vorname");
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
    this.bSubmitted = true;

    // check for invalid input
    if (!this.fgTeamMember.valid || this.oState == null || this.oRelationship == null || this.oTitle == null) {
      console.log(this.oState);
      console.log(this.oRelationship);
      console.log(this.oTitle);
      this.alertInvalid();
      return;
    }

    // prepare data
    let collector =
      {
        cPreName: this.fgTeamMember.get('cPreName').value,
        cSurName: this.fgTeamMember.get('cSurname').value,
        cMail: this.fgTeamMember.get('cSurname').value,
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

      };
    console.log(collector);

    // send data
    this.connApi.safePost(this.urlSave, collector).subscribe((data: HttpResponse<any>) => {
      if (data.status == 200) {
        this.toastSaved();
      }
    }, error => {
      console.log(error);
      if (error.status == 406) {
        this.alertCollectorNameForgiven();
      }
    });

  }

}
