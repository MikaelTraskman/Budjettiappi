let sivu = document.getElementById("sivu");

const tulot_valikko = document.getElementById("tulot-valikko");
const menot_valikko = document.getElementById("menot-valikko");
const varat_valikko = document.getElementById("varat-valikko");
// const asetukset_valikko = document.getElementById("asetukset-valikko");
let varat;

// Asetukset
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

let t_v =
  localStorage.getItem("Tulot_yhteensa") === null
    ? 0.0
    : JSON.parse(localStorage.getItem("Tulot_yhteensa"))[0].tulos;
let m_v =
  localStorage.getItem("Menot_yhteensa") === null
    ? 0.0
    : JSON.parse(localStorage.getItem("Menot_yhteensa"))[0].tulos;
varat = (t_v - m_v).toFixed(2);
tulot_valikko.innerHTML = `<b>Tulot</b><br><font color="e49a05">${t_v} €</font>`;
menot_valikko.innerHTML = `<b>Menot</b><br><font color="e49a05">${m_v} €</font>`;
varat_valikko.innerHTML = `<b>Varat</b><br><font color="e49a05">${varat} €</font>`;

tulot_valikko.onclick = function tulotSivu() {
  tulot_valikko.className = "active";
  menot_valikko.className = "";
  varat_valikko.className = "";

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
  tulot_valikko.className = "";
  menot_valikko.className = "active";
  varat_valikko.className = "";

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
  tulot_valikko.className = "";
  menot_valikko.className = "";
  varat_valikko.className = "active";
  //   asetukset_valikko.className = "";

  sivu.innerHTML = `
    <h1>Varat</h1>
        <div>
        <form id="varat_lomake">
            <p id="varat"></p>
            <input type="hidden" id="tunnus" value="varat">
            <hr>
        </form>
        </div>`;
  var newScript = document.createElement("script");
  newScript.src = "asetukset.js";
  sivu.appendChild(newScript);
};
