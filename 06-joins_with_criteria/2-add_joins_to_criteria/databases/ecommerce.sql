/* -------------------------
        SHOP CONTEXT
---------------------------- */

CREATE TABLE shop__users (
	id UUID PRIMARY KEY,
	name VARCHAR(255)
);

CREATE TABLE shop__users_data (
	id UUID PRIMARY KEY,
	email VARCHAR(255),
	profile_picture VARCHAR(255),
	CONSTRAINT fk_shop_users FOREIGN KEY (id) REFERENCES shop__users(id)
);
