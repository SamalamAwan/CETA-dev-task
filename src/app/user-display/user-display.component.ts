import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Address, User } from "../User";
@Component({
  selector: 'app-User-display',
  templateUrl: './User-display.component.html',
  styleUrls: ['./User-display.component.css']
})

export class UserDisplayComponent implements OnInit {

  constructor(private UsersService: UsersService) { }
  public errorMsg!: string;
  public successMsg!: string;
  public users!: User[];
  public columns: string[] = ['name','email','address','website','delete','edit'];
  public loading = true;
  public newUsers! : User[];
  public newAddress! : Address[];
  editable! : boolean;
  nameInput: string = '';
  emailInput: string = '';
  suiteInput: string = '';
  streetInput: string = '';
  cityInput: string = '';
  zipcodeInput: string = '';
  websiteInput: string ='';
  nameEdit: string = '';
  emailEdit: string = '';
  suiteEdit: string = '';
  streetEdit: string = '';
  cityEdit: string = '';
  zipcodeEdit: string = '';
  websiteEdit: string ='';
  idEdit: string = '';
  

  ngOnInit(): void {
    this.UsersService.getUsers()
      .subscribe((users: User[]) => {
        this.users = users;
        this.loading = false;
        console.log(this.users)
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
        this.loading = false;
      })
    }

  deleteUser(id: string){
     let newUsers = this.users;
     this.users = newUsers.filter((newUsers) => newUsers.id !== id)
  }
  editUser(id: string){
    let newUsers = this.users;
    let editableUser = newUsers.filter((newUsers) => newUsers.id == id)
    this.nameEdit = editableUser[0].name;
    this.emailEdit = editableUser[0].email;
    this.suiteEdit = editableUser[0].address.suite.toString();
    this.streetEdit = editableUser[0].address.street.toString();
    this.cityEdit = editableUser[0].address.city.toString();
    this.zipcodeEdit = editableUser[0].address.zipcode.toString();
    this.websiteEdit = editableUser[0].website;
    this.idEdit = editableUser[0].id;
    this.editable = true;
  }
  submitEditUser(){
    let newUsers = this.users;
    let editableUser = newUsers.filter((newUsers) => newUsers.id == this.idEdit)
    editableUser[0].name = this.nameEdit;
    editableUser[0].email = this.emailEdit;
    console.log(editableUser[0])
    editableUser[0].address.suite = this.suiteEdit;
    editableUser[0].address.street = this.streetEdit;
    editableUser[0].address.city = this.cityEdit;
    editableUser[0].address.zipcode = this.zipcodeEdit;
    editableUser[0].website = this.websiteEdit;
    this.editable = false;
  }
  addUser(){
    this.successMsg = '';
    this.errorMsg = '';
    let suite = this.suiteInput;
    let street = this.streetInput;
    let city = this.cityInput;
    let zipcode = this.zipcodeInput;
    let address = {
      suite,
      street,
      city,
      zipcode
    }
    this.UsersService.createUser(this.nameInput, this.emailInput, address, this.websiteInput)
    .subscribe((createdUser: User[]) => {
      this.nameInput = '';
      this.emailInput = '';
      this.suiteInput = '';
      this.streetInput = '';
      this.cityInput = '';
      this.zipcodeInput = '';
      this.websiteInput = '';
      this.successMsg = `User Added`;
      this.users = this.users.concat(createdUser)
    },
    (error: ErrorEvent) => {
      this.errorMsg = error.error.message;
    });
  }
}

