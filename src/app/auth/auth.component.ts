import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private auth: AuthService, private router: Router){}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if(!form.valid) return 
        const email = form.value.email;
        const password = form.value.password;

        this.isLoading = true;

        let authObs: Observable<AuthResponseData>

        if(this.isLoginMode) {
            authObs = this.auth.login(email, password);
        } else {
            authObs = this.auth.signUp(email, password);
        }

        authObs.subscribe(
            response => {
                console.log(response)
                this.isLoading = false;
                this.router.navigate(['./recipes'])
            }, 
            errorMessage => {
                this.error = errorMessage;
                this.isLoading = false;
            }
            )

        form.reset()
    }
}