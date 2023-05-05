<template>
  <div class="pux-AppHookDemo">
    <div
      v-if="$slots['hook']"
      class="pux-AppHookDemo-name"
    >
      <slot name="hook" />
    </div>
    <mk-wysiwyg-preview>
      <slot />
    </mk-wysiwyg-preview>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
.pux-AppHookDemo {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--app-m-8) var(--app-m-4) var(--app-m-4) var(--app-m-4);
    border: 1px dashed var(--app-border-color);
    border-radius: var(--app-border-radius);

    &-name {
        position: absolute;
        top: 0;
        left: 0;
        padding: var(--app-m-1);
        font-weight: 500;
        border-right: 1px dashed var(--app-border-color);
        border-bottom: 1px dashed var(--app-border-color);
        border-bottom-right-radius: var(--app-border-radius);
    }
}
</style>
