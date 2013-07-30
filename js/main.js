function load(){
	var $canvas = $('#canvas')
	,	ctx  = document.getElementById('canvas').getContext('2d')
    ,   $tally = document.getElementById("score")
	,   img  = new Image()
	,	img2 = new Image() // Create new img element
    ,   img3 = new Image() // goose sprite
    ,   bullet = new Image()
    ,   a = 0 //initial speed to the ground
    ,   b = 0
    ,   c = 0
    ,   d = 0
    ,   e = 0
    ,   f = 0
    ,   g = 0
    ,   h = 0 
	,	xHair  	//crosshair position
	,	yHair
	,	xGPos	//gun position
	,	yGPos
	,	difx
	,	dify
	,	rotation //gun rotation 
    ,   canvasWidth = 600
    ,   offset      = 50
    ,   count       = 0
    ,   frame       = 0
    ,   bird        = 0
    ,   trigger     = 0
    ,   goose1Hit   = false
    ,   goose2Hit   = false
    ,   goose3Hit   = false
    ,   goose4Hit   = false
    ,   goose5Hit   = false
    ,   goose6Hit   = false
    ,   goose7Hit   = false
    ,   goose8Hit   = false
    ,   bullets     = 10
    ,   hit         = 0 
    ,   $goosey     = {'img':img3,'sx1':  0, 'sy':0, 'sx2': 50, 'sw':50,'sh':50, 'dx':  -1,'dy':20, 'dw':50, 'dh':50}
    ; 

  var   frameTrigger= [400,1000,1020,1200,1800,1860, 2400, 2440, 2480];
  var   geese = [
                {'img':img3,'sx1':  0, 'sy':0, 'sx2': 50, 'sw':50,'sh':50, 'dx': 600+Math.round(Math.random()*30),'dy':20, 'dw':50, 'dh':50},
                {'img':img3,'sx1':100, 'sy':0, 'sx2':150, 'sw':50,'sh':50, 'dx':1000,'dy':20, 'dw':50, 'dh':50},
                {'img':img3,'sx1':200, 'sy':0, 'sx2':250, 'sw':50,'sh':50, 'dx':1600,'dy':20, 'dw':50, 'dh':50},
                {'img':img3,'sx1':300, 'sy':0, 'sx2':350, 'sw':50,'sh':50, 'dx':1620+Math.round(Math.random()*30),'dy':20, 'dw':50, 'dh':50},
                {'img':img3,'sx1':400, 'sy':0, 'sx2':450, 'sw':50,'sh':50, 'dx':1800+Math.round(Math.random()*30),'dy':20, 'dw':50, 'dh':50},
                {'img':img3,'sx1':  0, 'sy':0, 'sx2': 50, 'sw':50,'sh':50, 'dx':2460+Math.round(Math.random()*30),'dy':20, 'dw':50, 'dh':50},
                {'img':img3,'sx1':100, 'sy':0, 'sx2':150, 'sw':50,'sh':50, 'dx':3000,'dy':20, 'dw':50, 'dh':50},
                {'img':img3,'sx1':200, 'sy':0, 'sx2':250, 'sw':50,'sh':50, 'dx':3080,'dy':20, 'dw':50, 'dh':50}
                ]
        console.log(geese[0]);


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





	img.src  = 'img/Duck-Hunt.jpg'; // Set source path
	img2.src = 'img/rifle.png';
    img3.src = 'img/gooseSprite.png';
    bullet.src = 'img/ammunition.png';


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

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<    ||     //=\\   //=\\    //=\\     >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<    ||    ||   || ||   ||  ||   ||    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<    ||    ||   || ||   ||  ||==//     >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<     ====  \\=//   \\=//   ||         >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//


            //loop that call the request animFrame and all the loop functions
            (function duckHunt() {
                // looping.step();
                // looping.update();
                draw(ctx, xGPos, yGPos, difx, dify, rotation);
                crosshairs(ctx, xHair, yHair);
                drawGeese(ctx);
                audioTrigger();
                drawAmmunition(ctx);
                requestAnimFrame(duckHunt);       //<<<<<recursive - calls itself
            })();                               //<<<<<self initialising loop
        

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<     //=\\  //=\\  ||\  /|| ||====     >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<    ||     ||   || ||\\//|| ||         >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<    ||   ~ ||===|| || \/ || ||===      >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//   
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<     \\=// ||   || ||    || ||====     >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

        function audioTrigger(){
            if(frame<4){
                gooseCall();
                call=false;
            };
            if(frame===580){
                gooseCall();
                call=false;
            };
            if(frame===1280){
                gooseCall();
                call=false;
            };
        }
        
        function gooseCall(){
            var $sound = $('#audio');
            $sound.get(0).play();
        }

        $canvas.mousedown(function(e) {
            //alert('Handler for .mousedown() called.');
            x=e.pageX;
            y=e.pageY;
            var $shot = $('#gun');
            $shot.get(0).play();
            bullets--;
            if(x>(goose1PosX) && y>($goosey.dy)){
                if(x<(goose1PosX+30)&& y<($goosey.dy+20)){
                    //alert('hit');
                    birdHit();
                    goose1Hit=true;
                }

            }
            if(x>(goose2PosX) && y>($goosey2.dy)){
                if(x<(goose2PosX+30)&& y<($goosey2.dy+20)){
                    //alert('hit');
                    birdHit();
                    goose2Hit=true;
                }
            }    
            if(x>(goose3PosX) && y>($goosey3.dy)){
                if(x<(goose3PosX+30)&& y<($goosey3.dy+20)){
                    //alert('hit');
                    birdHit();
                    goose3Hit=true;
                }
            } 
            if(x>(goose4PosX) && y>($goosey4.dy)){
                if(x<(goose4PosX+30)&& y<($goosey4.dy+20)){
                    //alert('hit');
                    birdHit();
                    goose4Hit=true;
                }
            } 
            if(x>(goose5PosX) && y>($goosey5.dy)){
                if(x<(goose5PosX+30)&& y<($goosey5.dy+20)){
                    //alert('hit');
                    birdHit();
                    goose5Hit=true;
                }
            } 
            if(x>(goose6PosX) && y>($goosey6.dy)){
                if(x<(goose6PosX+30)&& y<($goosey6.dy+20)){
                    //alert('hit');
                    birdHit();
                    goose6Hit=true;
                }
            } 
            if(x>(goose7PosX) && y>($goosey7.dy)){
                if(x<(goose7PosX+30)&& y<($goosey7.dy+20)){
                    //alert('hit');
                    birdHit();
                    goose7Hit=true;
                }
            } 
            if(x>(goose8PosX) && y>($goosey8.dy)){
                if(x<(goose8PosX+30)&& y<($goosey8.dy+20)){
                    //alert('hit');
                    birdHit();
                    goose8Hit=true;
                }
            } 
            




            function birdHit(){   
                hit++;
                $tally.innerHTML=hit;
            }


            if(bullets<=0){
                alert('You bagged '+hit+' birds');
                if(hit===0){
                    alert('unlucky. Why not try our barndoor challenge');
                }
            }
        });
    


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




           ///////////       //////////       ////////    //                  ///
           ///     /////     ///     ///     ///    ///    ///                ///  
           ///        ///    ///     ///     ///    ///     ///             ///
           ///        ///    /////////       //////////      ///     //    ///
           ///        ///    ///    ///      ///    ///       ///  ////  ///
           ////////////      ///     ///     ///    ///        ///// /////
           /////////         ///      ///    ///    ///         ///  ///

    function draw(ctx) {
        
        //background
        ctx.drawImage(img,0, 0);
        ctx.restore();

        // gun/Linked File
        ctx.save();
        ctx.translate( 235+xGPos, 230+yGPos);
        ctx.rotate( rotation );
        ctx.translate( -235-xGPos, -230-yGPos);
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

    function drawGeese(ctx){
        

        // if (frame>1300){
        //     goose1PosX= 1800 - frame;
        //     goose2PosX= 1870 - frame;
        //     //console.log($goose1['dy']);
             
        //     if(goose1Hit){
        //         $goose1['dy']=$goose1['dy']+a;
        //         a=a+0.05;
        //         // if($goosey.dy>360){ //once the shot bird is off the screen hit boolean set to 0
        //         //     goose1Hit=false;
        //         // }
        //     }else{
        //         $goose1['dy']= 10;
        //     }
        //     if(goose2Hit){
        //         $goose2['dy']=$goose2['dy']+b;
        //         b=b+0.05;
        //         // if($goosey2.dy>360){ //once the shot bird is off the screen hit boolean set to 0
        //         //     goose2Hit=false;
        //         // }
        //     }else{
        //         $goose2['dy']= 58;
        //     }
        // }else{
        //     goose1PosX=canvasWidth+offset - frame;
        //     goose2PosX=canvasWidth*2+offset - frame;
        //     $goosey=geese[$goose1];
        //     $goosey2=$goose2;
        //     $goosey2=$goose3;

        // }

        goose1PosX=geese[0].dx-frame;
        goose2PosX=geese[1].dx-frame;
        goose3PosX=geese[2].dx-frame;
        goose4PosX=geese[3].dx-frame;
        goose5PosX=geese[4].dx-frame;
        goose6PosX=geese[5].dx-frame;
        goose7PosX=geese[6].dx-frame;
        goose8PosX=geese[7].dx-frame;

        $goosey2 = geese[1];  
        $goosey3 = geese[2];  
        $goosey4 = geese[3];  
        $goosey5 = geese[4];  
        $goosey6 = geese[5];  
        $goosey7 = geese[6]; 
        $goosey8 = geese[7];   

        
        if(goose1Hit){
            $goosey.dy=$goosey.dy+a;
            a=a+0.1;
            if($goosey.dy>360){ //once the shot bird is off the screen hit boolean set to 0
                goose1Hit=false;
            }
        }

        if(goose2Hit){
            $goosey2.dy=$goosey2.dy+b;
            b=b+0.1;
            if($goosey2.dy>360){ //once the shot bird is off the screen hit boolean set to 0
                goose2Hit=false;
            }
        }

        if(goose3Hit){
            $goosey3.dy=$goosey3.dy+c;
            c=c+0.1;
            if($goosey3.dy>360){ //once the shot bird is off the screen hit boolean set to 0
                goose3Hit=false;
            }
        }

        if(goose4Hit){
            $goosey4.dy=$goosey4.dy+d;
            d=d+0.1;
            if($goosey4.dy>360){ //once the shot bird is off the screen hit boolean set to 0
                goose3Hit=false;
            }
        }

        if(goose5Hit){
            $goosey5.dy=$goosey5.dy+e;
            e=e+0.1;
            if($goosey3.dy>360){ //once the shot bird is off the screen hit boolean set to 0
                goose3Hit=false;
            }
        }

        if(goose6Hit){
            $goosey6.dy=$goosey6.dy+f;
            f=f+0.1;
            if($goosey6.dy>360){ //once the shot bird is off the screen hit boolean set to 0
                goose6Hit=false;
            }
        }

        if(goose7Hit){
            $goosey7.dy=$goosey7.dy+g;
            g=g+0.1;
            if($goosey7.dy>360){ //once the shot bird is off the screen hit boolean set to 0
                goose3Hit=false;
            }
        }

        if(goose8Hit){
            $goosey8.dy=$goosey8.dy+h;
            h=h+0.1;
            if($goosey8.dy>360){ //once the shot bird is off the screen hit boolean set to 0
                goose3Hit=false;
            }
        }
            

        if(count<10){
            ctx.drawImage($goosey.img,$goosey.sx1,$goosey.sy,$goosey.sw,$goosey.sh,goose1PosX,$goosey.dy,$goosey.dw,$goosey.dh);
            ctx.drawImage($goosey2.img,$goosey2.sx1,$goosey2.sy,$goosey2.sw,$goosey2.sh,goose2PosX,$goosey2.dy,$goosey2.dw,$goosey2.dh);
            ctx.drawImage($goosey3.img,$goosey3.sx1,$goosey3.sy,$goosey3.sw,$goosey3.sh,goose3PosX,$goosey3.dy,$goosey3.dw,$goosey3.dh);
            ctx.drawImage($goosey4.img,$goosey4.sx1,$goosey4.sy,$goosey4.sw,$goosey4.sh,goose4PosX,$goosey4.dy,$goosey4.dw,$goosey4.dh);
            ctx.drawImage($goosey5.img,$goosey5.sx1,$goosey5.sy,$goosey5.sw,$goosey5.sh,goose5PosX,$goosey5.dy,$goosey5.dw,$goosey5.dh);
            ctx.drawImage($goosey6.img,$goosey6.sx1,$goosey6.sy,$goosey6.sw,$goosey6.sh,goose6PosX,$goosey6.dy,$goosey6.dw,$goosey6.dh);
            ctx.drawImage($goosey7.img,$goosey7.sx1,$goosey7.sy,$goosey7.sw,$goosey7.sh,goose7PosX,$goosey7.dy,$goosey7.dw,$goosey7.dh);
            ctx.drawImage($goosey8.img,$goosey8.sx1,$goosey8.sy,$goosey8.sw,$goosey8.sh,goose8PosX,$goosey8.dy,$goosey8.dw,$goosey8.dh);
            ctx.restore();
            count++;
        }else{
            ctx.drawImage($goosey.img,$goosey.sx2,$goosey.sy,$goosey.sw,$goosey.sh,goose1PosX,$goosey.dy,$goosey.dw,$goosey.dh);
            ctx.drawImage($goosey2.img,$goosey2.sx2,$goosey2.sy,$goosey2.sw,$goosey2.sh,goose2PosX,$goosey2.dy,$goosey2.dw,$goosey2.dh);
            ctx.drawImage($goosey3.img,$goosey3.sx2,$goosey3.sy,$goosey3.sw,$goosey3.sh,goose3PosX,$goosey3.dy,$goosey3.dw,$goosey3.dh);
            ctx.drawImage($goosey4.img,$goosey4.sx2,$goosey4.sy,$goosey4.sw,$goosey4.sh,goose4PosX,$goosey4.dy,$goosey4.dw,$goosey4.dh);
            ctx.drawImage($goosey5.img,$goosey5.sx2,$goosey5.sy,$goosey5.sw,$goosey5.sh,goose5PosX,$goosey5.dy,$goosey5.dw,$goosey5.dh);
            ctx.drawImage($goosey6.img,$goosey6.sx2,$goosey6.sy,$goosey6.sw,$goosey6.sh,goose6PosX,$goosey6.dy,$goosey6.dw,$goosey6.dh);
            ctx.drawImage($goosey7.img,$goosey7.sx2,$goosey7.sy,$goosey7.sw,$goosey7.sh,goose7PosX,$goosey7.dy,$goosey7.dw,$goosey7.dh);
            ctx.drawImage($goosey8.img,$goosey8.sx2,$goosey8.sy,$goosey8.sw,$goosey8.sh,goose8PosX,$goosey8.dy,$goosey8.dw,$goosey8.dh);
            ctx.restore();
            count++;
        }
             
        if(count>20){
            count=0;
        }
        frame=frame+2;
        //console.log(frame);
    }

    function drawAmmunition(ctx){
        //console.log(bullets);
        for(i=0;i<bullets;i++){
            //console.log(bullets);
            ctx.drawImage(bullet,17+14*i,287);
        }
    }

};