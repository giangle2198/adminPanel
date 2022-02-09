interface ISelectData {
  name: string;
  value: string;
}

interface IFormatSelectData {
  data: any;
  name?: string;
  value?: string;
  additionalInfo?: string;
}

const FormatSelectData = (props: IFormatSelectData): ISelectData[] => {
  let type: string;
  switch (typeof (props && props.data)) {
    case 'object': {
      if (Array.isArray(props.data)) {
        type = 'array';
        break;
      }
      type = 'object';
      break;
    }
    default:
      break;
  }
  const selectData = Object.keys((props && props.data) || []).map((key: string) => {
    if (type === 'array') {
      const value = props.additionalInfo
        ? props.data &&
          props.data[key] &&
          `${props.data[key][props.additionalInfo]}-${
            props.data[key][(props && props.value) || '']
          }`
        : props.data && props.data[key] && props.data[key][(props && props.value) || ''];
      return {
        name: props && props.data[key] && props.data[key][(props && props.name) || ''],
        value,
      };
    }
    return {
      name: key,
      value: props && props.data[key],
    };
  });
  return selectData;
};

export { FormatSelectData, ISelectData };
