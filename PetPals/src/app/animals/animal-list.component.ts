import { Component, OnInit } from "@angular/core";
import { IAnimal } from "./animal";

 // SELECTOR CAN BE USED VIA HTMLTAG <pp-animals>
@Component({
    selector: 'pp-animals',    
    templateUrl: './animal-list.component.html',
    styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent implements OnInit {
    // OnInit: Lifecycle hook (interface)
    
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
    animals: IAnimal[] = [
        {
            "animalId": 1,
            "animalName": "Anna",
            "category": "Dog",
            "description": "This is a short description.",
            "price": 1995,
            "starRating": 3.2,
            "imageUrl": "assets/images/AnnaDog.jpg"
          },
          {
            "animalId": 2,
            "animalName": "Bert",
            "category": "Cat",
            "description": "This is a short description.",
            "price": 199,
            "starRating": 3.2,
            "imageUrl": "assets/images/BertCat.jpg"
          },
          {
            "animalId": 3,
            "animalName": "Caesar",
            "category": "Horse",
            "description": "This is a short description.",
            "price": 1195,
            "starRating": 3.2,
            "imageUrl": "assets/images/CaesarHorse.jpg"
          },
          {
            "animalId": 4,
            "animalName": "David",
            "category": "Fish",
            "description": "This is a short description.",
            "price": 49,
            "starRating": 3.2,
            "imageUrl": "assets/images/DavidFish.jpg"
          },
          {
            "animalId": 5,
            "animalName": "Emma",
            "category": "Turtle",
            "description": "This is a short description.",
            "price": 300,
            "starRating": 3.2,
            "imageUrl": "assets/images/EmmaTurtle.jpg"
          }




    ];

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.listFilter = 'Horse';
    }

    // FILTER BY ANIMAL TYPE OR NAME
    performFilter(filterBy: string): IAnimal[] {
        filterBy = filterBy.toLocaleLowerCase();

        return this.animals.filter((animal: IAnimal) =>
        (animal.animalName.toLocaleLowerCase().includes(filterBy)) || animal.category.toLocaleLowerCase().includes(filterBy));
    
    }
}