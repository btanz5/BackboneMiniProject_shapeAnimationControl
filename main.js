/*
	This is a simple Backbone.js App that allows the user 
	to control movement of shape objects on the screen. 
*/

/*
	Model
			*/
var Square = Backbone.Model.extend({});

var MovementButton = Backbone.Model.extend({});

/*
	Collection
			*/
var Squares = Backbone.Collection.extend({
	model: Square
});

var movementButtons =Backbone.Collection.extend({
	model: MovementButton
});
/*
	View
			*/
var SquareView = Backbone.View.extend({
	tagName: "div",
	className: "squareClass",

	initialize: function(moveSq){
		this.bus = moveSq.bus
	},

	render: function(){
		this.setDimensions();
		this.setPosition();
		this.setColor();
		return this;
	},

	setDimensions: function(){
		this.$el.css({
			width: this.model.get("width") + "px",
			height: this.model.get("height") + "px"
		});
	},

	setPosition: function(){
		var position = this.model.get("position");
		this.$el.css({
			left: position.x,
			top: position.y
		});
	},

	setColor: function(){
		this.$el.css({"backgroundColor" : this.model.get("color")});
	}

});

var SquaresView = Backbone.View.extend({
	tagName: "div",
	className: "squaresClass",

	initialize: function(moveSq){
		this.bus = moveSq.bus
		this.bus.on("moveSqRight", this.moveSquareRight, this);
		this.bus.on("moveSqLeft", this.moveSquareLeft, this);
		this.bus.on("moveSqUp", this.moveSquareUp, this);
		this.bus.on("moveSqDown", this.moveSquareDown, this);
	},

	moveSquareRight: function(){
		this.$el.css("left", this.$el.position().left + 1);
	},

	moveSquareLeft: function(){
		this.$el.css("left", this.$el.position().left - 1);
	},

	moveSquareUp: function(){
		this.$el.css("top", this.$el.position().top - 1);
	},

	moveSquareDown: function(){
		this.$el.css("top", this.$el.position().top + 1);
	},

	render: function(){
		var that = this;
		this.model.each(function(square){
			var squareView = new SquareView({ model: square, bus: bus});
			that.$el.append(squareView.render().$el);
		});
	}

});

var MovementButtonView = Backbone.View.extend({
	tagName: "button",

	initialize: function(moveSq){
		this.bus = moveSq.bus
	},

	events:{
		"click .moveRightBtn": "moveRight",
		"click .moveLeftBtn": "moveLeft",
		"click .moveUpBtn": "moveUp",
		"click .moveDownBtn": "moveDown"
	},

	moveRight: function(e){
		this.bus.trigger("moveSqRight");
		e.stopPropagation();
	},

	moveLeft: function(e){
		this.bus.trigger("moveSqLeft");
		e.stopPropagation();
	},

	moveUp: function(e){
		this.bus.trigger("moveSqUp");
		e.stopPropagation();
	},
	
	moveDown: function(e){
		this.bus.trigger("moveSqDown");
		e.stopPropagation();
	},

	render: function(){
		this.$el.html("<button class='moveRightBtn'>Move Right</button><button class='moveLeftBtn'>Move Left</button><button class='moveUpBtn'>Move Up</button><button class='moveDownBtn'>Move Down</button>");
		return this;
	}
});

var bus = _.extend({}, Backbone.Events);

var squares = new Squares([
	square1 = new Square({width: 50,
							height: 50,
							position: { x: 25, y: 50 },
							color: "#7AA"}),
	square2 = new Square({width: 50,
							height: 50,
							position: { x: 25, y: 110 },
							color: "#7AA"}),
	square3 = new Square({width: 50,
							height: 50,
							position: { x: 25, y: 170 },
							color: "#7AA"}),
	square4 = new Square({width: 50,
							height: 50,
							position: { x: 25, y: 230 },
							color: "#7AA"}),
	square5 = new Square({width: 50,
							height: 50,
							position: { x: 25, y: 290 },
							color: "#7AA"}),		
]);

var squaresView = new SquaresView({ el: ".squaresClass", model: squares, bus: bus});
squaresView.render();

var movementButtonView = new MovementButtonView({ el: ".movementButtonClass", model: squares, bus: bus});
movementButtonView.render(); 





