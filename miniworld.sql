CREATE TABLE Persona (
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    cognome VARCHAR(255) NOT NULL,
    giorno INT NOT NULL,
    mese INT NOT NULL,
    anno INT NOT NULL,
    PRIMARY KEY (email, username)
);

CREATE TABLE Gioco (
    titolo VARCHAR(255) NOT NULL,
    PRIMARY KEY (titolo)
);

CREATE TABLE Statistiche (
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    gioco VARCHAR(255) NOT NULL,
    posizione INT NOT NULL,
    PRIMARY KEY (email, username, gioco),
    FOREIGN KEY (email, username) REFERENCES Persona (email, username),
    FOREIGN KEY (gioco) REFERENCES Gioco (titolo)
);


CREATE OR REPLACE FUNCTION update_func() RETURNS TRIGGER AS
$$
BEGIN 
    IF EXISTS (
        SELECT *
        FROM statistiche
        WHERE gioco = NEW.gioco
        AND posizione = NEW.posizione
        AND email != NEW.email
        AND username != NEW.username
    ) THEN
        UPDATE statistiche
        SET posizione = posizione + 1
        WHERE gioco = NEW.gioco 
        AND posizione >= NEW.posizione 
        AND email != NEW.email
        AND username != NEW.username;
    END IF;
    RETURN NEW;
 END;
$$ language plpgsql;

CREATE OR REPLACE TRIGGER update_trigger
BEFORE INSERT ON statistiche
FOR EACH ROW EXECUTE PROCEDURE update_func();


CREATE OR REPLACE FUNCTION delete_func() RETURNS TRIGGER AS
$$
BEGIN 
    UPDATE statistiche
    SET posizione = posizione - 1
    WHERE gioco = OLD.gioco AND posizione > OLD.posizione;
    RETURN OLD;
END;
$$ language plpgsql;

CREATE OR REPLACE TRIGGER delete_trigger
AFTER DELETE ON statistiche
FOR EACH ROW EXECUTE PROCEDURE delete_func();





--------------------------- INSERT DI TEST ---------------------------

-- Inserimento di 15 persone nella tabella Persona
INSERT INTO Persona (email, username, password, nome, cognome, giorno, mese, anno)
VALUES 
  ('email1@example.com', 'user1', 'password1', 'Mario', 'Rossi', 1, 1, 1980),
  ('email2@example.com', 'user2', 'password2', 'Luigi', 'Bianchi', 2, 2, 1981),
  ('email3@example.com', 'user3', 'password3', 'Paolo', 'Neri', 3, 3, 1982),
  ('email4@example.com', 'user4', 'password4', 'Giovanni', 'Verdi', 4, 4, 1983),
  ('email5@example.com', 'user5', 'password5', 'Andrea', 'Russo', 5, 5, 1984),
  ('email6@example.com', 'user6', 'password6', 'Francesco', 'Ferrari', 6, 6, 1985),
  ('email7@example.com', 'user7', 'password7', 'Sara', 'Bianco', 7, 7, 1986),
  ('email8@example.com', 'user8', 'password8', 'Martina', 'Neri', 8, 8, 1987),
  ('email9@example.com', 'user9', 'password9', 'Simone', 'Verde', 9, 9, 1988),
  ('email10@example.com', 'user10', 'password10', 'Lorenzo', 'Rosa', 10, 10, 1989),
  ('email11@example.com', 'user11', 'password11', 'Gabriele', 'Viola', 11, 11, 1990),
  ('email12@example.com', 'user12', 'password12', 'Valentina', 'Arancione', 12, 12, 1991),
  ('email13@example.com', 'user13', 'password13', 'Alessia', 'Celeste', 13, 1, 1992),
  ('email14@example.com', 'user14', 'password14', 'Davide', 'Giallo', 14, 2, 1993),
  ('email15@example.com', 'user15', 'password15', 'Alessandro', 'Blu', 15, 3, 1994);

-- Inserimento di 10 giochi nella tabella Classifica
INSERT INTO Gioco (titolo)
VALUES 
  ('Gioco 1'),
  ('Gioco 2'),
  ('Gioco 3'),
  ('Gioco 4'),
  ('Gioco 5'),
  ('Gioco 6'),
  ('Gioco 7'),
  ('Gioco 8'),
  ('Gioco 9'),
  ('Gioco 10');


-- Inserimento di alcune relazioni nella tabella Statistiche
INSERT INTO Statistiche (email, username, gioco, posizione)
VALUES 
  ('email1@example.com', 'user1', 'Gioco 1', 1),
  ('email1@example.com', 'user1', 'Gioco 2', 3),
  ('email1@example.com', 'user1', 'Gioco 3', 2),
  ('email2@example.com', 'user2', 'Gioco 1', 2),
  ('email2@example.com', 'user2', 'Gioco 2', 1),
  ('email2@example.com', 'user2', 'Gioco 3', 3),
  ('email3@example.com', 'user3', 'Gioco 1', 3),
  ('email3@example.com', 'user3', 'Gioco 2', 2),
  ('email3@example.com', 'user3', 'Gioco 3', 1),
  ('email4@example.com', 'user4', 'Gioco 1', 1),
  ('email4@example.com', 'user4', 'Gioco 2', 2),
  ('email4@example.com', 'user4', 'Gioco 3', 3),
  ('email5@example.com', 'user5', 'Gioco 1', 2),
  ('email5@example.com', 'user5', 'Gioco 2', 3),
  ('email5@example.com', 'user5', 'Gioco 3', 1);
