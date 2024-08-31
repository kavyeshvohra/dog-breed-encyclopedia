import { Component, OnInit } from '@angular/core';
import { DogApiService } from '../dog-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
@Component({
  selector: 'app-dog-breed-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dog-breed-list.component.html',
  styleUrl: './dog-breed-list.component.css'
})
export class DogBreedListComponent implements OnInit{
  dogBreeds: string[] = [];
  dogImages: { [breed: string] : string} = {};
  filteredBreeds: string[] = [];
  searchTerm: string = '';
  sortOrder: string = 'asc';

  constructor(private dogBreedService: DogApiService){}

  ngOnInit(): void {
    this.dogBreedService.getBreeds().subscribe({
      next: breedsData => {
        this.dogBreeds = Object.keys(breedsData.message);
        this.filteredBreeds = [...this.dogBreeds];
        this.fetchDogImages();
      },
      error: err=> console.error('Error fetching breeds: ', err)
    })
  }

  fetchDogImages(): void {
    const imageRequests: Observable<any>[] = this.dogBreeds.map(breed =>
      this.dogBreedService.getDogImage(breed)
    );

    forkJoin(imageRequests).subscribe({
      next: imagesData => {
        imagesData.forEach((imageResponse: any, index: number) => {
          const breed = this.dogBreeds[index];
          this.dogImages[breed] = imageResponse.message;
        });
      },
      error: err => console.error('Error fetching images:', err)
    });
  }

  filterBreeds(): void{
    this.filteredBreeds = this.dogBreeds.filter(breed => {
      const isMatch = breed.toLowerCase().includes(this.searchTerm.toLowerCase());
      return isMatch;
    });

  }

  sortBreeds(order: string): void{
    this.sortOrder = order;
    this.filteredBreeds.sort((a,b)=>this.sortOrder==='asc'?a.localeCompare(b):b.localeCompare(a))
  }
}