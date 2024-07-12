<template>
    <v-app>
      <Navbar />
      <v-main>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-card>
                <v-card-title>
                  Manage Users
                </v-card-title>
                <v-card-text>
                  <v-data-table
                    :headers="headers"
                    :items="users"
                    item-key="_id"
                  >
                    <template v-slot:top>
                      <v-toolbar flat>
                        <v-toolbar-title>Users</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                      </v-toolbar>
                    </template>
                    <template v-slot:item.actions="{ item }">
                      <v-btn color="primary" @click="editUser(item)">Edit</v-btn>
                      <v-btn color="error" @click="deleteUser(item._id)">Delete</v-btn>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
  
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Edit User</span>
              </v-card-title>
              <v-card-text>
                <v-form @submit.prevent="saveUser">
                  <v-text-field
                    v-model="editedUser.email"
                    label="Email"
                    required
                  ></v-text-field>
                  <v-select
                    v-model="editedUser.role"
                    :items="roles"
                    label="Role"
                    required
                  ></v-select>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="saveUser">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
      </v-main>
      <Footer />
    </v-app>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import Navbar from '../components/Navbar.vue'
  import Footer from '../components/Footer.vue'
import { useToast } from 'vue-toastification'
const toast = useToast()
  
  const users = ref([])
  const dialog = ref(false)
  const editedUser = ref({
    email: '',
    role: ''
  })
  const roles = ['utilisateur', 'tatoueur', 'admin', 'organisateur_event']
  
  const headers = [
    { text: 'Email', value: 'email' },
    { text: 'Role', value: 'role' },
    { text: 'Actions', value: 'actions', sortable: false }
  ]
  
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      users.value = response.data
    } catch (error) {
      console.error('Error fetching users:', error)
      toast.error(error.response.data.error || 'An error occurred')
    }
  }
  
  const editUser = (user) => {
    editedUser.value = { ...user }
    dialog.value = true
  }
  
  const saveUser = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${editedUser.value._id}`, editedUser.value, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      fetchUsers()
      dialog.value = false
    } catch (error) {
      console.error('Error saving user:', error)
      toast.error(error.response.data.error || 'An error occurred')
    }
  }
  
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      fetchUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error(error.response.data.error || 'An error occurred')
    }
  }
  
  onMounted(fetchUsers)
  </script>
  
  <style scoped>
  .v-data-table {
    margin-top: 20px;
  }
  </style>
  