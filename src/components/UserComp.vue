<template>
  <div class="session_user">
    <div class="alert-success" v-if="isAlert">
      <v-alert
        dense
        elevation="6"
        outlined
        shaped
        text
        :type="isColor ? 'success' : 'error'"
      >
        {{ messageAlert }}
      </v-alert>
    </div>
    <v-row justify="center" class="session_user_dialog">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            {{
              checkEditUser ? titleDialog[0].updateUser : titleDialog[0].newUser
            }}
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">{{
              checkEditUser ? titleDialog[0].updateUser : titleDialog[0].newUser
            }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Username*"
                    v-model="data.username"
                    hint="example of helper text only on focus"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-file-input
                    label="Avatar"
                    multiple
                    prepend-icon="mdi-camera"
                    v-model="files"
                    ref="upLoadImage"
                    @change="onImageUpLoad()"
                  ></v-file-input>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Email*"
                    v-model="data.email"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Password*"
                    v-model="data.password"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="saveUser()"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5"
            >Are you sure you want to delete this item?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="deleteItemConfirm"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Username</th>
            <th class="text-left">email</th>
            <th class="text-left">Role</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id">
            <td class="text-left">{{ item.username }}</td>
            <td class="text-left">{{ item.email }}</td>
            <td class="text-left">{{ item?.roles[0]?.name }}</td>
            <td>
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      dialog: false,
      isAlert: false,
      isColor: false,
      dialogDelete: false,
      checkEditUser: false,
      itemId: -1,
      messageAlert: "",
      files: null,
      titleDialog: [
        {
          newUser: "New User",
          updateUser: "Update User",
        },
      ],
      data: {
        id: null,
        username: "",
        email: "",
        password: "",
        image:null,
        roles: [
          {
            name: "user",
          },
        ],
      },
    };
  },
  async created() {
    await this.getdata();
  },
  methods: {
    async getdata() {
      this.list = await this.axios
        .get("http://localhost:8080/api/user")
        .then((response) => {
          return response.data;
        });
    },
    onImageUpLoad(){
      let fileImage = this.files[0];
      this.data.image = new FormData();
      this.data.image.append("fileImage", fileImage)
      console.log(fileImage);
    },
    async saveUser() {
      let dataForm = {
        username: this.data.username,
        email: this.data.email,
        password: this.data.password,
      };
      console.log(dataForm);
      try {
        if (this.checkEditUser == true) {
          dataForm.id = this.itemId;
          this.data = [];
          await this.axios
            .put(`http://localhost:8080/api/user`, dataForm)
            .then(async (response) => {
              await this.getdata();
              this.messageAlert = response.data;
            });
        } else {
          await this.axios
            .post("http://localhost:8080/api/auth/signup", dataForm)
            .then(async (response) => {
              await this.getdata();
              this.messageAlert = response.data;
            });
        }
        this.data = [];
        this.dialog = false;
        this.isColor = true;
        this.startAlert();
      } catch (error) {
        this.messageAlert = error.response.data;
        this.startAlert();
      }
    },
    editItem(item) {
      this.dialog = true;
      this.data = { ...item };
      this.itemId = item.id;
      this.checkEditUser = true;
    },
    deleteItem(item) {
      this.dialogDelete = true;
      this.itemId = item.id;
    },
    async deleteItemConfirm() {
      try {
        await this.axios
          .delete("http://localhost:8080/api/user/" + this.itemId)
          .then(async (response) => {
            await this.getdata();
            this.messageAlert = response.data;
            this.isColor = true;
            this.startAlert();
          });
      } catch (error) {
        this.messageAlert = error.response.data;
        this.startAlert();
      }
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    startAlert() {
      this.isAlert = true;
      setTimeout(() => {
        this.isAlert = false;
      }, 2000);
    },
  },
};
</script>
<style scoped lang="scss">
.session_user {
  position: relative;
  .alert-success {
    position: absolute;
    top: -80%;
    right: -2%;
  }
  .session_user_dialog {
    position: absolute;
    top: -12%;
    right: 2%;
  }
}
.alert-success {
  width: 15vw;
  max-width: 20vw;
  margin-left: auto;
  margin-right: 3vw;
}
</style>
