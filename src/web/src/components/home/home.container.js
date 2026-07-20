import { useState } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../hooks/AuthHook";
import { toast } from "react-toastify";
import { Film, Plus, Eye, Pencil, Trash2, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

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

function Poster({ src, title }) {
  if (src) {
    return (
      <img
        src={src}
        alt={title}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          e.currentTarget.nextSibling.style.display = "flex";
        }}
      />
    );
  }
  return <PosterFallback />;
}

function PosterFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black/5 dark:bg-white/5 text-ink/25 dark:text-chalk/25">
      <Film size={28} />
    </div>
  );
}

function MovieCard({ movie, canEdit, canDelete, onView, onEdit, onDelete }) {
  return (
    <div className="group rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-bone dark:bg-fog hover:border-shard/50 transition-colors">
      <div className="relative aspect-[2/3] bg-black/5 dark:bg-white/5">
        <Poster src={movie.thumbnail} title={movie.title} />
        <div className="hidden w-full h-full absolute inset-0"><PosterFallback /></div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center gap-2 p-3">
          <button
            onClick={() => onView(movie)}
            aria-label="Ver detalhes"
            className="w-9 h-9 rounded-lg bg-white/90 text-ink flex items-center justify-center hover:bg-white"
          >
            <Eye size={16} />
          </button>
          {canEdit && (
            <button
              onClick={() => onEdit(movie)}
              aria-label="Editar filme"
              className="w-9 h-9 rounded-lg bg-shard text-white flex items-center justify-center hover:bg-shard-dim"
            >
              <Pencil size={16} />
            </button>
          )}
          {canDelete && (
            <button
              onClick={() => onDelete(movie)}
              aria-label="Apagar filme"
              className="w-9 h-9 rounded-lg bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>

        {movie.year && (
          <span className="absolute top-2 left-2 font-mono text-[11px] px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-sm">
            {movie.year}
          </span>
        )}
      </div>

      <div className="p-3">
        <h3 className="font-display font-semibold text-sm leading-snug line-clamp-2 mb-1">{movie.title}</h3>
        {movie.genres && (
          <p className="text-xs text-ink/50 dark:text-chalk/50 truncate">{movie.genres}</p>
        )}
      </div>
    </div>
  );
}

function HomeContent() {
  const { signed, role } = useAuth();
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

  return (
    <div className="max-w-6xl w-full mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div>
          <span className="font-mono text-xs tracking-wide text-shard uppercase">Catálogo</span>
          <h1 className="font-display text-3xl font-bold mt-1">Filmes</h1>
        </div>
        {canCreate && signed && (
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-lg bg-shard px-4 py-2.5 text-sm font-semibold text-white shadow-shard hover:bg-shard-dim transition-colors"
          >
            <Plus size={16} />
            Adicionar filme
          </button>
        )}
      </div>

      {!signed ? (
        <div className="flex flex-col items-center justify-center text-center rounded-xl border border-dashed border-black/15 dark:border-white/15 py-24 px-6">
          <Film className="text-shard mb-4" size={32} />
          <h2 className="font-display text-xl font-semibold mb-2">Inicia sessão para ver o catálogo</h2>
          <p className="text-sm text-ink/60 dark:text-chalk/60 max-w-sm mb-6">
            O acesso aos filmes depende do serviço de autenticação — sem sessão, não há dados.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-lg bg-shard px-4 py-2.5 text-sm font-semibold text-white hover:bg-shard-dim transition-colors"
          >
            <LogIn size={16} />
            Entrar
          </Link>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center py-24">
          <CircularProgress />
        </div>
      ) : error ? (
        <div className="text-red-500 text-sm">Erro: {error.message}</div>
      ) : data && data.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {data.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              canEdit={canEdit}
              canDelete={canDelete}
              onView={setViewingMovie}
              onEdit={openEditModal}
              onDelete={handleDeleteMovie}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-ink/50 dark:text-chalk/50 py-24">Nenhum filme no catálogo ainda.</div>
      )}

      {/* Modal de Visualização */}
      <Dialog open={!!viewingMovie} onClose={() => setViewingMovie(null)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 }}>
          {viewingMovie?.title}
        </DialogTitle>
        <DialogContent dividers>
          {viewingMovie && (
            <Stack spacing={1.5}>
              {viewingMovie.thumbnail && (
                <img src={viewingMovie.thumbnail} alt={viewingMovie.title} style={{ maxWidth: "180px", borderRadius: 10 }} />
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
        <DialogTitle sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 }}>
          {editingMovie?.id ? "Editar Filme" : "Novo Filme"}
        </DialogTitle>
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
    </div>
  );
}

export default HomeContent;
