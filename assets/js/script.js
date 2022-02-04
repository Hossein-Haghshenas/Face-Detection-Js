const videoContainer = document.querySelector(".video-container");

const videoDisplay = document.querySelector("#video-display");

//Receive video from user

const video = () => {
  navigator.getUserMedia(
    { video: {} },
    (stream) => (videoDisplay.srcObject = stream),
    (error) => console.error(error)
  );
};

// Receive information from api with promise

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("/assets/library/model"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/assets/library/model"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/assets/library/model"),
  faceapi.nets.faceExpressionNet.loadFromUri("/assets/library/model"),
]).then(video);

videoDisplay.addEventListener("play", () => {
  //Create canvas from face

  const canvas = faceapi.createCanvasFromMedia(videoDisplay);
  videoContainer.append(canvas);
  const displaySize = {
    width: videoDisplay.width,
    height: videoDisplay.height,
  };
  faceapi.matchDimensions(canvas, displaySize);

  //Create face detections

  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(videoDisplay, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
  }, 100);
});
