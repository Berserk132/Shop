import { AbstractControl, FormControl, FormGroup } from "@angular/forms";



export class ValidationEngine {

    static errorMessage = []
    static extractErrors(controls: { [key: string]: AbstractControl }) {
        this.errorMessage = []
        console.log(controls);

        for (const [key, value] of Object.entries(controls)) {
            ValidationEngine.getErrorMessagesForSingleControl(value)
        }

        return this.errorMessage
    }

    static getErrorMessagesForSingleControl(c: AbstractControl) {
        if (c instanceof (FormControl) || c instanceof (FormGroup)) {

            if ((c.touched || c.dirty) && c.errors) {
                Object.keys(c.errors).map(key => ValidationEngine.errorMessage.push(ValidationEngine.constructMessagesObject({})[key]))
            }
        }
    }


    static constructMessagesObject(params: { [key: string]: any }) {

        let validationMessages = {
            required: 'Please enter your data.',
            email: 'Please enter a valid email address.',
            minlength: `the field length must be greater than ${params['maxLength']}`,
            notEqualAhmed: 'the field not equal to ahmed',
            match: 'The confirmation does not match the email address.',
            range: `The range must be between ${params['minRange']} and ${params['maxRange']}`

        }

        return validationMessages
    }
}
