CREATE DATABASE C_JUDGING_WEBSITE

CREATE TABLE users (
    user_id INT PRIMARY KEY IDENTITY(1,1),
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE tasks (
    task_id INT PRIMARY KEY IDENTITY(1,1),
    task_name VARCHAR(255) NOT NULL,
    task_description VARBINARY(MAX) NOT NULL,
    time_limit INT NOT NULL,
    memory_limit INT NOT NULL
);

CREATE TABLE test_cases (
    test_case_id INT PRIMARY KEY IDENTITY(1,1),
    task_id INT NOT NULL,

    input_file_name VARCHAR(255) NOT NULL,
    input_file_data VARBINARY(MAX) NOT NULL,

    output_file_name VARCHAR(255) NOT NULL,
    output_file_data VARBINARY(MAX) NOT NULL,

    FOREIGN KEY (task_id) REFERENCES tasks (task_id)
);

CREATE TABLE submissions (
    submission_id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL,
    problem_id INT NOT NULL,
    code TEXT NOT NULL,
    language VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at DATETIME2 DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (problem_id) REFERENCES tasks (task_id)
);



