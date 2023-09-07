<template>
  <div class="mt-5 ml-3">
    <div class="row" v-if="!hideGallery">
      <div class="column" v-for="(data, i) in postData" :key="data.id">
        <img
          :src="data.postUrl"
          style="height: 70px; width: 80px"
          @click="
            openModal();
            currentSlide(i + 1);
          "
          class="hover-shadow cursor"
        />
      </div>
    </div>

    <div id="myModal" class="modal" :class="hideModel ? 'hide-model' : ''">
      <span class="close cursor" style="z-index: 999" @click="closeModal()"
        >&times;</span
      >
      <div class="modal-content">
        <div class="mySlides" v-for="(data, index) in postData" :key="data.id">
          <div class="numbertext">{{ index + 1 }} / {{ postData.length }}</div>
          <img :src="data.postUrl" style="max-width: 80vw; max-height: 90vh" />
        </div>

        <a class="prev" @click="plusSlides(-1)">&#10094;</a>
        <a class="next" @click="plusSlides(1)">&#10095;</a>

        <div class="caption-container">
          <p id="caption"></p>
        </div>
      </div>
      <div class="pa-5 lower-group-img">
        <div class="column" v-for="(data, i) in postData" :key="data.id">
          <img
            class="demo cursor"
            :src="data.postUrl"
            style="height: 70px; width: 100px"
            @click="currentSlide(i + 1)"
            :alt="data.postText"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    postData: {},
    imageIndex: {},
    hideGallery: {},
  },
  data() {
    return {
      slideIndex: 1,
      hideModel: true,
    };
  },
  watch: {
    imageIndex(newVal) {
      this.hideModel = false;
      this.currentSlide(newVal + 1);
    },
  },
  methods: {
    openModal() {
      // document.getElementById("myModal").style.display = "block";
      this.hideModel = false;
    },
    closeModal() {
      // document.getElementById("myModal").style.display = "none";
      this.hideModel = true;
    },
    plusSlides(n) {
      this.showSlides((this.slideIndex += n));
    },
    currentSlide(n) {
      this.showSlides((this.slideIndex = n));
    },
    showSlides(n) {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      var dots = document.getElementsByClassName("demo");
      var captionText = document.getElementById("caption");
      if (n > slides.length) {
        this.slideIndex = 1;
      }
      if (n < 1) {
        this.slideIndex = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[this.slideIndex - 1].style.display = "block";
      dots[this.slideIndex - 1].className += " active";
      captionText.innerHTML = dots[this.slideIndex - 1].alt;
    },
  },
};

//   var slideIndex = 1;
//   showSlides(slideIndex);
</script>

<style>
.row > .column {
  /* padding: 0 8px; */
}
.lower-group-img{
  /* background-color: green; */
  display: flex;
  flex-wrap: wrap; 
  align-items: center;
  justify-content: center; 
}
.hide-model {
  display: none;
}
.row:after {
  content: "";
  display: table;
  clear: both;
}

.column {
  float: left;
  /* background-color: red; */
  /* width: 25%; */
}

/* The Modal (background) */
.modal {
  /* display: none; */
  position: fixed;
  z-index: 21;
  padding-top: 30px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(255, 255, 255);
}

/* Modal Content */
.modal-content {
  position: relative;
  /* background-color: #fefefe; */
  margin: auto;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  padding: 0;
  width: 90%;
  /* max-width: 1200px; */
  max-width: 80vw;
}

/* The Close Button */
.close {
  color: black;
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 35px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #999;
  text-decoration: none;
  cursor: pointer;
}

.mySlides {
  display: none;
  text-align: center;
}

.cursor {
  cursor: pointer;
}

/* Next & previous buttons */
.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -50px;
  /* color: red; */
  font-weight: bold;
  font-size: 20px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
  -webkit-user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover,
.next:hover {
  /* background-color: black; */
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

img {
  margin-bottom: -4px;
}

.caption-container {
  text-align: center;
  background-color: white;
  padding: 2px 16px;
  color: black;
}

.demo {
  opacity: 0.6;
}

.active,
.demo:hover {
  opacity: 1;
}

img.hover-shadow {
  transition: 0.3s;
}

.hover-shadow:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
