import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IAnimal } from './animal';
import { AnimalService } from './animal.service';

@Component({
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.css']
})
export class AnimalDetailComponent implements OnInit {
  pageTitle : string = 'Animal Details'
  animal : IAnimal | undefined;
  errorMessage: string = '';
  sub!: Subscription;

  constructor(private route: ActivatedRoute, 
    private animalService : AnimalService,
    private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += `: ${id}`;

    this.sub = this.animalService.getAnimal(id).subscribe({
      // OBSERVER OBJECT (key:value):
      next: animal => {
        this.animal = animal;
      }, 
      error: err => this.errorMessage = err
    });
  }

  // ROUTING BY CODE
  onBack() : void {
    this.router.navigate(['/animals'])

  }

}
