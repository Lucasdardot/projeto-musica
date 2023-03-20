
musica = ""
pontosPulsoDireito = 0
pontosPulsoEsquerdo= 0 

pulsoDireitoX = 0
pulsoEsquerdoY = 0 

pulsoDireitoY = 0
pulsoEsquerdoX = 0 

function setup(){

    canvas = createCanvas(600,500)
    canvas.position(400,350)
    video = createCapture(VIDEO)
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose",gotPoses)
   }

   function modelLoaded(){
      console.log("Deu certo!")
   }

 function draw(){
    image(video,0,0,600,500)

    fill('#FF0000')
    stroke('#FF0000')

    if(pontosPulsoDireito > 0.2) {
      circle(pulsoDireitoX,pulsoDireitoY, 20)

      if(pulsoDireitoX > 0 && pulsoDireitoY <= 100){
         document.getElementById("speed").innerHTML = "Velocidade = 0.5x"
         musica.rate(0.5)
      }

     
      else if(pulsoDireitoX > 100 && pulsoDireitoY <= 200){
         document.getElementById("speed").innerHTML = "Velocidade = 1x"
         musica.rate(1)  
      }

      else if(pulsoDireitoX > 200 && pulsoDireitoY <= 300){
         document.getElementById("speed").innerHTML = "Velocidade = 1.5x"
         musica.rate(1.5)
    }

    else if(pulsoDireitoX > 300 && pulsoDireitoY <= 400){
      document.getElementById("speed").innerHTML = "Velocidade = 2x"
      musica.rate(2)}

      else if(pulsoDireitoX > 400){
         document.getElementById("speed").innerHTML = "Velocidade = 2.5x"
         musica.rate(2.5)
    }
 }

 if(pontosPulsoDireito > 0.2){
   circle(pulsoEsquerdoX, pulsoEsquerdoY,20)
   numeroPulsoEsquerdoY = Number(pulsoEsquerdoY)
   remove_decimals = floor(numeroPulsoEsquerdoY)
   volume = remove_decimals /500
   document.getElementById("volume").innerHTML = "Volume =" + volume
   musica.setVolume(volume)
 }
 }

 function preload(){
    
    musica = loadSound("enimie.mp3")

 }

 function play(){
    musica.play()
    musica.setVolume(1)
    musica.rate(1)
 }

 function gotPoses(results){
   if(results.length > 0){
      console.log(results)
      pontosPulsoDireito = results[0].pose.keypoints[10].score
      pontosPulsoEsquerdo = results[0].pose.keypoints[9].score

      console.log("Pontos pulso direito = " + pontosPulsoDireito + " pontosPulsoEsquerdo = " + pontosPulsoEsquerdo);
      pulsoDireitoX = results[0].pose.rightWrist.x
      pulsoDireitoY = results[0].pose.rightWrist.y

      console.log("pulsoDireitoX = " + pulsoDireitoX + " pulsoDireitoY = " + pulsoDireitoY);

      pulsoEsquerdoX = results[0].pose.leftWrist.x
      pulsoEsquerdoY = results[0].pose.leftWrist.y

      console.log("pulsoEsquerdoX = " + pulsoEsquerdoX + " pulsoEsquerdoY = " + pulsoEsquerdoY);
   }
 }
