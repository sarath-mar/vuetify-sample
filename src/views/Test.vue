<template>
  <div>
    <v-row justify="center" align="center">
      <v-subheader>Offset Top</v-subheader>
      {{ offsetTop }}
    </v-row>
    <v-container
      v-scroll.self="onScrollTop"
      id="scroll-target"
      style="height: 360px" 
      class="overflow-y-auto"
    >
      <v-row v-for="(item, index) in items" :key="index" style="height: 60px">
       <v-list-item>
          <v-list-item-avatar>
            <v-avatar :color="item.color" size="60" class="white--text">
              {{ item.initials }}
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ item.fullName }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn depressed small>
              View User

              <v-icon color="orange darken-4" right> mdi-open-in-new </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <!-- <p id="listTile">{{index}}</p>   -->
        <!-- </v-card> -->
      </v-row>
    </v-container>
 
  </div>
</template>
<script>
// import { ref } from "vue";
export default {
  data: () => ({
    //   reference:'',
    total: [],
    offsetTop: 0,
    dataIndex: 0,
    firstTotalHeight: 0,
    items: [],
    colors: [
      "#2196F3",
      "#90CAF9",
      "#64B5F6",
      "#42A5F5",
      "#1E88E5",
      "#1976D2",
      "#1565C0",
      "#0D47A1",
      "#82B1FF",
      "#448AFF",
      "#2979FF",
      "#2962FF",
    ],
    names: [
      "Oliver",
      "Jake",
      "Noah",
      "James",
      "Jack",
      "Connor",
      "Liam",
      "John",
      "Harry",
      "Callum",
      "Mason",
      "Robert",
      "Jacob",
      "Jacob",
      "Jacob",
      "Michael",
      "Charlie",
      "Kyle",
      "William",
      "William",
      "Thomas",
      "Joe",
      "Ethan",
      "David",
      "George",
      "Reece",
      "Michael",
      "Richard",
      "Oscar",
      "Rhys",
      "Alexander",
      "Joseph",
      "James",
      "Charlie",
      "James",
      "Charles",
      "William",
      "Damian",
      "Daniel",
      "Thomas",
      "Amelia",
      "Margaret",
      "Emma",
      "Mary",
      "Olivia",
      "Samantha",
      "Olivia",
      "Patricia",
      "Isla",
      "Bethany",
    ],
    surnames: [
      "Smith",
      "Anderson",
      "Clark",
      "Wright",
      "Mitchell",
      "Johnson",
      "Thomas",
      "Rodriguez",
      "Lopez",
      "Perez",
      "Williams",
      "Jackson",
      "Lewis",
      "Hill",
      "Roberts",
      "Jones",
      "White",
      "Lee",
      "Scott",
      "Turner",
      "Brown",
      "Harris",
      "Walker",
      "Green",
      "Phillips",
      "Davis",
      "Martin",
      "Hall",
      "Adams",
      "Campbell",
      "Miller",
      "Thompson",
      "Allen",
      "Baker",
      "Parker",
      "Wilson",
      "Garcia",
      "Young",
      "Gonzalez",
      "Evans",
      "Moore",
      "Martinez",
      "Hernandez",
      "Nelson",
      "Edwards",
      "Taylor",
      "Robinson",
      "King",
      "Carter",
      "Collins",
    ],
  }),
  watch: {
    offsetTop: { 
      handler(e) {
        let firstHeight = 360;
        let eachHeight = 60;
        let firstTenHeight = eachHeight * 10;
        if (!this.dataIndex) {
          console.log(e);

          let firstChange = firstTenHeight - firstHeight;
          if (firstChange == e) {
            this.firstTotalHeight = firstChange;
            this.dataIndex++;
            let data = this.total.filter((x, i) => {
              if (i < 10) return x;
            });
            this.items.push(...data);
          }
        } else {
          if (e == this.firstTotalHeight + firstTenHeight) {
            this.firstTotalHeight += firstTenHeight;
            this.dataIndex++;
            let data = this.total.filter((x, i) => {
              if (i < 10) return x;
            });
            this.items.push(...data);
          }
        }
      },
    },
    // offsetTop: {
    //   handler(e) {
    //     console.log(e);
    //     if (e == 160) {
    //       let data = this.total.filter((x, i) => {
    //         if (i < 10) return x;
    //       });
    //       this.items.push(...data);
    //     }
    //     if (e == 720) {
    //       let data = this.total.filter((x, i) => {
    //         if (i < 10) return x;
    //       });
    //       this.items.push(...data);
    //     }
    //   },
    // },
  },

  

  methods: {
   
    onScrollTop(e) {
      this.offsetTop = e.target.scrollTop;
    },
    genRandomIndex(length) {
      return Math.ceil(Math.random() * (length - 1));
    },
  },
  created() {
    console.log("created");
    // this.reference=this.ref(null)
    const namesLength = this.names.length;
    const surnamesLength = this.surnames.length;
    const colorsLength = this.colors.length;
    this.total = Array.from({ length: 100 }, () => {
      const name = this.names[this.genRandomIndex(namesLength)];
      const surname = this.surnames[this.genRandomIndex(surnamesLength)];
      return {
        color: this.colors[this.genRandomIndex(colorsLength)],
        fullName: `${name} ${surname}`,
        initials: `${name[0]} ${surname[0]}`,
      };
    });
    this.items = this.total.filter((x, i) => {
      if (i < 10) return x;
    });
  },
};
</script>
