import { Button, Input, Space } from 'antd';
import { Link, useIntl } from 'umi';
import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import { SortView } from '@/components/Constants/util';
import type { ActionTypesFn } from '@/components/Constants/constants';
import type { IGenColumnTable } from '@/components/Constants/generalTable';
import { GenTableColumn } from '@/components/Constants/generalTable';
import type { ColumnsType } from 'antd/lib/table';
import { Type } from '@/components/Constants/generalForm';

interface TableListRoleProps {
  data: any;
  action: ActionTypesFn<any, any>;
}

const IncludedListUser = {
  is_active: Type.checkbox,
};

const ExcludedListRoleColumnsTable = [''];

const IncludedListRoleSort = {
  role_id: 0,
  role_name: 1,
  role_description: 2,
  role_manager_domain: 3,
  role_alias: 4,
  is_active: 5,
};

const TableListRole = (props: TableListRoleProps) => {
  const intl = useIntl();
  const columns: ColumnsType<any> = [];
  const currentData = (props.data && props.data[0]) || [];

  const handleSearch = (setSelectedKeys: any, confirm: any) => {
    confirm();
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
  };

  const path = 'role_name';

  SortView(
    Object.keys(currentData || {}).filter((value) => !ExcludedListRoleColumnsTable.includes(value)),
    IncludedListRoleSort,
  ).forEach((key: string) => {
    if (key === 'role_name') {
      columns.push({
        title: intl.formatMessage({ id: 'pages.role.role_name' }),
        dataIndex: 'role_name',
        key: 'role_name',
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
          <div style={{ padding: 8 }}>
            <Input
              // ref={node => {
              //   this.searchInput = node;
              // }}
              placeholder={intl.formatMessage({ id: 'pages.role_name' })}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                {intl.formatMessage({ id: 'button.search' })}
              </Button>
              <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                {intl.formatMessage({ id: 'pages.reset' })}
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered: any) => (
          <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (values: any, record: any) =>
          record[path] ? record[path].toString().toLowerCase().includes(values.toLowerCase()) : '',
        onFilterDropdownVisibleChange: () => {},
        sorter: (a, b) => a.role_id - b.role_id,
      });
    }
    columns.push(
      GenTableColumn({
        data: String(currentData[key]),
        name: key,
        intl,
        type: IncludedListUser[key],
        page: 'role',
      } as IGenColumnTable),
    );
  });
  columns.push({
    title: intl.formatMessage({ id: 'button.actions' }),
    width: 120,
    fixed: 'right',
    render: (values: any) => (
      <div>
        <Link
          to={{
            pathname: `/admin/roles/edit`,
            search: `?role_id=${values.role_id}`,
          }}
        >
          <Button type="primary" shape="circle" icon={<EditOutlined />} />
        </Link>
      </div>
    ),
  });
  return columns;
};

export { TableListRole, TableListRoleProps };
