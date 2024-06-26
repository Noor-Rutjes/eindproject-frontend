# RijksBling - Installatiehandleiding

## Inhoudsopgave
1. [Inleiding](#inleiding)
2. [Screenshot](#screenshot)
3. [Benodigdheden](#benodigdheden)
4. [De applicatie draaien](#de-applicatie-draaien)
5. [Overige commando’s](#overige-commando’s)
6. [Testgebruikers](#testgebruikers)

## Inleiding
Ben je een liefhebber van de kunst in het Rijksmuseum en op zoek naar iets écht bijzonders?
Met onze online ontwerptool voor sieraden kan jij jouw eigen unieke creatie maken met schilderijen uit het Rijksmuseum.

Blader door onze collectie schilderijen en selecteer je favorieten. Heb je je keuze gemaakt? Ga dan naar de volgende pagina, waar je jouw gekozen kunstwerken kunt plaatsen en rangschikken om je eigen unieke ketting te creëren.

Deze webapplicatie is gemaakt als integrale eindopdracht voor de leerlijn Frontend van het bootcamp [Full Stack Developer](https://www.novi.nl/full-stack-developer/) van [NOVI Hogeschool](https://www.novi.nl/).

## Screenshot
![Screenshot van de applicatie](src/assets/readme/screenshot.png)

## Benodigdheden

Om de applicatie te draaien is het volgende nodig:

- Een IDE, zoals [WebStorm](https://www.jetbrains.com/webstorm/), zodat je de broncode kunt bekijken en de applicatie lokaal kan laten draaien.
- Installatie van [NodeJS](https://nodejs.org/en), voor het gebruiken en managen van dependencies. Type na installatie in de terminal van de IDE:
```bash
node -v
npm -v
```
Indien er een versienummer verschijnt, is Node.js correct geïnstalleerd.
- Een web browser, zoals [Google Chrome](https://www.google.com/intl/nl_nl/chrome/).
- Een API key van de [NOVI Educational Backend](https://novi.datavortex.nl/).
- Een API key van het [Rijksmuseum](https://data.rijksmuseum.nl/user-generated-content/api/).

## De applicatie draaien

1. Download of clone de repository met de broncode van GitHub [hier](https://github.com/Noor-Rutjes/eindproject-frontend).

   a. Download: Ga op GitHub naar Code (groene knop) en kies voor Download ZIP. Pak het zip-bestand uit op je eigen apparaat en open het in WebStorm.

   b. Clone: Ga op GitHub naar Code (groene knop) en kies voor Clone en SSH. Kopieer de SSH key. Open WebStorm, ga naar File, New, Project from Version Control. Er verschijnt een pop-up venster. Plak de SHH-key in het veld URL en open het project.

2. Zorg ervoor dat je Node.js en npm geïnstalleerd hebt. Installeer vervolgens de benodigde dependencies en start de applicatie:

```bash
# Installeer de benodigde pakketten
npm install

# Start de development server
npm run dev
```
In de terminal komt nu een webadres te staan waar de live server komt te draaien. In het geval van ViteJS is dat: http://localhost:5173. Klik op deze link om de app in de browser te openen.

3. Volg de stappen op de registratie- en inlogpagina's. Daarna kun je alle mogelijkheden van de app verkennen! 

## Overige commando's
### npm run build
Als je de React app wilt hosten op een server en handmatig wilt deployen, kun je een build maken.

Dit zal een `dist` (distributie) folder creëren in de root: ./dist. Deze specifieke folder kun je dan uploaden naar de server.

Om een distributie folder te maken kun je het volgende commando typen in de terminal:

```bash
npm run build
```

### npm run preview
Dit commando start een lokale ViteJS live server op die de inhoud van ./dist serveert op het volgende adres en poortnummer:

http://localhost:4173/

```bash
npm run preview
```
## Inloggegevens
Je kan je eigen account aanmaken, of gebruik de volgende inloggegevens om toegang te krijgen tot de applicatie:

- Gebruikersnaam: RijksBling  
- Email: rijksbling@gmail.com
- Wachtwoord: rijksbling1!
