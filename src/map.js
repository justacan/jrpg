import Overworld from './maps/detail_tile.png'
// const details = require('./maps/detail_tile.json');
const map = require('./maps/test_map.json')

// console.log(data)

export default class Map {
    constructor(ctx) {
        this.canvas = document.createElement("canvas")        
        this.canvas.id = "test"
        this.canvas.width = map.width * 32;
        this.canvas.height = map.height * 32;
        // this.canvas.style = 'visiblity: none'
        this.ctx = this.canvas.getContext('2d');
        console.log(this.ctx)
        this.drawn = null;

    }

    loadImage(src) {
        return new Promise((resolve, reject) => {
            let img = new Image()
            img.src = src;    
            img.onload = () => resolve(img);
        })
    }

    drawMap() {
        return new Promise((resolve, reject) => {
            this.loadImage(Overworld)
            .then((image) => {
                for (let layer of map.layers) {
                    for (let e in layer.data) {
                        if (e) {
                            let pos = this.findPos(e)
                            let tile = this.findTile(layer.data[e])                            
                            this.ctx.drawImage(image, tile.x * 32, tile.y * 32, 32, 32, pos.x * 32, pos.y * 32, 32, 32);
                        }
                    }
                }                                                        
                return resolve(this.drawn)
            })
        })        
    }

    findPos(index, width = 25) {
        let y = Math.floor(index / width)
        let x = index % width
        return {x, y}
    }

    findTile(id) {
        let data = map.tilesets[0]
        console.log(id, data.columns)
        let y = Math.floor((id - data.firstgid) / data.columns)
        let x = (id - data.firstgid) % data.columns
        return {x, y}
    }
}