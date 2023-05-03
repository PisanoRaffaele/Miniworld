function controllacampi () {
  alert("prova");

  // Definiamo delle variabili per i dati di registrazione
  var email;
  var password;
  var confirmPassword;

  // Verifichiamo che l'email sia valida utilizzando una regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Inserisci un indirizzo email valido');
    return false;
  }

  // Verifichiamo che la password sia lunga almeno 6 caratteri
  if (password.length < 6) {
    alert('La password deve essere lunga almeno 6 caratteri');
    return false;
  }

  // Verifichiamo che la password e la conferma password coincidano
  if (password !== confirmPassword) {
    alert('La password e la conferma password non coincidono');
    return false;
  }

  // Se siamo arrivati fin qui, allora tutti i campi sono stati compilati correttamente
  alert('Registrazione avvenuta con successo!');
  return true;
};