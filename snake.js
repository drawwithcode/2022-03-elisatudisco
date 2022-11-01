function Snake() {
    //snake position
    this.x = 0
    this.y = 0
    //snake speed
    this.xspeed = 1 //when the game starts, the snake moves to the right
    this.yspeed = 0
    //snake length
    this.total = 0 //if the snake eats the food, the total number goes up
    //tail location
    this.tail = []

    //check to see if it is eating food
    this.eat = function (pos) {
        //position that locates the food
        let d = dist(this.x, this.y, pos.x, pos.y) //distance between where the snake actually is and where the food is
        if (d < 1) {
            //this function tells me if the snake reaches the food
            this.total++
            return true
        } else {
            return false
        }
    }

    //set its direction
    this.dir = function (x, y) {
        this.xspeed = x
        this.yspeed = y
    }

    //check to see if it hits itself
    this.death = function () {
        for (let i = 0; i < this.tail.length; i++) {
            let pos = this.tail[i]
            d = dist(this.x, this.y, pos.x, pos.y)
            if (d < 1) {
                startOverSound.play() //game over music
                song.stop() //stop the background music
                noLoop() //stop the game
                background(0, 0, 0); // game over screen

                push()
                //shadow effect on the writing
                drawingContext.shadowOffsetX = 5;
                drawingContext.shadowOffsetY = 5;
                drawingContext.shadowBlur = 32;
                drawingContext.shadowColor = color(255, 255, 255);

                textFont('Wallpoet');
                textStyle(ITALIC);
                textAlign(CENTER);
                textSize(60);
                text("GAME OVER", width / 2, height / 2);

                textStyle(NORMAL);
                textFont('Chakra Petch');
                textSize(20);
                text("Press R to restart", width / 2, height / 2 + 50);
                pop()
            }
        }
    }

    // update location
    this.update = function () {
        // expand snake
        if (this.total === this.tail.length) {
            for (var i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1]
            }
        }
        // newest position
        this.tail[this.total - 1] = createVector(this.x, this.y)

        // move snake
        this.x = this.x + this.xspeed * scl
        this.y = this.y + this.yspeed * scl

        // keep on screen
        if (this.x > width - scl) {
            this.x = 0
        } else if (this.x < 0) {
            this.x = width - scl
        }
        if (this.y > height - scl) {
            this.y = 0
        } else if (this.y < 0) {
            this.y = height - scl
        }
    }

    // draw snake
    this.show = function () {
        for (let i = 0; i < this.tail.length; i++) {
            let hu = map(i - 1, -1, this.tail.length, 0, 255)
            fill(hu, 255, 255)
            image(body, this.tail[i].x, this.tail[i].y, 30, 30)
        }

        image(headRight, this.x, this.y, scl, scl)

        if (head == 1) {
            image(headUp, this.x, this.y, scl, scl)
        } else if (head == 2) {
            image(headDown, this.x, this.y, scl, scl)
        } else if (head == 3) {
            image(headRight, this.x, this.y, scl, scl)
        } else if (head == 4) {
            image(headLeft, this.x, this.y, scl, scl)
        }
    }
}
