'use client'

import {
  GoogleMap,
  useLoadScript
} from "@react-google-maps/api"

interface Location {
  lat: number
  lng: number
}

interface LiveMapArgs {
  currentLocation: Location | null
  selectedPlace: Location | null
  searchLngLat: Location | null
}

export function LiveMap({
  currentLocation,
  selectedPlace,
  searchLngLat
}: LiveMapArgs) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  if (!isLoaded) return <div>Loading....</div>

  const center = { lat: 25.033100, lng: 121.565154 }

  return (
    <div className="w-full h-full">
      <GoogleMap
        zoom={currentLocation || selectedPlace ? 18 : 12}
        center={currentLocation || searchLngLat || center}
        mapContainerClassName="map"
        mapContainerStyle={{ width: "100%", height: "100%", margin: "auto" }}
      >
      </GoogleMap>
    </div>
  )
}
