import { LoadingOutlined } from '@ant-design/icons';
import { Col, Modal, Progress, Row, Tooltip } from 'antd';
import React from 'react';
import { useIntl } from 'umi';
import type { ActionTypesFn } from '../Constants/constants';

interface IProgressDetail {
  TotalProcessingBatch?: number;
  TotalBatchData?: number;
  CurrentProcessingBatch?: number;
  RemainingBatch?: number;
  CurrentPercent: number;
}
export interface LoadingOverlayProp {
  showing?: boolean;
  show: ActionTypesFn<any, any>;
  id?: number;
  progressDetail?: IProgressDetail;
}

const LoadingOverlay: React.FC<LoadingOverlayProp> = (props: LoadingOverlayProp) => {
  const onCancel = () => {
    props.show(false);
  };

  return (
    <Modal
      footer={null}
      closable={false}
      centered
      visible={props.showing}
      onCancel={onCancel}
      maskClosable={false}
      keyboard={false}
      width={300}
    >
      <h4> Please Wait.. </h4>
      <Row>
        <Col sm={4}>
          <LoadingOutlined />
        </Col>
        <Col sm={16}>
          <p>Data is transfering to server</p>
        </Col>
      </Row>
    </Modal>
  );
};

const SmallLoadingOverlay: React.FC<LoadingOverlayProp> = (props: LoadingOverlayProp) => {
  const onCancel = () => {
    props.show(false);
  };

  const scoreRefresh = props.id || '0';
  return (
    <Modal
      footer={null}
      closable={false}
      centered
      visible={props.showing}
      onCancel={onCancel}
      maskClosable={false}
      keyboard={false}
      getContainer={`#chart-detail-${scoreRefresh}`}
      width={65}
    >
      <LoadingOutlined />
    </Modal>
  );
};

const LoadingOverLayWithProgress: React.FC<LoadingOverlayProp> = (props: LoadingOverlayProp) => {
  const intl = useIntl();
  const onCancel = () => {
    props.show(false);
  };

  return (
    <Modal
      footer={null}
      closable={false}
      centered
      visible={props.showing}
      onCancel={onCancel}
      maskClosable={false}
      keyboard={false}
      width={350}
    >
      <h4> Please Wait.. </h4>
      <Row>
        <Col sm={4}>
          <LoadingOutlined />
        </Col>
        <Col sm={16}>
          <p>Data is transfering and processing in server</p>
        </Col>
      </Row>
      {Object.keys(props.progressDetail || {}).length > 0 && (
        <div>
          <Tooltip
            title={`${intl.formatMessage({
              id: 'pages.progress.total_line',
            })}: ${Math.round((props.progressDetail && props.progressDetail.TotalBatchData) || 0)} 
            / ${intl.formatMessage({ id: 'pages.progress.total_batch' })}: ${Math.round(
              (props.progressDetail && props.progressDetail.TotalProcessingBatch) || 0,
            )}  
            / ${intl.formatMessage({
              id: 'pages.progress.processed',
            })}: ${Math.round(
              (props.progressDetail && props.progressDetail.CurrentProcessingBatch) || 0,
            )}`}
            overlayInnerStyle={{ minWidth: '380px' }}
          >
            <Progress
              type="line"
              // strokeColor="#ff4d4f"
              percent={Math.round(
                (props.progressDetail && props.progressDetail.CurrentPercent) || 0,
              )}
              showInfo
              status="active"
            />
          </Tooltip>
        </div>
      )}
    </Modal>
  );
};

export { SmallLoadingOverlay, IProgressDetail, LoadingOverLayWithProgress };
export default LoadingOverlay;
