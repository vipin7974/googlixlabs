"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, MenuItem, TextField } from "@mui/material";
import { FormDialog } from "@/components/lifeos/ui/FormDialog";
import { FINANCE_TYPE_LABELS, type FinanceEntry, type FinanceEntryType } from "@/lib/lifeos/types/finance";
import { todayKey } from "@/lib/lifeos/utils/date";

const financeSchema = z.object({
  date: z.string().min(1, "Date is required"),
  type: z.enum(["income", "expense", "savings", "investment"]),
  category: z.string().min(1, "Category is required").max(80),
  amount: z.coerce.number().min(0.01, "Amount must be greater than 0"),
  notes: z.string().max(2000).optional(),
});

type FinanceFormValues = z.infer<typeof financeSchema>;

export function FinanceForm({
  open,
  onClose,
  onSubmit,
  initialEntry,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: {
    date: string;
    type: FinanceEntryType;
    category: string;
    amount: number;
    notes: string;
  }) => void;
  initialEntry?: FinanceEntry;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FinanceFormValues>({
    resolver: zodResolver(financeSchema),
    defaultValues: {
      date: initialEntry?.date ?? todayKey(),
      type: initialEntry?.type ?? "expense",
      category: initialEntry?.category ?? "",
      amount: initialEntry?.amount ?? 0,
      notes: initialEntry?.notes ?? "",
    },
  });

  function submit(values: FinanceFormValues) {
    onSubmit({
      date: values.date,
      type: values.type,
      category: values.category.trim(),
      amount: values.amount,
      notes: values.notes?.trim() ?? "",
    });
    reset();
  }

  return (
    <FormDialog
      open={open}
      title={initialEntry ? "Edit Entry" : "New Entry"}
      onClose={() => {
        reset();
        onClose();
      }}
      onSubmit={handleSubmit(submit)}
      submitLabel={initialEntry ? "Save Changes" : "Add Entry"}
    >
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="date"
              label="Date"
              sx={{ minWidth: 150, flex: 1 }}
              slotProps={{ inputLabel: { shrink: true } }}
              error={!!errors.date}
              helperText={errors.date?.message}
            />
          )}
        />
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <TextField {...field} select label="Type" sx={{ minWidth: 150, flex: 1 }}>
              {Object.entries(FINANCE_TYPE_LABELS).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Box>

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Category"
            fullWidth
            autoFocus
            placeholder="e.g. Salary, Rent, Groceries, Stocks"
            error={!!errors.category}
            helperText={errors.category?.message}
          />
        )}
      />

      <Controller
        name="amount"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="number"
            label="Amount"
            fullWidth
            slotProps={{ htmlInput: { min: 0.01, step: 0.01 } }}
            error={!!errors.amount}
            helperText={errors.amount?.message}
          />
        )}
      />

      <Controller
        name="notes"
        control={control}
        render={({ field }) => <TextField {...field} label="Notes" fullWidth multiline minRows={3} />}
      />
    </FormDialog>
  );
}
