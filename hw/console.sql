CREATE TABLE recruit_first_table (
                                     id INT PRIMARY KEY AUTO_INCREMENT,
                                     username VARCHAR(255) NOT NULL,
                                     qq_id VARCHAR(255) NOT NULL,
                                     phone VARCHAR(255) NOT NULL,
                                     bio TEXT,
                                     status TINYINT(1) NOT NULL DEFAULT 0,  -- 0: 没过, 1: 过了
                                     will VARCHAR(255),
                                     school VARCHAR(255),
                                     major VARCHAR(255),
                                     grade VARCHAR(255),
                                     create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                                     update_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);