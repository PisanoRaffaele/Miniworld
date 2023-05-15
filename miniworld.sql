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



-- Insert 15 records into the Persona table with dummy Italian data

INSERT INTO Persona (email, username, password)
VALUES
('marco.rizzo@example.com', 'marcorizzo', 'password1'),
('silvia.rossi@example.com', 'silviarossi', 'password2'),
('mario.bianchi@example.com', 'mariobianchi', 'password3'),
('francesca.verdi@example.com', 'francescaverdi', 'password4'),
('andrea.neri@example.com', 'andreaneri', 'password5'),
('elena.gallo@example.com', 'elenagallo', 'password6'),
('luigi.romano@example.com', 'luigiromano', 'password7'),
('giorgia.moretti@example.com', 'giorgiamoretti', 'password8'),
('daniele.ferrari@example.com', 'danieleferrari', 'password9'),
('alessandra.russo@example.com', 'alessandrarusso', 'password10'),
('matteo.costa@example.com', 'matteocosta', 'password11'),
('simona.giordano@example.com', 'simonagiordano', 'password12'),
('fabio.esposito@example.com', 'fabioesposito', 'password13'),
('valentina.ricci@example.com', 'valentinaricci', 'password14'),
('giovanni.franco@example.com', 'giovannifranco', 'password15');



-- funzione per creare statistiche casuali per ogni utente (da eseguire dopo aver creato gli utenti) 
-- da eseguire con il comando SELECT create_statistics();

CREATE OR REPLACE FUNCTION create_statistics() RETURNS VOID AS $$
DECLARE 
    email_var VARCHAR(255);
    username_var VARCHAR(255);
    i INT DEFAULT 0;
    gioco VARCHAR(255);
    punteggio FLOAT;
    cur CURSOR FOR SELECT email, username FROM Persona;
BEGIN
    OPEN cur;

    LOOP
        FETCH cur INTO email_var, username_var;
        EXIT WHEN email_var IS NULL;

        i := 1;
        WHILE (i <= 4) LOOP
            CASE i 
                WHEN 1 THEN 
					gioco := 'SIMON';
					punteggio := ROUND(RANDOM() * 100);
                WHEN 2 THEN 
					gioco := 'DOT';
					punteggio := ROUND(RANDOM() * 100);
				WHEN 3 THEN 
					gioco := 'MEMORY';
					punteggio := CAST((RANDOM() * 100) AS NUMERIC(5, 2));
                ELSE 
					gioco := 'GTW';
					punteggio := CAST((RANDOM() * 100) AS NUMERIC(5, 2));
            END CASE;

            INSERT INTO Statistiche (email, username, gioco, punteggio)
            VALUES (email_var, username_var, gioco, punteggio);

            i := i + 1;
        END LOOP;
    END LOOP;

    CLOSE cur;
END;
$$ LANGUAGE plpgsql;
