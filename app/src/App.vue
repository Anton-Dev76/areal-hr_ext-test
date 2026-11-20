<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          Areal HR
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="240"
    >
      <q-list>
        <q-item-label header>
          Управление персоналом
        </q-item-label>

        <q-item clickable to="/organizations">
          <q-item-section avatar>
            <q-icon name="business" />
          </q-item-section>

          <q-item-section>
            Организации
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const leftDrawerOpen = ref(true);
</script>

