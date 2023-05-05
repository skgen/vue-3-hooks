import { createMelkorUi } from '@patriarche/melkor';

import '@patriarche/melkor/style';
import '@/assets/scss/main.scss';

import i18n from '@/plugins/i18n';
import router from '@/plugins/router';

const mkui = createMelkorUi({
  i18n,
  router,
});

export default mkui;
