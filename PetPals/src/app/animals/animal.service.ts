import { Injectable } from "@angular/core";
import { IAnimal } from "./animal";

@Injectable({
    providedIn: 'root'  // ROOT: AVAILABLE EVERYWHERE 
})
export class AnimalService {
    getAnimals(): IAnimal[] {
        return [
            {
                "animalId": 1,
                "animalName": "Anna",
                "category": "Dog",
                "description": "This is a short description.",
                "price": 1995,
                "starRating": 4.1,
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
                "starRating": 1,
                "imageUrl": "assets/images/CaesarHorse.jpg"
              },
              {
                "animalId": 4,
                "animalName": "David",
                "category": "Fish",
                "description": "This is a short description.",
                "price": 49,
                "starRating": 3.6,
                "imageUrl": "assets/images/DavidFish.jpg"
              },
              {
                "animalId": 5,
                "animalName": "Emma",
                "category": "Turtle",
                "description": "This is a short description.",
                "price": 300,
                "starRating": 2.9,
                "imageUrl": "assets/images/EmmaTurtle.jpg"
              }
    
    
    
    
        ];
    }

}