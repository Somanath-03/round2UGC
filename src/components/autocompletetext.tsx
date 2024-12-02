import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const options_static = ["The Godfather", "Pulp Fiction"];

function ComboBox() {
  return (
    <Autocomplete
      disablePortal
      options={options_static}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
  );
}
export default ComboBox;
