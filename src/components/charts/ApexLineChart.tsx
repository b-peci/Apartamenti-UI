// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import userPostsNo from 'src/models/userPostsNo'

interface iApexLineChartProps {
  title: string
  data: userPostsNo[]
}

const ApexLineChart = (props: iApexLineChartProps) => {
  // ** Hook
  const theme = useTheme()
  const { data, title } = props

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      zoom: { enabled: false },
      toolbar: { show: false }
    },
    colors: ['#ff9f43'],
    stroke: { curve: 'straight' },
    dataLabels: { enabled: false },
    markers: {
      strokeWidth: 7,
      strokeOpacity: 1,
      colors: ['#ff9f43'],
      strokeColors: ['#fff']
    },
    grid: {
      padding: { top: -10 },
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
      }
    },
    tooltip: {
      custom(data: any) {
        return `<div class='bar-chart'>
          <span>${data.series[data.seriesIndex][data.dataPointIndex]}%</span>
        </div>`
      }
    },
    yaxis: {
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      crosshairs: {
        stroke: { color: theme.palette.divider }
      },
      labels: {
        style: { colors: theme.palette.text.disabled }
      },
      categories: data.map((x: userPostsNo) => {
        if (x.postDate) {
          return `${new Date(x.postDate).getFullYear()}/${new Date(x.postDate).getMonth() + 1}`
        }
      })
    }
  }
  return (
    <Card>
      <CardHeader
        title={title}
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] },
          textAlign: 'center'
        }}
      />
      <CardContent>
        <ReactApexcharts
          type='line'
          height={400}
          options={options}
          series={[
            {
              data: data.map((x: userPostsNo) => x.imageCountForMonth)
            }
          ]}
        />
      </CardContent>
    </Card>
  )
}

export default ApexLineChart
