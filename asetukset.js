tunnus = document.getElementById("tunnus").value;

if (tunnus == "varat") {
  varat_sivu = document.getElementById("varat");
  varat_sivu.innerHTML = `${varat} €`;
}

if (tunnus == "asetukset") {
  // alustetaan
  aikajakso_alku = document.getElementById("aikajakso-alku");
  aikajakso_loppu = document.getElementById("aikajakso-loppu");
  varallisuus = document.getElementById("varallisuus");
  aloitus_maara = document.getElementById("aloitus-maara");
  pv_budjetti = document.getElementById("pv-budjetti");
  max = document.getElementById("max");

  asetukset_npi = document.getElementById("asetukset-npi");
  pv_budj_npi = document.getElementById("pv_budj-npi");

  // tiedot tietokannasta
  PvkY = JSON.parse(localStorage.getItem("PvKulut_yhteensa"))[0].tulos;
  Ty = JSON.parse(localStorage.getItem("Tulot_yhteensa"))[0].tulos;
  My = JSON.parse(localStorage.getItem("Menot_yhteensa"))[0].tulos;

  varat = (Ty - My).toFixed(2);
  varallisuus.innerHTML = `${(varat - PvkY).toFixed(2)} €`;
  enintaan = (varat / 30).toFixed(2);
  pv_budjetti.placeholder = enintaan;
  max.innerHTML = ` <  ${enintaan} €`;

  // Alustetaan taulut tietokantaan
  tauluTapahtumat = "Tulot";
  tyomuistiTapahtumat = JSON.parse(localStorage.getItem(tauluTapahtumat));
  tapahtumat =
    localStorage.getItem(tauluTapahtumat) !== null ? tyomuistiTapahtumat : [];

  tauluAikajakso = "Aikajakso";
  tyomuistiAikajakso = JSON.parse(localStorage.getItem(tauluAikajakso));
  tmAikajakso =
    localStorage.getItem(tauluAikajakso) !== null ? tyomuistiAikajakso : [];

  function MuutaAsetukset(e) {
    e.preventDefault();
    poistaAikajakso("Aikajakso");
    const aj = {
      id: "Aikajakso",
      aloituspvm: aikajakso_alku.value,
      lopetuspvm: aikajakso_loppu.value,
    };
    tmAikajakso.push(aj);
    paivitaAikajakso();

    poistaTyomuistista("Aloitusmäärä");
    const am = {
      id: 1,
      nimi: "Aloitusmäärä",
      hinta: +aloitus_maara.value,
      pvm: new Date(),
    };
    tapahtumat.push(am);
    paivitaTyomuisti();

    aloitus_maara.innerHTML = "";
  }
  asetukset_npi.onclick = MuutaAsetukset;

  function poistaAikajakso(id) {
    tmAikajakso = tmAikajakso.filter((aj) => aj.id !== id);
    paivitaAikajakso();
  }
  function poistaTyomuistista(id) {
    tapahtumat = tapahtumat.filter((am) => am.id !== id);
    paivitaTyomuisti();
  }

  //  Päivitä tyomuisti
  function paivitaAikajakso() {
    localStorage.setItem(tauluAikajakso, JSON.stringify(tmAikajakso));
  }

  function paivitaTyomuisti() {
    localStorage.setItem(tauluTapahtumat, JSON.stringify(tapahtumat));
  }
}
