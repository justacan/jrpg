import ImgSrc from './maps/characters.png'
const data = require('./maps/characters.json')

// console.log(data)

export default class Char {
    constructor(ctx) {
        this.ctx = ctx
    }

    loadImage(src) {
        return new Promise((resolve, reject) => {
            let img = new Image()
            img.src = src;    
            img.onload = () => resolve(img);
        })
    }

    draw(id, pos) {
        return new Promise((resolve, reject) => {
            this.loadImage(ImgSrc)
            .then((image) => {        
                // let pos = this.findPos(e)
                let tile = this.findTile(id)
                this.ctx.drawImage(image, tile.x * 32, tile.y * 32, 32, 32, pos.x * 32, pos.y * 32, 32, 32);
                return resolve();                
            })
        })
        
    }    

    findTile(id) {        
        console.log(id, data.columns)
        let y = Math.floor((id) / data.columns)
        let x = (id) % data.columns
        return {x, y}
    }
}