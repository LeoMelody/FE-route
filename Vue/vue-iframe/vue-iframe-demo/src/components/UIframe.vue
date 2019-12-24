<script type="text/jsx">
export default {
  name: "UIframe",
  data() {
    return {

    }
  },
  methods: {
    renderContent() {
      return (
        <div>123</div>
      )
    }
  },
  mounted() {
    
  },
  render() {
    return (
      <iframe ref="uiframe" class="uiframe">
        {this.renderContent()}
      </iframe>
    )
  },
}
</script>