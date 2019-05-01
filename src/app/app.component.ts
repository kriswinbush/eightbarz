import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EightBarz';
  uploadedFileName = "Upload Bars or beats";
  uploadMusicType: any[] = [
    {value: 'bars-0', viewValue: 'Bars'},
    {value: 'beats-1', viewValue: 'Beats'},
    
  ];
  constructor(public auth: AuthService) {
    
  }
  selectFile(file) {
    console.log(file)
    this.uploadedFileName = file.name;
  }
}
