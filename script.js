// Reconnaissance vocale
const btnParler = document.getElementById("btnParler");
const btnLire = document.getElementById("btnLire");
const texteOriginal = document.getElementById("texteOriginal");
const texteTraduit = document.getElementById("texteTraduit");

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'fr-FR';

btnParler.addEventListener("click", () => {
  recognition.start();
});

recognition.onresult = (event) => {
  const text = event.results[0][0].transcript;
  texteOriginal.value = text;
  traduireTexte(text);
};

function traduireTexte(text) {
  // Ici on utilise Google Translate via URL simple (gratuit)
  fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=fr|en`)
    .then(res => res.json())
    .then(data => {
      texteTraduit.value = data.responseData.translatedText;
    })
    .catch(() => {
      texteTraduit.value = "Erreur de traduction.";
    });
}

// Lecture du texte
btnLire.addEventListener("click", () => {
  const msg = new SpeechSynthesisUtterance(texteTraduit.value);
  msg.lang = 'en-US';
  window.speechSynthesis.speak(msg);
});
