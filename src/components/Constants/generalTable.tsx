import type { ColumnsType } from 'antd/lib/table';
import { getSetting } from '../Setting';
import type { ActionTypesFn } from './constants';
import { GenElementByType } from './generalForm';

interface ICommonTable {
  TypeTableCols: any;
  IncludedTableCols?: string[];
  ExcludedTableCols?: string[];
  intl: any;
  SortViewTable: ActionTypesFn<any, any[]>;
  data: any;
  page: string;
  customTime?: string;
  [additionalData: string]: any;
}

interface IGenColumnTable {
  data?: string | number | any[];
  type: string;
  intl: any;
  name: string;
  page?: string;
  customTime?: string;
  customTimestamp?: string;
  [additionalData: string]: any;
  width?: string;
}

const GenTableColumn = (props: IGenColumnTable) => {
  const { intl, name, type, page, width } = props;
  const column = {
    title: intl.formatMessage({ id: `pages.${(page && `${page}.`) || ''}${name}` }),
    dataIndex: name,
    key: name,
    width,
    render: (value: string | number) =>
      GenElementByType({
        data: value,
        type,
        customTime: props.customTime,
        customTimestamp: props.customTimestamp,
      }),
  };
  return column;
};

const CommonTable = (props: ICommonTable) => {
  const {
    data,
    intl,
    SortViewTable,
    TypeTableCols,
    IncludedTableCols,
    ExcludedTableCols,
    page,
    customTime,
  } = props;
  const columns: ColumnsType<any> = [];
  SortViewTable(
    Object.keys(data).filter(
      (value: string) =>
        (IncludedTableCols && !!IncludedTableCols.includes(value)) ||
        (ExcludedTableCols && !ExcludedTableCols.includes(value)),
    ) || [],
  ).forEach((key: string) => {
    columns.push(
      GenTableColumn({
        intl,
        name: key,
        type: TypeTableCols[key],
        page,
        customTime,
      }),
    );
  });
  return columns;
};

const handleTable = (width: number) => {
  if (getSetting('pagination') && getSetting('pagination') !== '0') {
    return {
      x: width,
      y: getSetting('pagination'),
    };
  }
  return {
    x: width,
  };
};

const getTableSize = (width?: number) => {
  if (width && width != 0) {
    return handleTable(width | 0);
  }

  return handleTable(1500);
};

export { CommonTable, getTableSize, GenTableColumn, IGenColumnTable };
