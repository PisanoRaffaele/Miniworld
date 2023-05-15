CREATE TABLE Persona (
	email VARCHAR(255) NOT NULL,
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	PRIMARY KEY (email, username),
	UNIQUE (email)
);

CREATE TABLE Statistiche (
	email VARCHAR(255) NOT NULL,
	username VARCHAR(255) NOT NULL,
	gioco VARCHAR(255) NOT NULL,
	punteggio FLOAT NOT NULL,
	PRIMARY KEY (username, gioco),
	FOREIGN KEY (username, email) REFERENCES Persona (username, email)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE OR REPLACE FUNCTION update_func() RETURNS TRIGGER AS
$$
BEGIN
	IF EXISTS (
		SELECT *
		FROM statistiche
		WHERE gioco = NEW.gioco
		AND username = NEW.username
	) THEN
		UPDATE statistiche
		SET punteggio = NEW.punteggio
		WHERE gioco = NEW.gioco
		AND username = NEW.username;
		RETURN NULL;
	END IF;
	RETURN NEW;
 END;
$$ language plpgsql;

CREATE OR REPLACE TRIGGER update_trigger
BEFORE INSERT ON statistiche
FOR EACH ROW EXECUTE PROCEDURE update_func();


-- CREATE OR REPLACE FUNCTION update_func() RETURNS TRIGGER AS
-- $$
-- BEGIN
--     IF EXISTS (
--         SELECT *
--         FROM statistiche
--         WHERE gioco = NEW.gioco
--         AND username = NEW.username
--         AND posizione = NEW.posizione
--         AND email != NEW.email
--         AND username != NEW.username
--     ) THEN
--         UPDATE statistiche
--         SET posizione = posizione + 1
--         WHERE gioco = NEW.gioco
--         AND posizione >= NEW.posizione
--         AND email != NEW.email
--         AND username != NEW.username;
--     END IF;
--     RETURN NEW;
--  END;
-- $$ language plpgsql;

-- CREATE OR REPLACE TRIGGER update_trigger
-- BEFORE INSERT ON statistiche
-- FOR EACH ROW EXECUTE PROCEDURE update_func();


-- CREATE OR REPLACE FUNCTION delete_func() RETURNS TRIGGER AS
-- $$
-- BEGIN
--     UPDATE statistiche
--     SET posizione = posizione - 1
--     WHERE gioco = OLD.gioco AND posizione > OLD.posizione;
--     RETURN OLD;
-- END;
-- $$ language plpgsql;

-- CREATE OR REPLACE TRIGGER delete_trigger
-- AFTER DELETE ON statistiche
-- FOR EACH ROW EXECUTE PROCEDURE delete_func();
