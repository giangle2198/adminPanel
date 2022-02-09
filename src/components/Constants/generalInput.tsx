import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TimePicker,
} from 'antd';
import type { Rule } from 'antd/lib/form';
import type { FormItemLabelProps } from 'antd/lib/form/FormItemLabel';
import type { FormLabelAlign } from 'antd/lib/form/interface';
import type { Moment } from 'moment';
import moment from 'moment';
import { useIntl } from 'umi';
import type { ActionTypesFn } from './constants';
import { TimeFormat } from './constants';
import type { ISelectData } from './generalSelect';
import * as uuid from 'uuid';
import { GenElementByType } from './generalForm';
import type { RangeValue } from 'node_modules/rc-picker/lib/interface';
import { ConvertStringToBool } from './util';

const { RangePicker } = DatePicker;
const { Option } = Select;
const regDigital = /^(0|84)(\d{9,11})$/;
const NotAccentVietnamese = /^([A-Za-z0-9\\.\\,\-\\_\\s\\ \\/]+)$|^$/g;

const TypeGenInput = {
  input: 'input',
  select: 'select',
  checkbox: 'checkbox',
  empty: 'empty',
  area: 'area',
  timeRangePicker: 'time_range_picker',
  dateRangePicker: 'date_range_picker',
  rangerPicker: 'range_picker',
  number: 'number',
  digitalNumber: 'digitalNumber',
  email: 'email',
  radio: 'radio',
  radioGroup: 'radio_group',
  percent: 'percent',
  amount: 'amount',
  datetime: 'datetime',
  switch: 'switch',
  inputNotRegex: 'input_not_regex',
  password: 'password',
};

const HandleValueCurrentInExtra = (inputValue: any, type: string = '') => {
  const intl = useIntl();
  let returnValue;
  switch (inputValue) {
    case true:
      returnValue = `${intl.formatMessage({ id: 'pages.maintenance.active' })}`;
      break;
    case false:
      returnValue = `${intl.formatMessage({ id: 'pages.maintenance.unactive' })}`;
      break;
    default:
      returnValue = inputValue;
      break;
  }

  if (returnValue) {
    if (type) {
      const showValue = GenElementByType({ data: returnValue, type });
      const value = (
        <>
          {intl.formatMessage({ id: 'pages.current' })} {showValue}{' '}
        </>
      );
      return value;
    }
    const val = `${intl.formatMessage({ id: 'pages.current' })} ${returnValue || ''}`;
    return val;
  }
  return '';
};

const GenElementInputByType = (props: IRenderColLabelInputByType): JSX.Element => {
  const { type, data } = props;
  const intl = useIntl();
  const layoutFormDefault = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
    labelAlign: 'left' as FormLabelAlign,
    colon: false,
  };
  switch (type) {
    case TypeGenInput.input:
      return (
        <Form.Item
          {...layoutFormDefault}
          {...props.layoutForm}
          key={uuid.v4()}
          label={intl.formatMessage({
            id: `pages.${(props.page && `${props.page}.`) || ''}${props.name}`,
          })}
          name={props.name}
          rules={[
            ...(props.rules || [{}]),
            {
              pattern: new RegExp(NotAccentVietnamese),
              message: 'Format is wrong',
            },
          ]}
          hidden={props.hiddenType === 'empty'}
          initialValue={!Array.isArray(props.data) ? String(props.data) : null}
          extra={HandleValueCurrentInExtra(props.currentData, props.currentDataType)}
        >
          <Input
            disabled={props.disabled}
            allowClear
            onChange={props.onChangeValueInput}
            placeholder={intl.formatMessage({
              id: `pages.${(props.page && `${props.page}.`) || ''}${props.name}`,
            })}
          />
        </Form.Item>
      );
    case TypeGenInput.inputNotRegex:
      return (
        <Form.Item
          {...layoutFormDefault}
          {...props.layoutForm}
          key={uuid.v4()}
          label={intl.formatMessage({
            id: `pages.${(props.page && `${props.page}.`) || ''}${props.name}`,
          })}
          name={props.name}
          rules={[...(props.rules || [{}])]}
          hidden={props.hiddenType === 'empty'}
          initialValue={!Array.isArray(props.data) ? String(props.data) : null}
          extra={HandleValueCurrentInExtra(props.currentData, props.currentDataType)}
        >
          <Input
            disabled={props.disabled}
            allowClear
            onChange={props.onChangeValueInput}
            placeholder={intl.formatMessage({
              id: `pages.${(props.page && `${props.page}.`) || ''}${props.name}`,
            })}
          />
        </Form.Item>
      );
    case TypeGenInput.number:
      return (
        <Form.Item
          {...layoutFormDefault}
          {...props.layoutForm}
          key={uuid.v4()}
          label={intl.formatMessage({
            id: `pages.${(props.page && `${props.page}.`) || ''}${props.name}`,
          })}
          name={props.name}
          hidden={props.type === 'empty'}
          rules={[
            {
              ...props.rules,
              type: 'number',
              transform: (value: string) => {
                return Number(value);
              },
            },
          ]}
          extra={HandleValueCurrentInExtra(props.currentData, props.currentDataType)}
        >
          <Input type="number" allowClear />
        </Form.Item>
      );
    case TypeGenInput.select:
      return (
        <Form.Item
          {...layoutFormDefault}
          {...props.layoutForm}
          key={uuid.v4()}
          label={intl.formatMessage({
            id: `pages.${(props.page && `${props.page}.`) || ''}${props.name}`,
          })}
          name={props.name}
          rules={props.rules}
          hidden={props.type === 'empty'}
          initialValue={props.defaultValue}
          extra={HandleValueCurrentInExtra(props.currentData, props.currentDataType)}
        >
          <Select
            showSearch
            onChange={(value: string) => {
              if (props.actionChangeValue) {
                props.actionChangeValue(value);
              }
            }}
            placeholder={intl.formatMessage({
              id: `pages.${(props.page && `${props.page}.`) || ''}${props.name}`,
            })}
          >
            {Object.keys(data || []).map((key: string) => {
              const value = (data && data[key].value) || '';
              const name = (data && data[key].name) || '';
              const fullValue = `${value}-${name}`;
              return (
                <Option value={fullValue} key={key}>
                  {name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      );
    case TypeGenInput.checkbox:
      return (
        <Form.Item
          {...layoutFormDefault}
          {...props.layoutForm}
          key={uuid.v4()}
          label={intl.formatMessage({
            id: `pages.${(props.page && `${props.page}.`) || ''}${props.name}`,
          })}
          name={props.name}
          valuePropName="checked"
          rules={props.rules}
          hidden={props.type === 'empty'}
          initialValue={
            (props.data &&
              !Array.isArray(props.data) &&
              (props.data === 'Y' || props.data === '1' || String(props.data) === 'true')) ||
            false
          }
          extra={HandleValueCurrentInExtra(props.currentData, props.currentDataType)}
        >
          <Checkbox />
        </Form.Item>
      );
    case TypeGenInput.area:
      return (
        <Form.Item
          {...layoutFormDefault}
          {...props.layoutForm}
          key={uuid.v4()}
          label={intl.formatMessage({
            id: `pages.${(props.page && `${props.page}.`) || ''}${props.name}`,
          })}
          name={props.name}
          rules={props.rules}
          hidden={props.type === 'empty'}
          initialValue={!Array.isArray(props.data) ? String(props.data) : null}
        >
          <Input.TextArea showCount maxLength={100} rows={4} allowClear />
        </Form.Item>
      );
    case TypeGenInput.timeRangePicker:
      return (
        <Form.Item
          {...layoutFormDefault}
          {...props.layoutForm}
          key={uuid.v4()}
          label={intl.formatMessage({
            id: `pages.${(props.page && `${props.page}.`) || ''}${props.name}`,
          })}
          name={props.name}
          rules={props.rules}
          hidden={props.type === 'empty'}
          extra={HandleValueCurrentInExtra(props.currentData, props.currentDataType)}
        >
          <TimePicker.RangePicker allowClear style={{ width: '100%' }} format="HH:mm" />
        </Form.Item>
      );
    case TypeGenInput.dateRangePicker: {
      let valueInit = null;
      if (
        props.defaultValue !== undefined &&
        props.defaultValue !== '' &&
        props.defaultValue !== null
      ) {
        const splitdefauValue = props.defaultValue.split('|');
        const value = splitdefauValue[0];
        if (splitdefauValue.length < 2) {
          valueInit = null;
        } else {
          const format = splitdefauValue[1];
          valueInit = moment(value, format);
        }
      }
      return (
        <Form.Item
          {...layoutFormDefault}
          {...props.layoutForm}
          key={uuid.v4()}
          label={intl.formatMessage({
            id: `pages.${(props.page && `${props.page}.`) || ''}${props.name}`,
          })}
          name={props.name}
          rules={props.rules}
          hidden={props.type === 'empty'}
          extra={HandleValueCurrentInExtra(props.currentData, props.currentDataType)}
          initialValue={valueInit}
        >
          <DatePicker
            allowClear
            format={TimeFormat.PrettyDDMMYYYY}
            disabledDate={(props && props.conditionalDate) || (() => false)}
            style={{ width: '100%' }}
          />
        </Form.Item>
      );
    }
    case TypeGenInput.email:
      return (
        <Form.Item
          {...layoutFormDefault}
          {...props.layoutForm}
          key={uuid.v4()}
          label={intl.formatMessage({
            id: `pages.${(props.page && `${props.page}.`) || ''}${props.name}`,
          })}
          name={props.name}
          hidden={props.type === 'empty'}
          rules={[
            ...(props.rules || [{}]),
            {
              type: 'email',
              message: 'Only one email',
            },
          ]}
          extra={HandleValueCurrentInExtra(props.currentData, props.currentDataType)}
        >
          <Input type="email" placeholder="ex: abc@gmail.com" allowClear />
        </Form.Item>
      );
    case TypeGenInput.digitalNumber:
      return (
        <Form.Item
          {...layoutFormDefault}
          {...props.layoutForm}
          key={uuid.v4()}
          label={intl.formatMessage({
            id: `pages.${(props.page && `${props.page}.`) || ''}${props.name}`,
          })}
          name={props.name}
          hidden={props.type === 'empty'}
          rules={[
            ...(props.rules || [{}]),
            {
              // type: "regexp",
              pattern: new RegExp(regDigital),
              message: 'Format is wrong',
            },
          ]}
          extra={HandleValueCurrentInExtra(props.currentData, props.currentDataType)}
        >
          <Input placeholder="ex: 0989456123 or 84989456123" allowClear />
        </Form.Item>
      );
    case TypeGenInput.radio:
      return (
        <Form.Item
          {...layoutFormDefault}
          {...props.layoutForm}
          key={uuid.v4()}
          label={intl.formatMessage({
            id: `pages.${(props.page && `${props.page}.`) || ''}${props.name}`,
          })}
          name={props.name}
          rules={props.rules}
          hidden={props.type === 'empty'}
          initialValue={props.defaultValue}
          extra={HandleValueCurrentInExtra(props.currentData, props.currentDataType)}
        >
          <Radio.Group>
            {Object.keys(data || []).map((key: string) => {
              return (
                <Radio value={`${data && data[key].value}-${data && data[key].name}`} key={key}>
                  {data && data[key].name}
                </Radio>
              );
            })}
          </Radio.Group>
        </Form.Item>
      );
    case TypeGenInput.rangerPicker:
      return (
        <Form.Item
          {...layoutFormDefault}
          {...props.layoutForm}
          key={uuid.v4()}
          label={intl.formatMessage({
            id: `pages.${(props.page && `${props.page}.`) || ''}${props.name}`,
          })}
          name={props.name}
          hidden={props.type === 'empty'}
          rules={props.rules}
          extra={HandleValueCurrentInExtra(props.currentData, props.currentDataType)}
        >
          <RangePicker
            style={{ width: '100%' }}
            disabledDate={props.disabledDate}
            onCalendarChange={(val: RangeValue<moment.Moment>) =>
              props.onCalendarChange && props.onCalendarChange(val)
            }
            ranges={{
              Today: [moment(), moment()],
              'This Month': [moment().startOf('month'), moment().endOf('month')],
            }}
          />
        </Form.Item>
      );
    case TypeGenInput.amount:
      return (
        <Form.Item
          {...layoutFormDefault}
          {...props.layoutForm}
          key={uuid.v4()}
          label={intl.formatMessage({
            id: `pages.${(props.page && `${props.page}.`) || ''}${props.name}`,
          })}
          name={props.name}
          hidden={props.type === 'empty'}
          rules={props.rules}
          initialValue={!Array.isArray(props.data) ? String(props.data) : null}
          extra={HandleValueCurrentInExtra(props.currentData, props.currentDataType)}
        >
          <InputNumber
            style={{ width: '100%' }}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => (value && value.replace(/\$\s?|(,*)/g, '')) || (0 as any)}
          />
        </Form.Item>
      );
    case TypeGenInput.percent:
      return (
        <Form.Item
          {...layoutFormDefault}
          {...props.layoutForm}
          key={uuid.v4()}
          label={intl.formatMessage({
            id: `pages.${(props.page && `${props.page}.`) || ''}${props.name}`,
          })}
          name={props.name}
          hidden={props.type === 'empty'}
          rules={props.rules}
          initialValue={!Array.isArray(props.data) ? String(props.data) : null}
          extra={HandleValueCurrentInExtra(props.currentData, props.currentDataType)}
        >
          <InputNumber
            style={{ width: '100%' }}
            min={0}
            max={100}
            formatter={(value) => `${value}`}
            parser={(value) => (value && value.replace('%', '')) || (0 as any)}
          />
        </Form.Item>
      );

    case TypeGenInput.datetime:
      return (
        <Form.Item
          {...layoutFormDefault}
          {...props.layoutForm}
          key={uuid.v4()}
          label={intl.formatMessage({
            id: `pages.${(props.page && `${props.page}.`) || ''}${props.name}`,
          })}
          name={props.name}
          rules={props.rules}
          hidden={props.type === 'empty'}
        >
          <DatePicker showTime allowClear style={{ width: '100%' }} format={TimeFormat.YYYYMMDD} />
        </Form.Item>
      );
    case TypeGenInput.switch:
      return (
        <Form.Item
          {...layoutFormDefault}
          {...props.layoutForm}
          key={uuid.v4()}
          label={intl.formatMessage({
            id: `pages.${(props.page && `${props.page}.`) || ''}${props.name}`,
          })}
          name={props.name}
          rules={props.rules}
          hidden={props.type === 'empty'}
          valuePropName="checked"
        >
          <Switch
            defaultChecked={
              !Array.isArray(props.data) ? ConvertStringToBool(String(props.data)) : false
            }
          />
        </Form.Item>
      );
    case TypeGenInput.password:
      return (
        <Form.Item
          {...layoutFormDefault}
          {...props.layoutForm}
          key={uuid.v4()}
          label={intl.formatMessage({
            id: `pages.${(props.page && `${props.page}.`) || ''}${props.name}`,
          })}
          name={props.name}
          rules={[
            ...(props.rules || [{}]),
            {
              pattern: new RegExp(NotAccentVietnamese),
              message: 'Format is wrong',
            },
          ]}
          hidden={props.hiddenType === 'empty'}
          initialValue={!Array.isArray(props.data) ? String(props.data) : null}
          extra={HandleValueCurrentInExtra(props.currentData, props.currentDataType)}
        >
          <Input.Password
            disabled={props.disabled}
            allowClear
            onChange={props.onChangeValueInput}
            placeholder={intl.formatMessage({
              id: `pages.${(props.page && `${props.page}.`) || ''}${props.name}`,
            })}
          />
        </Form.Item>
      );
    default:
      return <></>;
  }
};

interface IRenderColLabelInputByType {
  data?: ISelectData[] | string;
  type: string;
  name: string | [string, string];
  page?: string;
  span?: number;
  layoutForm?: FormItemLabelProps;
  rules?: Rule[];
  group?: [];
  placeholder?: string;
  initValue?: string;
  [additionalData: string]: any;
  actionChangeValue?: ActionTypesFn<any, void>;
  defaultValue?: string;
  disabledDate?: ActionTypesFn<Moment, boolean>;
  onCalendarChange?: ActionTypesFn<RangeValue<moment.Moment>, void>;
}

const RenderColLabelInputByType = (props: IRenderColLabelInputByType) => {
  return (
    <Col
      className="gutter-row"
      key={`${props.name}`}
      span={props.span || 12}
      hidden={props.hiddenType === 'empty'}
    >
      {GenElementInputByType(props)}
    </Col>
  );
};

export {
  RenderColLabelInputByType,
  IRenderColLabelInputByType,
  GenElementInputByType,
  TypeGenInput,
};
