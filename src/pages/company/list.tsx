import CustomAvatar from '@/components/custom-avatar';
import { Text } from '@/components/text';
import { COMPANIES_LIST_QUERY } from '@/graphql/queries';
import { Company } from '@/graphql/schema.types';
import { currencyNumber } from '@/utilities';
import { SearchOutlined } from '@ant-design/icons';
import { CreateButton, DeleteButton, EditButton, FilterDropdown, List } from '@refinedev/antd';
import { getDefaultFilter, useGo, useTable } from '@refinedev/core';
import { Input, Space, Table } from 'antd';

export const CompanyList = () => {
  const go = useGo();
  const { tableQuery, setFilters, filters } = useTable({
    resource: 'companies',
    filters: {
      permanent: [],
      initial: [
        {
          field: 'name',
          operator: 'contains',
          value: "",
        },
      ],
    },
    pagination: {
      pageSize: 12,
    },
    sorters: {
      initial: [
        {
          field: 'createdAt',
          order: 'desc',
        },
      ],
    },
    meta: {
      gqlQuery: COMPANIES_LIST_QUERY,
    },
  });

  const { data, isLoading } = tableQuery;

  return (
    <List
      breadcrumb={false}
      headerButtons={() => (
        <CreateButton
          onClick={() => {
            go({
              to: {
                resource: 'companies',
                action: 'create',
              },
              options: {
                keepQuery: true,
              },
              type: 'replace',
            });
          }}
        />
      )}
    >
      <Table
        dataSource={data?.data}
        loading={isLoading}
        pagination={{ pageSize: 12 }}
        rowKey="id"
      >
        <Table.Column<Company>
          dataIndex="name"
          title="Company Title"
          defaultFilteredValue={getDefaultFilter('name', filters)}
          filterIcon={<SearchOutlined />}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input
                placeholder="Search Company"
                onChange={(e) => {
                  setFilters(
                    [
                      {
                        field: 'name',
                        operator: 'contains',
                        value: e.target.value || undefined,
                      },
                    ],
                    'replace'
                  );
                }}
              />
            </FilterDropdown>
          )}
          render={(value, record) => (
            <Space>
              <CustomAvatar shape="square" name={record.name} src={record.avatarUrl} />
              <Text style={{ whiteSpace: 'nowrap' }}>{record.name}</Text>
            </Space>
          )}
        />
        <Table.Column<Company>
          dataIndex="totalRevenue"
          title="Open deals amount"
          render={(value, company) => (
            <Text>{currencyNumber(company?.dealsAggregate?.[0].sum?.value || 0)}</Text>
          )}
        />
        <Table.Column<Company>
          dataIndex="id"
          title="Actions"
          fixed="right"
          render={(value) => (
            <Space>
              <EditButton hideText size="small" recordItemId={value} />
              <DeleteButton hideText size="small" recordItemId={value} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
