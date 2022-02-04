const videoContainer = document.querySelector(".video-container");

const videoDisplay = document.querySelector("#video-display");

//Receive video from user

const startVideo = () => {
  navigator.getUserMedia(
    { video: {} },
    (stream) => (videoDisplay.srcObject = stream),
    (error) => console.error(error)
  );
};
