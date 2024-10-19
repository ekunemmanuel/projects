<template>
  <UContainer class="space-y-4 py-2">
    <div class="flex gap-4 flex-wrap justify-between items-center">
      <h1 class="text-3xl">Notes</h1>
      <UButton @click="isOpen = true" label="New Note" />
    </div>
    <!-- Notes List Section -->
    <ClientOnly>
      <div>
        <ul
          v-if="notes.length > 0"
          class="grid sm:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-2"
        >
          <li v-for="note in notes" :key="note.id">
            <UCard class="h-full">
              <!-- Note Header -->
              <template #header>
                <h2>{{ note.title }}</h2>
              </template>
              <!-- Note Description -->
              <p>{{ note.description }}</p>
              <!-- Note Creation and Update Time -->
              <small>Created At: {{ note.createdAt }}</small>
              <br />
              <small v-if="note.updatedAt"
                >Updated At: {{ note.updatedAt }}</small
              >
              <!-- Note Actions -->
              <template #footer>
                <div v-if="note.id" class="flex justify-end gap-2">
                  <UButton variant="soft" @click="edit(note.id)">Edit</UButton>
                  <UButton color="rose" @click="deleteNote(note.id)"
                    >Delete</UButton
                  >
                </div>
              </template>
            </UCard>
          </li>
        </ul>
        <div v-else class="grid place-items-center h-[calc(100vh-72px)]">
          <div class="flex flex-col items-center gap-4">
            <p class="text-center">You don't have any note click on the button to create now</p>
            <UButton @click="isOpen = true" label="New Note" />
          </div>
        </div>
      </div>
    </ClientOnly>
  </UContainer>

  <UModal v-model="isOpen">
    <!-- Note Form Section -->
    <UCard>
      <section class="space-y-2">
        <!-- Title Input -->
        <div>
          <label for="title">Title</label>
          <UInput id="title" v-model="note.title" placeholder="Eg. Pet Name" />
        </div>
        <!-- Description Input -->
        <div>
          <label for="description">Description</label>
          <UTextarea
            id="description"
            v-model="note.description"
            placeholder="Write a description"
          />
        </div>
      </section>
      <template #footer>
        <div class="flex justify-end">
          <!-- Conditional Button (Save or Edit) -->
          <UButton
            :label="isEditing ? 'Edit' : 'Save'"
            @click="isEditing ? editNote() : addNote()"
          />
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import type { Note } from "~/types";

// Local storage hook to manage notes
const notes = useLocalStorage<Note[]>("notes", []);

// Reactive note object for form binding
const note = reactive<Partial<Note>>({
  title: "",
  description: "",
});

// State management for editing notes
const isEditing = ref(false);
const index = ref<number | undefined>();
const editedNote = ref<Note | undefined>();
const isOpen = ref(false);

// Add a new note
function addNote() {
  if (!note.title || !note.description) {
    alert("Note can't have an empty title or description");
    return;
  }
  const id = Date.now().toString(); // Use timestamp for unique ID
  notes.value.push({
    title: note.title,
    description: note.description,
    createdAt: new Date().toUTCString(),
    id,
  });
  resetForm();
}

// Edit an existing note
function edit(id: string) {
  const i = notes.value.findIndex((note) => note.id === id);
  if (i === -1) {
    alert("Note does not exist");
    return;
  }

  editedNote.value = notes.value[i];
  note.title = editedNote.value.title;
  note.description = editedNote.value.description;
  isEditing.value = true;
  index.value = i;
  isOpen.value = true;
}

// Save the edited note
function editNote() {
  if (!note.title || !note.description) {
    alert("Note can't have an empty title or description");
    return;
  }

  if (index.value !== undefined) {
    notes.value[index.value] = {
      ...editedNote.value,
      title: note.title,
      description: note.description,
      updatedAt: new Date().toUTCString(),
    };
    resetForm();
  }
}

// Delete a note
function deleteNote(id: string) {
  const i = notes.value.findIndex((note) => note.id === id);
  if (i === -1) {
    alert("Note does not exist");
    return;
  }

  notes.value.splice(i, 1);
}

// Reset form and state after adding/editing a note
function resetForm() {
  note.title = "";
  note.description = "";
  isEditing.value = false;
  index.value = undefined;
  editedNote.value = undefined;
  isOpen.value = false;
}

useHead({
  title: "Note App",
});
</script>

<style scoped></style>
