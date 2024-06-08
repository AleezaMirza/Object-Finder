status="";
objects=[];

function setup(){
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects"; 
    object_name = document.getElementById("object_name").value;
    console.log(object_name);
}

function modelLoaded(){
    console.log("modelLoaded");
    status=true;
}

function draw(){
    image (video, 0, 0, 300, 300);
    if(status!=""){
        objectDetector.detect(video, gotResults);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status: Objects Detected";
            
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y +15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(object_name == objects[i].label){
                document.getElementById("detect").innerHTML = "Object Found";
            }
            else{
                document.getElementById("detect").innerHTML = "Object Not Found";
            }

        }
    }
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}