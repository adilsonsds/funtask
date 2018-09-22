<template>
    <div>
        <div v-if="visible" class="modal show fade" :id="id" tabindex="-1" role="dialog" style="display: block">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                      <button type="button" class="close" @click="visible=false" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="modal-body">
                      <slot name="body"></slot>
                  </div>
                  <div class="modal-footer">
                      <slot name="footer"></slot>
                  </div>
                </div>
            </div>
        </div>
        <div v-if="visible" class="modal-backdrop fade show"></div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false
    };
  },
  props: {
    id: ""
  },
  created() {
    this.$root.$on("abrir-modal", id => {
      if (this.id === id) {
        this.visible = true;
      }
    });

    this.$root.$on("fechar-modal", id => {
      if (this.id === id) {
        this.visible = false;
      }
    });
  }
};
</script>
