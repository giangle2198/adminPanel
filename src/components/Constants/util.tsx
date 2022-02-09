import { parse } from 'querystring';

const convertFiletoBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function readFile(file: any) {
  return new Promise((resolve, reject) => {
    // Create file reader
    const reader = new FileReader();

    // Register event listeners
    reader.addEventListener('loadend', (e: any) => resolve(e.target.result));
    reader.addEventListener('error', reject);

    // Read file
    reader.readAsArrayBuffer(file);
  });
}

async function getAsByteArray(file: any) {
  const result = await readFile(file);
  return new Uint8Array(result as ArrayBufferLike);
}

function ArrayBufferToBase64(buffer: any) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function ConvertBoolToString(value: boolean) {
  if (value) {
    return '1';
  }
  return '0';
}

function ConvertStringToBool(value: string) {
  if (value === '1') {
    return true;
  }
  return false;
}

function SortView(keyArr: any, sortedNumberView: any) {
  return keyArr.sort((current: any, next: any) => {
    return Number(sortedNumberView[current]) - Number(sortedNumberView[next]);
  });
}

// const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const getParamsQuery = () => {
  const { href } = window.location;
  const qsIndex = href.indexOf('?');
  const sharpIndex = href.indexOf('#');

  if (qsIndex !== -1) {
    if (qsIndex > sharpIndex) {
      return parse(decodeURIComponent(href.split('?')[1]));
    }

    return parse(decodeURIComponent(href.slice(qsIndex + 1, sharpIndex)));
  }

  return {};
};

export {
  convertFiletoBase64,
  readFile,
  getAsByteArray,
  ArrayBufferToBase64,
  ConvertBoolToString,
  ConvertStringToBool,
  SortView,
  getParamsQuery,
};
