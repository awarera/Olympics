-- script to load data into postgres

-- need to replace 't' below with the name of the table to be created

DROP TABLE IF EXISTS olympics;
CREATE TABLE olympics (
	year int primary key,
	city text,
	lat float,
	lan float,
	host_nation text,
	host_nation_medals int,
	total_medals int,
	number_nations_participating int);
INSERT INTO olympics
VALUES 
	(1896,'Athens',37.983,23.727,'Greece',46,122,14),
	(1900,'Paris',48.856,2.352,'France',101,268,24),
	(1904,'St Louis',38.627,-90.199,'USA',239,280,12),
	(1908,'London',51.4963,-0.2107,'UK',146,324,22),
	(1912,'Stockholm',59.329,18.068,'Sweden',65,310,28),
	(1920,'Antwerp',51.219,4.402,'Belgium',36,439,29),
	(1924,'Paris',48.856,2.352,'France',38,378,44),
	(1928,'Amsterdam',52.37,4.895,'Netherlands',19,327,46),
	(1932,'Los Angeles',34.052,-118.243,'USA',103,346,37),
	(1936,'Berlin',52.52,13.404,'Germany',89,388,49),
	(1948,'London',51.4963,-0.2107,'UK',23,411,59),
	(1952,'Helsinki',60.169,24.938,'Finland',22,459,69),
	(1956,'Melbourne',-37.813,144.963,'Australia',35,469,72),
	(1960,'Rome',41.902,12.496,'Italy',36,461,83),
	(1964,'Tokyo',35.689,139.691,'Japan',29,504,93),
	(1968,'Mexico City',23.634,-102.552,'Mexico',9,527,112),
	(1972,'Munich',48.135,11.581,'Germany',106,600,121),
	(1976,'Montreal',45.501,-73.567,'Canada',11,613,92),
	(1980,'Moscow',55.755,37.617,'Russia',195,631,80),
	(1984,'Los Angeles',34.052,-118.243,'USA',174,688,140),
	(1988,'Seoul',37.566,126.977,'SouthKorea',33,739,159),
	(1992,'Barcelona',41.385,2.173,'Spain',22,815,169),
	(1996,'Atlanta',33.748,-84.387,'USA',101,842,197),
	(2000,'Sydney',-33.868,151.209,'Australia',58,927,199),
	(2004,'Athens',37.983,23.727,'Greece',16,927,201),
	(2008,'Beijing',39.904,116.407,'China',98,943,204),
	(2012,'London',51.4963,-0.2107,'UK',65,954,204),
	(2016,'Rio de Janeiro',-22.906,-43.172,'Brazil',19,972,207);