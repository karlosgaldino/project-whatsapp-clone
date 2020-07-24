import { forEach } from "lodash";

export class CameraController{

    constructor(videoEl){

        this._videoEl = videoEl;

        navigator.mediaDevices.getUserMedia({
            video: true
        }).then((stream =>{

            this._stream = stream;
            this._videoEl.srcObject = new MediaStream(stream);
            this._videoEl.play();
        })).catch(err=>{
            console.error((err));
        });


    }

    stop(){

        this._stream.getTracks().forEach(track=>{
            track.stop();
        });
    }

    takePicture(mineType = 'image/png'){

        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');

        canvas.setAttribute('height', this._videoEl.videoHeight);
        canvas.setAttribute('width', this._videoEl.videoWidth);
        context.drawImage(this._videoEl, 0, 0, canvas.width, canvas.height);

        return canvas.toDataURL(mineType);
    }
}