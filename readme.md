# Postinumerot-backend: Node.js & Express

Tässä tehtävässä sinun tulee hyödyntää Node.js:ää, npm:ää sekä [express](https://www.npmjs.com/package/express)-kirjastoa ja toteuttaa HTTP-palvelu, joka palauttaa postitoimipaikkojen nimiä sekä postinumeroita.

Tavoitteenamme on asynkronisen web-ohjelmoinnin opettelun lisäksi kerrata tietorakenteiden läpikäyntiä. Mikäli tehtävät eivät tarjoa tarvittavaa haastetta tai haluat oppia välimuistituksesta, voit tehdä lisäksi valinnaisen lisätehtävän.


## Harjoitusten kloonaaminen

Kun olet hyväksynyt tämän tehtävän GitHub classroomissa ja saanut repositoriosta henkilökohtaisen kopion, kloonaa se itsellesi `git clone` -komennolla. Siirry sen jälkeen VS Codeen editoimaan tiedostoja.

Kloonatessasi repositoriota varmista, että Git-osoitteen lopussa on oma GitHub-käyttäjänimesi. Jos käyttäjänimesi puuttuu osoitteesta, kyseessä ei ole henkilökohtainen kopiosi tehtävästä. Luo tässä tapauksessa oma repositorio tämän linkin kautta: TODO.


## Tämän projektin käyttäminen ja testaaminen

Tässä projektissa palvelimen JavaScript-koodi on jaettu kahteen osaan:

**app.js** sisältää express-sovelluksen http-polkujen määritykset, ja sinun tulee kirjoittaa ratkaisusi tähän tiedostoon.

**index.js** sisältää http-palvelimen käynnistykseen liittyvän logiikan. Tätä tiedostoa ei tarvitse muuttaa.

Tämän projektin riiippuvuuksien asentaminen onnistuu `npm install`-komennolla. Tämän jälkeen voit kirjoittaa `npm start`, joka käynnistää http-palvelimen omalla tietokoneellasi portissa 3000. Kun palvelin on käynnissä, voit ottaa siihen yhteyden selaimella osoitteessa http://localhost:3000.

Projekti hyödyntää [nodemon](https://www.npmjs.com/package/nodemon)-nimistä työkalua, joka käynnistää palvelimen automaattisesti uudelleen, kun teet muutoksia sen tiedostoihin. Nodemon on määritetty [package.json:iin](./package.json) käynnistymään `npm start`-komennolla.

Tehtävän ratkaisemiseksi sinun kannattaa todennäköisesti lisätä projektiisi myös uusia JavaScript-tiedostoja sekä npm-riippuvuuksia. Varmista, että lisäät uudet tiedostot add- ja commit-komennoilla. Asentamiesi riippuvuuksien tulee myös löytyä `package.json`-tiedostosta, jotta ne asentuvat myös GitHub classroomiin.

Kun olet saanut harjoituksen osia toteutettua, voit suorittaa tehtävälle kirjoitetut [Jest](https://jestjs.io/)-testit. Testit suoritetaan komennolla `npm test`. Testit sijaitsevat [test](./test)-hakemistossa ja voit halutessasi tutustua myös niiden lähdekoodeihin.


## Osa 1: JSON-tiedoston hakeminen ja parametrin käsittely (3 pistettä)

Toteuta `app.js`-tiedoston express-sovellukseen uusi polku `/postalcodes`, jolta voidaan kysyä postinumeron avulla postitoimitoimipaikan nimi. Postinumero annetaan HTTP-pyynnön parametrina nimeltä `number` seuraavasti:

```
curl http://localhost:3000/postalcodes?number=99999
```

Vastaus tulee palauttaa JSON-muodossa seuraavasti:

```json
{
  "number": "99999",
  "name": "KORVATUNTURI"
}
```

Varaudu myös tilanteeseen, jossa annettua postinumeroa ei löydy. Aseta tällöin toimipaikan nimeksi `null`-arvo, ja aseta vastauksen http-status-koodiksi 404 (not found).

[Postinumeroaineisto](https://github.com/theikkila/postinumerot) löytyy GitHubista [JSON-muodossa](https://raw.githubusercontent.com/theikkila/postinumerot/master/postcode_map_light.json).

JSON-aineisto tulee ladata tässä tehtävässä dynaamisesti esimerkiksi fetch-funktiolla tai axios-kirjastolla. **Älä siis tallenna aineistoa staattiseksi tiedostoksi.**

Voit lukea tarkemman kuvauksen käsiteltävästä aineistosta aikaisemmasta [Python-tehtävän tehtävänannosta](https://github.com/harjoitukset/python-postalcodes).


## Osa 2: Polun käsittely ja JSON-tietorakenteen läpikäynti (2 pistettä)

Toteuta edellä ohjeistetun tehtävän lisäksi palvelimelle toinen polku, josta voidaan etsiä postitoimipaikan nimellä kaikki siihen kuuluvat postinumerot. Postitoimipaikan nimi tulee tällä kertaa antaa osana polkua, esimerkiksi seuraavasti:

```
curl http://localhost:3000/postalcodes/porvoo/
```

Tällä kertaa vastaus palautetaan JSON-muodossa siten, että kaikki annettua toimipaikan nimeä vastaavat postinumerot ovat `numbers`-taulukossa, esimerkiksi seuraavasti:

```json
{
  "name": "porvoo",
  "numbers": ["06100", "06401", "06151", "06150", "06101", "06500", "06450", "06400", "06200"]
}
```

Ohjelman tulee löytää postinumerot annetun nimen **kirjainkoosta riippumatta**.

Mikäli pyydettyä postitoimipaikkaa ei löydy aineistosta lainkaan, HTTP-pyynnön status-koodiksi täytyy asettaa **404**.


**Vinkki JSON:in läpikäyntiin**

Python-harjoitusten yhteydessä käytimme aineiston läpikäynnissä Pythonin dict-tietorakenteen `keys()`-, `values()`- ja `items()`-metodeja. 

JavaScriptin Object-luokasta löytyy vastaavat metodit `Object.keys(data)`, `Object.values(data)` ja `Object.entries(data)`, jotka mahdollisesti ovat hyödyksi tehtävän ratkaisussa:

* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries


## Postinumeroaineiston välimuistitus (extra)

Postinumeroaineiston hakeminen verkosta on tämän ohjelman suorituskyvyn kannalta suurin haaste. Lisäksi useat rajapinnat rajoittavat niihin tehtävien kutsujen määrää, joten rajapinta saattaisi lakata vastaamasta tekemiimme toistuviin kutsuihin:

> *"Rate limiting is a strategy for limiting network traffic. It puts a cap on how often someone can repeat an action within a certain timeframe – for instance, trying to log in to an account. Rate limiting can help stop certain kinds of malicious bot activity. It can also reduce strain on web servers."*
>
> Cloudflare. What Is Rate Limiting? https://www.cloudflare.com/learning/bots/what-is-rate-limiting/

Aineiston lataaminen etukäteen tai vain ohjelman käynnistyessä ratkaisisi ongelman, mutta aineistoon tulevat päivitykset eivät tulisi omaan palveluumme automaattisesti saataville.

Näiden ongelmien ratkaisemiseksi aineistoa voidaan pitää ohjelman muistissa tietyn aikaa, jonka jälkeen aineisto haetaan uudelleen. Tällaisista [välimuisteista](https://fi.wikipedia.org/wiki/V%C3%A4limuisti) käytetään termiä **cache**.

HTTP-vastaukset sisältävät hyvin usein tietoa mm. niiden välimuistituksesta. GitHub-palvelin pyytää JSON-tiedostoa ladattaessa HTTP-otsikkojen avulla asiakasta välimuistittamaan vastauksen 5 minuutin ajaksi.

HTTP-vastausten otsikkotietoja voidaan tutkia esimerkiksi `curl -I`-komennon avulla seuraavasti:

```
$ curl -I https://raw.githubusercontent.com/theikkila/postinumerot/master/postcode_map_light.json
HTTP/2 200 
cache-control: max-age=300
content-type: text/plain; charset=utf-8
etag: "0c7eee999e998c6d959353abc9abeccb56d0ddaaac9a5d46dac0b123d68d0c41"
via: 1.1 varnish
x-served-by: cache-bma1627-BMA
x-cache: HIT
x-cache-hits: 1
expires: Thu, 11 Mar 2021 09:48:46 GMT
source-age: 155
```

Yllä olevissa HTTP-otsikoissa on välimuistin ajan lisäksi muitakin välimuistitukseen liittyvää tietoa tietoja, kuten `etag` ja `x-cache`.

Välimuistitus voidaan toteuttaa ohjelmassa monella eri tavalla. Yksi vaihtoehto on välimuistittaa HTTP-pyyntöjen vastauksia käyttämällä HTTP-asiakaskirjastoa, joka huolehtii välimuistituksesta automaattisesti. Tällöin emme tarvitse välttämättä muutoksia omaan koodiimme.

Toinen vaihtoehto on toteuttaa välimuistitus osaksi omaa ohjelmaamme:

> *"You could then wrap your API call in a helper function which checks the cache, and returns the value if it's present. If it's not it makes the API request, adds it to the cache, then returns it."*
>
> Nick Mitchinson. Proper way to cache data from API call with nodejs. https://stackoverflow.com/a/15608809

Välimuistiin asettamisen ja sieltä hakemisen lisäksi vanhentuneet vastaukset tulee luonnollisesti poistaa välimuistista, jolloin data haetaan uudestaan API-rajapinnasta. Välimuistitetun datan poistamista välimuistista kutsutaan termillä "cache invalidation" ja siihenkin on olemassa [erilaisia lähestymistapoja](https://www.varnish-software.com/glossary/what-is-cache-invalidation/).

Tämän lisätehtävän ratkaisemisessa voit halutessasi käyttää hyödyksi esimerkiksi fetch-kutsuja välimuistittavaa [node-fetch-cache](https://www.npmjs.com/package/node-fetch-cache)-kirjastoa tai sanakirjan tavoin toimivaa [node-cache](https://www.npmjs.com/package/node-cache)-kirjastoa. Voit myös halutessasi toteuttaa oman välimuistituslogiikan. 

Riippuvuuksia asentaessasi on hyvä muistaa, että npm-paketit ovat erinäisten tahojen julkaisemaa suoritettavaa koodia. Niitä asennettaessa kannattaa perehtyä projektien laatuun ja luotettavuuteen esimerkiksi niiden GitHub-sivujen avulla: [node-cache](https://github.com/node-cache/node-cache), [node-fetch-cache](https://github.com/mistval/node-fetch-cache).

---

# Lisenssit ja tekijänoikeudet

Tämän oppimateriaalin on kehittänyt Teemu Havulinna ja se on lisensoitu [Creative Commons BY-NC-SA -lisenssillä](https://creativecommons.org/licenses/by-nc-sa/4.0/).

## Postin postinumeroaineisto

Tässä tehtävässä hyödynnetään [@theikkila](https://github.com/theikkila):n ja [@otlaitil](https://github.com/otlaitil):an projektia [https://github.com/theikkila/postinumerot](https://github.com/theikkila/postinumerot), joka hakee säänöllisesti Postin tietokannasta kaikki postinumerotiedot.

> *"Data on postin ja sitä koskee kaikki http://www.posti.fi/liitteet-yrityksille/ehdot/postinumeropalvelut-palvelukuvaus-ja-kayttoehdot.pdf dokumentin käyttöehdot."*
>
> *"JSON-muunnokset ovat vapaasti käytettävissä ja muunneltavissa."*
>
> Lähde: https://github.com/theikkila/postinumerot