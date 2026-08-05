"use client";

import { useMemo, useState } from "react";
import { Box, Button, Tab, Tabs } from "@mui/material";
import { Plus, Target } from "lucide-react";
import { SectionHeader } from "@/components/lifeos/ui/SectionHeader";
import { EmptyState } from "@/components/lifeos/ui/EmptyState";
import { ConfirmDialog } from "@/components/lifeos/ui/ConfirmDialog";
import { GoalCard } from "./GoalCard";
import { GoalForm } from "./GoalForm";
import { useGoals } from "@/lib/lifeos/hooks/useGoals";
import { GOAL_LEVELS, GOAL_LEVEL_LABELS, type Goal, type GoalLevel } from "@/lib/lifeos/types/goal";

export function GoalsPageClient() {
  const { goals, createGoal, updateGoal, deleteGoal } = useGoals();
  const [activeLevel, setActiveLevel] = useState<GoalLevel>("life_vision");
  const [formOpen, setFormOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | undefined>(undefined);
  const [formDefaults, setFormDefaults] = useState<{ level: GoalLevel; parentId: string | null }>({
    level: "life_vision",
    parentId: null,
  });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const goalsById = useMemo(() => new Map(goals.map((g) => [g.id, g])), [goals]);
  const levelGoals = useMemo(() => goals.filter((g) => g.level === activeLevel), [goals, activeLevel]);

  const prevLevelIndex = GOAL_LEVELS.indexOf(activeLevel) - 1;
  const parentOptions = prevLevelIndex >= 0 ? goals.filter((g) => g.level === GOAL_LEVELS[prevLevelIndex]) : [];

  function openCreate(level: GoalLevel, parentId: string | null) {
    setEditingGoal(undefined);
    setFormDefaults({ level, parentId });
    setFormOpen(true);
  }

  function openEdit(goal: Goal) {
    setEditingGoal(goal);
    setFormDefaults({ level: goal.level, parentId: goal.parentId });
    setFormOpen(true);
  }

  return (
    <>
      <SectionHeader
        title="Life Goals"
        subtitle="Life Vision → 5 Year → 1 Year → Quarter → Monthly → Weekly → Today"
        action={
          <Button variant="contained" startIcon={<Plus size={17} />} onClick={() => openCreate(activeLevel, null)}>
            Add Goal
          </Button>
        }
      />

      <Tabs
        value={activeLevel}
        onChange={(_, value) => setActiveLevel(value)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
      >
        {GOAL_LEVELS.map((level) => (
          <Tab key={level} value={level} label={GOAL_LEVEL_LABELS[level]} sx={{ textTransform: "none", fontWeight: 600 }} />
        ))}
      </Tabs>

      {levelGoals.length === 0 ? (
        <EmptyState
          icon={Target}
          title={`No ${GOAL_LEVEL_LABELS[activeLevel]} yet`}
          description="Break your vision down into smaller, time-bound goals you can actually act on."
          actionLabel="Add Goal"
          onAction={() => openCreate(activeLevel, null)}
        />
      ) : (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" }, gap: 2 }}>
          {levelGoals.map((goal) => {
            const nextLevelIndex = GOAL_LEVELS.indexOf(goal.level) + 1;
            const canAddChild = nextLevelIndex < GOAL_LEVELS.length;
            return (
              <GoalCard
                key={goal.id}
                goal={goal}
                parentTitle={goal.parentId ? goalsById.get(goal.parentId)?.title : undefined}
                onEdit={() => openEdit(goal)}
                onDelete={() => setDeletingId(goal.id)}
                onAddChild={canAddChild ? () => openCreate(GOAL_LEVELS[nextLevelIndex], goal.id) : undefined}
                onToggleMilestone={(milestone) =>
                  updateGoal(goal.id, {
                    milestones: goal.milestones.map((m) =>
                      m.id === milestone.id ? { ...m, done: !m.done } : m
                    ),
                  })
                }
              />
            );
          })}
        </Box>
      )}

      <GoalForm
        key={editingGoal?.id ?? `${formDefaults.level}-${formDefaults.parentId}-${formOpen}`}
        open={formOpen}
        initialGoal={editingGoal}
        defaultLevel={formDefaults.level}
        defaultParentId={formDefaults.parentId}
        parentOptions={parentOptions}
        onClose={() => setFormOpen(false)}
        onSubmit={async (values) => {
          if (editingGoal) {
            await updateGoal(editingGoal.id, values);
          } else {
            await createGoal({ ...values, archived: false });
          }
          setFormOpen(false);
        }}
      />

      <ConfirmDialog
        open={deletingId !== null}
        title="Delete goal?"
        description="This goal and any goals nested under it will be permanently removed."
        onConfirm={() => {
          if (deletingId) deleteGoal(deletingId);
        }}
        onClose={() => setDeletingId(null)}
      />
    </>
  );
}
