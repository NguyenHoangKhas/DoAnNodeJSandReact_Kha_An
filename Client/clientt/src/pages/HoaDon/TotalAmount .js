import React, { useState } from 'react';
import apiGetTokenClient from '../../middleWare/getTokenClient';

const TotalAmount = () => {
  const [totalAmount, setTotalAmount] = useState(null);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState('day'); // day, week, month
  const [dateInput, setDateInput] = useState('2014-09-11'); // YYYY-MM-DD
  const [weekInput, setWeekInput] = useState('');
  const [monthInput, setMonthInput] = useState('');
  const [yearInput, setYearInput] = useState('');

  const handleSubmit = async () => {
    setTotalAmount(null);
    setError(null);

    try {
      let response;

      // Tính tổng tiền theo ngày
      if (period === 'day' && dateInput) {
        // Chuyển đổi ngày từ định dạng 'YYYY-MM-DD' sang định dạng 'YYYY-MM-DDT00:00:00.000Z'
        const formattedDate = new Date(dateInput).toISOString(); // chuyển đổi sang ISO string
        response = await apiGetTokenClient.get(`http://localhost:3000/hoadon/total/day/${formattedDate}`);
      }

      // Tính tổng tiền theo tuần
      else if (period === 'week' && weekInput && yearInput) {
        response = await apiGetTokenClient.get(`http://localhost:3000/hoadon/total/week/${weekInput}/${yearInput}`);
      }
      // Tính tổng tiền theo tháng
      else if (period === 'month' && monthInput && yearInput) {
        response = await apiGetTokenClient.get(`http://localhost:3000/hoadon/total/month/${monthInput}/${yearInput}`);
      }

      if (response && response.data.result !== null) {
        setTotalAmount(response.data.result);
      } else {
        setError('Không tìm thấy dữ liệu');
      }
    } catch (err) {
      setError('Lỗi khi tải dữ liệu');
    }
  };

  return (
    <div>
      <h2>Tính Tổng Tiền</h2>
      <div>
        <label>
          Chọn khoảng thời gian:
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="day">Ngày</option>
            <option value="week">Tuần</option>
            <option value="month">Tháng</option>
          </select>
        </label>
      </div>

      {period === 'day' && (
        <div>
          <label>
            Nhập ngày (YYYY-MM-DD):
            <input
              type="date"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
            />
          </label>
        </div>
      )}

      {period === 'week' && (
        <div>
          <label>
            Nhập tuần:
            <input
              type="number"
              value={weekInput}
              onChange={(e) => setWeekInput(e.target.value)}
              min="1"
              max="52"
            />
          </label>
          <label>
            Nhập năm:
            <input
              type="number"
              value={yearInput}
              onChange={(e) => setYearInput(e.target.value)}
            />
          </label>
        </div>
      )}

      {period === 'month' && (
        <div>
          <label>
            Nhập tháng:
            <input
              type="number"
              value={monthInput}
              onChange={(e) => setMonthInput(e.target.value)}
              min="1"
              max="12"
            />
          </label>
          <label>
            Nhập năm:
            <input
              type="number"
              value={yearInput}
              onChange={(e) => setYearInput(e.target.value)}
            />
          </label>
        </div>
      )}

      <button onClick={handleSubmit}>Tính Tổng Tiền</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {totalAmount !== null && (
        <div>
          <h3>Tổng Tiền: {totalAmount} VNĐ</h3>
        </div>
      )}
    </div>
  );
};

export default TotalAmount;
