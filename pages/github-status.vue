<template>
  <UContainer class="space-y-4 py-2">
    <section
      class="flex justify-between gap-2 items-center sticky top-2 dark:bg-[#121212] bg-white p-1 rounded-md"
    >
      <h1>Github Status</h1>
      <div class="flex justify-between gap-2 items-center">
        <UButton @click="refresh" label="Get Status" />
        <ColorMode />
      </div>
    </section>
    <section v-if="status == 'success'">
      <ul class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-2">
        <li v-for="component in data?.components" :key="component.id">
          <UCard
            class="h-full"
            :ui="{
              body: {
                base: 'flex flex-col justify-between h-full ',
              },
            }"
          >
            <h2 class="text-2xl">
              {{ component.name }}
            </h2>
            <p class="dark:text-slate-400 text-slate-700">
              {{ component.description }}
            </p>

            <small
              :class="[
                'text-right block font-bold',
                component.status == 'operational'
                  ? ' text-green-400'
                  : 'text-red-400',
              ]"
            >
              {{ component.status }}
            </small>
          </UCard>
        </li>
      </ul>
    </section>
    <section v-else-if="status == 'pending'">
      <p>loading...</p>
    </section>
    <section v-else>
      <p class="text-red-500">
        {{ error }}
      </p>
    </section>
  </UContainer>
</template>

<script setup lang="ts">
import type { GithubStatus } from "~/types";

const { data, status, error, refresh } = await useFetch<GithubStatus>(
  "https://www.githubstatus.com/api/v2/components.json",
  {}
);
</script>

<style scoped></style>
