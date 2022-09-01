import { Component, OnInit } from "@angular/core";
import { IAnimal } from "./animal";
import { AnimalService } from "./animal.service";

 // SELECTOR CAN BE USED VIA HTMLTAG <pp-animals>
@Component({
    selector: 'pp-animals',    
    templateUrl: './animal-list.component.html',
    styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent implements OnInit {
    // OnInit: Lifecycle hook (interface)
    // private _animalService;
    // constructor(animalService : AnimalService) {
    //   this._animalService = animalService;
    // }

    constructor(private animalService: AnimalService) {}
    
    pageTitle: string = 'Animals for Rent';
    imageWidth: number = 100;
    imageMargin: number = 2;
    showImage: boolean = false;
    
    private _listFilter: string = ''; 
    
    public get listFilter(): string {
        return this._listFilter;
    }
    public set listFilter(value: string) {
        this._listFilter = value;
        console.log('In setter:', value);
        this.filteredAnimals = this.performFilter(value);
    }

    filteredAnimals: IAnimal[] = [];
    animals: IAnimal[] = [];

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
      this.animals = this.animalService.getAnimals();
      this.filteredAnimals = this.animals;
    }

    onRatingClicked(message: string) : void {
        this.pageTitle = 'Animal List: ' + message;
    }

    // FILTER BY ANIMAL TYPE OR NAME
    performFilter(filterBy: string): IAnimal[] {
        filterBy = filterBy.toLocaleLowerCase();

        return this.animals.filter((animal: IAnimal) =>
        (animal.animalName.toLocaleLowerCase().includes(filterBy)) || animal.category.toLocaleLowerCase().includes(filterBy));
    
    }
}