
        var gamePiece;
        var obstacles = [];
        var myScore;
        
        function startGame() {
            gamePiece = new component(15, 15, "yellow", 10, 120);
            gamePiece.gravity = 0.05;
            myScore = new component("30px", "Consolas", "black", 280, 40, "text");
            gameArea.start();
        }
        
        var gameArea = {
            canvas : document.createElement("canvas"),
            start : function() {
                this.canvas.width = 700;
                this.canvas.height = 500;
                this.context = this.canvas.getContext("2d");
                document.body.insertBefore(this.canvas, document.body.childNodes[0]);
                this.frameNo = 0;
                this.interval = setInterval(updateGameArea, 20);
                },
            clear : function() {
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
        }
        
        function component(width, height, color, x, y, type) {
            this.type = type;
            this.score = 0;
            this.width = width;
            this.height = height;
            this.speedX = 0;
            this.speedY = 0;    
            this.x = x;
            this.y = y;
            this.gravity = 0;
            this.gravitySpeed = 0;
            this.update = function() {
                ctx = gameArea.context;
                if (this.type == "text") {
                    ctx.font = this.width + " " + this.height;
                    ctx.fillStyle = color;
                    ctx.fillText(this.text, this.x, this.y);
                } else {
                    ctx.fillStyle = color;
                    ctx.fillRect(this.x, this.y, this.width, this.height);
                }
            }
            this.newPos = function() {
                this.gravitySpeed += this.gravity;
                this.x += this.speedX;
                this.y += this.speedY + this.gravitySpeed;
                this.hitBottom();
            }
            this.hitBottom = function() {
                var rockbottom = gameArea.canvas.height - this.height;
                if (this.y > rockbottom) {
                    this.y = rockbottom;
                    this.gravitySpeed = 0;
                }
            }
            this.crashWith = function(otherobj) {
                var left = this.x;
                var right = this.x + (this.width);
                var top = this.y;
                var bottom = this.y + (this.height);
                var otherleft = otherobj.x;
                var otherright = otherobj.x + (otherobj.width);
                var othertop = otherobj.y;
                var otherbottom = otherobj.y + (otherobj.height);
                var crash = true;
                if ((bottom < othertop) || (top > otherbottom) || (right < otherleft) || (left > otherright)) {
                    crash = false;
                }
                return crash;
            }
        }
        
        function updateGameArea() {
            var x, height, gap, minHeight, maxHeight, minGap, maxGap;
            for (i = 0; i < obstacles.length; i += 1) {
                if (gamePiece.crashWith(obstacles[i])) {
                    return;
                } 
            }
            gameArea.clear();
            gameArea.frameNo += 1;
            if (gameArea.frameNo == 1 || everyinterval(150)) {
                x = gameArea.canvas.width;
                minHeight = 10;
                maxHeight = 300;
                height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
                minGap = 40;
                maxGap = 200;
                gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
                obstacles.push(new component(30, height, "lightgreen", x, 0));
                obstacles.push(new component(30, x - height - gap, "lightgreen", x, height + gap));
            }
            for (i = 0; i < obstacles.length; i += 1) {
                obstacles[i].x += -1;
                obstacles[i].update();
            }
            myScore.text="SCORE: " + gameArea.frameNo;
            myScore.update();
            gamePiece.newPos();
            gamePiece.update();
        }
        
        function everyinterval(n) {
            if ((gameArea.frameNo / n) % 1 == 0) {return true;}
            return false;
        }
        
        function accelerate(n) {
            gamePiece.gravity = n;
        }
