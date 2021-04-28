class Ground {
    constructor(x,y,width,height) {
      var options = {
          isStatic: true
      }
      this.body = Bodies.rectangle(x,y,width,height,options);
      this.width = width;
      this.height = height;
      this.image = loadImage("images/platform.png")
      World.add(world, this.body);
    }
    display(){

      translate(this.body.position.x, this.body.position.y);  

      //rectMode(CENTER);
      //fill("pink");
      //rect(0,0,this.width,this.height)
      
      imageMode(CENTER);
      image(this.image, 0, 0, this.width, this.height);

    }
  };