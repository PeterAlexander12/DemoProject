import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";

// THIS COMPONENT IS NESTED IN animal-list.component
@Component({
    selector: 'pp-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges{
    @Input() rating: number = 0;
    cropWidth: number = 75;

    // SENDS FROM CHILD COMPONENT TO PARENT
    @Output() ratingClicked: EventEmitter<string> = 
    new EventEmitter<string>();

    // LIFECYCLE HOOK (interface)
    ngOnChanges(): void {
        this.cropWidth = this.rating * 75/5;
    }

    onClick(): void {
        this.ratingClicked.emit(`The rating ${this.rating} was clicked`);
    }

}