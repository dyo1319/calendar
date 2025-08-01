CREATE TABLE user_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    uname VARCHAR(100) NOT NULL,
    passwd VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    type_id INT,
    tz VARCHAR(20),
);

CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL
);

CREATE TABLE study_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    study_date DATE,
    course INT,
    start_time TIME,
    end_time TIME,
    is_plan INT,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (course) REFERENCES courses(id)
);

CREATE TABLE students_to_teachers (
    student_id INT,
    teacher_id INT,
    PRIMARY KEY (student_id, teacher_id),
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (teacher_id) REFERENCES users(id)
);


CREATE TABLE crs2user (
    id INT(11) NOT NULL AUTO_INCREMENT,
    crs_id INT(11) NOT NULL,
    user_id INT(11) NOT NULL,
    PRIMARY KEY (id)
);
