<template>
  <div class="home-container">
    <section id='showcase'>
        <div class='showcase-content'>
          <!-- <h1 class='main-heading'>
            Dont't Let Your Childern Future to Go In Dark
          </h1> -->
          <!-- <p class='main-para'>
            Your voices are being heard and you’re proving to our ancestors that
            their struggles were not in vain. Now we have one more thing we need
            to do to walk in our true power, and that is to vote.
          </p> -->
          <router-link class="to-login" to="/login">
            <el-button type="primary" plain>Vote</el-button>
          </router-link>
        </div>
    </section>
    <section id='what'>
      <div class='container p-4'>
        <h1 id='whats'>
          <span class='text-white'>Features</span> 
        </h1>
      </div>
      <!-- <div class='whats'>
        <div class='investment what'>
          <div class='icon'>
            <i class='far fa-lightbulb fa-4x'></i>
          </div>
          <div class='info'>
            <h1>Transparent voting</h1>
            <p>
              Our Voting system is a blockchain based system and it provides a
              transparent voting system, eliminatede the problem of vote
              tempering
            </p>
          </div>
        </div>
        <div class='portfolio what'>
          <div class='icon'>
            <i class='fas fa-user-alt fa-4x'></i>
          </div>
          <div class='info'>
            <h1>KYC</h1>
            <p>
              We have introduced the decentralized KYC of the voters so no
              double voting can be done through the system and eliminated the
              fake vote count
            </p>
          </div>
        </div>
        <div class='tax what'>
          <div class='icon'>
            <i class='fas fa-layer-group fa-4x'></i>
          </div>
          <div class='info'>
            <h1>DEVELOPED COUNTRY</h1>
            <p>
              Our voting system will result a loyal election and a true leader
              will be elected that will put the country on the way of
              development
            </p>
          </div>
        </div>
      </div> -->

      <el-row :gutter="30" class="py-5">
        <el-col :span="8">
          <div class='icon'>
            <i class='far fa-lightbulb fa-4x'></i>
          </div>
          <div class='info'>
            <h1>Transparent voting</h1>
            <p>
              Our Voting system is a blockchain based system and it provides a
              transparent voting system, eliminatede the problem of vote
              tempering
            </p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class='icon'>
            <i class='fas fa-user-alt fa-4x'></i>
          </div>
          <div class='info'>
            <h1>KYC</h1>
            <p>
              We have introduced the decentralized KYC of the voters so no
              double voting can be done through the system and eliminated the
              fake vote count
            </p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class='icon'>
            <i class='fas fa-layer-group fa-4x'></i>
          </div>
          <div class='info'>
            <h1>DEVELOPED COUNTRY</h1>
            <p>
              Our voting system will result a loyal election and a true leader
              will be elected that will put the country on the way of
              development
            </p>
          </div>
        </el-col>
      </el-row>

      <!-- <div class='whats'>
        <div class='investment what'>
          <div class='icon'>
            <i class='far fa-sun  fa-4x'></i>
          </div>
          <div class='info'>
            <h1>FUTURE</h1>
            <p>
              Learn how to take beautiful portraits with minimal equipment;
              how light affects your images and how to make the very best of
              any location.
            </p>
          </div>
        </div>
        <div class='portfolio what'>
          <div class='icon'>
            <i class='fas fa-database fa-4x'></i>
          </div>
          <div class='info'>
            <h1>BLOCKCHAIN</h1>
            <p>
              Our Voting system is a blockchain based system and it provides a
              transparent voting system, eliminatede the problem of vote
              tempering
            </p>
          </div>
        </div>
        <div class='tax what'>
          <div class='icon'>
            <i class='fas fa-dice-d20 fa-4x'></i>
          </div>
          <div class='info'>
            <h1>DECENTRALIZED</h1>
            <p>
              Our voting application is completely decentralized and this
              results to the elimination of the interfarence of any person in
              voting results
            </p>
          </div>
        </div>
      </div> -->

      <el-row :gutter="30">
        <el-col :span="8">
          <div class='icon'>
            <i class='far fa-sun  fa-4x'></i>
          </div>
          <div class='info'>
            <h1>FUTURE</h1>
            <p>
              Learn how to take beautiful portraits with minimal equipment;
              how light affects your images and how to make the very best of
              any location.
            </p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class='icon'>
            <i class='fas fa-database fa-4x'></i>
          </div>
          <div class='info'>
            <h1>BLOCKCHAIN</h1>
            <p>
              Our Voting system is a blockchain based system and it provides a
              transparent voting system, eliminatede the problem of vote
              tempering
            </p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class='icon'>
            <i class='fas fa-dice-d20 fa-4x'></i>
          </div>
          <div class='info'>
            <h1>DECENTRALIZED</h1>
            <p>
              Our voting application is completely decentralized and this
              results to the elimination of the interfarence of any person in
              voting results
            </p>
          </div>
        </el-col>
      </el-row>
    </section>
    <section id='who'>
      <!-- <div class='left-img who'></div> -->
      <div class='right-content who'>
        <h1 class='who-info'>
          <span class='text-light'>
            Our Mission
          </span>
        </h1>
        <p class='who-info'>
          As after seeing so much problems and corruption in our voting
          system, our team com out with the plan to transform the voting
          system of Pakistan and shifting the system from the standard paper
          voting to decnetralized voting system, where the whole voting system
          will be transparent to the users and the voters will be easily cast
          the vote from any where the world, Our application provides a hastle
          free and visible voting and the user will be able to see results on
          run time
        </p>
        <p class='who-info'>
          So, our mission was to introduce a fair way of election in Pakistan
          so a fair leadership is been elected and as by introducing the
          blockchain the system becomes totally transparent for all the users
          and now as every vote casted is been mapped to the blockchain and in
          the result a transparent and a fair election will take place a true
          leadership will be elected that can govern the country and make it
          grow.
        </p>
      </div>
    </section>
    <!-- <section id='clients'>
      <div class='container'>
        <h1 id='client'>
          <span class='text-primary'>Our</span> Team
        </h1>
      </div>
      <div class='clients'>
        <div class='client'>
          <img
            src='/img/logos/WhatsAppImage2021-10-18at1.08.01AM.jpeg'
            alt='Client'
          />
        </div>

        <div class='client'>
          <img src='/img/logos/murtaza.png' alt='Client' />
        </div>

        <div class='client'>
          <img
            src='/img/logos/WhatsAppImage2021-10-18at12.53.07AM.jpeg'
            alt='Client'
          />
        </div>

        <div class='client'>
          <img
            src='https://pak-vote.herokuapp.com/img/logos/WhatsAppImage2021-10-18at12.53.07AM1.jpeg'
            alt='Client'
          />
        </div>
      </div>
    </section> -->
    <section id='contact'>
      <h1 class="text-light mb-4">Contact Us</h1>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="Name" prop="name">
          <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Phone" prop="phone">
          <el-input v-model.number="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="Message" prop="message">
          <el-input type="textarea" v-model="ruleForm.message"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" >Submit</el-button>
          <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
    </el-form>
    </section>
    <footer>
      <p>Copyright ©, 2021, Pakistan Voting System</p>
    </footer>
  </div>
</template>


<script>
export default {
  name: "home",
  data() {
    var checkPhoneNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Please input the phone'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('Please input digits'));
          } else {
            callback();
          }
        }, 1000);
      };
      return {
        ruleForm: {
          name: '',
          email: '',
          phone: '',
          message: ''
        },
        rules: {
          name: [
            { required: true, message: 'Please input Activity name', trigger: 'blur' },
          ],
          email: [
            { required: true, message: 'Please input email address', trigger: 'blur' },
            { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
          ],
          phone: [
            { required: true, validator: checkPhoneNumber, trigger: 'blur' }
          ],
          message: [
            { required: true, message: 'Please input message form', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>