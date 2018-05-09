import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IBook } from '../../interfaces/book.interface';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.css']
})
export class BookModalComponent implements OnInit {

  formBook: IBook;
  dialogTitle: string;

  // Validators
  maxDate: Date = new Date(Date.now());

  bookFormGroup: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<BookModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IBook) {
    // initialise all form controls and add validators
    this.bookFormGroup = new FormGroup({
      authorFormControl: new FormControl('', [
        Validators.required,
        //  Validators.minLength(3),
        Validators.pattern('[A-Za-z() 0-9,.]+')]),
        

      titleFormControl: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z() 0-9,.]+')]),

      dateFormControl: new FormControl('', [
        Validators.required]),

      imageUrlFormControl: new FormControl('', [
        Validators.required]),

      descriptionFormControl: new FormControl('', [
        Validators.required])
    });
  }

  ngOnInit() {
    // if we get data bind to form model else init empty model for form.
    if (this.data) {
      this.formBook = Object.assign({}, this.data);
      this.formBook.date = new Date(this.data.date);
    } else {
      this.dialogTitle = 'Create New Book';
      this.formBook = {
        id: null,
        title: null,
        author: null,
        description: null,
        date: null,
      };
    }
  }

  closeDialog() {
    this.dialogRef.close(null);
  }

  saveBook() {
    this.dialogRef.close(this.formBook);
  }

}





















// import {Component, Inject} from '@angular/core';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

// /**
//  * @title Dialog Overview
//  */
// @Component({
//   selector: 'dialog-overview-example',
//   templateUrl: 'dialog-overview-example.html',
//   styleUrls: ['dialog-overview-example.css'],
// })
// export class DialogOverviewExample {

//   animal: string;
//   name: string;

//   constructor(public dialog: MatDialog) {}

//   openDialog(): void {
//     let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
//       width: '250px',
//       data: { name: this.name, animal: this.animal }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');
//       this.animal = result;
//     });
//   }

// }

// @Component({
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: 'dialog-overview-example-dialog.html',
// })
// export class DialogOverviewExampleDialog {

//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: any) { }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }