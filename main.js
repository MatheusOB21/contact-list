
const app = Vue.createApp({
    data(){
      return{
          searchText: '',
          firstName: 'José',
          lastName: 'Silva',
          email: 'jose@gmail.com',
          city: 'Cajamar',
          picture: 'https://d27jswm5an3efw.cloudfront.net/app/uploads/2018/11/fair-use-images-12.jpg',
          image: 'max-width: 200px;',
          listContact: []
      }
    },

    computed:{
      listResult(){

        if(this.searchText){

          return this.listContact.filter(contact =>{

              return contact.firstName.toLowerCase().includes(this.searchText.toLowerCase());

          });

        }else{
          return this.listContact;
        }

      }
    },

    async mounted(){
      this.listResult = await this.getData()
    },

    methods:{
      
      removeContact(index){
        this.listContact.splice(index, 1);
      },

      async getData(){

        let response = await fetch('https://randomuser.me/api/?results=32');
        let data = await response.json()

        data.results.forEach(element => {

          var contact = new Object();

          contact.firstName = element.name.first;
          contact.lastName = element.name.last;
          contact.email = element.email;
          contact.city = element.location.city;
          contact.picture = element.picture

          this.listContact.push(contact)
          
        });
      }

    }
})

app.mount('#app')