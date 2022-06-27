tunnus = document.getElementById("tunnus").value;

if (tunnus == "varat") {
  let vrt =
    localStorage.getItem("Varallisuus_yhteensa") === null
      ? (0).toFixed(2)
      : JSON.parse(localStorage.getItem("Varallisuus_yhteensa"))[0].tulos;
  varat_sivu = document.getElementById("varat");
  varat_sivu.innerHTML = `${vrt} €`;
}

if (tunnus == "asetukset") {
  // alustetaan
  varallisuus = document.getElementById("varallisuus");
  aloitus_maara = document.getElementById("aloitus-maara");
  pv_budjetti = document.getElementById("pv-budjetti");
  max = document.getElementById("max");

  asetukset_npi = document.getElementById("asetukset-npi");
  pv_budj_npi = document.getElementById("pv_budj-npi");

  // tiedot tietokannasta
  Ty =
    localStorage.getItem("Tulot_yhteensa") === null
      ? (0).toFixed(2)
      : JSON.parse(localStorage.getItem("Tulot_yhteensa"))[0].tulos;
  My =
    localStorage.getItem("Menot_yhteensa") === null
      ? (0).toFixed(2)
      : JSON.parse(localStorage.getItem("Menot_yhteensa"))[0].tulos;

  varat = (Ty - My).toFixed(2);
  varallisuus.innerHTML = `${varat} €`;

  // Alustetaan taulut tietokantaan
  tauluTapahtumat = "Tulot";
  tyomuistiTapahtumat = JSON.parse(localStorage.getItem(tauluTapahtumat));
  tapahtumat =
    localStorage.getItem(tauluTapahtumat) !== null ? tyomuistiTapahtumat : [];

  function MuutaAsetukset(e) {
    //e.preventDefault();

    if (aloitus_maara.value.trim() === "") {
      alert("Syötä varallisuuden määrä");
    } else {
      poistaTyomuistista(1);
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
  }
  asetukset_npi.onclick = MuutaAsetukset;

  function poistaTyomuistista(id) {
    tapahtumat = tapahtumat.filter((am) => am.id !== id);
    paivitaTyomuisti();
  }

  //  Päivitä tyomuisti

  function paivitaTyomuisti() {
    localStorage.setItem(tauluTapahtumat, JSON.stringify(tapahtumat));
  }
}
