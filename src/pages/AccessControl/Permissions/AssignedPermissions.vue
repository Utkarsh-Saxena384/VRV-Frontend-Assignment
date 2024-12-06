<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <div class="row">
              <q-btn flat round color="white" text-color="positive" class="q-mr-sm" icon="arrow_back" id="back-btn"
                to="/manage-permissions">
                <q-tooltip anchor="top start" self="center left" :offset="[10, 15]" transition-show="scale"
                  transition-hide="scale">
                  Back to Permissions
                </q-tooltip>
              </q-btn>
              <h5 id="head-1">Manage Permissions (Role - {{ data.roleName }}) </h5>
            </div>
            <q-btn v-if="tab == 'roleWise'" label="create new" class="create-btn" @click="permissionCreate = true" />
          </div>

          <q-dialog v-model="unassignConfirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-icon name="error" size="4rem" class="col-12" color="red" />
                <span class="text-h5 w600 col-12 text-center q-py-sm">Are You Sure?</span>
                <span class="text-subtitle1 w600 col-12 text-center text-grey">You won't be able to revert this!</span>
              </q-card-section>

              <q-card-actions align="center">
                <q-btn label="Yes, Delete !" color="red" @click="removeUserRole" />
                <q-btn label="Cancel" color="primary" @click="count = 1" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <q-dialog v-model="deleteConfirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-icon name="error" size="4rem" class="col-12" color="red" />
                <span class="text-h5 w600 col-12 text-center q-py-sm">Are You Sure?</span>
                <span class="text-subtitle1 w600 col-12 text-center text-grey">You won't be able to revert this!</span>
              </q-card-section>

              <q-card-actions align="center">
                <q-btn label="Yes, Delete !" color="red" @click="deletePermission" />
                <q-btn label="Cancel" color="primary" @click="count = 1" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <q-dialog maximized style="padding: 0;" v-model="permissionCreate" full-height position="right">
            <q-card>
              <q-form class="createNew" @submit="createPermission" @reset="onReset">
                <q-card-section class="q-pa-none">
                  <div class="row create-header q-pa-md">
                    <span class="text-h6 w600">Create Permission</span>
                    <q-btn icon="close" dense flat @click="onReset" v-close-popup />
                  </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div class="q-pa-md">
                    <div class="row " style="align-items: center;">
                      <span class="col-md-4 w600 q-pb-md">Permission Name</span>
                      <q-input outlined dense class="col-md-8" v-model="permissionName" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Permission Name']" />
                    </div>
                    <div class="row " style="align-items: center;">
                      <span class="col-md-4 w600 ">About</span>
                      <q-input outlined dense class="col-md-8" v-model="about" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter About']" />
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-none">
                  <div>
                    <q-separator />
                  </div>
                  <div class="row q-pa-md" style="justify-content: space-between;">
                    <q-btn dense outlined class="q-ma-sm q-px-md" label="Clear" type="reset" />
                    <q-btn dense outlined flat class="bg-primary text-white q-ma-sm q-px-md" label="Create"
                      type="submit" />
                  </div>
                </q-card-section>
              </q-form>
            </q-card>
          </q-dialog>

          <q-dialog maximized style="padding: 0;" v-model="permissionEdit" full-height position="right">
            <q-card>
              <q-form class="createNew" @submit="editPermission" @reset="onReset">
                <q-card-section class="q-pa-none">
                  <div class="row create-header q-pa-md">
                    <span class="text-h6 w600">Edit Permission</span>
                    <q-btn icon="close" dense flat @click="onReset" v-close-popup />
                  </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div class="q-pa-md">
                    <div class="row " style="align-items: center;">
                      <span class="col-md-4 w600 q-pb-md">Permission Name</span>
                      <q-input outlined dense class="col-md-8" v-model="data.permission.name" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Permission Name']" />
                    </div>
                    <div class="row " style="align-items: center;">
                      <span class="col-md-4 w600 ">About</span>
                      <q-input outlined dense class="col-md-8" v-model="data.permission.about" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter About']" />
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-none">
                  <div>
                    <q-separator />
                  </div>
                  <div class="row q-pa-md" style="justify-content: space-between;">
                    <q-btn dense outlined class="q-ma-sm q-px-md" label="Clear" type="reset" />
                    <q-btn dense outlined flat class="bg-primary text-white q-ma-sm q-px-md" label="Update"
                      type="submit" />
                  </div>
                </q-card-section>
              </q-form>
            </q-card>
          </q-dialog>

          <q-dialog maximized style="padding: 0;" v-model="assignUser" full-height position="right">
            <q-card class="assign-card">
              <q-card-section class="q-pa-none">
                <div class="row create-header q-pa-md">
                  <span class="text-h6 w600">Assign User</span>
                  <q-btn icon="close" dense flat @click="onReset" v-close-popup />
                </div>
                <q-separator color="primary" />
                <div class="q-pa-md">
                  <div class="row q-mt-md q-px-md" style="align-items: center; justify-content: space-between">
                    <span class="col-md-2 w600">Enter Email</span>
                    <q-input outlined dense class="col-md-9 q-pr-md" @update:model-value="filterByEmail"
                      v-model="searchEmail" />
                  </div>

                  <div class="table-container modal-table shadowBoder q-mt-sm">
                    <table id="dtBasicExample" class="table table-bordered table-sm" cellspacing="0" width="100%">
                      <thead class="bg-grey-4">
                        <tr>
                          <th></th>
                          <th scope="col" class="text-left">Name</th>
                          <th scope="col" class="text-left">Email</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="user in data.filteredData" :key="user.user_id">
                          <td>
                            <q-checkbox :val="user.user_id" v-model="val" />
                          </td>
                          <td> {{ user.username }} </td>
                          <td> {{ user.email }} </td>
                          <td>
                            <q-chip v-if="user.status == 1" label="Active" color="green" class="text-center"
                              style="padding: 16px 19px" text-color="white" />
                            <q-chip v-if="user.status == 0" label="Inactive" color="red-5" class="text-center q-py-md"
                              text-color="white" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </q-card-section>
              <q-card-section>
                <div>
                  <q-separator />
                </div>
                <div class="row bg-white q-pa-sm" style="justify-content: space-between;">
                  <q-btn dense outlined class="q-ma-sm q-px-md" label="Cancel" @click="onReset" />
                  <q-btn dense outlined flat class="bg-primary text-white q-ma-sm q-px-md" label="Assign"
                    @click="addRoleUsers" />
                </div>
              </q-card-section>
            </q-card>
          </q-dialog>

          <q-tabs v-model="tab" align="left" dense active-color="primary">
            <q-tab name="roleWise" label="Role Wise Permission" class="q-mr-sm" />
            <q-tab name="users" label="Assigned Users" />
          </q-tabs>
          <q-separator class="q-mb-md" />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel class="q-px-none shadowBoder" name="roleWise">
              <div class="row bg-grey-4 q-pa-sm">
                <div class="col-4 w600">Name</div>
                <div class="col w600">About</div>
                <div class="col-1 w600">Action</div>
                <div class="col-1"></div>
              </div>
              <div class="table-container q-px-md">
                <div v-for="permission in data.permissions" :key="permission.id" class="row d-flex"
                  style="align-items: center;">
                  <div class="col-4"> {{ permission.name }} </div>
                  <div class="col"> {{ permission.about }} </div>
                  <div class="col-1">
                    <q-toggle :false-value="0" :true-value="1" v-model="permission.status"
                      @update:model-value="assignPermission(id = permission.id, action = permission.status)" />
                  </div>
                  <div class="col-1 flex justify-end">
                    <q-fab flat class="action-btn" icon="settings" direction="left" padding="sm">
                      <q-fab-action color="primary" text-color="white" icon="edit"
                        @click="openEditModal(id = permission.id)">
                        <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                          transition-hide="scale">Edit</q-tooltip>
                      </q-fab-action>
                      <q-fab-action color="red" text-color="white" icon="delete"
                        @click="confirmDelete(id = permission.id)">
                        <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                          transition-hide="scale">Delete</q-tooltip>
                      </q-fab-action>
                    </q-fab>
                  </div>
                </div>
              </div>
            </q-tab-panel>
            <q-tab-panel name="users">
              <div class="table-container shadowBoder q-mt-sm">
                <div class="row table-head q-pb-md">
                  <span class="w600"> No. of users : &nbsp; {{ data.users.length }} </span>
                  <q-btn v-if="tab == 'users'" label="assign user" class="create-btn" @click="assignModal" />
                </div>
                <table id="dtBasicExample" class="table table-bordered table-sm" cellspacing="0" width="100%">
                  <thead class="bg-grey-4">
                    <tr>
                      <!-- <th scope="col">#</th> -->
                      <th class="text-left" scope="col">Name</th>
                      <th class="text-left" scope="col">Email</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in data.users" :key="user.user_id">
                      <td> {{ user.username }} </td>
                      <td> {{ user.email }} </td>
                      <td class="text-center">
                        <q-btn round icon="delete" @click="confirmUnassign(id = user.user_id)" color="red"
                          text-color="white">
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                            transition-hide="scale">Remove User
                            Role</q-tooltip>
                        </q-btn>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref, onBeforeMount, reactive } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { LocalStorage, Notify } from "quasar";
import { Loading, QSpinnerPie } from 'quasar'
import { api } from "../../../boot/axios";

const route = useRoute();
const router = useRouter();
const permissionCreate = ref(false)
const permissionEdit = ref(false)
const assignUser = ref(false)
const permissionName = ref('')
const permissionType = ref('')
const about = ref('')
const val = ref([])
const searchBy = ref('Name')
const options = ['Name', 'Email']
const searchName = ref('')
const searchEmail = ref('')
const deleteConfirm = ref(false)
const unassignConfirm = ref(false)
const tab = ref('roleWise');
const tab1 = ref('');
const toggle = ref(0)

const data = reactive({
  permissions: [],
  permission: [],
  permissionId: null,
  roles: [],
  users: [],
  filteredData: [],
  roleName: '',
  userId: null
});

const openEditModal = (id) => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  permissionEdit.value = true
  api.get("get-permission", { params: { id: id } }).then((res) => {
    data.permission = res.data
    data.permissionId = id
    Loading.hide()
  }).catch((err) => {
    console.log(err)
    Loading.hide()
  })
}

const editPermission = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.post("/update-permission", {
    id: data.permissionId,
    name: data.permission.name,
    about: data.permission.about
  }).then((res) => {
    permissionEdit.value = false
    api.get("/permissions").then(response => {
      data.permissions = response.data;
      Loading.hide()
    });
    Notify.create({
      timeout: 3000,
      position: 'top-right',
      color: 'green',
      message: res.data.message
    })
  }).catch((err) => {
    console.log(err)
  })
}

const assignPermission = (id, action) => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.post('/permission-actions', {
    permission_id: id,
    action: action,
    role_id: route.params.id
  }).then((response) => {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'green',
      message: response.data.message
    })
    Loading.hide()
  }).catch((error) => {
    console.log('Error', error)
  })
}

const onReset = () => {
  permissionName.value = ''
  permissionType.value = ''
  about.value = ''
  searchName.value = ''
  searchEmail.value = ''
  val.value = []
}

const createPermission = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.post('create-permission', {
    name: permissionName.value,
    about: about.value
  }).then((response) => {
    permissionCreate.value = false
    api.get("/permissions").then(response => {
      data.permissions = response.data;
      Loading.hide()
    });
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'green',
      message: response.data.message
    })
    Loading.hide()
    onReset()
  }).catch((error) => {
    console.log(error)
  })
}

const assignModal = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.get("/all-users", { params: { role_id: route.params.id } }).then(response => {
    data.filteredData = response.data.users
    assignUser.value = true
    Loading.hide()
  })
}

const addRoleUsers = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.post('assign-users-role', {
    users: val.value,
    role_id: route.params.id
  }).then((response) => {
    assignUser.value = false
    api.get('/users-in-role', { params: { role_id: route.params.id } }).then((response) => {
      data.users = response.data.users
      Loading.hide()
    })
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'green',
      message: response.data.message
    })
  }).catch((error) => {
    console.log(error)
  })
}

const confirmDelete = (id) => {
  data.permissionId = id
  deleteConfirm.value = true
}

const confirmUnassign = (id) => {
  data.userId = id
  unassignConfirm.value = true
}

const deletePermission = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.get("/delete-permission", { params: { id: data.permissionId } }).then((res) => {
    deleteConfirm.value = false
    api.get("/permissions").then(response => {
      data.permissions = response.data;
      Loading.hide()
    });
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'red',
      message: res.data.message,
    })
  }).catch((err) => {
    console.log(err)
  })
}

const removeUserRole = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.post('unassign-user-role', {
    user_id: data.userId,
    role_id: route.params.id
  }).then((response) => {
    unassignConfirm.value = false
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'red',
      message: response.data.message
    })
    api.get('users-in-role', { params: { role_id: route.params.id } }).then((response) => {
      data.users = response.data.users
      Loading.hide()
    })
  }).catch((error) => {
    console.log(error)
  })
}

const filterByEmail = () => {
  if (searchEmail.value.length > 2) {
    api.get('/all-users', { params: { email: searchEmail.value, role_id: route.params.id } }).then((res) => {
      data.filteredData = res.data.users
    })
  } else {
    api.get('/all-users').then((res) => {
      data.filteredData = res.data.users
    })
  }
}

onBeforeMount(() => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })

  api.get("/permissions", { params: { role_id: route.params.id } }).then(response => {
    data.permissions = response.data;
    Loading.hide()
  });

  api.get('/users-in-role', { params: { role_id: route.params.id } }).then((response) => {
    data.users = response.data.users
    Loading.hide()
  })

  api.get('/roles').then((response) => {
    response.data.forEach((role) => {
      if (role.id == route.params.id) {
        data.roleName = role.name
      }
    })
  })
});

</script>
<style lang="scss" scoped>
.head-btn-box {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  #back-btn:hover {
    color: #7b94e6 !important;
  }

  h5 {
    margin: 0;
    font-weight: 500;
  }

  #head-1 {
    padding-top: 4px;
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

.create-header {
  width: 100%;
  align-items: center;
  justify-content: space-between;
}


.table-container {
  background-color: #fff;
  padding: 15px;
  width: auto;

  td,
  th {
    padding: 10px;
  }
}

.modal-table {
  max-height: calc(100vh - 280px);
  overflow-y: auto;
}

.table-head {
  justify-content: space-between;
}

input {
  border: 1px solid rgb(196, 196, 196);
  outline: none;
  border-radius: 5px;
  /*   border-bottom: none; */
}

input:focus {
  border: 1px solid blue;
}

.permission_tab {
  border-radius: 5px;
  box-shadow: 0 0 2px 0px rgba(0, 0, 0, 0.1);
}

.assign-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 800px;
}
</style>
