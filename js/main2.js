function load(){
	var $canvas = $('#canvas')
	,	ctx  = document.getElementById('canvas').getContext('2d')
	,   img  = new Image() // background
	,	img2 = new Image() // gun
	,	xHair  	//crosshair position
	,	yHair	
	,	xGPos	//gun position
	,	yGPos
	,	difx
	,	dify
	,	rotation; //gun rotation 
	//img.src  = 'img/Duck-Hunt.jpg';
	img2.src = 'img/rifle.png';
    // img3.src = 'img/gooseSprite.png';
    // bullet.src = 'img/ammunition.png';
	//draw(ctx, xGPos, yGPos, difx, dify, rotation);
	
	$canvas.mousemove(function(e){
		xHair=e.pageX;
		yHair=e.pageY;

		//gun position
		xGPos    = xHair/4+280;
		yGPos    = yHair/4+200;
		difx     = xHair-(235+xGPos);
		dify     = yHair -(230+ yGPos); 
		radians  = Math.atan2(dify,difx);
		rotation = radians+2.36; //135/180deg*pi

		
	});

    function draw(ctx, xGPos, yGPos, difx, dify, rotation) {
        
        //background
        // ctx.save();
        // ctx.drawImage(img,0, 0);     --image is added with html
        // ctx.restore();
        ctx.save();
        ctx.clearRect(0, 0, 600, 360);
        ctx.restore();
        //gun/Linked File
        ctx.save();
        // ctx.translate( 235+xGPos, 230+yGPos);
        // ctx.rotate( rotation );
        // ctx.translate( -235-xGPos, -230-yGPos);
        //ctx.drawImage(img2, 200, 200);
        ctx.drawImage(img2, xGPos, yGPos);
        ctx.restore();

    };

    function crosshairs(ctx, xHair, yHair){
        // cursor/Group/Path
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(xHair -14, yHair+14);
        ctx.lineTo(xHair-6, yHair+14);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgb(236, 27, 35)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // cursor/Group/Path
        ctx.beginPath();
        ctx.moveTo(xHair,yHair);
        ctx.lineTo(xHair, yHair+8);
        ctx.stroke();

        // cursor/Group/Path
        ctx.beginPath();
        ctx.moveTo(xHair+14.0, yHair+14);
        ctx.lineTo(xHair+6.0, yHair+14);
        ctx.stroke();

        // cursor/Group/Path
        ctx.beginPath();
        ctx.moveTo(xHair, yHair+28);
        ctx.lineTo(xHair, yHair+20);
        ctx.stroke();
        ctx.restore();
        ctx.restore();
    }

    

    function drawAmmunition(ctx){
        //console.log(bullets);
        for(i=0;i<bullets;i++){
            //console.log(bullets);
            ctx.drawImage(bullet,17+14*i,287);
        }
    }

    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    window.requestAnimFrame = (function(){
	    return  window.requestAnimationFrame|| 
	    window.webkitRequestAnimationFrame  || 
	    window.mozRequestAnimationFrame     || 
	    window.oRequestAnimationFrame       || 
	    window.msRequestAnimationFrame      || 
	    function(/* function */ callback, /* DOMElement */ element){
	        window.setTimeout(callback, 1000 / 60);
	    };
    })();


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<    ||     //=\\   //=\\    //=\\     >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<    ||    ||   || ||   ||  ||   ||    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<    ||    ||   || ||   ||  ||==//     >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<     ====  \\=//   \\=//   ||         >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//


            //loop that call the request animFrame and all the loop functions
            (function duckHunt() {
                // looping.step();
                // looping.update();
                draw(ctx, xGPos, yGPos, difx, dify, rotation);
                //crosshairs(ctx, xHair, yHair);
                // audioTrigger();
                //drawAmmunition(ctx);
                requestAnimFrame(duckHunt);       //<<<<<recursive - calls itself
            })(); 


}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




           ///////////       //////////       ////////    //                  ///
           ///     /////     ///     ///     ///    ///    ///                ///  
           ///        ///    ///     ///     ///    ///     ///             ///
           ///        ///    /////////       //////////      ///     //    ///
           ///        ///    ///    ///      ///    ///       ///  ////  ///
           ////////////      ///     ///     ///    ///        ///// /////
           /////////         ///      ///    ///    ///         ///  ///

