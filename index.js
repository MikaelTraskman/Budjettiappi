let sivu = document.getElementById("sivu");

const paiv_valikko = document.getElementById("paiv-valikko");
const tulot_valikko = document.getElementById("tulot-valikko");
const menot_valikko = document.getElementById("menot-valikko");
const varat_valikko = document.getElementById("varat-valikko");
const asetukset_valikko = document.getElementById("asetukset-valikko");
let varat;

// Asetukset
let aikajakso_alku;
let aikajakso_loppu;
let aloitus_maara;
let varallisuus;
let pv_budjetti;
let max;

let PvkY;
let Ty;
let My;
let enintaan;
let tmAikajakso;

let tunnus;

// Haetaan kalenteritiedot
let paiva;
let tanaan = new Date();
let tnn;
let joskus;

let pvm;

// napit
let nappi;

// tiedot
let hinta;
let nimi;
let lista;
let yhteensa;
let tapaus;

// Tietokanta
let tyomuistiTapahtumat;
let tyomuistiTulokset;
let tyomuistiVarat;
let tapahtumat;
let tulokset;
let tmVarat;

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

paiv_valikko.onclick = function paivSivu() {
  paiv_valikko.className = "active";
  tulot_valikko.className = "";
  menot_valikko.className = "";
  varat_valikko.className = "";
  asetukset_valikko.className = "";

  sivu.innerHTML = `
  <h1>Päiväkulut</h1>
            <div>
                <p>
                <h3 id="paiva">13.01.2022</h2>
                </p>
                <form id="pv_lomake">
                    <div>
                     <table>
                            <tr>
                                <td>Nimi:</td>
                                <td>Hinta:</td>
                            </tr>
                            <tr>
                                <td><input type="text" id="kulut-nimi-pv" placeholder="Kulun nimi..." /></td>
                                <td><input type="number" id="kulut-hinta-pv" placeholder="Hinta..." step="any"/></td>
                            </tr> 
                        <tr>
                        <td>
                        <input type="hidden" id="tunnus" value="paivittainen">
                        <br>
                        <button class="nappi" id='pv_npi'>Lisää</button>
 
                            <ul id="pv_lista" class="lista">
                            </ul>
                        </td> 
                        <td>
                            <h4>Kulut Yhteensä</h4> 
                        <p id="yhteensa">0.00 €</p>
                    </div>
                </form>

                    <div>
                        <h4>Jäljellä</h4>
                        <p id="jaljella-pv" class="jaljella pv">0.00 €</p>
                    </div>
        
                    <div>
                        <h4>Päiväbudjetti</h4>
                        <p id="budjet-pv" class="budjet pv">0.00€</p>
                    </div>
                        </td>
                    </tr>
                    </table>
                <hr>
            </div> 
  `;
  var newScript = document.createElement("script");
  newScript.src = "toiminto.js";
  sivu.appendChild(newScript);
};

tulot_valikko.onclick = function tulotSivu() {
  paiv_valikko.className = "";
  tulot_valikko.className = "active";
  menot_valikko.className = "";
  varat_valikko.className = "";
  asetukset_valikko.className = "";

  sivu.innerHTML = `
  <h1>Tulot</h1>
        <div>
            <p>
            <form id="tulot_lomake">
                <div>
                    <table>
                        <tr>
                            <td>Nimi:</td>
                            <td>Hinta:</td>
                            <td>Päivämäärä</td>
                        </tr>
                        <tr>
                            <td><input type="text" id="tulot-nimi" placeholder="Tulon nimi..." /></td>
                            <td><input type="number" id="tulot-maara" placeholder="Määrä..." step="any" /></td>
                            <td><input type="date" id="tulot-paiva" placeholder="Pvm..."/></td>
                        </tr>
                    </table>
                    <br>
                    <!-- Sykli:
                    <br>
                    <input type="radio" id="sykli_kerran" name="sykli" value="kerran">
                    kerran
                    <input type="radio" id="sykli_vuosi" name="sykli" value="vuosi">
                    vuosi
                    <input type="radio" id="sykli_kk" name="sykli" value="kk">
                    kk
                    <input type="radio" id="sykli_vk" name="sykli" value="vk">
                    vk
                    <input type="radio" id="sykli_pv" name="sykli" value="">
                    <input type="number" id="sykli_pv_luku" placeholder="päivät" value="1" />
                    päivää
                    <br> -->
                    <input type="hidden" id="tunnus" value="tulot">
                    <br>
                    <table>
                        <tr>
                        <td width="70%">
                    <button class="nappi" id='tulot_npi'>Lisää</button>
                    <ul id="tulot_lista" class="lista">
                    </ul>
                        </td>
                        <td>
                    <b>Tulot Yhteensä</b>
                    <p id="yhteensa">0.00 €</p>
                        </td>
                        </tr>
                    </table>
                    <hr>
                </div>
            </form>`;
  var newScript = document.createElement("script");
  newScript.src = "toiminto.js";
  sivu.appendChild(newScript);
};

menot_valikko.onclick = function menotSivu() {
  paiv_valikko.className = "";
  tulot_valikko.className = "";
  menot_valikko.className = "active";
  varat_valikko.className = "";
  asetukset_valikko.className = "";

  sivu.innerHTML = `
    <h1>Menot</h1>
        <div>
            <form id="menot_lomake">
                <div>
                    <table>
                        <tr>
                            <td>Nimi:</td>
                            <td>Hinta:</td>
                            <td>Päivämäärä</td>
                        </tr>
                        <tr>
                            <td><input type="text" id="menot-nimi" placeholder="Menon nimi..." /></td>
                            <td><input type="number" id="menot-maara" placeholder="Määrä..." step="any" /></td>
                            <td><input type="date" id="menot-paiva" placeholder="Pvm..."/></td>
                        </tr>
                    </table>
                    <br>
                        <!-- Sykli:
                        <br>
                        <input type="radio" id="sykli_kerran" name="sykli" value="kerran">
                        kerran
                        <input type="radio" id="sykli_vuosi" name="sykli" value="vuosi">
                        vuosi
                        <input type="radio" id="sykli_kk" name="sykli" value="kk">
                        kk
                        <input type="radio" id="sykli_vk" name="sykli" value="vk">
                        vk
                        <input type="radio" id="sykli_pv" name="sykli" value="">
                        <input type="number" id="sykli_pv_luku" placeholder="päivät" value="1" />
                        päivää
                        <br> -->
                        <input type="hidden" id="tunnus" value="menot">
                        <br> 
                   <table>
                        <tr>
                        <td width="70%">
                    <button class="nappi" id='menot_npi'>Lisää</button>
                    <ul id="menot_lista" class="lista">
                    </ul>
                    </td><td>
                    <b>Menot Yhteensä</b>
                    <p id="yhteensa">0.00 €</p>
                       </td>
                        </tr>
                    </table>
                    <hr>
                </div>               
            </form>`;
  var newScript = document.createElement("script");
  newScript.src = "toiminto.js";
  sivu.appendChild(newScript);
};

varat_valikko.onclick = function varatSivu() {
  paiv_valikko.className = "";
  tulot_valikko.className = "";
  menot_valikko.className = "";
  varat_valikko.className = "active";
  asetukset_valikko.className = "";

  sivu.innerHTML = `
    <h1>Asetukset</h1>
        <div>
        <form id="varat_lomake">
            <h3>Varat</h3>
            <p id="varat"></p>
            <input type="hidden" id="tunnus" value="varat">
            <button class="nappi" id='varat_npi'>Käytä Varoja</button>
            <hr>
        </form>
        </div>`;
  var newScript = document.createElement("script");
  newScript.src = "asetukset.js";
  sivu.appendChild(newScript);
};

asetukset_valikko.onclick = function asetuksetSivu() {
  paiv_valikko.className = "";
  tulot_valikko.className = "";
  menot_valikko.className = "";
  varat_valikko.className = "";
  asetukset_valikko.className = "active";
  sivu.innerHTML = `
    <h1>Asetukset</h1>
        <div>
        <form id="varallisuus_lomake">
        <p id="testi"></p>
            <h3>Aikajakso</h3>
            <p id="aikajakso">
            <input type="date" id="aikajakso-alku" placeholder="AlkuPvm."/> - <input type="date" id="aikajakso-loppu" placeholder="LoppuPvm."/>
            </p>
            <h3>Varallisuus</h3>
            <p id="varallisuus"></p>
            <input type="number" id="aloitus-maara" placeholder="Nykyinen varallisuus" step="any" />
            <p>
            <button class="nappi" id='asetukset-npi'>Tallenna</button>
            <h3>Päiväbudjetti</h3>
            <input type="text" id="pv-budjetti"> <abbr id="max"></abbr>
            <p>
            <input type="hidden" id="tunnus" value="asetukset">
            <button class="nappi" id='pv_budj-npi'>Muuta</button>
            <hr>
        </form>
        </div>`;
  var newScript = document.createElement("script");
  newScript.src = "asetukset.js";
  sivu.appendChild(newScript);
};
