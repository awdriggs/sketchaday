window.onload = () => {
  console.log("Page loaded");
  run();
};

async function run() {
  const video = document.getElementById("video1");
  const canvas = document.getElementById("video_canvas");

  if (!canvas || !video) {
    console.error("Required elements not found in the DOM");
    return;
  }

  try {
    // Load face-api.js models
    await loadModels();

    // Request access to the webcam
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });
    console.log("Webcam stream started");

    video.srcObject = stream;

    video.onloadeddata = () => {
      console.log("Video data loaded");
      video.play();
    };

    video.onplay = () => {
      const width = video.videoWidth;
      const height = video.videoHeight;

      if (!width || !height) {
        console.error("Unable to determine video dimensions");
        return;
      }

      // Set video and canvas dimensions
      canvas.width = width;
      canvas.height = height;
      video.style.width = `${width}px`;
      video.style.height = `${height}px`;

      // Start face detection
      detectFaces(video, canvas);
    };
  } catch (err) {
    console.error("Error accessing webcam:", err);
    alert("Unable to access the webcam. Please check permissions.");
  }
}

async function loadModels() {
  const MODEL_URL = "./models"; // Path to your model directory
  console.log("Loading face-api.js models...");
  await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  // await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
  console.log("Models loaded successfully");
}

async function detectFaces(video, canvas) {
  const ctx = canvas.getContext("2d");
  const displaySize = { width: video.videoWidth, height: video.videoHeight };

  faceapi.matchDimensions(canvas, displaySize);

  console.log("Starting face detection...");

  async function detect() {
    // Detect faces 
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      // .withFaceLandmarks();
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw detections
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    faceapi.draw.drawDetections(canvas, resizedDetections);

    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

    requestAnimationFrame(detect);
  }

  detect(); // Start detection loop
}
