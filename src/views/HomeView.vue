<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />
  <div class="container">
    <h2 class="about_us">ABOUT US</h2>
    <img class="homeimg" src="@/assets/home.jpg" />
    <div class="aboutus">
      <h2 class="about_copy">Copy-Catch</h2>
      is a web application to check plagiarism of online exams that are
      conducted on the KC Moodle, which is a free and open-source learning
      management system that is used for blended learning, distance education,
      flipped classroom, and other online learning projects at Chiang Mai
      University. Professors will not have difficulties with detecting
      plagiarism and be able to mark exams conveniently regarding plagiarism.
    </div>
  </div>
  <div class="animate__animated animate__fadeInLeft feature">
    <div id="circle"><i class="fa fa-copy"></i></div>
    <div id="explain">check plagiarism among students answers</div>
  </div>
  <div class="animate__animated animate__fadeInRight feature">
    <div id="explain">check plagiarism with Google search</div>
    <div id="circle"><i class="fa fa-google"></i></div>
  </div>
  <div class="animate__animated animate__fadeInLeft feature">
    <div id="circle"><i class="fa fa-envelope"></i></div>
    <div id="explain">
      send email to students to inform <br />
      them their answer has been considered plagiarism
    </div>
  </div>
</template>

<script>
import LoginService from '@/services/LoginService'
export default {
  name: 'HomeView',
  data() {
    return {
      searchQuery: '',
      accessToken: null,
      userInfo: null
    }
  },
  methods: {
    login() {
      LoginService.login().then((response) => {
        window.location.href = response.data
      })
    }
  }
}
</script>
<style scoped>
body {
  background: rgb(245, 250, 247);
}
.about_us {
  font-size: 50px;
}
.about_copy {
  font-size: 50px;
  color: white;
}
.container {
  position: relative;
  text-align: center;
}

.homeimg {
  width: 60%;
}

.aboutus {
  text-align: justify;
  font-size: 18px;
  margin-bottom: 20px;
  padding: 2% 5% 2% 5%;
  margin: 0% 20% 2% 20%;
  background-color: #04724d;
  color: white;
}

#title {
  font-weight: bold;
}

.feature {
  padding: 30px 375px;
  display: flex;
  justify-content: space-between;
}

#circle {
  border-radius: 50%;
  background: #1c499e;
  font-size: 60px;
  color: white;
  width: 150px;
  height: 150px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

#explain {
  text-align: center;
  font-size: 18px;
  margin: auto;
  font-weight: bold;
  border: 1px solid #04724d;
  border-radius: 5px;
  width: 600px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}
@import 'animate.css';
</style>
