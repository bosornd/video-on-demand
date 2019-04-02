<template>
  <v-app>
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile router to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile router to="/search">
          <v-list-tile-action>
            <v-icon>search</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Search</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile
          router
          :key="i"
          v-for="(menu, i) in menus"
          :to="menu.to"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="menu.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="menu.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="yellow accent-4" fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-items class="hidden-sm-and-down">
       <v-btn flat @click="toMypage($auth)"><h3>MY</h3></v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <nuxt-link :to="'/'" class="link"><v-toolbar-title><b><h2>{{title}}</h2></b></v-toolbar-title></nuxt-link>
      <v-spacer></v-spacer>
      <v-toolbar-items>
      <v-btn flat v-show="!$auth.loggedIn" @click="signIn">Sign In</v-btn>
      <v-btn flat v-show="$auth.loggedIn" @click="signOut">Sign Out</v-btn>
      <v-btn flat v-show="!$auth.loggedIn" @click="showRegisterDialog">Register</v-btn>
    </v-toolbar-items>
    </v-toolbar>

    <v-content>
        <nuxt />
        <v-layout row justify-center>
          <v-dialog v-model="loginDialog" persistent max-width="400px">
            <v-card>
              <v-card-text>
                <v-form ref="loginForm" v-model="valid" lazy-validation>
                  <v-container grid-list-md @keyup.enter="login">
                    <v-card-title class="title font-weight-regular justify-space-between">
                      <span>Sign in</span>
                      <v-btn large icon>
                        <v-icon large @click="loginDialog = false" item-right>close</v-icon>
                      </v-btn>
                    </v-card-title>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field v-model="loginID" label="ID" required></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field v-model="loginPassword" label="Password" type="password" required></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-btn block color="primary" @click="login">Sign in</v-btn>
                      </v-flex>
                      <v-flex xs12>
                        <v-divider></v-divider>
                      </v-flex>
                      <v-flex xs12>
                        <v-btn block color="primary" @click="showRegisterDialog">Register</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-layout>
        <v-layout row justify-center>
          <v-dialog v-model="registerDialog" persistent max-width="600px">
            <v-card>
              <v-card-text>
                <v-form ref="registerForm" v-model="valid" lazy-validation>
                  <v-container grid-list-md>
                    <v-card-title class="title font-weight-regular justify-space-between">
                      <span>Sign Up</span>
                      <v-btn large icon>
                        <v-icon large @click="registerDialog = false" item-right>close</v-icon>
                      </v-btn>
                    </v-card-title>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field label="ID*" v-model="id" required/>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field label="name*" v-model="name" required/>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field label="Email*" v-model="email" required/>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field v-model="password" :append-icon="show_password ? 'visibility_off' : 'visibility'"
                                      :rules="[rules.more_than_8]" :type="show_password ? 'text' : 'password'"
                                      label="Password*" hint="at least 8 characters" counter
                                      @click:append="show_password = !show_password">
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field v-model="password2" :append-icon="show_password ? 'visibility_off' : 'visibility'"
                                      :rules="[rules.same_password]" :type="show_password ? 'text' : 'password'"
                                      label="Password confirmation*" hint="need to be matched" counter
                                      @click:append="show_password = !show_password">
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <small>*indicates required field</small>
                        <v-btn block color="primary" @click="register">Register for CoalaSoftware</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-layout>
    </v-content>
    <v-footer
      height="auto"
      color="grey darken-3"
    >
      <v-layout
        justify-center
        row
        wrap
      >
        <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          flat
          round
        >
          {{ link }}
        </v-btn>
        <v-flex
          grey darken-3
          lighten-2
          py-3
          text-xs-center
          white--text
          xs12
        >
          &copy;2019 — <strong>oksusu</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: false,
        clipped: true,
        miniVariant: false,
        title: 'oksusu',

        registerDialog: false,
        loginDialog: false,
        valid: true,
        loginID: '',
        loginPassword: '',
        id: '',
        name: '',
        password: '',
        password2: '',
        email: '',
        institute: '',
        role: '',
        rules: {
          required: value => !!value || 'Required',
          more_than_8: value => value.length >= 8 || 'More than 8 characters',
          same_password: value => value === this.password || 'Password mismatched'
        },
        show_password: false,

        menus: [
          { icon: 'filter_1', title: 'Action', to: '/genre/Action' },
          { icon: 'filter_2', title: 'Adventure', to: '/genre/Adventure' },
          { icon: 'filter_3', title: 'Animation', to: '/genre/Animation' },
          { icon: 'filter_4', title: 'Comedy', to: '/genre/Comedy' },
          { icon: 'filter_5', title: 'Drama', to: '/genre/Drama' },
          { icon: 'filter_6', title: 'Family', to: '/genre/Family' },
          { icon: 'filter_7', title: 'Romance', to: '/genre/Romance' }
        ],
        links: [
          '홈',
          '소개',
          '공지사항',
          '이용약관',
          '개인정보처리방침',
          '고객센터'
        ]

      }
    },
    methods: {
      signIn () {
        this.loginDialog = true
      },
      signOut () {
        if (this.$auth.loggedIn) {
          this.$auth.logout()
        }
      },
      showRegisterDialog () {
        if (this.loginDialog) {
          this.loginDialog = false
        }
        this.registerDialog = true
      },
      async register () {
        if (this.$refs.registerForm.validate()) {
          await this.$axios.post('api/auth/register', {
            id: this.id,
            password: this.password,
            name: this.name,
            email: this.email
          })
            .then(res => {
              this.id = ''
              this.name = ''
              this.password = ''
              this.password2 = ''
              this.email = ''
              this.registerDialog = false
              this.loginDialog = true
            })
            .catch(err => {
              this.$refs.registerForm.reset()
              this.id = ''
              this.name = ''
              this.password = ''
              this.password2 = ''
              this.email = ''
              console.log(err)
            })
        }
      },
      async login () {
        if (this.$refs.loginForm.validate()) {
          await this.$auth.loginWith('local', {
            data: { id: this.loginID, password: this.loginPassword }
          })
            .then(res => {
              this.loginDialog = false
              this.loginID = ''
              this.loginPassword = ''
              this.$router.push({ name: 'me' })
              this.$router.go({ path: '/a', force: true })
            })
            .catch(e => {
              console.log(e)
              this.$refs.loginForm.reset()
              this.loginID = ''
              this.loginPassword = ''
            })
        }
      },
      toMypage (auth) {
        if (auth.loggedIn) {
          this.$router.push('/user/' + auth.user.id)
        } else {
          this.loginDialog = true
        }
      }
    }

  }
</script>
</script>

<style>

 a:link { color: black; text-decoration: none;}
 a:visited { color: black; text-decoration: none;}
 a:hover { color: black; text-decoration: none;}

</style>
