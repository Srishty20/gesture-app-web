Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
})
var camera=document.getElementById("camera");
Webcam.attach(camera);
function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img src="'+data_uri+'" id="captured_img">'
    })
}
console.log("ml5 version",ml5.version);
var classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/aVu-RoOvo/model.json",modelloaded);
function modelloaded(){
    console.log("model has been loaded");
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="the first prediction is"+ prediction_1
    speak_data_2="the second prediction is" + prediction_2
    var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}
function check(){
    var img=document.getElementById("captured_img");
    classifier.classify(img,gotresults)
}
function gotresults(error,results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results)
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name1").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak()
        if(results[0].label=="this is looking amazing"){
            document.getElementById("update_emoji").innerHTML="&#128076;"
        }
        if(results[0].label=="all the best"){
            document.getElementById("update_emoji").innerHTML="&#128077;"
        }
        if(results[0].label=="that was marvelous victory"){
            document.getElementById("update_emoji").innerHTML="&#9996"
        }
        if(results[1].label=="this is looking amazing"){
            document.getElementById("update_emoji1").innerHTML="&#128076;"
        }
        if(results[1].label=="all the best"){
            document.getElementById("update_emoji1").innerHTML="&#128077;"
        }
        if(results[1].label=="that was marvelous victory"){
            document.getElementById("update_emoji1").innerHTML="&#9996"
        }
    }
}



