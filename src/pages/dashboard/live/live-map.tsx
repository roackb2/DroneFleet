'use client'

import {
  Marker,
  GoogleMap,
  useLoadScript
} from "@react-google-maps/api"

interface Location {
  lat: number
  lng: number
}

interface LiveMapArgs {
  currentLocation?: Location
  selectedPlace?: Location
  searchLngLat?: Location,
  droneLocation?: Location
}

export function LiveMap({
  currentLocation,
  selectedPlace,
  searchLngLat,
  droneLocation
}: LiveMapArgs) {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''
  const { isLoaded } = useLoadScript({
    googleMapsApiKey,
  })

  if (!isLoaded) return <div>Loading....</div>

  const center = { lat: 25.033100, lng: 121.565154 }

  return (
    <div className="w-full h-full">
      <GoogleMap
        zoom={droneLocation ?? currentLocation ?? selectedPlace ? 18 : 12}
        center={droneLocation ?? currentLocation ?? searchLngLat ?? center}
        mapContainerClassName="map"
        mapContainerStyle={{ width: "100%", height: "100%", margin: "auto" }}
      >
        {droneLocation && (
          <Marker
            position={droneLocation}
          />
        )}
      </GoogleMap>
    </div>
  )
}
