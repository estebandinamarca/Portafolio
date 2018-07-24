const HomeComponent = Vue.component("home", {
    template: '#home',
    data: function () {
      return {
        item: 'home component',
        projects: [],
        loading: true
      }
    },
    methods: {
      getProjects: function() {
        // GET /someUrl
        this.$http.get('https://cdn.contentful.com/spaces/9ixtsgzr92s2/entries?access_token=0fc4c4a0efa1099d8da9219dd994e301dde6e0bbac2f087b3bb3599aa1cd9941&limit=10&content_type=proyecto').then(response => {
          // get body data
          this.projects = response.body;
          console.log('this.projects():' +  this.projects);
          this.loading = false;
          console.log('loading: ' + this.loading);
        }, response => {
          // error callback
          this.loading = false;
          console.log('Error');
        });
      }
    },
    mounted: function () {
     this.getProjects();
    }
});

const WorkComponent = Vue.component("work", {
    template: '#work',
    data: function () {
      return {
        item: 'work component',
        someData: [],
        loading: true
      }
    },
    methods: {
      getData: function() {

        console.log('$route.params.id: ' + this.$route.params.id);
        // GET /someUrl
        this.$http.get('https://cdn.contentful.com/spaces/9ixtsgzr92s2/entries?access_token=0fc4c4a0efa1099d8da9219dd994e301dde6e0bbac2f087b3bb3599aa1cd9941&limit=10&content_type=proyecto&fields.slugProyecto='+ this.$route.params.id).then(response => {
          // get body data
          this.someData = response.body;
          this.loading = false;
          console.log('this.someData():' +  this.someData);
          console.log('$route.params.id:' + this.$route.params.id);
          console.log('loading: ' + this.loading);
        }, response => {
          // error callback
          this.loading = false;
          console.log('Error');
          console.log('$route.params.id:' + this.$route.params.id);
        });
      }
    },
    mounted: function () {
     this.getData();
    }
});
const AboutComponent = Vue.component("about", {
    template: '#about',
    data: function () {
      return {
        item: 'about component'
      }
    },
    methods: {
      getData: function() {
        console.log('getData()');
        this.item = 'New!!!'
      }
    },
    mounted: function () {
     this.getData();
    }
});

const router = new VueRouter({
    mode: 'history',
    routes: [{
        path: '/',
        component: HomeComponent
    }, {
        name: 'work',
        path: '/:id',
        component: WorkComponent
    }, {
        name: 'about',
        path: '/about',
        component: AboutComponent
    }]
});

new Vue({
    el: '#app',
    router: router
});
