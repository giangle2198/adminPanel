import { Button, Tooltip } from 'antd';
import { useIntl } from 'umi';
import { EditOutlined } from '@ant-design/icons';
import { SortView } from '@/components/Constants/util';
import { ActionTypesFn, TypeHandling } from '@/components/Constants/constants';
import type { IGenColumnTable } from '@/components/Constants/generalTable';
import { GenTableColumn } from '@/components/Constants/generalTable';
import type { ColumnsType } from 'antd/lib/table';
import { Type } from '@/components/Constants/generalForm';

interface TableListProductProps {
  data: any;
  action: ActionTypesFn<any, any>;
}

const IncludedListProduct = {
  img: Type.img,
  categories: Type.tag,
  sizes: Type.tag,
  price: Type.amount,
  description: Type.area,
};

const ExcludedListProductColumnsTable = ['id'];

const IncludedListProductSort = {
  img: 0,
  title: 1,
  description: 2,
  categories: 3,
  sizes: 4,
  color: 5,
  price: 6,
};

const TableListProduct = (props: TableListProductProps) => {
  const intl = useIntl();
  const columns: ColumnsType<any> = [];
  const currentData = (props.data && props.data[0]) || [];

  SortView(
    Object.keys(currentData || {}).filter(
      (value) => !ExcludedListProductColumnsTable.includes(value),
    ),
    IncludedListProductSort,
  ).forEach((key: string) => {
    columns.push(
      GenTableColumn({
        data: currentData[key],
        name: key,
        intl,
        page: 'product',
        type: IncludedListProduct[key],
      } as IGenColumnTable),
    );
  });
  columns.push({
    title: intl.formatMessage({ id: 'button.actions' }),
    width: 120,
    fixed: 'right',
    render: (values: any) => (
      <div>
        <Tooltip placement="topLeft" title={intl.formatMessage({ id: 'pages.edit' })}>
          <Button
            type="primary"
            shape="circle"
            onClick={() => {
              props.action(true, TypeHandling.UPDATE, values);
            }}
            icon={<EditOutlined />}
          />
        </Tooltip>
      </div>
    ),
  });
  return columns;
};

export { TableListProduct, TableListProductProps, IncludedListProductSort };
