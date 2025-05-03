import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { logo } from "../../utils/constants.jsx";
import SearchBar from "./SearchBar.jsx";

function Navbar() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        position: "sticky",
        background: "#000",
        justifyContent: "space-between",
      }}
    >
      <Link
        to="/"
        style={{
          display: "flex",
          background: "#000",
          top: 0,
          justifyContent: "space-between",
        }}
      >
        {/* <img src={logo} alt="logo" className="h-15" /> */}
      </Link>

      <SearchBar />
    </Stack>
  );
}

export default Navbar;
