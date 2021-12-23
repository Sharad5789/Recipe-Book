import { Directive, ElementRef, HostListener, HostBinding } from "@angular/core";

@Directive({
    selector:'[basicStyle]'
})
export class BasicStyle{
    @HostBinding('style.backgroundColor') backgroundColor:string = 'transparent';
    @HostBinding('style.color') color:string = 'black';
    constructor(private el: ElementRef){
        // this.renderer.setStyle(el.nativeElement,'background-color', 'grey')
        // this.renderer.setStyle(el.nativeElement,'color', 'white')

    }
    @HostListener('mouseover') mouseover(eventData: Event){
        // this.renderer.setStyle(this.el.nativeElement,'background-color', 'grey')
        // this.renderer.setStyle(this.el.nativeElement,'color', 'white')
        this.backgroundColor = 'grey';
        this.color = 'white';
    }
    @HostListener('mouseleave') mouseleave(eventData: Event){
        // this.renderer.setStyle(this.el.nativeElement,'background-color', 'transparent')
        // this.renderer.setStyle(this.el.nativeElement,'color', 'black')
        this.backgroundColor = 'transparent';
        this.color = 'black';
    }
}