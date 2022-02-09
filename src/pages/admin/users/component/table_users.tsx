import { Button } from 'antd';
import { Link, useIntl } from 'umi';
import { EditOutlined } from '@ant-design/icons';
import { SortView } from '@/components/Constants/util';
import type { ActionTypesFn } from '@/components/Constants/constants';
import type { IGenColumnTable } from '@/components/Constants/generalTable';
import { GenTableColumn } from '@/components/Constants/generalTable';
import type { ColumnsType } from 'antd/lib/table';

interface TableListUserProps {
  data: any;
  action: ActionTypesFn<any, any>;
}

const IncludedListUser = {};

const ExcludedListUserColumnsTable = [''];

const IncludedListUserSort = {};

const TableListUser = (props: TableListUserProps) => {
  const intl = useIntl();
  const columns: ColumnsType<any> = [];
  const currentData = (props.data && props.data[0]) || [];

  // const onClickConfirm = (values: any) => props.action(values.domain);
  // const domain = getParamsQuery().domain as string;

  SortView(
    Object.keys(currentData || {}).filter((value) => !ExcludedListUserColumnsTable.includes(value)),
    IncludedListUserSort,
  ).forEach((key: string) => {
    columns.push(
      GenTableColumn({
        data: currentData[key],
        name: key,
        intl,
        page: 'user',
        type: IncludedListUser[key],
      } as IGenColumnTable),
    );
  });
  columns.push({
    title: intl.formatMessage({ id: 'button.actions' }),
    width: 120,
    fixed: 'right',
    render: (values: any) => (
      // <div>
      //   {domain === values.domain ? (
      //     <></>
      //   ) : (
      //     <Tooltip placement="topLeft" title={intl.formatMessage({ id: 'pages.edit' })}>
      //       <Button
      //         type="primary"
      //         shape="circle"
      //         onClick={async () => {
      //           onClickConfirm(values);
      //         }}
      //         icon={<EditOutlined />}
      //       />
      //     </Tooltip>
      //   )}
      // </div>
      <div>
        <Link
          to={{
            pathname: `/admin/users/edit`,
            search: `?domain=${values.domain}`,
          }}
        >
          <Button type="primary" shape="circle" icon={<EditOutlined />} />
        </Link>
      </div>
    ),
  });
  return columns;
};

export { TableListUser, TableListUserProps };
