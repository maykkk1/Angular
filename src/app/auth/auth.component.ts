import { Component, ComponentFactoryResolver, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

    constructor(private auth: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver){}

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
                this.showErrorAlert(errorMessage);
                this.isLoading = false;
            }
            )

        form.reset()
    }

    onHandleError() {
        this.error = null;
    }

    private showErrorAlert(message: string) {
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        hostViewContainerRef.createComponent(alertCmpFactory);
    }
}