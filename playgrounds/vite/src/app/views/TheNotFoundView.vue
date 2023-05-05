<template>
  <div class="pux-TheNotFoundView">
    <span>
      {{ $t('component.TheNotFoundView.title') }}
    </span>
    <mk-link to="/">
      <mk-icon icon="arrow_back" />
      {{ $t('component.TheNotFoundView.back') }}
      <mk-icon icon="house" />
    </mk-link>
  </div>
</template>

<style lang="scss">
.pux-TheNotFoundView {
    display: flex;
    flex-direction: column;
    gap: var(--app-m-3);
    align-items: center;
    justify-content: center;
    min-height: 100vh;
}
</style>
