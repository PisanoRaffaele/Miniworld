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

CREATE TABLE Classifica (
    titolo VARCHAR(255) NOT NULL,
    PRIMARY KEY (titolo)
);

CREATE TABLE Relazione (
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    classifica VARCHAR(255) NOT NULL,
    posizione INT NOT NULL,
    PRIMARY KEY (email, username, classifica, posizione),
    FOREIGN KEY (email, username) REFERENCES Persona (email, username),
    FOREIGN KEY (classifica) REFERENCES Classifica (titolo)
);


CREATE FUNCTION prova() RETURNS TRIGGER AS
$$
BEGIN 
    IF EXISTS (
        SELECT *
        FROM relazione
        WHERE classifica = NEW.classifica
        AND posizione = NEW.posizione
    ) THEN
        UPDATE relazione
        SET email = NEW.email,
            username = NEW.username
        WHERE classifica = NEW.classifica AND posizione = NEW.posizione;

        UPDATE relazione
        SET posizione = posizione + 1
        WHERE classifica = NEW.classifica AND posizione >= NEW.posizione;
    END IF;
    RETURN NEW;
 END;
$$ language plpgsql;

CREATE TRIGGER trigger_prova
BEFORE INSERT ON relazione
FOR EACH ROW EXECUTE PROCEDURE prova();



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
INSERT INTO Classifica (titolo)
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


-- Inserimento di alcune relazioni nella tabella Relazione
INSERT INTO Relazione (email, username, classifica, posizione)
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


-- Inserimento di alcune relazioni nella tabella Relazione
-- INSERT INTO Relazione (email, username, classifica, posizione)
-- VALUES 
--   ('email1@example.com', 'user1', 'Gioco 1', 1),
--   ('email1@example.com', 'user1', 'Gioco 2', 3),
--   ('email1@example.com', 'user1', 'Gioco 3', 2),
--   ('email2@example.com', 'user2', 'Gioco 1', 2),
--   ('email2@example.com', 'user2', 'Gioco 2', 1),
--   ('email2@example.com', 'user2', 'Gioco 3', 3),
--   ('email3@example.com', 'user3', 'Gioco 1', 3),
--   ('email3@example.com', 'user3', 'Gioco 2', 2),
--   ('email3@example.com', 'user3', 'Gioco 3', 1),
--   ('email4@example.com', 'user4', 'Gioco 1', 1),
--   ('email4@example.com', 'user4', 'Gioco 2', 2),
--   ('email4@example.com', 'user4', 'Gioco 3', 3),
--   ('email5@example.com', 'user5', 'Gioco 1', 2),
--   ('email5@example.com', 'user5', 'Gioco 2', 3),
--   ('email5@example.com', 'user5', 'Gioco 3', 1);
