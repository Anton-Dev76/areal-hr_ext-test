<template>
  <q-page padding>
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <div class="text-h5 text-weight-bold">Организации</div>
        <div class="text-grey-7">
          Управление организациями
        </div>
      </div>

      <q-btn
        color="primary"
        icon="add"
        label="Добавить организацию"
        @click="openCreateDialog"
      />
    </div>

    <q-table
      title="Список организаций"
      :rows="organizations"
      :columns="columns"
      row-key="id"
      :loading="loading"
      no-data-label="Организации не найдены"
      :pagination="{ rowsPerPage: 10 }"
    >
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            round
            dense
            color="primary"
            icon="edit"
            @click="openEditDialog(props.row)"
          >
            <q-tooltip>Редактировать</q-tooltip>
          </q-btn>

          <q-btn
            flat
            round
            dense
            color="negative"
            icon="delete"
            @click="confirmDelete(props.row)"
          >
            <q-tooltip>Удалить</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="dialogOpen">
      <q-card style="width: 500px; max-width: 90vw">
        <q-card-section>
          <div class="text-h6">
            {{ editingId ? 'Редактировать организацию' : 'Новая организация' }}
          </div>
        </q-card-section>

        <q-form @submit="saveOrganization">
          <q-card-section class="q-gutter-md">
            <q-input
              v-model="form.name"
              outlined
              label="Название организации"
              :rules="[
                (value) => !!value?.trim() || 'Введите название',
              ]"
            />

            <q-input
              v-model="form.comment"
              outlined
              type="textarea"
              label="Комментарий"
            />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Отмена" v-close-popup />
            <q-btn
              color="primary"
              label="Сохранить"
              type="submit"
              :loading="saving"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {
  Dialog,
  Notify,
  type QTableColumn,
} from 'quasar';

interface Organization {
  id: string;
  name: string;
  comment?: string | null;
}

const API_URL = 'http://localhost:3000/organizations';

const organizations = ref<Organization[]>([]);
const loading = ref(false);
const saving = ref(false);
const dialogOpen = ref(false);
const editingId = ref<string | null>(null);

const form = ref({
  name: '',
  comment: '',
});

const columns: QTableColumn<Organization>[] = [
  {
    name: 'name',
    label: 'Название',
    field: 'name',
    align: 'left',
    sortable: true,
  },
  {
    name: 'comment',
    label: 'Комментарий',
    field: (row) => row.comment ?? '',
    align: 'left',
  },
  {
    name: 'actions',
    label: 'Действия',
    field: 'id',
    align: 'right',
  },
];

function showError(message: string) {
  Notify.create({
    type: 'negative',
    message,
    position: 'top',
  });
}

async function getErrorMessage(response: Response): Promise<string> {
  try {
    const data: unknown = await response.json();

    if (typeof data === 'object' && data !== null && 'message' in data) {
      const message = data.message;

      if (typeof message === 'string') {
        return message;
      }

      if (Array.isArray(message)) {
        return message.join(', ');
      }
    }
  } catch {
    // Если сервер не вернул JSON, используем сообщение по умолчанию.
  }

  return `Ошибка сервера: ${response.status}`;
}

async function loadOrganizations() {
  loading.value = true;

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }

    organizations.value = (await response.json()) as Organization[];
  } catch (error) {
    showError(
      error instanceof Error
        ? error.message
        : 'Не удалось загрузить организации',
    );
  } finally {
    loading.value = false;
  }
}

function openCreateDialog() {
  editingId.value = null;
  form.value = { name: '', comment: '' };
  dialogOpen.value = true;
}

function openEditDialog(organization: Organization) {
  editingId.value = organization.id;

  form.value = {
    name: organization.name,
    comment: organization.comment ?? '',
  };

  dialogOpen.value = true;
}

async function saveOrganization() {
  saving.value = true;

  try {
    const isEditing = editingId.value !== null;

    const url = isEditing
      ? `${API_URL}/${editingId.value}`
      : API_URL;

    const response = await fetch(url, {
      method: isEditing ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.value.name.trim(),
        comment: form.value.comment,
      }),
    });

    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }

    dialogOpen.value = false;

    Notify.create({
      type: 'positive',
      message: isEditing
        ? 'Организация обновлена'
        : 'Организация создана',
      position: 'top',
    });

    await loadOrganizations();
  } catch (error) {
    showError(
      error instanceof Error
        ? error.message
        : 'Не удалось сохранить организацию',
    );
  } finally {
    saving.value = false;
  }
}

function confirmDelete(organization: Organization) {
  Dialog.create({
    title: 'Удаление организации',
    message: `Удалить организацию «${organization.name}»?`,
    cancel: {
      label: 'Отмена',
      flat: true,
    },
    ok: {
      label: 'Удалить',
      color: 'negative',
    },
    persistent: true,
  }).onOk(() => {
    void deleteOrganization(organization.id);
  });
}

async function deleteOrganization(id: string) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }

    Notify.create({
      type: 'positive',
      message: 'Организация удалена',
      position: 'top',
    });

    await loadOrganizations();
  } catch (error) {
    showError(
      error instanceof Error
        ? error.message
        : 'Не удалось удалить организацию',
    );
  }
}

onMounted(() => {
  void loadOrganizations();
});
</script>
