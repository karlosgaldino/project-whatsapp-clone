export class Base64{

    static getMineType(urlBase64){
        
        let regex = /^data:(.+);base64,(.*)$/;
        let result = urlBase64.match(regex);
        return result[1];
    }

    static toFile(urlBase64){

        let mineType = Base64.getMineType(urlBase64);
        let ext = mineType.split('/')[1];
        let filename = `file${Date.now()}.${ext}`;    

        return fetch(urlBase64)
                    .then(res => {return res.arrayBuffer();})
                    .then(buffer => {return new File([buffer], filename, {type: mineType});});
                   
            
    }
}