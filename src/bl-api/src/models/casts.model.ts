// src/Casts/Cast.model.ts

import { z } from 'zod';

const CastsSchema = z.object({
  cast_id: z.coerce.number(),
  name: z.string(),
});

type Casts = z.infer<typeof CastsSchema>;

const CastsIdSchema = z.object({
  cast_id: z.coerce.number(),
});

type CastsId = z.infer<typeof CastsIdSchema>;

const CastsInsertSchema = z.object({
  name: z.string(),
});

type CastsInsert = z.infer<typeof CastsInsertSchema>;

const CastsUpdateSchema = z.object({
  name: z.string(),
});

type CastsUpdate = z.infer<typeof CastsUpdateSchema>;

export {
  CastsSchema,
  Casts,
  CastsIdSchema,
  CastsId,
  CastsInsert,
  CastsInsertSchema,
  CastsUpdateSchema,
  CastsUpdate,
};
