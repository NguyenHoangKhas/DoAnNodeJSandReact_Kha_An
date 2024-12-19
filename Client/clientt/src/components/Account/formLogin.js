import React from "react";

const FormLogin = ({ handleSubmit, handleChange, loading }) => {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow" style={{ width: "25rem" }}>
                <h5 className="text-center mb-3">Đăng nhập với</h5>
                <div className="d-flex justify-content-center mb-3">
                    <button className="btn btn-outline-dark mx-2">
                        <i className="bi bi-github"></i> GitHub
                    </button>
                    <button className="btn btn-outline-danger mx-2">
                        <i className="bi bi-google"></i> Google
                    </button>
                    <button className="btn btn-outline-primary mx-2">
                        <i className="bi bi-facebook"></i> Facebook
                    </button>
                </div>
                <div className="text-center mb-2">Hoặc</div>
                <form onSubmit={handleSubmit} method="POST">
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            name="usernameOrEmail"
                            placeholder="Tài khoản"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Mật khẩu"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-dark w-100" disabled={loading}>
                        {loading ? "Đang xử lý..." : "Đăng nhập"}
                    </button>
                </form>
                <div className="text-center mt-3">
                    <small>
                        Bạn chưa có tài khoản? <a href="/register">Đăng ký</a>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default FormLogin;
