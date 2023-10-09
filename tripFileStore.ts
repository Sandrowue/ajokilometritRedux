import {Trip} from './Trip';
import {loadJsonFile, overwriteJsonFile} from './jsonFiles';
import {newId} from './newId';
import {dateToTimestamp} from './time';

const TRIPS_FILE = 'ajokilsat.json';

let savedTrips: Trip[] | null = null;

export async function loadTrips(reload: boolean = false): Promise<Trip[]> {
    if (savedTrips === null || reload) {
        savedTrips = await loadJsonFile(TRIPS_FILE);
    }
    return savedTrips ?? exampleTrips;
}

export async function saveTripsToFile(trips: Trip[]) {
    /* Tallenna myös muuttujaan, jotta load Trips varmaan palauttaa tallennetut muukokset vaikka sitä kutsuttaisiin reload=flse:lla.
    HUOM: Käyttää [...trips] decontruktoinia, jotta savedTrips:n sisältö muuttuu jolloin React varmasti huomaa muutokset. */
    savedTrips = [...trips];
    await overwriteJsonFile(TRIPS_FILE, savedTrips);
}

const exampleTrips: Trip[] = [
    {id: newId(), vehicleId: 'car1', description: 'Raahe'},
    {id: newId(), vehicleId: 'car2', description: 'Huvimatka'},
    {id: newId(), vehicleId: 'car3', description: 'Kokous'},
    {id: newId(), vehicleId: 'car4', description: 'Helsinki'},
    {id: newId(), vehicleId: 'car5', description: 'Kauppareissu'},
    {id: newId(), vehicleId: 'car6', description: 'Heinola'},
    {id: newId(), vehicleId: 'car7', description: 'Turku'},
    {id: newId(), vehicleId: 'car8', description: 'Saaristokierros'},
    {id: newId(), vehicleId: 'car9', description: 'Karjaa'},
    {id: newId(), vehicleId: 'car10', description: 'Pori'},
    {id: newId(), vehicleId: 'car11', description: 'Salo'},
    {id: newId(), vehicleId: 'car12', description: 'Inari'},
    {id: newId(), vehicleId: 'car13', description: 'Yöelämä kuski'},
    {id: newId(), vehicleId: 'car14', description: 'Kotka'},
    {id: newId(), vehicleId: 'car15', description: 'Opintoreissu'},
    {id: newId(), vehicleId: 'car16', description: 'Kasvitieteellinen Puutarha'},
    {id: newId(), vehicleId: 'car17', description: 'Kouvola'},
    {id: newId(), vehicleId: 'car18', description: 'Imatra'},
    {id: newId(), vehicleId: 'car19', description: 'Risteilymatka'},
    {id: newId(), vehicleId: 'car20', description: 'Hammaslääkäri'},
    {id: newId(), vehicleId: 'car21', description: 'Ostosreissu'},
    {id: newId(), vehicleId: 'car22', description: 'Tampere'},
    {id: newId(), vehicleId: 'car23', description: 'Oulu'},
    {id: newId(), vehicleId: 'car24', description: 'Mustion Arboreetti'},
    {id: newId(), vehicleId: 'car25', description: 'Taidenäyttely'},
    {id: newId(), vehicleId: 'car26', description: 'Mylly'},
    {id: newId(), vehicleId: 'car27', description: 'Hinausajo'},
    {id: newId(), vehicleId: 'car28', description: 'Hautajaiset'},
    {id: newId(), vehicleId: 'car29', description: 'Korso'},
    {id: newId(), vehicleId: 'car30', description: 'Syntymäpäiväjuhlat'},

];