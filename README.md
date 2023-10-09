# Ajokilsat

Tämä on Expolla toteutettu kännykkäsovellus ajokilometrien kerämiseen.
Projektin tarkoitus on harjoitella kännykkäsovelluksien ohjelmointia.
Expolla toteutettuna sovellus toimii Androidilla ja iOS:lla, mutta
tähän mennessä sovellusta on testattu vain Androidilla.

## Tietomallit 

(*) Pakollinen kenttä

### Trip (Matka)

- `vehicle` (*) - ajoneuvo, jolla matka tehtiin
- `odometerAtBegin` (*) - matkamittari lukema alussa
- `odometerAtEnd` (*) - matkamittari lukema lopussa
- `timestampAtBegin` - aikaleima matkan alussa
- `timestampAtEnd` - aikaleima matkan lopussa
- `description` (*) - matkan kuvaus
- `track` - "jälki", johon tallennetaan matkan GPS-koordinaatit * Lista GPS-koordinaateista ja aikaleimoista
- `routDescription` - reitin kuvaus (tyyliin: Turku-Raisio-Turku)

### Vehicle (Avoneuvo)

- `name` (*) - nimi
- `registrationNumber` - rekisterinumero