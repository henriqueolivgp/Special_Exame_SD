import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../hooks/AuthHook"; // Supondo que useAuth retorna { session }
import { toast } from "react-toastify";

import Cookies from 'js-cookie'; // Não te esqueças de importar isto no topo!

// ... lá mais para baixo, no teu pedido:

function HomeContent() {
  const { signed } = useAuth(); // Ajuste conforme seu hook
  const [selectedMovie, setSelectedMovie] = useState("");
  const token = Cookies.get('token'); // Vai buscar o token guardado no login

  const { data, isLoading, error } = useQuery({
    queryKey: ["movies"],
    retry: false, // <-- ISTO DESLIGA AS REPETIÇÕES AUTOMÁTICAS (Acaba o spam de Toasts!)
    queryFn: async () => {

      console.log("Token lido dos cookies: ", token); // <-- Vê na consola se aparece um código gigante ou 'undefined'

      // request to fetch all movies
      const res = await fetch(`${process.env.REACT_APP_BL_API_URL}/movies`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // DICA: Se continuar a falhar, tenta tirar o "Bearer " e deixar só: `Authorization: token`
        }
      });

      if (!res.ok) {
        const errorText = await res.text();
        toast.error(errorText);
        throw new Error("Sem permissão");
      }

      const data = await res.json();
      return data;
    },
    enabled: signed,
  });

  if (error) {
    return <div>Erro: {error.message}</div>;
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-center mt-10">Best Movies</h1>

      <Container
        // className="clac(100%-16rem)"
        sx={{
          backgroundColor: "background.default",
          padding: "2rem",
          borderRadius: "1rem",
        }}
      >
        {/* Search Title */}
        {/* <Box>
          <h2 style={{ color: "white" }}>Options</h2>
          <FormControl fullWidth>
            <InputLabel id="countries-select-label">Title</InputLabel>
            <Select
              labelId="countries-select-label"
              value={selectedMovie}
              label="Country"
              onChange={(e) => setselectedMovie(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {movies.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box> */}
        {/* Year filter */}
        {/* <Box>
          <h2 style={{ color: "white" }}>Options</h2>
          <FormControl fullWidth>
            <InputLabel id="countries-select-label">Year</InputLabel>
            <Select
              labelId="countries-select-label"
              value={selectedMovie}
              label="Country"
              onChange={(e) => setselectedMovie(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {movies.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box> */}
        {/* Search Casts */}
        <Box>
          <h2 style={{ color: "white" }}>Options</h2>
          <FormControl fullWidth>
            <InputLabel id="countries-select-label">Casts</InputLabel>
            <Select
              labelId="countries-select-label"
              value={selectedMovie}
              label="Country"
              onChange={(e) => setSelectedMovie(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {/* {movies.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))} */}
            </Select>
          </FormControl>
        </Box>
      </Container>

      <Container
        // className="w-[clac(100%-16rem)]"
        sx={{
          backgroundColor: "info.dark",
          padding: "2rem",
          marginTop: "2rem",
          borderRadius: "1rem",
          color: "white",
        }}
      >
        <h2 className="text-4xl font-bold">Results</h2>
        {!signed ? (
          // if user not authenticated (signed is false)
          <div className="flex w-full h-screen justify-center items-center">
            <h1 className="text-2xl font-semibold text-red-600">Make login for see all movies.</h1>
          </div>
        ) : isLoading ? (
          // if is loading data (isLoading is true)
          <CircularProgress />
        ) : error ? (
          // if ocurred an error shows the message
          <div>Erro: {error.message}</div>
        ) : data && data.length > 0 | data !== undefined ? (
          <div className="table-container rounded-lg overflow-x-auto">
            <table className="w-full mt-4 rounded-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs rounded-lg uppercase bg-gray-700 text-center text-gray-400">
                <tr className="rounded-lg">
                  <th className="px-6 py-3 whitespace-nowrap ">Title</th>
                  <th className="px-6 py-3 whitespace-nowrap">Year</th>
                  <th className="px-6 py-3 whitespace-nowrap">Cast</th>
                  <th className="px-6 py-3 whitespace-nowrap">Genres</th>
                  <th className="px-6 py-3 whitespace-nowrap">Url</th>
                  <th className="px-6 py-3 whitespace-nowrap">Extract</th>
                  <th className="px-6 py-3 whitespace-nowrap">Thumbnail</th>
                  <th className="px-6 py-3 whitespace-nowrap">Buttons</th>
                </tr>
              </thead>
              <tbody>
                {data.map((movie) => (
                  <tr className="bg-gray-800 border-b border-gray-200" key={movie.id}>
                    <td className="px-4 py-4 font-medium text-white whitespace-nowrap max-w-xs table-cell-truncate">{movie.title}</td>
                    <td className="px-4 py-4 font-medium text-white whitespace-nowrap">{movie.year}</td>
                    <td className="px-4 py-4 font-medium text-white whitespace-nowrap max-w-xs table-cell-truncate">{movie.cast}</td>
                    <td className="px-4 py-4 font-medium text-white whitespace-nowrap max-w-xs table-cell-truncate">{movie.genres}</td>
                    <td className="px-4 py-4 font-medium text-white whitespace-nowrap max-w-xs table-cell-truncate">{movie.href}</td>
                    <td className="px-4 py-4 font-medium text-white whitespace-nowrap max-w-xs table-cell-truncate">{movie.extract}</td>
                    <td className="px-4 py-4 font-medium text-white whitespace-nowrap max-w-xs table-cell-truncate"><img width={50} src={movie.thumbnail} alt="" /></td>
                    <td className="px-4 py-4 font-medium text-white whitespace-nowrap max-w-xs table-cell-truncate">
                      <div className="flex gap-2">
                        <button className="p-2 bg-blue-400 rounded-lg font-semibold" >View</button>
                        <button className="p-2 bg-blue-400 rounded-lg font-semibold" >Edit</button>
                        <button className="p-2 bg-red-400 rounded-lg font-semibold" >Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>--</div>
        )}
      </Container>

    </>
  );
}

export default HomeContent;
