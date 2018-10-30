<template>
    <div class="tab-pane fade show active" id="sobre" role="tabpanel">
        <div class="card mb-3">
            <pre class="card-body">{{ texto }}</pre>
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
<style>
pre {
  overflow: auto;
  white-space: pre-wrap;
}
</style>
