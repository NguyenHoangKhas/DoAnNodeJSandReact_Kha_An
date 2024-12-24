import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateStudent = ({ studentId }) => {
    const [student, setStudent] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: ''
    });

    // Lấy thông tin sinh viên theo studentId khi component được mount
    useEffect(() => {
        axios.get(`/student/${studentId}`)
            .then(response => {
                setStudent(response.data.result);
            })
            .catch(error => {
                console.error("There was an error fetching the student data:", error);
            });
    }, [studentId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Gửi yêu cầu PUT để cập nhật thông tin sinh viên
        axios.put('http://localhost:3000/student', student)
            .then(response => {
                alert("Student information updated successfully!");
            })
            .catch(error => {
                console.error("There was an error updating the student data:", error);
            });
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Update Student</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={student.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter first name"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={student.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter last name"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={student.email}
                        onChange={handleInputChange}
                        placeholder="Enter email"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={student.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={student.address}
                        onChange={handleInputChange}
                        placeholder="Enter address"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
};

export default UpdateStudent;
