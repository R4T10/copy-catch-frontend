<template>
  <div class="row">
    <div class="col-md-6">
      There is a high possibility of plagiarism in online exams. However, it is
      difficult to check plagiarism by human effort as there are many questions
      and answers from students on an exam and a professor must try to remember
      the answers of each student to catch any plagiarism. If the professor
      detect plagiarism between students, he or she examines the issue by
      comparing each student’s answer one by one, which requires much effort.
      The professor also spends plenty of time searching each student’s answer
      on the internet to check whether the student copied things from other
      websites.
    </div>
    <div class="col-md-6">
      Copy-Catch is a web application to check plagiarism of online exams that
      are conducted on the KC Moodle, which is a free and open-source learning
      management system that is used for blended learning, distance education,
      flipped classroom, and other online learning projects at Chiang Mai
      University. Professors will not have difficulties with detecting
      plagiarism and be able to mark exams conveniently regarding plagiarism.
    </div>
  </div>
  <div class="row">
    <div class="col-md-4">Check plagiarism among students answers</div>
    <div class="col-md-4">Check plagiarism with Google search</div>
    <div class="col-md-4">Detect plagiarism from lots of answer files</div>
  </div>
  <div>
    <p>Aim</p>
    <p>
      1. To help professors who conduct exams on the KC Moodle check the
      plagiarism of students’ answers
    </p>
    <p>2. To help professors reduce their effort and time to mark exams</p>
    <p>
      3. To help professors mark exams equitably to penalize the students who
      plagiarized on their exams
    </p>
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
