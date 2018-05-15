<template>
  <mn-scroller>
    <mn-container>
      <mn-section>
        <mn-letter>
          <mn-letter-body>
            <h1>Hi</h1>
            <small>I am Vue Human!</small>
          </mn-letter-body>
        </mn-letter>

        <mn-card>
          <mn-card-media>
            <img src="./logo.jpg">
          </mn-card-media>
          <mn-card-item>
            <mn-card-body>Hello World!</mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              Welcome to use vue tempalte with vue-human.
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              <mn-input v-model="errMsg" placeholder=""></mn-input>
            </mn-card-body>
          </mn-card-item>
        </mn-card>

        <mn-btn :icon="icons.chatbubbleWorking" theme="primary" @click="bubble">Start</mn-btn>
        <mn-btn theme="secondary-link" @click="$router.push({ name: 'signIn' })">Sign in</mn-btn>
        <mn-btn theme="inverse" size="xs"
          @click="throwErr">throw err</mn-btn>
      </mn-section>
    </mn-container>
  </mn-scroller>
</template>

<script>
  import Message from 'vue-human/utils/Message'
  import input from 'vue-human/suites/input'

  export default {
    components: {
      ...input.map()
    },
    data () {
      return {
        errMsg: 'this is a test error',
        icons: {
          chatbubbleWorking: require('vue-human-icons/js/iconic/chatbubble-working')
        }
      }
    },
    methods: {
      throwErr () {
        fundebug.notifyError(new Error(this.errMsg))
      },
      bubble ($event, button) {
        button.loading = true
        setTimeout(() => {
          button.loading = false
          Message.create({ message: 'Hi, bubble!' }).show()
        }, 800)
      }
    }
  }
</script>
