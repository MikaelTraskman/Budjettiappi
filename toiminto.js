tunnus = document.getElementById("tunnus").value;

// Haetaan kalenteritiedot

paiva = tunnus == "paivittainen" ? document.getElementById("paiva") : "";
tanaan = new Date();
joskus = new Date();

pvm = new Date();

paiva_otsikko =
  tunnus == "paivittainen"
    ? tanaan.getDate() +
      "." +
      (tanaan.getMonth() + 1) +
      "." +
      tanaan.getFullYear()
    : joskus.getDate() +
      "." +
      (joskus.getMonth() + 1) +
      "." +
      joskus.getFullYear();

// napit
nappi =
  tunnus == "paivittainen"
    ? document.getElementById("pv_npi")
    : tunnus == "tulot"
    ? document.getElementById("tulot_npi")
    : document.getElementById("menot_npi");

// tiedot
hinta =
  tunnus == "paivittainen"
    ? document.getElementById("kulut-hinta-pv")
    : tunnus == "tulot"
    ? document.getElementById("tulot-maara")
    : document.getElementById("menot-maara");
nimi =
  tunnus == "paivittainen"
    ? document.getElementById("kulut-nimi-pv")
    : tunnus == "tulot"
    ? document.getElementById("tulot-nimi")
    : document.getElementById("menot-nimi");

lista =
  tunnus == "paivittainen"
    ? document.getElementById("pv_lista")
    : tunnus == "tulot"
    ? document.getElementById("tulot_lista")
    : document.getElementById("menot_lista");

yhteensa = document.getElementById("yhteensa");

tauluTapahtumat =
  tunnus == "paivittainen" ? "PvKulut" : tunnus == "tulot" ? "Tulot" : "Menot";
tauluTulokset =
  tunnus == "paivittainen"
    ? "PvKulut_yhteensa"
    : tunnus == "tulot"
    ? "Tulot_yhteensa"
    : "Menot_yhteensa";
tauluVarat = "Varallisuus_yhteensa";

tyomuistiTapahtumat = JSON.parse(localStorage.getItem(tauluTapahtumat));
tyomuistiTulokset = JSON.parse(localStorage.getItem(tauluTulokset));
tyomuistiVarat = JSON.parse(localStorage.getItem(tauluVarat));

tapahtumat =
  localStorage.getItem(tauluTapahtumat) !== null ? tyomuistiTapahtumat : [];
tulokset =
  localStorage.getItem(tauluTulokset) !== null ? tyomuistiTulokset : [];
tmVarat = localStorage.getItem(tauluVarat) !== null ? tyomuistiVarat : [];

// Päivämäärä tulostetaan
paiva.innerHTML = `${paiva_otsikko}`;

// Add transaction
function lisaaTapahtuma(e) {
  e.preventDefault();
  joskus =
    tunnus == "tulot"
      ? new Date(document.getElementById("tulot-paiva").value)
      : tunnus == "menot"
      ? new Date(document.getElementById("menot-paiva").value)
      : "";
  pvm = tunnus == "paivittainen" ? tanaan : joskus;

  const ilmo =
    tunnus == "paivittainen"
      ? "Lisää nimi sekä hinta"
      : "Lisää nimi, hinta sekä päivämäärä";

  if (nimi.value.trim() === "" || hinta.value.trim() === "" || !pvm) {
    alert(ilmo);
  } else {
    // joskus =
    //   tunnus == "tulot"
    //     ? new Date(document.getElementById("tulot-paiva").value)
    //     : tunnus == "menot"
    //     ? new Date(document.getElementById("menot-paiva").value)
    //     : "";

    // pvm = tunnus == "paivittainen" ? tanaan : joskus;

    const toimi = {
      id: tuotaID(),
      nimi: nimi.value,
      hinta: +hinta.value,
      pvm: pvm,
    };

    tapahtumat.push(toimi);

    lisaaTapahtumaDOM(toimi);

    paivitaArvot();

    paivitaTyomuisti();

    hinta.value = "";
    nimi.value = "";
  }
}

nappi.onclick = lisaaTapahtuma;

// Generate random ID
function tuotaID() {
  return Math.floor(Math.random() * 100000000);
}

// Tuota ID tuloksille
function tuota_tulosID() {
  const tulosID =
    tunnus == "paivittainen"
      ? "PvTulos"
      : tunnus == "tulot"
      ? "TulotTulos"
      : "MenotTulos";
  return tulosID;
}

// Add tapahtumat to DOM lista
function lisaaTapahtumaDOM(toimi) {
  const item = document.createElement("li");

  item.innerHTML = `
    ${toimi.nimi} 
    ${toimi.hinta} € <button class="delete-btn" onclick="poistaTapahtuma(${toimi.id})">x</button>
  `;

  lista.appendChild(item);
}

// Päivitä tapahtumat, uusi tulos
function paivitaArvot() {
  const arvot = tapahtumat.map((toimi) => toimi.hinta);
  const plussa = arvot.reduce((acc, toinen) => (acc += toinen), 0).toFixed(2);

  // Poistetaan vanha tulos työmuistista ja kortaan uudella
  const tulosID = tuota_tulosID();

  poistaTulos(tulosID);

  const kooste = {
    id: tulosID,
    tulos: plussa,
  };

  tulokset.push(kooste);
  paivitaTyomuistiTulokset();

  //Tulostetaan
  yhteensa.innerHTML = `${plussa} €`;

  paivitaValikko();
  MuutaVarat();
}

function MuutaVarat(e) {
  //e.preventDefault();
  const varatID = "VaratTulos";
  poistaVarat(varatID);
  const muutos = {
    id: varatID,
    tulos: varat,
  };
  tmVarat.push(muutos);
  paivitaVarat();
}

function paivitaValikko() {
  // varat =
  //   localStorage.getItem("Varallisuus_yhteensa") === null
  //     ? 0
  //     : (
  //         JSON.parse(localStorage.getItem("Tulot_yhteensa"))[0].tulos -
  //         JSON.parse(localStorage.getItem("Menot_yhteensa"))[0].tulos -
  //         JSON.parse(localStorage.getItem("PvKulut_yhteensa"))[0].tulos
  //       ).toFixed(2);
  paiv_valikko.innerHTML =
    localStorage.getItem("PvKulut_yhteensa") === null
      ? `<b>Päiväkulut</b><br><font color="e49a05">${0} €</font>`
      : `<b>Päiväkulut</b><br><font color="e49a05">${
          JSON.parse(localStorage.getItem("PvKulut_yhteensa"))[0].tulos
        } €</font>`;
  tulot_valikko.innerHTML =
    localStorage.getItem("Tulot_yhteensa") === null
      ? `<b>Tulot</b><br><font color="e49a05">${0} €</font>`
      : `<b>Tulot</b><br><font color="e49a05">${
          JSON.parse(localStorage.getItem("Tulot_yhteensa"))[0].tulos
        } €</font>`;
  menot_valikko.innerHTML =
    localStorage.getItem("Menot_yhteensa") === null
      ? `<b>Menot</b><br><font color="e49a05">${0} €</font>`
      : `<b>Menot</b><br><font color="e49a05">${
          JSON.parse(localStorage.getItem("Menot_yhteensa"))[0].tulos
        } €</font>`;
  varat_valikko.innerHTML =
    localStorage.getItem("Varat_yhteensa") === null
      ? `<b>Varat</b><br><font color="e49a05">${0} €</font>`
      : `<b>Varat</b><br><font color="e49a05">${(
          JSON.parse(localStorage.getItem("Tulot_yhteensa"))[0].tulos -
          JSON.parse(localStorage.getItem("Menot_yhteensa"))[0].tulos -
          JSON.parse(localStorage.getItem("PvKulut_yhteensa"))[0].tulos
        ).toFixed(2)} €</font>`;
}

// Remove transaction by ID
function poistaTapahtuma(id) {
  tapahtumat = tapahtumat.filter((toimi) => toimi.id !== id);

  paivitaTyomuisti();

  kytkin();
}

function poistaTulos(tulosID) {
  tulokset = tulokset.filter((kooste) => kooste.id !== tulosID);

  paivitaTyomuistiTulokset();
}

function poistaVarat(varatID) {
  tmVarat = tmVarat.filter((muutos) => muutos.id !== varatID);
  paivitaVarat();
}

// Update local storage tapahtumat

function paivitaTyomuisti() {
  localStorage.setItem(tauluTapahtumat, JSON.stringify(tapahtumat));
}

function paivitaTyomuistiTulokset() {
  localStorage.setItem(tauluTulokset, JSON.stringify(tulokset));
}

function paivitaVarat() {
  localStorage.setItem(tauluVarat, JSON.stringify(tmVarat));
}

// kytkin app
function kytkin() {
  lista.innerHTML = "";

  tapahtumat.forEach(lisaaTapahtumaDOM);
  paivitaArvot();
  paivitaValikko();
}

kytkin();
