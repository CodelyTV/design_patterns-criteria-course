/* -------------------------
        SHOP CONTEXT
---------------------------- */

CREATE TABLE shop__users (
	id UUID PRIMARY KEY,
	name VARCHAR(255),
	email VARCHAR(255),
	profile_picture VARCHAR(255)
);

INSERT INTO shop__users (id, name, email, profile_picture)
VALUES (UUID(), 'John Doe', 'johndoe@example.com', 'https://example.com/profiles/john_doe.jpg'),
	   (UUID(), 'Jane Smith', 'janesmith@example.com', 'https://example.com/profiles/jane_smith.jpg'),
	   (UUID(), 'Alice Johnson', 'alicejohnson@example.com', 'https://example.com/profiles/alice_johnson.jpg'),
	   (UUID(), 'Bob Brown', 'bobbrown@example.com', 'https://example.com/profiles/bob_brown.jpg'),
	   (UUID(), 'Charlie Davis', 'charliedavis@example.com', 'https://example.com/profiles/charlie_davis.jpg'),
	   (UUID(), 'Daisy Miller', 'daisymiller@example.com', 'https://example.com/profiles/daisy_miller.jpg'),
	   (UUID(), 'Ethan Wilson', 'ethanwilson@example.com', 'https://example.com/profiles/ethan_wilson.jpg'),
	   (UUID(), 'Fiona Clark', 'fionaclark@example.com', 'https://example.com/profiles/fiona_clark.jpg'),
	   (UUID(), 'George Lewis', 'georgelewis@example.com', 'https://example.com/profiles/george_lewis.jpg'),
	   (UUID(), 'Hannah Walker', 'hannahwalker@example.com', 'https://example.com/profiles/hannah_walker.jpg');
