import { LoadScript } from "@react-google-maps/api";
import { createContext, useContext, useState, ReactNode } from "react";

interface GoogleMapsContextType {
  scriptLoaded: boolean;
}

const GoogleMapsContext = createContext<GoogleMapsContextType | undefined>(undefined);

interface GoogleMapsProviderProps {
  children: ReactNode;
}

export function GoogleMapsProvider({ children }: GoogleMapsProviderProps) {
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || "";

  const handleScriptLoad = () => {
   
    setScriptLoaded(true);
  };

  const handleScriptError = (error: ErrorEvent) => {

  };

  return (
    <GoogleMapsContext.Provider value={{ scriptLoaded }}>
      <LoadScript
        googleMapsApiKey={GOOGLE_MAPS_API_KEY}
        onLoad={handleScriptLoad}
        onError={handleScriptError}
        loadingElement={<div>Loading Google Maps...</div>}
      >
        {children}
      </LoadScript>
    </GoogleMapsContext.Provider>
  );
}

export function useGoogleMaps() {
  const context = useContext(GoogleMapsContext);
  if (!context) {
    throw new Error("useGoogleMaps must be used within a GoogleMapsProvider");
  }
  return context;
}
