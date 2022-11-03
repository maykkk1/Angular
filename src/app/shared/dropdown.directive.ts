import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from "@angular/core";


@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
    constructor(private elRef: ElementRef, private renderer: Renderer2) {}
    ngOnInit(): void {
        
    }

    @HostListener('click') click(eventData: Event) {
        const dropdownIsOpen = this.elRef.nativeElement.classList.contains('open')
        dropdownIsOpen
        ? this.renderer.removeClass(this.elRef.nativeElement, 'open')
        : this.renderer.addClass(this.elRef.nativeElement, 'open')
    }
}