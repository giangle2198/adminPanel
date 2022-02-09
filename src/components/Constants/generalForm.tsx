import { LinkOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, Tag } from 'antd';
import type { FormItemLabelProps } from 'antd/lib/form/FormItemLabel';
import moment from 'moment';
import { useIntl } from 'umi';
import * as uuid from 'uuid';
import { TimeFormat } from './constants';

interface IRenderColLabel {
  name: string;
  page?: string;
  value: string | number | boolean | JSX.Element | any[];
  span?: number;
  type?: string;
  layoutForm?: FormItemLabelProps;
  children?: React.ReactNode;
}

interface IGenElementByType {
  type: string;
  data: string | number | any[] | any;
  customTime?: string;
  customTimestamp?: string;
  [additionalData: string]: any;
}

const Type = {
  currency: 'currency',
  date: 'date',
  timestamp: 'timestamp',
  amount: 'amount',
  info: 'info',
  percent: 'percent',
  input: 'input',
  customTime: 'custom_time',
  customTimestamp: 'custom_timestamp',
  checkbox: 'checkbox',
  time: 'time',
  ind: 'ind',
  link: 'link',
  status_code: 'status_code',
  img: 'img',
  area: 'area',
  tag: 'tag',
};

const FormatNumberToAmount = (value: number) => {
  const numberString = String(value);
  const list = numberString.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  const result1 = `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
  return result1;
};

const GenElementByType = (props: IGenElementByType) => {
  const { type, data } = props;
  switch (type) {
    case Type.timestamp:
      return (
        <>
          {moment(Number(data) * 1000)
            .format(TimeFormat.PrettyDDMMYYYYHHmmss)
            .toString()}
        </>
      );
    case Type.customTimestamp:
      return (
        <>
          {moment(Number(data) * 1000)
            .format(props.customTimestamp || TimeFormat.PrettyDDMMYYYYHHmmss)
            .toString()}
        </>
      );
    case Type.date:
      return (
        <>{data && data.trim() && moment(String(data)).format(TimeFormat.YYYYMMDD).toString()}</>
      );
    case Type.amount:
      return <>{FormatNumberToAmount(Number(data || 0))}</>;
    case Type.percent:
      return <>{`${data}%`}</>;

    case Type.input:
      return (
        <>
          <Input />
        </>
      );
    case Type.customTime:
      return (
        <>
          {data !== ' ' &&
            moment(String(data), props.customTime)
              .format(TimeFormat.PrettyDDMMYYYYHHmmss)
              .toString()}
        </>
      );
    case Type.checkbox:
      return (
        <>
          <Checkbox
            checked={
              (data &&
                (typeof data === typeof ''
                  ? data === 'Y' || data === '1' || data === 'true'
                  : true)) ||
              false
            }
          />
        </>
      );
    case Type.ind:
      return (
        <>
          <Checkbox checked={(data && data === 'Y') || false} />
        </>
      );
    case Type.time:
      return (
        <>
          {props &&
            props.data &&
            `${moment(props.data[0], TimeFormat.HHMM).format(TimeFormat.PrettyHHMM)} - ${moment(
              props.data[1],
              TimeFormat.HHMM,
            ).format(TimeFormat.PrettyHHMM)}`}
        </>
      );
    case Type.link:
      return (
        <>
          {props.data && (
            <Button
              type="dashed"
              icon={<LinkOutlined />}
              onClick={() => {
                window.open(props.data, '_blank');
              }}
            />
          )}
        </>
      );
    case Type.img:
      return (
        <div>
          <img style={{ width: '60px', height: '60px' }} src={props.data} alt={uuid.v4()} />
        </div>
      );
    case Type.tag:
      return (
        <>
          {props.data &&
            props.data.map((tag: string) => (
              <Tag color="blue" key={tag}>
                {tag}
              </Tag>
            ))}
        </>
      );
    case Type.area:
      return (
        <div
          style={{
            width: '100px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {props.data}
        </div>
      );
    default:
      return <>{data}</>;
  }
};

const RenderColLabelByType = (props: IRenderColLabel) => {
  const intl = useIntl();
  return (
    <Col className="gutter-row" key={`${props.name}`} span={props.span || 12}>
      <Form.Item
        labelCol={{ span: 12, xs: 12, sm: 16, md: 10, lg: 11 }}
        key={uuid.v4()}
        labelAlign="left"
        colon={false}
        label={intl.formatMessage({
          id: `pages.${(props.page && `${props.page}.`) || ''}${props.name}`,
        })}
        {...props.layoutForm}
      >
        <label key={uuid.v4()} className="" htmlFor={`${props.name}`}>
          <b>{GenElementByType({ type: props.type || '', data: props.value as any })}</b>
        </label>
      </Form.Item>
    </Col>
  );
};

export { RenderColLabelByType, GenElementByType, Type, IGenElementByType, IRenderColLabel };
