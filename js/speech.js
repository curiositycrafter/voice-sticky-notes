let recognition;
let isRecording = false;

export function initSpeech(onText) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SR();

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";
  recognition.maxAlternatives = 3;

  recognition.onresult = (event) => {
    let finalText = "", interimText = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const t = event.results[i][0].transcript;
      event.results[i].isFinal ? finalText += t : interimText += t;
    }

    if (finalText) onText(finalText, true);
    if (interimText) onText(interimText, false);
  };

  // 🔥 IMPORTANT: auto restart
  recognition.onend = () => {
    if (isRecording) {
      recognition.start();
    }
  };

  recognition.onerror = (e) => {
    console.warn("Speech error:", e.error);
    if (isRecording) recognition.start();
  };
}


export function startRecording() {
  if (!recognition || isRecording) return;
  recognition.start();
  isRecording = true;
}

export function stopRecording() {
  if (!recognition || !isRecording) return;
  recognition.stop();
  isRecording = false;
}
