const Status = {
  DONE: 'DONE',
  ACCEPT: 'ACCEPT',
  FAILED: 'FAILED',
  REJECT: 'REJECT',
};

const TimeFormat = {
  YYYYMMDD: 'YYYYMMDD',
  DDMMYYYYHHmmss: 'DDMMYYYYHHmmss',
  HHMM: 'hhmm',
  PrettyDDMMYYYYHHmmss: 'DD/MM/YYYY-HH:mm:ss',
  PrettyHHMM: 'HH:mm',
  PrettyDDMMYYYY: 'DD/MM/YYYY',
};

type ActionTypesFn<T, R> = (
  values: T,
  additionalData?: any,
  [addtionalName]?: any,
  [addtionalCondition]?: any,
  [addtionalParam]?: any,
) => R;

const NotificationStatus = {
  FAIL: 'FAIL',
  SUCCESS: 'SUCCESS',
};

const titleLevel = 4;

const TypeHandling = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
};
export { Status, TimeFormat, ActionTypesFn, NotificationStatus, titleLevel, TypeHandling };
