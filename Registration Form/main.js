var termsContainer = document.getElementById("terms-container");
var agreeCheckbox = document.getElementById("agree");
var submitButton = document.getElementById("submit-btn");

// Aggiungi un listener per controllare lo scroll
termsContainer.addEventListener("scroll", function() {
  var scrollableHeight = termsContainer.scrollHeight - termsContainer.clientHeight;
  var currentScroll = termsContainer.scrollTop;
  
  // Se l'utente ha fatto scroll fino in fondo
  if (currentScroll >= scrollableHeight) {
    agreeCheckbox.disabled = false; // Abilita il checkbox "Accetto"
  } else {
    agreeCheckbox.disabled = true; // Disabilita il checkbox "Accetto"
  }
});

const fileInput = document.querySelector('.file-input');
const fileList = document.getElementById('file-list');

// Aggiorna la lista dei file caricati quando cambia il file input
fileInput.addEventListener('change', updateFileList);

// Funzione per aggiornare la lista dei file caricati
function updateFileList() {
    // Ottieni tutti i file selezionati
    const files = Array.from(fileInput.files);

    // Per ogni nuovo file, crea un elemento di lista e aggiungilo alla lista
    files.forEach(file => {
        const listItem = document.createElement('li');
        listItem.textContent = file.name;

        // Aggiungi l'elemento <li> alla lista dei file
        fileList.appendChild(listItem);
    });

    // Cancella il valore dell'input file per consentire il caricamento di file con lo stesso nome
    fileInput.value = '';
}

// Funzione per verificare se un file è già presente nella lista
function isFileAlreadyAdded(newFile) {
  const existingFiles = fileList.querySelectorAll('li');
  for (let i = 0; i < existingFiles.length; i++) {
    const fileName = existingFiles[i].textContent;
    if (fileName === newFile.name) {
      return true;
    }
  }
  return false;
}
  

// Aggiungi un listener per l'evento change al menu a tendina "Tipologia di sinistro"
document.getElementById("tipo_sinistro").addEventListener("change", updateFileTypeInfo);

// Funzione per aggiornare le informazioni sui file in base alla tipologia di sinistro selezionata
function updateFileTypeInfo() {
  const tipoSinistroSelect = document.getElementById("tipo_sinistro");
  const selectedOption = tipoSinistroSelect.value;
  const fileRichiestiDiv = document.getElementById("file_richiesti");

  // Rimuovi eventuali informazioni preesistenti sui file richiesti
  fileRichiestiDiv.innerHTML = "";

  // Aggiungi le informazioni sui file richiesti in base alla tipologia di sinistro selezionata
  if (selectedOption === "tipo1") {
    fileRichiestiDiv.innerHTML = "File richiesti per Tipo 1: File A, File B, File C";
  } else if (selectedOption === "tipo2") {
    fileRichiestiDiv.innerHTML = "File richiesti per Tipo 2: File X, File Y, File Z";
  }
  // Aggiungi altre condizioni se necessario per altre tipologie di sinistro
}

const form = document.getElementById("myForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  
  const formData = new FormData(form);
  
  formData.append("access_key", "c4de7645-4905-4398-ad8b-618765da5227");
  formData.append("subject", "New Submission from Web3Forms");

  const file = document.getElementById("file-upload");
  const filesize = file.files[0].size / 1024;

  if (filesize > 1000) {
    alert("Please upload file less than 1 MB");
    return;
  }
  
  // Don't add `headers` or `content-type` in this fetch call
  // Since it contains attachments, the browser auto-adds them. 
  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        console.log(json.message);
      } else {
        console.log(response);
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .then(function () {
      form.reset();
    });
});
