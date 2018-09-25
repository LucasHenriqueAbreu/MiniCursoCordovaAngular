import { Component, OnInit } from '@angular/core';
import { CordovaService } from '../cordova.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  image: string;
  constructor(
    private cordovaService: CordovaService
  ) { }

  ngOnInit() {
  }

  openCamera() {
    this.cordovaService.openCamera().subscribe(res => {
      this.image = res;
    }, err => alert(err));
  }

}
