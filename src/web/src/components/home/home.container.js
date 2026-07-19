import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../hooks/AuthHook";
import { toast } from "react-toastify";

import { blApi } from "../../api/api";

const emptyForm = {
  title: "",
  year: "",
  castName: "",
  genresName: "",
  href: "",
  extract: "",
  thumbnail: "",
};

// Constrói o payload no formato que o bl-api espera (cast/genres como objeto { name })
function buildPayload(form) {
  return {
    title: form.title,
    year: Number(form.year),
    cast: { name: form.castName },
    genres: { name: form.genresName },
    href: form.href || undefined,
    extract: form.extract || undefined,
    thumbnail: form.thumbnail || undefined,
  };
}

function HomeContent() {
  const { signed, role } = useAuth();
  const [selectedMovie, setSelectedMovie] = useState("");
  const queryClient = useQueryClient();

  const canEdit = role === "admin" || role === "edit";
  const canDelete = role === "admin";
  const canCreate = role === "admin";

  // ---- Estado dos modais ----
  const [viewingMovie, setViewingMovie] = useState(null);
  const [editingMovie, setEditingMovie] = useState(null); // null = fechado, {} = criar, {...} = editar
  const [form, setForm] = useState(emptyForm);

  const { data, isLoading, error } = useQuery({
    queryKey: ["movies"],
    retry: false,
    queryFn: async () => {
      const response = await blApi.get("/movies");
      return response.data;
    },
    enabled: signed,
    onError: (err) => {
      const message = err.response?.data?.error || err.message || "Sem permissão";
      toast.error(message);
    },
  });

  const invalidateMovies = () => queryClient.invalidateQueries({ queryKey: ["movies"] });

  const createMutation = useMutation({
    mutationFn: (payload) => blApi.post("/movies", payload),
    onSuccess: () => {
      toast.success("Filme criado com sucesso!");
      invalidateMovies();
      closeEditModal();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || err.response?.data?.error || "Erro ao criar o filme.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => blApi.put(`/movies/${id}`, payload),
    onSuccess: () => {
      toast.success("Filme atualizado com sucesso!");
      invalidateMovies();
      closeEditModal();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || err.response?.data?.error || "Erro ao atualizar o filme.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => blApi.delete(`/movies/${id}`),
    onSuccess: () => {
      toast.success("Filme apagado com sucesso!");
      invalidateMovies();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || err.response?.data?.error || "Erro ao apagar o filme.");
    },
  });

  const openCreateModal = () => {
    setForm(emptyForm);
    setEditingMovie({});
  };

  const openEditModal = (movie) => {
    setForm({
      title: movie.title || "",
      year: movie.year || "",
      castName: movie.cast || "",
      genresName: movie.genres || "",
      href: movie.href || "",
      extract: movie.extract || "",
      thumbnail: movie.thumbnail || "",
    });
    setEditingMovie(movie);
  };

  const closeEditModal = () => {
    setEditingMovie(null);
    setForm(emptyForm);
  };

  const handleFormChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSaveMovie = () => {
    if (!form.title || !form.year) {
      toast.error("Título e ano são obrigatórios.");
      return;
    }
    const payload = buildPayload(form);
    if (editingMovie && editingMovie.id) {
      updateMutation.mutate({ id: editingMovie.id, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleDeleteMovie = (movie) => {
    if (window.confirm(`Tens a certeza que queres apagar "${movie.title}"?`)) {
      deleteMutation.mutate(movie.id);
    }
  };

  if (error) {
    return <div>Erro: {error.message}</div>;
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-center mt-10">Best Movies</h1>

      <Container
        sx={{
          backgroundColor: "background.default",
          padding: "2rem",
          borderRadius: "1rem",
        }}
      >
        <Box>
          <h2 style={{ color: "white" }}>Options</h2>
          <Stack direction="row" spacing={2} alignItems="center">
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
              </Select>
            </FormControl>
            {canCreate && signed && (
              <Button variant="contained" onClick={openCreateModal} sx={{ whiteSpace: "nowrap" }}>
                + Add Movie
              </Button>
            )}
          </Stack>
        </Box>
      </Container>

      <Container
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
          <div className="flex w-full h-screen justify-center items-center">
            <h1 className="text-2xl font-semibold text-red-600">Make login for see all movies.</h1>
          </div>
        ) : isLoading ? (
          <CircularProgress />
        ) : error ? (
          <div>Erro: {error.message}</div>
        ) : data && data.length > 0 ? (
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
                        <button className="p-2 bg-blue-400 rounded-lg font-semibold" onClick={() => setViewingMovie(movie)}>View</button>
                        {canEdit && (
                          <button className="p-2 bg-blue-400 rounded-lg font-semibold" onClick={() => openEditModal(movie)}>Edit</button>
                        )}
                        {canDelete && (
                          <button className="p-2 bg-red-400 rounded-lg font-semibold" onClick={() => handleDeleteMovie(movie)}>Delete</button>
                        )}
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

      {/* Modal de Visualização */}
      <Dialog open={!!viewingMovie} onClose={() => setViewingMovie(null)} maxWidth="sm" fullWidth>
        <DialogTitle>{viewingMovie?.title}</DialogTitle>
        <DialogContent dividers>
          {viewingMovie && (
            <Stack spacing={1}>
              {viewingMovie.thumbnail && (
                <img src={viewingMovie.thumbnail} alt={viewingMovie.title} style={{ maxWidth: "100%", borderRadius: 8 }} />
              )}
              <Typography><strong>Ano:</strong> {viewingMovie.year}</Typography>
              <Typography><strong>Elenco:</strong> {viewingMovie.cast}</Typography>
              <Typography><strong>Géneros:</strong> {viewingMovie.genres}</Typography>
              <Typography><strong>Resumo:</strong> {viewingMovie.extract || "—"}</Typography>
              {viewingMovie.href && (
                <Typography>
                  <strong>Url:</strong> <a href={viewingMovie.href} target="_blank" rel="noreferrer">{viewingMovie.href}</a>
                </Typography>
              )}
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewingMovie(null)}>Fechar</Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Criação/Edição */}
      <Dialog open={!!editingMovie} onClose={closeEditModal} maxWidth="sm" fullWidth>
        <DialogTitle>{editingMovie?.id ? "Editar Filme" : "Novo Filme"}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Título" value={form.title} onChange={handleFormChange("title")} required fullWidth />
            <TextField label="Ano" type="number" value={form.year} onChange={handleFormChange("year")} required fullWidth />
            <TextField label="Elenco (nome)" value={form.castName} onChange={handleFormChange("castName")} fullWidth />
            <TextField label="Género (nome)" value={form.genresName} onChange={handleFormChange("genresName")} fullWidth />
            <TextField label="Url" value={form.href} onChange={handleFormChange("href")} fullWidth />
            <TextField label="Resumo" value={form.extract} onChange={handleFormChange("extract")} multiline rows={3} fullWidth />
            <TextField label="Thumbnail (url)" value={form.thumbnail} onChange={handleFormChange("thumbnail")} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditModal}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={handleSaveMovie}
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default HomeContent;
