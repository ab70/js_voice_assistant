	// UI comp
const startBtn = document.getElementById('startBtn');
const listeningtext = document.getElementById('listening')
const notlistening = document.getElementById('notlistening')

const result = document.createElement("div");
const processing = document.createElement("p");


document.body.append(result);
document.body.append(processing);

// speech to text
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let toggleBtn = null;
if (typeof SpeechRecognition === "undefined") {
	startBtn.style.display='none';
	result.innerHTML = "<b>Browser does not support Speech API. Please download latest chrome.<b>";
} else {
	const recognition = new SpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;
	recognition.onresult = event => {
		const last = event.results.length - 1;
		const res = event.results[last];
		const text = res[0].transcript;
		if (res.isFinal) {
			processing.innerHTML = "processing ....";

			const response = process(text);
			const p = document.createElement("p");
			p.innerHTML = `You said: ${text} </br>Assistant said: ${response}`;
			processing.innerHTML = "";
			result.appendChild(p);

			// text to speech
			speechSynthesis.speak(new SpeechSynthesisUtterance(response));
		} else {
			processing.innerHTML = `listening: ${text}`;
		}
	}
	let listening = false;
	toggleBtn = () => {
		if (listening) {
			recognition.stop();
			startBtn.style.display = 'block'
			notlistening.style.display= 'block'
			listeningtext.style.display= 'none'
			// startBtn.textContent = "Start listening";
		} else {
			recognition.start();
			startBtn.style.display= 'block'
			listeningtext.style.display= 'block'
			notlistening.style.display= 'none'
			// startBtn.textContent = "Stop listening";
		}
		listening = !listening;
	};
	startBtn.addEventListener("click", toggleBtn);

}

// processor
function process(rawText) {
	// let text = rawText.replace(/\s/g, "");
	let textlow = rawText.toLowerCase();
	let responses = "";
	if (textlow.includes("hello" ) ) {
		responses = "hi there, afnan can i help you";

		console.log(responses);
		
	}
	if (textlow.includes("who are you") || textlow.includes("what do you do") ||textlow.includes("what are you good at")) {
		responses = "I am a voice assistant to help my user";

		console.log(responses);
		
	}
	if (textlow.includes("What can you do" ) ) {
		responses = "hi, I can help to search thing for you.";

		console.log(responses);
		
	}
	// switch(text) {
	// 	case "Hello":
	// 		response = "hi, how are you doing?"; break;
	// 	case "What's your name":
	// 		response = "My name's Siri.";  break;
	// 	case "How are you":
	// 		response = "I'm good."; break;
	// 	case "whattimeisit":
	// 		response = new Date().toLocaleTimeString(); break;
	// 	case "stop":
	// 		response = "Bye!!";
	// 		toggleBtn();
	// }
	if (!responses) {
		console.log(responses);
		window.open(`http://google.com/search?q=${rawText.replace("search", "")}`, "_blank");
		return `I found some information for ${rawText}`;
	}
	return responses;
}