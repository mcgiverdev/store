import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FilesService } from './services/files.service';
import { UsersService } from './services/users.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  token: string = ''
  imgRta: string = ''
  constructor(private authService: AuthService, private userService: UsersService, private filesService: FilesService) {
  }
  createUser() {
    this.userService.create({
      name: 'Mc Giver', email: 'mcgiver@gmail.com', password: '123456'
    }).subscribe(rta => {
      console.log(rta)
    })
  }
  downloadPdf() {
    this.filesService.getFile("my.pdf", "https://young-sands-07814.herokuapp.com/api/files/dummy.pdf", "application/pdf")
      .subscribe()
  }
  onUpload(event: Event) {
    const element = event.target as HTMLInputElement
    const file = element.files?.item(0)
    if (file) {
      this.filesService.uploadFile(file)
        .subscribe(rta => {
          this.imgRta = rta.location
        })
    }
  }
}
