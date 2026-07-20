import { useState } from "react";
import {
  Button,
  CircularProgress,
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
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Pencil, Trash2, ShieldMinus } from "lucide-react";

import { authApi } from "../api/api";

const ROLE_OPTIONS = ["admin", "edit", "view"];

const ROLE_STYLES = {
  admin: "bg-shard/15 text-shard",
  edit: "bg-reel/15 text-reel",
  view: "bg-black/10 dark:bg-white/10 text-ink/60 dark:text-chalk/60",
};

function RoleBadge({ role }) {
  return (
    <span className={`inline-block font-mono text-[11px] uppercase tracking-wide px-2 py-0.5 rounded-full ${ROLE_STYLES[role] || ROLE_STYLES.view}`}>
      {role || "view"}
    </span>
  );
}

export default function UsersControl() {
  const queryClient = useQueryClient();
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ username: "", role: "view" });

  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    retry: false,
    queryFn: async () => {
      const response = await authApi.get("/users");
      return response.data;
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Não foi possível carregar os utilizadores.");
    },
  });

  const invalidateUsers = () => queryClient.invalidateQueries({ queryKey: ["users"] });

  const updateMutation = useMutation({
    mutationFn: ({ id, newUsername, newRole }) =>
      authApi.put(`/users/${id}`, { newUsername, newRole }),
    onSuccess: () => {
      toast.success("Utilizador atualizado com sucesso!");
      invalidateUsers();
      setEditingUser(null);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || err.response?.data?.error || "Erro ao atualizar utilizador.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => authApi.delete(`/user/${id}`),
    onSuccess: () => {
      toast.success("Utilizador apagado com sucesso!");
      invalidateUsers();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || err.response?.data?.error || "Erro ao apagar utilizador.");
    },
  });

  const openEditModal = (user) => {
    setForm({ username: user.username, role: user.role || "view" });
    setEditingUser(user);
  };

  const handleSave = () => {
    if (!form.username) {
      toast.error("O username não pode ficar vazio.");
      return;
    }
    updateMutation.mutate({ id: editingUser.id, newUsername: form.username, newRole: form.role });
  };

  const handleDelete = (user) => {
    if (window.confirm(`Tens a certeza que queres apagar o utilizador "${user.username}"?`)) {
      deleteMutation.mutate(user.id);
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto">
      <div className="mb-8">
        <span className="font-mono text-xs tracking-wide text-shard uppercase flex items-center gap-1.5">
          <ShieldMinus size={13} /> Admin
        </span>
        <h1 className="font-display text-3xl font-bold mt-1">Utilizadores</h1>
      </div>

      <div className="rounded-xl border border-black/10 dark:border-white/10 bg-bone dark:bg-fog overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <CircularProgress />
          </div>
        ) : error ? (
          <div className="p-6 text-red-500 text-sm">
            Erro ao carregar utilizadores: {error.response?.data?.error || error.message}
          </div>
        ) : users && users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase tracking-wide font-mono text-ink/50 dark:text-chalk/50 bg-black/5 dark:bg-white/5">
                <tr>
                  <th className="px-5 py-3 font-medium">Id</th>
                  <th className="px-5 py-3 font-medium">Username</th>
                  <th className="px-5 py-3 font-medium">Role</th>
                  <th className="px-5 py-3 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-black/5 dark:border-white/5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
                    <td className="px-5 py-3.5 font-mono text-xs text-ink/50 dark:text-chalk/50">{user.id}</td>
                    <td className="px-5 py-3.5 font-medium">{user.username}</td>
                    <td className="px-5 py-3.5"><RoleBadge role={user.role} /></td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => openEditModal(user)}
                          aria-label="Editar utilizador"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-ink/60 dark:text-chalk/60 hover:bg-shard/15 hover:text-shard transition-colors"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          aria-label="Apagar utilizador"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-ink/60 dark:text-chalk/60 hover:bg-red-500/15 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-ink/50 dark:text-chalk/50 text-center">Nenhum utilizador encontrado.</div>
        )}
      </div>

      <Dialog open={!!editingUser} onClose={() => setEditingUser(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 }}>
          Editar Utilizador
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Username"
              value={form.username}
              onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                label="Role"
                value={form.role}
                onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
              >
                {ROLE_OPTIONS.map((r) => (
                  <MenuItem key={r} value={r}>{r}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingUser(null)}>Cancelar</Button>
          <Button variant="contained" onClick={handleSave} disabled={updateMutation.isPending}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
