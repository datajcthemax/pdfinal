'use client';

import { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);

function StockChart({ data, symbol }) {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (data && data.length > 0 && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // 기존 차트 인스턴스 파괴
      if (chartInstance) {
        chartInstance.destroy();
      }

      const newChartInstance = new Chart(ctx, {
        type: 'line', // 라인 그래프로 변경
        data: {
          labels: data.map(item => item.Date),
          datasets: [
            {
              label: 'Close Price',
              data: data.map(item => item.Close),
              borderColor: '#00b4d8',
              fill: false,
              yAxisID: 'yPrice', // 가격 데이터의 y 축 ID 설정
            },
            {
              label: 'Volume',
              data: data.map(item => item.Volume),
              type: 'bar', // 바 그래프로 변경
              backgroundColor: '#FF5733',
              yAxisID: 'yVolume', // 거래량 데이터의 y 축 ID 설정
            },
          ],
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: symbol,
          },
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
              },
            },
            yPrice: { // 가격 데이터의 y 축
              beginAtZero: true,
              title: {
                display: true,
                text: 'Price',
              }
            },
            yVolume: { // 거래량 바 그래프의 y 축
              beginAtZero: true,
              position: 'right', // y 축 위치 설정
              title: {
                display: true,
                text: 'Volume',
              },
            },
          },
          tooltips: {
            mode: 'index', // 인덱스 모드 설정
            intersect: false,
          },
          hover: {
            mode: 'index', // 인덱스 모드 설정
            intersect: false,
          },
        },
      });

      // 새로운 차트 인스턴스 저장
      setChartInstance(newChartInstance);
    }
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
}

export default StockChart;