import { keys } from '../Settings.js'

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
const render = (location) =>{
    console.log("lat: ", location[0].point.lat, "lon: ", location[0].point.lng )
}
export const cityCoords = (city, stateCode) =>{
    getGeocode(city, stateCode).then(() => {
        const location = useGeocode()
        render(location)
        console.log(location)
    })
}