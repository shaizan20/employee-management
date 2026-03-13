-- =============================================
-- Employee Management System - Database Schema
-- =============================================

-- Create the database
CREATE DATABASE IF NOT EXISTS employee_management;
USE employee_management;

-- =============================================
-- Admins Table
-- =============================================
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- Employees Table
-- =============================================
CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- Seed Data - Default Admin
-- Password: admin123 (bcrypt hashed)
-- =============================================
INSERT INTO admins (username, password) VALUES
('admin', '$2a$10$8K1p/a0dL1LXMIgoEDFrwOfMQkf7.mFGBAYaN1GN3lP0VRmOqO1zC');

-- =============================================
-- Sample Employee Data
-- =============================================
INSERT INTO employees (employee_id, name, department, email, phone) VALUES
('EMP001', 'Rahul Sharma', 'Engineering', 'rahul.sharma@company.com', '+91-9876543210'),
('EMP002', 'Priya Patel', 'Human Resources', 'priya.patel@company.com', '+91-9876543211'),
('EMP003', 'Amit Kumar', 'Marketing', 'amit.kumar@company.com', '+91-9876543212'),
('EMP004', 'Sneha Reddy', 'Finance', 'sneha.reddy@company.com', '+91-9876543213'),
('EMP005', 'Vikram Singh', 'Engineering', 'vikram.singh@company.com', '+91-9876543214');
