
var prediction_1="";
var prediction_2="";
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
}) ;
camera=document.getElementById("camera");
Webcam.attach("camera"); 
function take_Snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("Result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    }) ;
}
console.log("ml5version",ml5.version);
classify=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/XfmT6YDQW/model.json",modelLoaded);
function modelLoaded(){
    console.log("modelLoaded");
}
function speak(){
    var synth=window.speechSynthesis;
    speakdata1="first prediction is "+prediction_1;
    speakdata2="second prediction is "+prediction_2;
    var utterthis=new SpeechSynthesisUtterance(speakdata1+speakdata2);
    synth.speak(utterthis);
}
function check(){
    img=document.getElementById("captured_image");
    classify.classify(img,gotResult);
}
function gotResult(error,Results){
    if(error){
        console.log(error);
    }
    else{
        console.log(Results);
        document.getElementById("Result_Emotion_Name1").innerHTML=Results[0].label;
        document.getElementById("Result_Emotion_Name2").innerHTML=Results[1].label;
        prediction_1=Results[0].label;
        prediction_2=Results[1].label;
        speak();
        if(Results[0].label=="Happy"){
            document.getElementById("Update_Emoji_1").innerHTML="&#128512;";
        }
        if(Results[0].label=="sad"){
            document.getElementById("Update_Emoji_1").innerHTML="&#128532;";
        }
        if(Results[0].label=="scared"){
            document.getElementById("Update_Emoji_1").innerHTML="&#128546;";
        }
        if(Results[0].label=="angry"){
            document.getElementById("Update_Emoji_1").innerHTML="&#128545;";
        }
        if(Results[1].label=="Happy"){
            document.getElementById("Update_Emoji_2").innerHTML="&#128512;";
        }
        if(Results[1].label=="sad"){
            document.getElementById("Update_Emoji_2").innerHTML="&#128532;";
        }
        if(Results[1].label=="scared"){
            document.getElementById("Update_Emoji_2").innerHTML="&#128546;";
        }
        if(Results[1].label=="angry"){
            document.getElementById("Update_Emoji_2").innerHTML="&#128545;";
        }
    }
}