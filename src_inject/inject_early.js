/// <reference path="../../../dist-BeforeSC2/init.d.ts" />
/// <reference path="../../../dist-BeforeSC2/SC2DataManager.d.ts" />
/// <reference path="../../../dist-BeforeSC2/ModLoadController.d.ts" />

// const lodash = require('lodash');
// const moment = require('moment');

const i18nTable = {
  'zh-cn': {
    'title': '敬告',
    'text': '由于CoT游戏原作者不支持，且英文社区排斥mod以及汉化。故，请不要在Discard上的英文服务器反馈或发布有关mod或汉化的任何内容',
  },
  'en': {
    'title': 'Official Notice',
    'text': `Due to the game creator's stance and EN community opposition, refrain from discussing mods or Chinese localization in English Discord servers.`,
  },
};

window.modSC2DataManager.getModLoadController().addLifeTimeCircleHook(
  'CotGameStartNotice',
  {
    ModLoaderLoadEnd: async () => {
      console.log('CotGameStartNotice: ModLoaderLoadEnd');
      const language = window.modUtils.getNowMainLanguage();
      console.log('CotGameStartNotice: language', language);
      let table;
      switch (language.toLowerCase()) {
        case 'zh-cn':
        case 'zh':
        case 'cn':
          table = i18nTable['zh-cn'];
          break;
        case 'en':
        default:
          table = i18nTable['en'];
          break;
      }
      console.log('CotGameStartNotice: table', table);
      const r = await window.modSweetAlert2Mod.fire({
        title: table.title,
        text: table.text,
        icon: "info",
      });
      console.log('CotGameStartNotice fire', r);
    },
  },
);

