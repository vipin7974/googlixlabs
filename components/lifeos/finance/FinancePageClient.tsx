"use client";

import { useMemo, useState } from "react";
import { Box, Button } from "@mui/material";
import { Plus, Wallet, ArrowUpCircle, ArrowDownCircle, PiggyBank, LineChart } from "lucide-react";
import { SectionHeader } from "@/components/lifeos/ui/SectionHeader";
import { StatCard } from "@/components/lifeos/ui/StatCard";
import { EmptyState } from "@/components/lifeos/ui/EmptyState";
import { ConfirmDialog } from "@/components/lifeos/ui/ConfirmDialog";
import { FinanceForm } from "./FinanceForm";
import { FinanceEntryItem } from "./FinanceEntryItem";
import { FinanceTrendChart } from "./FinanceTrendChart";
import { useFinanceEntries } from "@/lib/lifeos/hooks/useFinance";
import { monthKey } from "@/lib/lifeos/utils/date";
import type { FinanceEntry } from "@/lib/lifeos/types/finance";

export function FinancePageClient() {
  const { entries, loading, createEntry, updateEntry, deleteEntry } = useFinanceEntries();
  const [formOpen, setFormOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<FinanceEntry | undefined>(undefined);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const stats = useMemo(() => {
    const currentMonth = monthKey();
    const monthEntries = entries.filter((entry) => entry.date.startsWith(currentMonth));

    const sumByType = (list: FinanceEntry[], type: FinanceEntry["type"]) =>
      list.filter((entry) => entry.type === type).reduce((total, entry) => total + entry.amount, 0);

    const monthIncome = sumByType(monthEntries, "income");
    const monthExpense = sumByType(monthEntries, "expense");
    const monthSavings = sumByType(monthEntries, "savings");
    const monthInvestment = sumByType(monthEntries, "investment");

    const netWorth =
      sumByType(entries, "income") +
      sumByType(entries, "savings") +
      sumByType(entries, "investment") -
      sumByType(entries, "expense");

    return { monthIncome, monthExpense, monthSavings, monthInvestment, netWorth };
  }, [entries]);

  return (
    <>
      <SectionHeader
        title="Finance"
        subtitle="Track income, expenses, savings and investments"
        action={
          <Button
            variant="contained"
            startIcon={<Plus size={17} />}
            onClick={() => {
              setEditingEntry(undefined);
              setFormOpen(true);
            }}
          >
            Add Entry
          </Button>
        }
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(5, 1fr)" },
          gap: 2,
          mb: 3,
        }}
      >
        <StatCard icon={Wallet} label="Net Worth" value={`₹${stats.netWorth.toFixed(2)}`} color="#2b5cff" />
        <StatCard icon={ArrowUpCircle} label="Income (Month)" value={`₹${stats.monthIncome.toFixed(2)}`} color="#10b981" />
        <StatCard icon={ArrowDownCircle} label="Expense (Month)" value={`₹${stats.monthExpense.toFixed(2)}`} color="#e5484d" />
        <StatCard icon={PiggyBank} label="Savings (Month)" value={`₹${stats.monthSavings.toFixed(2)}`} color="#2b5cff" />
        <StatCard icon={LineChart} label="Investment (Month)" value={`₹${stats.monthInvestment.toFixed(2)}`} color="#8b5cf6" />
      </Box>

      <Box sx={{ mb: 3 }}>
        <FinanceTrendChart entries={entries} />
      </Box>

      {!loading && entries.length === 0 && (
        <EmptyState
          icon={Wallet}
          title="No transactions yet"
          description="Log your first income, expense, savings or investment entry to start tracking your finances."
          actionLabel="Add Entry"
          onAction={() => setFormOpen(true)}
        />
      )}

      {entries.map((entry) => (
        <FinanceEntryItem
          key={entry.id}
          entry={entry}
          onEdit={() => {
            setEditingEntry(entry);
            setFormOpen(true);
          }}
          onDelete={() => setDeletingId(entry.id)}
        />
      ))}

      <FinanceForm
        key={editingEntry?.id ?? `new-${formOpen}`}
        open={formOpen}
        initialEntry={editingEntry}
        onClose={() => setFormOpen(false)}
        onSubmit={async (values) => {
          if (editingEntry) {
            await updateEntry(editingEntry.id, values);
          } else {
            await createEntry(values);
          }
          setFormOpen(false);
        }}
      />

      <ConfirmDialog
        open={deletingId !== null}
        title="Delete entry?"
        description="This finance entry will be permanently removed."
        onConfirm={() => {
          if (deletingId) deleteEntry(deletingId);
        }}
        onClose={() => setDeletingId(null)}
      />
    </>
  );
}
