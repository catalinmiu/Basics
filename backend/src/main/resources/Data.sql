INSERT INTO ROLES(id, title) VALUES (1, 'ADMIN');
INSERT INTO ROLES(id, title) VALUES (2, 'USER');
INSERT INTO USERS(first_name, last_name, email, id, password) VALUES ('Gabriel', 'Cotici', 'coticigaby@yahoo.com', 10, '$2y$12$9AH3SZE6YRLhtsVyA2AnZ.LS/VYGh2yGhvBMXUNPTFInpOfUgU8mO');
INSERT INTO USERS(first_name, last_name, email, id, password) VALUES ('Gabriel1', 'Cotici1', 'coticigaby1@yahoo.com', 20, '$2y$12$9AH3SZE6YRLhtsVyA2AnZ.LS/VYGh2yGhvBMXUNPTFInpOfUgU8mO');
INSERT INTO USER_ROLE (user_id, role_id) VALUES (10, 1);
INSERT INTO USER_ROLE (user_id, role_id) VALUES (20, 2);