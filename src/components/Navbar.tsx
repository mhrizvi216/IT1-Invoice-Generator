
import React from 'react';

const Navbar = () => {
    return (
        <header
            style={{
                padding: "2px 24px",
                backgroundColor: "white",
                borderBottom: "1px solid #ddd",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <img
                    src="/it1-logo.png"
                    alt="Company logo"
                    style={{ height: "auto", width: 128 }}
                />
                <div>
                    <h1 style={{ margin: 0, fontSize: 20 }}>Payslip Generator</h1>
                    <p style={{ margin: 0, fontSize: 12, color: "#555" }}>
                        Configure company, employee, and payroll details, preview the payslip, and download a PDF.
                    </p>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
