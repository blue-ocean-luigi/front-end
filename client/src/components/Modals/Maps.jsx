import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'
import { FaLocationArrow, FaGoogle } from "react-icons/fa";

const GEO_API = 'https://maps.googleapis.com/maps/api/geocode/json'

const Maps = (props) => {
  // const {isLoaded} = useJsApiLoader({
  //   googleMapsApiKey: 'AIzaSyCDxzm8eD-hPNIDwpOFKeznkYhFPiwADAQ',
  //   libraries: ['places'],
  // })

  // const [map, setMap] = useState(null)
  // const [geoEnd, setGeoEnd] = useState({lat: undefined, lng: undefined})

  // const [directions, setDirections] = useState(null)
  // const [distance, setDistance] = useState('')
  // const [duration, setDuration] = useState('')


  // const startLoc = useRef('')


  // const getEndGeo = (address) => {
  //   axios({
  //     url: GEO_API,
  //     method: "get",
  //     params: { key: 'AIzaSyCm-ofA5lVzEGCw637icC6dcDJdOzCJLds', address: address },
  //   })
  //   .then((res) => {
  //     let data = res.data.results[0].geometry.location
  //     console.log(data)
  //     setGeoEnd(data)
  //   })
  //   .catch((err) => console.log(err))
  // }

  // const calcRoute = async () => {
  //   if (startLoc.current.value !== '') {
  //     const directions = new google.maps.DirectionsService()
  //     const results = await directions.route({
  //       origin: startLoc.current.value,
  //       destination: props.endLoc,
  //       travelMode: google.maps.TravelMode.DRIVING
  //     })

  //     setDirections(results)
  //     setDistance(results.routes[0].legs[0].distance.text)
  //     setDuration(results.routes[0].legs[0].duration.text)
  //   }
  // }

  // const clearRoute = () => {
  //   setDirections(null)
  //   setDistance('')
  //   setDuration('')
  //   startLoc.current.value = ''
  // }

  // useEffect(() => {
  //   getEndGeo(props.endLoc)
  // }, [])

  // if (!isLoaded) {
  //   return <h1>loading</h1>
  // }


  // return (
  //   <div>
  //     <Map>
  //       <GoogleMap
  //       center={edc}
  //       zoom={10}
  //       mapContainerStyle={{width: '100%', height: '100%'}}
  //       options={{
  //         streetViewControl: false,
  //         mapTypeControl: false,
  //         fullscreenControl: false
  //       }}
  //       onLoad={(map) => setMap(map)}
  //       >
  //         {geoEnd.lat !== undefined && <Marker position={geoEnd}/>}
  //         {directions && <DirectionsRenderer directions={directions}/>}
  //       </GoogleMap>
  //     </Map>
  //     <Flex>
  //       <Autocomplete>
  //         <Input type='text' placeholder='Origin' ref={startLoc}/>
  //       </Autocomplete>
  //       <p>{props.endLoc}</p>
  //     </Flex>
  //     <Flex>
  //       <button type='submit' onClick={calcRoute}>Route</button>
  //       <X onClick={clearRoute}>X</X>
  //     </Flex>
  //     <p>Distance: {distance}</p>
  //     <p>Duration: {duration}</p>
  //     <Arrow>
  //       <FaLocationArrow
  //       onClick={() => map.panTo(geoEnd)}/>
  //     </Arrow>
  //     <Arrow>
  //       <a
  //       target="_blank"
  //       rel="noopener noreferrer"
  //       href={`https://www.google.com/maps/dir/${startLoc.current.value}/${props.endLoc}`}>
  //         <FaGoogle/>
  //       </a>
  //     </Arrow>
  //   </div>
  // );
}

export default Maps;

// const Map = styled.div`
//   height: 30vh;
//   width: 500px;
// `;

// const Flex = styled.div`
//   display: flex;
//   margin-top: 10px;
// `;

// const Input = styled.input`
//   margin: 0 10px 0 5px;
// `;

// const X = styled.button`
//   margin-left: 5px;
//   padding: 8px;
// `;

// const Arrow = styled.div`
//   display: flex;
//   padding: 10px;
//   width: 30px;
//   background-color: grey;
//   cursor: pointer;
// `;