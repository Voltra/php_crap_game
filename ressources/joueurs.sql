SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


--
-- Table structure for table `joueurs`
--

CREATE TABLE IF NOT EXISTS `joueurs` (
  `pseudo` varchar(20) CHARACTER SET utf8 NOT NULL,
  `motDePasse` varchar(200) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `joueurs`
--

INSERT INTO `joueurs` (`pseudo`, `motDePasse`) VALUES
('titi', '$6$VsDCW/kqInRv$/bkDT4rmkNLGo704srZE1riI4u7IUUcSuuEqrdkeBJ.3RcsnEO.ihAnWvIWJ0fSoP3hVa/OpWTbhi50xQhzEk1'),
('toto', '$6$RTRffX4m9FBU$GQPzOIuRByEJMeT8r9fydj8eKfi7yurb0SQiT./3pHnG5ni2f96gboxLE4LZgCgEVMWMP6z.AxaOM8KaWJCmn0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `joueurs`
--
ALTER TABLE `joueurs`
  ADD PRIMARY KEY (`pseudo`);
