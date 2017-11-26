-- Drop tables
DROP TABLE IF EXISTS parties;
DROP TABLE IF EXISTS joueurs;



-- Create tables
  -- Users
CREATE TABLE IF NOT EXISTS `joueurs` (
  `pseudo` VARCHAR(20) CHARACTER SET utf8 NOT NULL,
  `motDePasse` VARCHAR(200) CHARACTER SET utf8 NOT NULL
) ENGINE=INNODB DEFAULT CHARSET=utf8;

  -- Lobbies/games
CREATE TABLE IF NOT EXISTS `parties` (
  `id` INT(11) NOT NULL,
  `pseudo` VARCHAR(20) CHARACTER SET utf8 NOT NULL,
  `partieGagnee` TINYINT(1) NOT NULL
) ENGINE=INNODB DEFAULT CHARSET=utf8;


-- Add keys/constraints
ALTER TABLE `joueurs` ADD PRIMARY KEY (`pseudo`);

ALTER TABLE `parties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pseudo` (`pseudo`),
  ADD KEY `pseudo_2` (`pseudo`);
  
ALTER TABLE `parties`
  MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT;
  
ALTER TABLE `parties`
ADD CONSTRAINT `parties_ibfk_1` FOREIGN KEY (`pseudo`) REFERENCES `joueurs` (`pseudo`);


-- Add tuples
INSERT INTO `joueurs` (`pseudo`, `motDePasse`) VALUES
('titi', '$6$VsDCW/kqInRv$/bkDT4rmkNLGo704srZE1riI4u7IUUcSuuEqrdkeBJ.3RcsnEO.ihAnWvIWJ0fSoP3hVa/OpWTbhi50xQhzEk1'),
('toto', '$6$RTRffX4m9FBU$GQPzOIuRByEJMeT8r9fydj8eKfi7yurb0SQiT./3pHnG5ni2f96gboxLE4LZgCgEVMWMP6z.AxaOM8KaWJCmn0');