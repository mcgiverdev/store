import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.sass']
})
export class TodoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isEdit = false;
  width: Number = 100;
  person = {
    name: 'Mc Giver',
    age: 26
  }
  tasks: string[] = ['levantarse'];
  task = '';
  register = {
    name: '',
    email: '',
    password: '',
  };
  products: Product[] = [
    {
      name: 'EL mejor juguete',
      price: 565,
      image: './assets/images/toy.jpg',
      category: 'all',
    },
    {
      name: 'Bicicleta casi nueva',
      price: 356,
      image: './assets/images/bike.jpg'
    },
    {
      name: 'Colleción de albumnes',
      price: 34,
      image: './assets/images/album.jpg'
    },
    {
      name: 'Mis libros',
      price: 23,
      image: './assets/images/books.jpg'
    },
    {
      name: 'Casa para perro',
      price: 34,
      image: './assets/images/house.jpg'
    },
    {
      name: 'Gafas',
      price: 3434,
      image: './assets/images/glasses.jpg'
    }
  ]
  openEdit() {
    console.log('open')
    this.isEdit = !this.isEdit;
  }
  saveTask() {
    this.tasks.push(this.task)
    this.task = ''
  }
  deleteTask(index: number) {
    this.tasks.splice(index, 1)
  }
  onRegister() {
    console.log('registrar')
    console.log(this.register)
  }
}
