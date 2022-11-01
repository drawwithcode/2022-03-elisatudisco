let s //the snake

//the scale of the grid
let scl = 30
let cols
let rows

//snake
let headUp
let headRight
let headLeft
let headDown

let head = 0

let apple //food the snake eats
let body //body of the snake

//sounds
let eatSound
let song //background music
let startOverSound

let fr = 3 //starting framerate
let musicRate = 1 //starting music rate

let food //the food location

function preload() {
	//sounds
	song = loadSound('./assets/sounds/music.mp3') //background music
	eatSound = loadSound('./assets/sounds/alert1.mp3') //sound played every time the snake eats the apple
	startOverSound = loadSound('./assets/sounds/gameover.wav') //game over music
	//images
	headUp = loadImage('./assets/snake/head_up.png')
	headRight = loadImage('./assets/snake/head_right.png')
	headLeft = loadImage('./assets/snake/head_left.png')
	headDown = loadImage('./assets/snake/head_down.png')
	apple = loadImage('./assets/snake/apple.png')
	body = loadImage('./assets/snake/body.png')
}

function setup() {
	backgroundMusic();
	createCanvas(600, 600)

	noStroke()
	//floor represents a whole number
	cols = floor(width / scl) //width of the window divided by scale
	rows = floor(height / scl) //height of the window divided by scale

	s = new Snake()
	frameRate(fr)

	pickLocation() //pick a food location
}

function backgroundMusic() {
	song.play(); // starts playing
	song.setVolume(0.5); // change the volume of the sound file
	userStartAudio(); // enable audio
}

//this function picks a location in the grid
function pickLocation() {
	food = createVector(floor(random(cols)), floor(random(rows))) //the piece of food has a random col and a random row
	food.mult(scl) //food multiplied by the scale
}

//animation loop
function draw() {
	background(0, 0, 0) //black background
	//if the snake eats the food I want to pick a new location
	if (s.eat(food)) {
		eatSound.play()
		fr += 2 //increment the frame rate by 2 every time the snake eats the apple
		musicRate += 0.02
		song.rate(musicRate)
		frameRate(fr)
		pickLocation()
	}

	s.death() //check if the snake hits itself 
	s.update() //update snake
	s.show() //draw snake

	image(apple, food.x, food.y, scl, scl)
}

//moving the snake
function keyPressed() {
	if (keyCode === UP_ARROW) {
		head = 1
		s.dir(0, -1) //0 along the X axis. -1 means go up along the Y axis
	} else if (keyCode === DOWN_ARROW) {
		head = 2
		s.dir(0, 1)
	} else if (keyCode === RIGHT_ARROW) {
		head = 3
		s.dir(1, 0)
	} else if (keyCode === LEFT_ARROW) {
		head = 4
		s.dir(-1, 0)
	} else if (key === "r") {
		location.reload();
	}
}

