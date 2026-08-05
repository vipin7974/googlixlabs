"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import { Plus, CheckSquare } from "lucide-react";
import { SectionHeader } from "@/components/lifeos/ui/SectionHeader";
import { EmptyState } from "@/components/lifeos/ui/EmptyState";
import { ConfirmDialog } from "@/components/lifeos/ui/ConfirmDialog";
import { DragList } from "@/components/lifeos/ui/DragList";
import { TaskItem } from "./TaskItem";
import { TaskForm } from "./TaskForm";
import { useTasks } from "@/lib/lifeos/hooks/useTasks";
import { todayKey, formatDisplayDate } from "@/lib/lifeos/utils/date";
import { taskCompletionPercent } from "@/lib/lifeos/utils/score";
import type { Task, Subtask } from "@/lib/lifeos/types/task";

export function TasksPageClient() {
  const date = todayKey();
  const { tasks, loading, createTask, updateTask, toggleTaskDone, deleteTask, reorderTasks } = useTasks(date);
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const completion = taskCompletionPercent(tasks);

  return (
    <>
      <SectionHeader
        title="Today's Tasks"
        subtitle={`${formatDisplayDate(date)} · ${completion}% complete`}
        action={
          <Button
            variant="contained"
            startIcon={<Plus size={17} />}
            onClick={() => {
              setEditingTask(undefined);
              setFormOpen(true);
            }}
          >
            Add Task
          </Button>
        }
      />

      {!loading && tasks.length === 0 && (
        <EmptyState
          icon={CheckSquare}
          title="No tasks for today yet"
          description="Add your first task to start planning a focused, intentional day."
          actionLabel="Add Task"
          onAction={() => setFormOpen(true)}
        />
      )}

      <DragList
        items={tasks}
        getId={(t) => t.id}
        onReorder={(ordered) => reorderTasks(ordered.map((t) => t.id))}
        renderItem={(task, dragHandle) => (
          <TaskItem
            key={task.id}
            task={task}
            dragHandle={dragHandle}
            onToggleDone={() => toggleTaskDone(task)}
            onEdit={() => {
              setEditingTask(task);
              setFormOpen(true);
            }}
            onDelete={() => setDeletingId(task.id)}
            onUpdateSubtasks={(subtasks: Subtask[]) => updateTask(task.id, { subtasks })}
          />
        )}
      />

      <TaskForm
        key={editingTask?.id ?? `new-${formOpen}`}
        open={formOpen}
        initialTask={editingTask}
        onClose={() => setFormOpen(false)}
        onSubmit={async (values) => {
          if (editingTask) {
            await updateTask(editingTask.id, values);
          } else {
            await createTask({
              ...values,
              date,
              subtasks: [],
              completedAt: values.status === "done" ? Date.now() : null,
            });
          }
          setFormOpen(false);
        }}
      />

      <ConfirmDialog
        open={deletingId !== null}
        title="Delete task?"
        description="This task and its subtasks will be permanently removed."
        onConfirm={() => {
          if (deletingId) deleteTask(deletingId);
        }}
        onClose={() => setDeletingId(null)}
      />
    </>
  );
}
