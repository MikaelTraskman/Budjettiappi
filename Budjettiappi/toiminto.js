tunnus = document.getElementById("tunnus").value;

// Haetaan kalenteritiedot

paiva = "";
//tanaan = new Date();
joskus = new Date();

pvm = new Date();

// napit
nappi =
  tunnus == "tulot"
    ? document.getElementById("tulot_npi")
    : document.getElementById("menot_npi");

// tiedot
hinta =
  tunnus == "tulot"
    ? document.getElementById("tulot-maara")
    : document.getElementById("menot-maara");
nimi =
  tunnus == "tulot"
    ? document.getElementById("tulot-nimi")
    : document.getElementById("menot-nimi");

lista =
  tunnus == "tulot"
    ? document.getElementById("tulot_lista")
    : document.getElementById("menot_lista");

yhteensa = document.getElementById("yhteensa");

tauluTapahtumat = tunnus == "tulot" ? "Tulot" : "Menot";
tauluTulokset = tunnus == "tulot" ? "Tulot_yhteensa" : "Menot_yhteensa";
tauluVarat = "Varallisuus_yhteensa";

tyomuistiTapahtumat = JSON.parse(localStorage.getItem(tauluTapahtumat));
tyomuistiTulokset = JSON.parse(localStorage.getItem(tauluTulokset));
tyomuistiVarat = JSON.parse(localStorage.getItem(tauluVarat));

tapahtumat =
  localStorage.getItem(tauluTapahtumat) !== null ? tyomuistiTapahtumat : [];
tulokset =
  localStorage.getItem(tauluTulokset) !== null ? tyomuistiTulokset : [];
tmVarat = localStorage.getItem(tauluVarat) !== null ? tyomuistiVarat : [];

// Add transaction
function lisaaTapahtuma(e) {
  e.preventDefault();
  joskus =
    tunnus == "tulot"
      ? new Date(document.getElementById("tulot-paiva").value)
      : tunnus == "menot"
      ? new Date(document.getElementById("menot-paiva").value)
      : "";
  pvm = joskus;

  const ilmo = "Lisää nimi, hinta sekä päivämäärä";

  if (
    nimi.value.trim() === "" ||
    hinta.value.trim() === "" ||
    !Date.parse(pvm)
  ) {
    alert(ilmo);
  } else {
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

    paivitaValikko();

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
  const tulosID = tunnus == "tulot" ? "TulotTulos" : "MenotTulos";
  return tulosID;
}

// Add tapahtumat to DOM lista
function lisaaTapahtumaDOM(toimi) {
  const tpvm = new Date(toimi.pvm);
  const pvm_eur =
    tpvm.getDate() + "." + (tpvm.getMonth() + 1) + "." + tpvm.getFullYear();

  const item = document.createElement("li");

  item.innerHTML = `
    ${pvm_eur} <button class="delete-btn" onclick="poistaTapahtuma(${toimi.id})">x</button><br>
    ${toimi.nimi} 
    ${toimi.hinta} €
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
}

function MuutaVarat(varat) {
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
  const t_v =
    localStorage.getItem("Tulot_yhteensa") === null
      ? (0).toFixed(2)
      : JSON.parse(localStorage.getItem("Tulot_yhteensa"))[0].tulos;
  const m_v =
    localStorage.getItem("Menot_yhteensa") === null
      ? (0).toFixed(2)
      : JSON.parse(localStorage.getItem("Menot_yhteensa"))[0].tulos;
  let varat = (t_v - m_v).toFixed(2);
  tulot_valikko.innerHTML = `<b>Tulot</b><br><font color="e49a05">${t_v} €</font>`;
  menot_valikko.innerHTML = `<b>Menot</b><br><font color="e49a05">${m_v} €</font>`;
  varat_valikko.innerHTML = `<b>Varat</b><br><font color="e49a05">${varat} €</font>`;
  MuutaVarat(varat);
}

// Poista tapahtuma id:llä
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

// Päivitä työmuisti

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
