import React, { useEffect, useState } from 'react';
import apiGetTokenClient from '../../middleWare/getTokenClient';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../../css/RevenueChart.css';
import BackButton from '../../components/backButton';

const RevenueChart = () => {
    const [data, setData] = useState([]);

    // Hàm gọi API để lấy doanh thu theo năm
    const fetchRevenueData = async () => {
        const years = [2025]; // Các năm bạn muốn lấy dữ liệu
        const revenueData = [];

        for (const year of years) {
            try {
                const response = await apiGetTokenClient.get(`http://localhost:3000/hoadon/total/year/${year}`);
                console.log("Doanh thu: ", response.data.result);
                revenueData.push({ name: year, revenue: response.data.result });
            } catch (error) {
                console.error(`Error fetching data for year ${year}:`, error);
            }
        }

        setData(revenueData);
    };

    useEffect(() => {
        fetchRevenueData();
    }, []);

    // Hàm định dạng giá trị doanh thu
    const formatRevenue = (value) => {
        return `${value.toLocaleString()} VNĐ`; // Định dạng với dấu phẩy và thêm VNĐ
    };

    return (
        <div className='revenue-chart-container'>
            <BackButton />
            <h2 className='chart-title'>Biểu Đồ Doanh Thu Theo Năm</h2>
            <BarChart width={600} height={400} data={data} className='bar-chart'>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis padding={{ top: 10, bottom: 10, left: 50, right: 20 }} /> {/* Thêm padding cho YAxis */}
                <Tooltip formatter={formatRevenue} /> {/* Sử dụng hàm định dạng */}
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default RevenueChart;