import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  uploadedFiles!: Array <File>;

  constructor(private uploadService: UploadService) { }

  onUpload() {
    let formData = new FormData();
    for (let i = 0; i < this.uploadedFiles.length; i++) {
      formData.append("productFile", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }

    // llamar el service
    this.uploadService.uploadFile(formData).subscribe((res) => {
      console.log('Response:', res);
    });
  }
  
  onFileChange(e) {
    this.uploadedFiles = e.target.files;
  }

  ngOnInit(): void {
  }

}
