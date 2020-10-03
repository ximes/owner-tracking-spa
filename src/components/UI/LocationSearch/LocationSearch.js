import React from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete, LoadScript } from "@react-google-maps/api";

function LocationSearch(props) {
  const [autocomplete, setAutocomplete] = React.useState();

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      let place = autocomplete.getPlace();

      props.onChange(
        place.name,
        place.geometry.location.lat.call(),
        place.geometry.location.lng.call(),
        place.address_components.filter((v) => v.types[0] === "country")[0]
          .short_name
      );
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
    >
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        types={["(regions)"]}
        fields={["address_components", "geometry.location", "name"]}
      >
        <TextField
          required
          helperText="This is going to be displayed on a map. Stick it to city-level"
          fullWidth={true}
          value={props.value}
          error={false}
        />
      </Autocomplete>
    </LoadScript>
  );
}
 
export default React.memo(LocationSearch);
