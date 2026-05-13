const startBtn = document.getElementById('start-btn');
const output = document.getElementById('output');
const interim = document.getElementById('interim');
const status = document.getElementById('status');
const copyBtn = document.getElementById('copy-btn');
const clearBtn = document.getElementById('clear-btn');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    let isRecording = false;

    startBtn.addEventListener('click', () => {
        if (!isRecording) {
            recognition.start();
        } else {
            recognition.stop();
        }
    });

    recognition.onstart = () => {
        isRecording = true;
        startBtn.classList.add('recording');
        status.textContent = 'Listening... Speak now';
    };

    recognition.onend = () => {
        isRecording = false;
        startBtn.classList.remove('recording');
        status.textContent = 'Stopped. Click to start again';
    };

    recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }

        output.textContent += finalTranscript;
        interim.textContent = interimTranscript;
    };

    copyBtn.addEventListener('click', () => {
        const text = output.textContent;
        navigator.clipboard.writeText(text).then(() => {
            alert('Text copied to clipboard!');
        });
    });

    clearBtn.addEventListener('click', () => {
        output.textContent = '';
        interim.textContent = '';
    });

} else {
    status.textContent = 'Speech Recognition not supported in this browser.';
    startBtn.disabled = true;
}
