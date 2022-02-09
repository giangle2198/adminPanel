let setting: any = {};
const SETTING_KEY = 'setting';

interface ISetting {
  pagination: string;
  newtab: boolean;
  timer: string;
  approved_timer: string;
}

const initValueSetting: ISetting = {
  pagination: '5',
  newtab: false,
  timer: '10',
  approved_timer: '10',
};

export const getSettings = () => {
  const settingJson = window.localStorage.getItem(SETTING_KEY);
  if (settingJson) {
    setting = JSON.parse(settingJson);
  }
};
getSettings();
const getSetting = (field: string): any => {
  return (setting && setting[field]) || '';
};

const getPagination = () => {
  const pageLimit = setting && setting.pagination;
  let current = 1;
  if (!Number.isInteger(Number(pageLimit))) {
    current = 0;
  }
  return {
    maxPerPage: pageLimit,
    currentPage: current,
  };
};

const setSetting = (field: string, value: string | number | boolean) => {
  // set setting
  // save to local storage
  setting[field] = value;
  const settingJson = JSON.stringify(setting);
  window.localStorage.setItem(SETTING_KEY, settingJson);
};

const initSetting = () => {
  setting = initValueSetting;
  const settingJson = JSON.stringify(initValueSetting);
  window.localStorage.setItem(SETTING_KEY, settingJson);
};
export default initSetting;
export { setSetting, getSetting, getPagination };
