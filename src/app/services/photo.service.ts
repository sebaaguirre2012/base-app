import { Injectable } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
    providedIn: 'root'
})
export class PhotoService {

    constructor(private storage: AngularFireStorage) { }

    async takePhoto() {
        const image = await Camera.getPhoto({
            resultType: CameraResultType.Base64, // Puedes elegir el tipo de resultado que desees
        });

        const imageData = image.base64String;
        return imageData;
    }

    async uploadImageFromBase64(base64Data: string, path: string, name: string) {
        path = path + '/' + name;
        const ref = this.storage.ref(path);

        // Decodifica la cadena base64 en un ArrayBuffer
        const blob = this.dataURItoBlob(base64Data);

        // Sube el blob a Firebase Storage
        const task = ref.put(blob);

        return new Promise<string>((resolve, reject) => {
            task.snapshotChanges().pipe(
                finalize(() => {
                    ref.getDownloadURL().subscribe((downloadURL) => {
                        resolve(downloadURL);
                    });
                })
            ).subscribe(
                () => { },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    // Esta función convierte una cadena base64 en un blob
    dataURItoBlob(base64Data: string) {

        const byteCharacters = atob(base64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: 'image/jpeg' });
    }

}

