import React, { Component } from 'react';
import MainMap from './map'
import Char from './char'
import './bootstrap/css/bootstrap.min.css'





class Game {
  constructor (canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx
    this.load();

    window.onkeydown = (e) => {
      var key = e.keyCode ? e.keyCode : e.which;

      if (key === 38) {
        console.log("Up")
        this.targetPos.y -= 32;
        return;
      } else if (key === 40) {
        console.log('down')
        this.targetPos.y += 32;
        return;
      }
    }

    this.charPos = {x:0, y:0}
    this.targetPos = {x:0, y:0}
  }

 lerp(position, targetPosition) {
  position.x += (targetPosition.x - position.x)*0.1;
  position.y += (targetPosition.y - position.y)*0.1;
}

  mainLoop = (timestamp) => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);       
    this.lerp(this.charPos, this.targetPos);
    this.ctx.drawImage(this.m.canvas, this.charPos.x, this.charPos.y);    
    
    // this.ctx.putImageData(this.currentMap,this.charPos.x, this.charPos.y); 
    window.requestAnimationFrame(this.mainLoop);
  }  

  load = async () => {
    this.m = new MainMap()
    // this.c = new Char(this.ctx);
    await this.m.drawMap();
    // await this.c.draw(7, this.charPos);    
    this.ctx.drawImage(this.m.canvas, 0, 0);
    window.requestAnimationFrame(this.mainLoop);
  }
}


class Canvas extends Component {

  componentDidMount() {
    const canvas = document.getElementById('main_canvas');
    const ctx = canvas.getContext('2d');

    new Game(canvas, ctx)
  }

  render() {
    return (
      <canvas
        id="main_canvas"
        style={{backgroundColor: "black"}}
        width="800"
        height="600" />
    )      
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">              
              <Canvas/>
            </div>          
          </div>
        </div>        
      </div>
    );
  }
}

export default App;
