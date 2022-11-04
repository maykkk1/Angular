import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;

    constructor(private auth: AuthService){}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if(!form.valid) return 
        const email = form.value.email;
        const password = form.value.password;

        this.isLoading = true;
        if(this.isLoginMode) {
            //
        } else {
            this.auth.signUp(email, password).subscribe(
                response => {
                    console.log(response)
                    this.isLoading = false;
                }, 
                error => {
                    console.log(error)
                    this.isLoading = false;
                }
                )
        }
        form.reset()
    }
}