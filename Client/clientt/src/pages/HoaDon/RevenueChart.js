import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import apiGetTokenClient from '../../middleWare/getTokenClient'; // Hàm để lấy token

const RevenueChart = () => {
    const [chartData, setChartData] = useState({});
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await apiGetTokenClient();
                const response = await axios.get(
                    `http://localhost:3000/hoadon/total/year/${year}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // Kiểm tra dữ liệu trả về từ API
                const revenue = response?.data?.result || 0;

                // Nếu không phải mảng, tạo dữ liệu mẫu
                const monthlyData = Array.isArray(revenue)
                    ? revenue
                    : Array(12).fill(revenue / 12);

                setChartData({
                    labels: [
                        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
                    ],
                    datasets: [
                        {
                            label: `Doanh thu (${year})`,
                            data: monthlyData,
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching revenue data:', error);
            }
        };

        fetchData();
    }, [year]);


    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h2>Báo cáo thống kê doanh thu</h2>
                    <div className="form-group mt-3">
                        <label htmlFor="yearSelect">Chọn năm:</label>
                        <select
                            id="yearSelect"
                            className="form-control w-auto d-inline-block mx-2"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        >
                            {[2021, 2022, 2023, 2024].map((y) => (
                                <option key={y} value={y}>
                                    {y}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-12">
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'top',
                                },
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    title: {
                                        display: true,
                                        text: 'Doanh thu (VND)',
                                    },
                                },
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Tháng',
                                    },
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default RevenueChart;