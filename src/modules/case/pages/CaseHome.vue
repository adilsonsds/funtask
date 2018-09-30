<template>
    <div class="tab-pane fade show active" id="sobre" role="tabpanel">
        <div class="card">
            <div class="card-body">
                {{ texto }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    texto: ""
  }
};
</script>
