import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { map, tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface UploadResult {
  originalname: string;
  filename: string;
  location: string;
}

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private httpClient: HttpClient) {}

  getFile(name: string, url: string, type: string) {
    return this.httpClient
      .get(url, {
        responseType: 'blob',
      })
      .pipe(
        tap((content) => {
          const fileBlob = new Blob([content], { type });

          saveAs(fileBlob, name);
        }),
        map(() => true)
      );
  }

  uploadFile(file: Blob) {
    const api_url_upload = `${environment.API_URL}/api/files/upload`;
    const fileData = new FormData();
    fileData.append('file', file);
    return this.httpClient.post<UploadResult>(api_url_upload, fileData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  }
}
