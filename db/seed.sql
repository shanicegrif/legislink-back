\c legislink_db_dev;

--id 1's unhashed pw is test
INSERT INTO users (user_email, user_password, user_zipcode)
VALUES
('test@test.com', '$2a$10$uFN41Qh8KbwFS85xaxehXe3Tr1eYJV1hPF3MqHXxEZpLGRWrvZ8rK', 0);