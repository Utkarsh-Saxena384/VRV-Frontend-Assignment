<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <h5 id="head-1">Manage Roles</h5>
            <q-btn label="create role" @click="createNewModal = true" class="create-btn"></q-btn>
          </div>

          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-icon name="error" size="4rem" class="col-12" color="red" />
                <span class="text-h5 w600 col-12 text-center q-py-sm">Are You Sure?</span>
                <span class="text-subtitle1 w600 col-12 text-center text-grey">You won't be able to revert this!</span>
              </q-card-section>

              <q-card-actions align="center">
                <q-btn label="Yes, Delete !" color="red" @click="deleteRole" />
                <q-btn label="Cancel" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <q-dialog maximized style="padding: 0;" v-model="createNewModal" full-height position="right">
            <q-card>
              <q-form class="createNew" @submit="createRole" @reset="clearFields">
                <q-card-section class="q-pa-none">
                  <div class="row q-pa-md" style="justify-content: space-between">
                    <span class="text-h6 w600">Create Permission Role</span>
                    <q-btn icon="close" dense flat @click="clearFields" v-close-popup />
                  </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div class="q-pa-md">
                    <div class="row" style="align-items: baseline;">
                      <span class="col-md-4 w600">Permission Group Name</span>
                      <q-input outlined dense class="col-md-8" v-model="groupName" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Permission Group Name']" />
                    </div>
                    <div class="row q-pt-sm" style="align-items: baseline;">
                      <span class="col-md-4 w600">Message</span>
                      <q-input outlined dense class="col-md-8" v-model="message" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Message']" />
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-none">
                  <div>
                    <q-separator />
                  </div>
                  <div class="row q-pa-md" style="justify-content: space-between;">
                    <q-btn dense outlined class="q-ma-sm q-px-md" label="Clear" type="reset" />
                    <q-btn dense outlined flat class="bg-primary text-white q-ma-sm q-px-md" type="submit"
                      label="Create" />
                  </div>
                </q-card-section>
              </q-form>
            </q-card>
          </q-dialog>

          <q-dialog maximized style="padding: 0;" v-model="editModal" full-height position="right">
            <q-card>
              <q-form class="createNew" @submit="editRole" @reset="clearFields">
                <q-card-section class="q-pa-none">
                  <div class="row q-pa-md" style="justify-content: space-between">
                    <span class="text-h6 w600">Edit Permission Role</span>
                    <q-btn icon="close" dense flat @click="clearFields" v-close-popup />
                  </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div class="q-pa-md">
                    <div class="row" style="align-items: baseline;">
                      <span class="col-md-4 w600">Permission Group Name</span>
                      <q-input outlined dense class="col-md-8" v-model="data.role.name" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Permission Group Name']" />
                    </div>
                    <div class="row q-pt-sm" style="align-items: baseline;">
                      <span class="col-md-4 w600">Message</span>
                      <q-input outlined dense class="col-md-8" v-model="data.role.message" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Message']" />
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-none">
                  <div>
                    <q-separator />
                  </div>
                  <div class="row q-pa-md" style="justify-content: space-between;">
                    <q-btn dense outlined class="q-ma-sm q-px-md" label="Clear" type="reset" />
                    <q-btn dense outlined flat class="bg-primary text-white q-ma-sm q-px-md" type="submit"
                      label="Update" />
                  </div>
                </q-card-section>
              </q-form>
            </q-card>
          </q-dialog>

          <div class="table-container shadowBoder">
            <table id="dtBasicExample" class="table table-bordered table-sm" cellspacing="0" width="100%">
              <thead class="bg-grey-4">
                <tr>
                  <th class="text-left" scope="col">Role Group</th>
                  <th scope="col">User</th>
                  <th scope="col" class="text-left">Message</th>
                  <th scope="col" class="text-left">Updated On</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="role in data.roles" :key="role.id">
                  <td>
                    <q-item dense class="text-primary" clickable :to="`assigned-permissions/` + role.id"> {{
                      role.name
                    }} </q-item>
                  </td>
                  <td class="text-center"> {{ role.user_count }} </td>
                  <td> {{ role.message }} </td>
                  <td> {{ role.updated_at }} </td>
                  <td class="text-center">
                    <q-fab flat class="action-btn" icon="settings" direction="left" padding="sm">
                      <q-fab-action color="primary" text-color="white" icon="edit" @click="openEditModal(id = role.id)">
                        <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                          transition-hide="scale">Edit</q-tooltip>
                      </q-fab-action>
                      <q-fab-action color="red" text-color="white" icon="delete" @click="confirmDelete(id = role.id)">
                        <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                          transition-hide="scale">Delete</q-tooltip>
                      </q-fab-action>
                    </q-fab>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { LocalStorage, Notify } from "quasar";
import { Loading, QSpinnerPie } from 'quasar'
import { api } from "../../../boot/axios";

const createNewModal = ref(false)
const editModal = ref(false)
const groupName = ref('')
const message = ref('')
const route = useRoute();
const router = useRouter();
const tab = ref('permGroup')
const confirm = ref(false)

const data = reactive({
  roles: [],
  role: [],
  id: null,
});

const openEditModal = (id) => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  editModal.value = true
  api.get("/get-role", { params: { role_id: id } }).then((res) => {
    data.role = res.data
    data.id = id
    Loading.hide()
  }).catch((err) => {
    console.log(err)
    Loading.hide()
  })
}

const editRole = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.post("/update-role", {
    id: data.id,
    name: data.role.name,
    message: data.role.message
  }).then((res) => {
    editModal.value = false
    api.get("/roles").then(response => {
      data.roles = response.data;
      Loading.hide()
    });
    Notify.create({
      timeout: 3000,
      position: 'top-right',
      color: 'green',
      message: res.data.message
    })
  })
}

const deleteRole = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.get('delete-role', {
    params: {
      role_id: data.id,
    }
  }).then((response) => {
    confirm.value = false
    api.get("roles").then(response => {
      data.roles = response.data;
      Loading.hide()
    });
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'red',
      message: response.data.message,
    })
  }).catch((error) => {
    console.log(error)
  })
}

const createRole = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.post('/create-role', {
    name: groupName.value,
    message: message.value,
  }).then((response) => {
    Loading.hide()
    router.push('assigned-permissions/' + response.data.id)
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'green',
      message: response.data.message
    })
  }).catch((error) => {
    console.log(error)
    Loading.hide()
  })
}

const clearFields = () => {
  groupName.value = '',
    message.value = ''
};

const confirmDelete = (id) => {
  data.id = id
  confirm.value = true
}

onBeforeMount(() => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })

  api.get("/roles").then(response => {
    data.roles = response.data;
    Loading.hide()
  });
});
</script>

<style lang="scss" scoped>
.head-btn-box {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  h5 {
    margin: 0;
    font-weight: 500;
  }
}

.createNew {
  width: 600px;
  height: 100%;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
}

.container {
  width: auto;
  height: 100%;
}

.table-container {
  background-color: #fff;
  padding: 15px;
  width: auto;
}

.heading {
  margin-left: 7px;
  padding-block: 10px;
}

.head-2 {
  margin-left: 5px;
  font-size: 20px;
  font-weight: 500;
}

table {
  padding: 5px;

  td,
  th {
    border: 1px solid #e6e6e6;
  }
}

td,
th {
  padding: 5px 10px;
}

th {
  font-weight: 600;
  font-size: 14px;
}

td {
  font-size: 13px;
  color: #4f4f4f;
}
</style>
