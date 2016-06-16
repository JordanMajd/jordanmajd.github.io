'use strict';

//GAME OF LIFE
(function () {
  'use strict';

  var directions = [new Vector2(0, -1), new Vector2(1, -1), new Vector2(1, 0), new Vector2(1, 1), new Vector2(0, 1), new Vector2(-1, 1), new Vector2(-1, 0), new Vector2(-1, -1)];

  var colors = ['#FF5722' /*, '#f44336', '#ffeb3b' */];
  var backgroundColor = '#FFF';

  function GameOfLife(width, height, scale, canvasId, tickRate) {

    this.canvasId = canvasId;
    this.startTime = 0;
    this.scale = scale;
    this.tickRate = tickRate || 333;

    this.matrix = new Matrix2(Math.trunc(width / scale), Math.trunc(height / scale));
    this.matrix.createGrid();
  }

  GameOfLife.prototype.update = function () {
    var self = this;
    this.matrix.forEach(function (cell, vector) {
      var neighborCount = self.matrix.getLivingNeighborCount(vector);
      cell.act(neighborCount);
    });
  };

  GameOfLife.prototype.draw = function () {
    var canvas = document.getElementById(this.canvasId);
    var context = canvas.getContext('2d');

    if (!this.aliveStyle || Math.random() < 0.3) {
      this.aliveStyle = colors[Math.floor(Math.random() * colors.length)];
    }
    this.matrix.forEach(function (cell, vector) {
      if (cell.alive) {
        context.fillStyle = this.aliveStyle;
      } else {
        context.fillStyle = backgroundColor;
      }
      context.fillRect(vector.x * this.scale, vector.y * this.scale, this.scale, this.scale);
    }, this);
  };

  GameOfLife.prototype.tick = function (timestamp) {

    if (timestamp - this.startTime > this.tickRate) {
      this.update();
      this.draw();
      this.startTime = timestamp;
    }

    var self = this;
    window.requestAnimationFrame(function (timestamp) {
      self.tick.call(self, timestamp);
    });
  };

  GameOfLife.prototype.run = function () {
    var self = this;
    window.requestAnimationFrame(function (timestamp) {
      self.tick.call(self, timestamp);
    });
  };

  function Vector2(x, y) {
    this.x = x;
    this.y = y;
  }

  Vector2.prototype.add = function (other) {
    return new Vector2(this.x + other.x, this.y + other.y);
  };

  function Matrix2(width, height) {

    this.matrix = new Array(width * height);
    this.width = width;
    this.height = height;
  }

  Matrix2.prototype.createGrid = function () {
    this.forEach(function (cell, vector) {
      var isAlive = Math.random() < 0.15;
      this.set(vector, new Cell(isAlive));
    }, this);
  };

  Matrix2.prototype.isInside = function (vector) {
    return vector.x >= 0 && vector.x < this.width && vector.y >= 0 && vector.y < this.height;
  };

  Matrix2.prototype.get = function (vector) {
    return this.matrix[vector.x + this.width * vector.y];
  };

  Matrix2.prototype.set = function (vector, value) {
    this.matrix[vector.x + this.width * vector.y] = value;
  };

  Matrix2.prototype.getLivingNeighborCount = function (vector) {
    var livingCount = 0;
    var self = this;
    directions.forEach(function (direction) {
      var checkDirection = vector.add(direction);
      if (self.isInside(checkDirection)) {
        var cell = self.get(checkDirection);
        if (cell.alive) {
          livingCount++;
        }
      }
    });
    return livingCount;
  };

  Matrix2.prototype.forEach = function (callbackFunc, context) {
    var yCount = 0;
    var xCount = 0;
    for (var y = 0; y < this.height; y++) {
      yCount++;
      for (var x = 0; x < this.width; x++) {
        xCount++;
        var cell = this.matrix[x + y * this.width];
        callbackFunc.call(context, cell, new Vector2(x, y));
      }
    }
  };

  function Cell(isAlive) {
    this.alive = isAlive;
  }

  Cell.prototype.act = function (neighborCount) {
    if (this.alive && (neighborCount < 2 || neighborCount > 3)) {
      this.alive = false;
    } else if (neighborCount === 3) {
      this.alive = true;
    }
  };

  var canvasContainer = document.getElementById('splash-container');
  var canvas = document.getElementById('splash');

  var width = canvasContainer.scrollWidth;
  var height = canvasContainer.scrollHeight;

  var blockSize = 64;
  var scale = Math.ceil(canvasContainer.scrollWidth / blockSize);

  canvas.width = width;
  canvas.height = height;

  var tickRate = 1000;

  var gol = new GameOfLife(width, height, scale, 'splash', tickRate);
  gol.run();

  window.onresize = function () {

    width = canvasContainer.scrollWidth;
    height = canvasContainer.scrollHeight;

    canvas.width = width;
    canvas.height = height;

    gol = new GameOfLife(width, height, scale, 'splash', tickRate);
  };
})();