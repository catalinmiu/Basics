INSERT INTO ROLES(id, title) VALUES (1, 'ADMIN');
INSERT INTO ROLES(id, title) VALUES (2, 'USER');
INSERT INTO USERS(first_name, last_name, email, id, password) VALUES ('Gabriel', 'Cotici', 'coticigaby@yahoo.com', 10, '$2a$10$fyTm5OlalzXyaeZ3urrU3uVhImibbBJa59HoC3F4kz.VOhT9LGTvO');
INSERT INTO USERS(first_name, last_name, email, id, password) VALUES ('Gabriel1', 'Cotici1', 'coticigaby1@yahoo.com', 20, '$2a$10$fyTm5OlalzXyaeZ3urrU3uVhImibbBJa59HoC3F4kz.VOhT9LGTvO');
INSERT INTO CATEGORIES (title, id) VALUES('T-shirts', 1);
INSERT INTO CATEGORIES (title, id) VALUES('Bluze', 2);
INSERT INTO PRODUCTS (id, title, description, price, stock, category_id) VALUES (1, 'Black T-shirt', 'Black T-shirt S', 20, 15, 1);
INSERT INTO PRODUCTS (id, title, description, price, stock, category_id) VALUES (2, 'Red T-shirt', 'Black T-shirt S', 20, 15, 1);
INSERT INTO PRODUCTS (id, title, description, price, stock, category_id) VALUES (3, 'Grenn Pants', 'Black T-shirt S', 20, 15, 1);
INSERT INTO PRODUCTS (id, title, description, price, stock, category_id) VALUES (4, 'Bluza sport cu detaliu din strasuri', 'Black T-shirt S', 20, 15, 2);
INSERT INTO PRODUCTS (id, title, description, price, stock, category_id) VALUES (5, 'Bluza sport cu imprimeu grafic', 'Black T-shirt S', 20, 15, 2);
INSERT INTO PRODUCTS (id, title, description, price, stock, category_id) VALUES (6, 'Bluza sport cu aplicatie logo din strasuri', 'Black T-shirt S', 20, 15, 2);
INSERT INTO PRODUCTS (id, title, description, price, stock, category_id) VALUES (7, 'Caciula elastica cu dungi', 'Black T-shirt S', 20, 15, 2);
INSERT INTO PRODUCTS (id, title, description, price, stock, category_id) VALUES (8, 'Bluza din bumbac', 'Black T-shirt S', 20, 15, 2);
INSERT INTO PRODUCTS (id, title, description, price, stock, category_id) VALUES (9, 'Bluza fara maneci, cu aspect striat', 'Caracteristici Culoare: alb Model: uni Stil: casual Croiala: regular fit Exterior: 95% viscoza, 5%', 20, 15, 2);
INSERT INTO USER_ROLE (user_id, role_id) VALUES (10, 1);
INSERT INTO USER_ROLE (user_id, role_id) VALUES (20, 2);