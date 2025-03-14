import { DollarOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import { Text } from '../text'
import { Area, AreaConfig } from '@ant-design/plots'
import { useList } from '@refinedev/core'
import { DASHBOARD_DEALS_CHART_QUERY } from '@/graphql/queries'
import { mapDealsData } from '@/utilities/helpers'
import React from 'react'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import { DashboardDealsChartQuery } from '@/graphql/types'

const DealsChart = () => {
  const {data} = useList<GetFieldsFromList<DashboardDealsChartQuery>>
  ({
    resource: 'dealStages',
    filters:[
      {
        field: 'title', operator: 'in', value: ['WON', 'LOST']
      }
    ],
    meta: {
      gqlQuery: DASHBOARD_DEALS_CHART_QUERY
    }
  });
  console.log(data);
  const dealData = React.useMemo(() => {
    return mapDealsData(data?.data);
  }, [data?.data]);
  const config: AreaConfig = {
    data: dealData,
    xField: 'timeText',
    yField: 'value',
    isStack: false,
    seriesField: 'state',
    animation: true,
    smooth: true,
    legend: {
      offsetY: -6
    },
    yAxis: {
      tickCount: 4,
      label: {
        formatter: (v: string) => {
          return `$${Number(v) / 1000}k`
        }
      }
    },
    tooltip: {
      formatter: (data) => {
        return {
          name: data.state,
          value: `$${Number(data.value) / 1000}k`
        }
      }
    }

  }
  return (
    <Card
    style={{height: '100%'}}
    title={
      <div>
        <DollarOutlined/>
        <Text
        size='sm' style={{marginLeft: '0.5rem'}}
        >
          Deals
        </Text>
        
      </div>
    }
    >
      <Area {...config} height={325} />
    </Card>
  )
}

export default DealsChart