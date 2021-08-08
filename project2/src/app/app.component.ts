import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Directive, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name!: string;
  address!: string;
  phone!: string;
  searchname!: string;
  errorMessage: any;
  message: any;
  result: any;
  htmlTable: any;
  listData: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {

  }


  saveUniversity() {

    console.log(this.name, this.address, this.phone)
    const data = { 'Name': this.name, 'Address': this.address, 'PhoneNumber': this.phone }
    const jsonData = JSON.stringify(data)
    console.log(jsonData)

    //send to server to store in db
    this.http.post<any>("http://dev.cs.smu.ca:8106/addUniversity", { 'Name': this.name, 'Address': this.address, 'PhoneNumber': this.phone }).subscribe({
      next: data => {
        this.message = data.message;
        console.log(this.message);
        alert("Inserted university successfully")
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    })
  }

  deleteUniversity() {
    console.log(this.name, this.address, this.phone)

    this.http.post<any>("http://dev.cs.smu.ca:8106/deleteUniversity", { 'Name': this.name }).subscribe({
      next: data => {
        this.message = data.message;
        console.log(this.message);
        alert("Deleted university successfully!");
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    })
  }

  searchUniversity() {
    console.log(this.name)

    this.http.post<any>("http://dev.cs.smu.ca:8106/getUniversity", { 'Name': this.searchname }).subscribe({
      next: data => {
        // this.message = data.message;
        // console.log(this.message);
        // alert(this.message);
        var university = data

        if (university == null || university.length == 0) {
          alert("No record found"); //no record whatsoever, let the user know
          this.name = ""
          this.address = ""
          this.phone = ""
        }
        else {
          //alert('Found matched university!!');
          var name = university[0].Name;
          var address = university[0].Address;
          var phone = university[0].PhoneNumber;
          //now fill the form
          this.name = name
          this.phone = phone
          this.address = address
          console.log(this.name, this.address, this.phone)
        }//end else 
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    })
  }

  displayUniversities() {

    this.http.post<any>("http://dev.cs.smu.ca:8106/allUniversities", {}).subscribe({
      next: data => {

        //var universities = data
        this.listData = data

        if (this.listData == null || this.listData.length == 0) {
          alert("No record found"); //no record whatsoever, let the user know
          this.name = ""
          this.address = ""
          this.phone = ""
        }
        else {
        }//end else 
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    })

  }

}
