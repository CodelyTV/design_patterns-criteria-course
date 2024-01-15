/* -------------------------
        SHOP CONTEXT
---------------------------- */

CREATE TABLE shop__users (
	id UUID PRIMARY KEY,
	name VARCHAR(255),
	email VARCHAR(255),
	profile_picture VARCHAR(255)
);
