import { Button, Form } from 'antd';
import type { MutableRefObject, ReactNode } from 'react';
import React from 'react';
import { useIntl } from 'umi';
import type { ActionTypesFn } from './constants';

interface ICommonActionButtons {
  childrenLeft?: ReactNode;
  actionClear: ActionTypesFn<null, void>;
  buttonRef: MutableRefObject<any>;
  handleButton?: boolean;
  childrenRight?: ReactNode;
  childrenMiddle?: ReactNode;
  dislayButton?: string;
}
const CommonCustomButtons: React.FC<ICommonActionButtons> = (props: ICommonActionButtons) => {
  const intl = useIntl();

  return (
    <Form.Item style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
      {props.childrenLeft}
      <Button
        style={{ marginRight: '5px' }}
        type="primary"
        ref={props.buttonRef}
        disabled={props.buttonRef && props.buttonRef.current && props.buttonRef.current.disabled}
        htmlType="submit"
      >
        {intl.formatMessage({ id: `pages.${props.dislayButton || 'submit'}` })}
      </Button>
      {props.childrenMiddle}
      <Button
        type="default"
        onClick={() => {
          props.actionClear(null);
        }}
      >
        {intl.formatMessage({ id: 'pages.clear' })}
      </Button>
      {props.childrenRight}
    </Form.Item>
  );
};

export { CommonCustomButtons };
