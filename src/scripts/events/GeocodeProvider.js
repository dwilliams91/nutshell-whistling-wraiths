import { keys } from '../Settings.js'

//Takes appropriately formatted (City, ST) location and converts to lattitude/longitude
let location = []
export const getGeocode =(city, statecode)=>{
    return fetch(`https://graphhopper.com/api/1/geocode?q=${city},${statecode}&locale=us&debug=true&key=${keys.graphhopperKey}`, {
        method: "Get"
    })
    .then(response=>response.json())
    .then(parsedLocation=>{
        location=parsedLocation.hits
    })
}
export const useGeocode = () => location.slice()

