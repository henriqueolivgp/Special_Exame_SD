import { useState } from "react";
import {
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
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { authApi } from "../api/api";

const ROLE_OPTIONS = ["admin", "edit", "view"];

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
    <>
      <h1 className="text-4xl font-bold text-center mt-10 text-white">Users Control</h1>
      <Container
        maxWidth="100%"
        sx={{
          backgroundColor: "background.default",
          padding: "2rem",
          borderRadius: "1rem",
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <div className="text-red-500">
            Erro ao carregar utilizadores: {error.response?.data?.error || error.message}
          </div>
        ) : users && users.length > 0 ? (
          <div className="table-container rounded-lg overflow-x-auto">
            <table className="w-full mt-4 rounded-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs rounded-lg uppercase bg-gray-700 text-center text-gray-400">
                <tr>
                  <th className="px-6 py-3 whitespace-nowrap">Id</th>
                  <th className="px-6 py-3 whitespace-nowrap">Username</th>
                  <th className="px-6 py-3 whitespace-nowrap">Role</th>
                  <th className="px-6 py-3 whitespace-nowrap">Buttons</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr className="bg-gray-800 border-b border-gray-200" key={user.id}>
                    <td className="px-4 py-4 font-medium text-white whitespace-nowrap">{user.id}</td>
                    <td className="px-4 py-4 font-medium text-white whitespace-nowrap">{user.username}</td>
                    <td className="px-4 py-4 font-medium text-white whitespace-nowrap">{user.role}</td>
                    <td className="px-4 py-4 font-medium text-white whitespace-nowrap">
                      <div className="flex gap-2">
                        <button className="p-2 bg-blue-400 rounded-lg font-semibold" onClick={() => openEditModal(user)}>Edit</button>
                        <button className="p-2 bg-red-400 rounded-lg font-semibold" onClick={() => handleDelete(user)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-white">Nenhum utilizador encontrado.</div>
        )}
      </Container>

      <Dialog open={!!editingUser} onClose={() => setEditingUser(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Editar Utilizador</DialogTitle>
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
    </>
  );
}
