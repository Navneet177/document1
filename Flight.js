
var canvas, ctx;
var arrflights = new Array();
var nbSteps = 100;
var interval = 75;
var currentTime = 0;
function Plane(posX = "", posY = "", destinationX = "", destinationY = "",departureTime=""){
	this.src ="img/plane.jpg";
	this.imgWidth = 40;
	this.imgHeight = 40;
	this.posX = parseInt(posX);//in these two lines i am using parseInt to convert
	this.posY = parseInt(posY);//the number into the integer value
	this.destX = destinationX;
	this.destY = destinationY;
	this.currentStep = 0;
    this.departureTime = parseInt(departureTime);
	this.draw = function(){
		var plane = document.createElement("img");
		plane.setAttribute("src", this.src);
		console.log("image moving"+""+plane.getAttribute("src")+""+this.posX+""+this.posY);
		ctx.drawImage(plane, this.posX, this.posY, this.imgWidth, this.imgHeight);
	}
	this.updateLocation = function(){
		var distX = this.destX - this.posX;
		var stepsLeft = nbSteps - this.currentStep;
		var distY = this.destY - this.posY;	

		this.posX += distX / stepsLeft;
		this.posY += distY / stepsLeft;
		this.currentStep++;
	}
}

function generateRand(max = 250){
	return Math.random() * max;
}

function drawMap(){
	var map = document.createElement("img");
	map.setAttribute("src","img/Canada-1280-1107.png");
	// in the above line i change a little bit code in which
	//i make correction  in the path of the image which was not given properly before


	map.setAttribute("width", canvas.width);
	map.setAttribute("height", canvas.height);
	ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
}

function drawMovement(){
    currentTime++;
	drawMap();
	for(i = 0; i < arrflights.length; i++){
        if(arrflights[i].departureTime < currentTime){
            arrflights[i].updateLocation();
		    arrflights[i].draw();
        }
		if(arrflights[i].currentStep > nbSteps){
			arrflights.splice(i, 1);
		}

    }
}


$(document).ready(function(){
	canvas = document.getElementById('myCanvas');
	ctx = canvas.getContext('2d');
	drawMap();
    // 1.1 Json structure is incorrect
	var flightJson = '{"flights":[{"departure":"Quebec","departureX":"734","departureY":"427","departureTime":"11","arrival":"Fredericton","arrivalX":"800","arrivalY":"422","duration":"6"},{"departure":"Quebec","departureX":"734","departureY":"427","departureTime":"109","arrival":"Yellowknife","arrivalX":"285","arrivalY":"271","duration":"6"},{"departure":"Quebec","departureX":"734","departureY":"427","departureTime":"62","arrival":"Regina","arrivalX":"336","arrivalY":"417","duration":"6"}]}';
    console.log(flightJson);
    var JSONObject = JSON.parse(flightJson);
	var flights = JSONObject.flights;
    console.log(flights);
    console.log(flights[0].departure);
	$("#myCanvas").click(function(){
		var myPlane;

    for (i=0;i<flights.length;i++)
    // here i make the changes in the for loop to display the data properly.
    {
    console.log(flights[i].departureX+""+ flights[i].departureY +""+flights[i].arrivalX +""+flights[i].arrivalY+""+flights[i].departureTime);
        myPlane = new Plane(flights[i].departureX, flights[i].departureY,flights[i].arrivalX,flights[i].arrivalY,flights[i].departureTime);
        arrflights.push(myPlane);
    }
    console.log(arrflights);
    setInterval(drawMovement, interval); 
	});
});