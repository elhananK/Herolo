import { Directive, forwardRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NG_VALIDATORS } from '@angular/forms';
import { IBook } from '../interfaces/book.interface';
import { BooksService } from '../services/books/books.service';

@Directive({
    selector: '[appDuplicateTitle]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: DuplicateTitleValidatorDirective,
            multi: true
        }
    ]
})

export class DuplicateTitleValidatorDirective {
    validator: Function;

    constructor(public bService: BooksService) {
        this.validator = this.duplicateTitleValidator(bService.allBooks);
    }

    validate(control: FormControl) {
        return this.validator(control);
    }

     duplicateTitleValidator(books: IBook[]) {
        let originalBookTitle: string;
    
        return (control: FormControl) => {
    
            if (control.value) {
    
                if (books.find((book) => book.title === control.value)) {
                    originalBookTitle = books.find((book) => book.title === control.value).title;
                }
    
            }
    
            // if no collection or collection size is equal to 0 then the value is valid
            if (!books || books.length <= 0) {
                return null;
            }
    
            const bookWithGivenTitle = books.find((book) => book.title === control.value);
    
            // if not found a book with the same title then the value is valid
            // if (!bookWithGivenTitle || !(originalBookTitle === control.value) {
            if (!bookWithGivenTitle || originalBookTitle === control.value) {
                return null;
            }
    
            return {
                appDuplicateTitle: {
                    valid: false
                }
            };
        };
    
    }
}


