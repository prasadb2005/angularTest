CREATE DATABASE IF NOT EXISTS angularcode_task;
 
USE angularcode_task;
--
-- Table structure for table `tasks`
--

CREATE TABLE IF NOT EXISTS `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task` varchar(200) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `task`, `status`, `created_at`) VALUES
(1, 'My first task', 0, 1390815970),
(2, 'Perform unit testing', 2, 1390815993),
(3, 'Find bugs', 2, 1390817659),
(4, 'Test in small devices', 2, 1390818389);

INSERT INTO  `angularcode_task`.`transactionTypes` 
(`id` ,`type`)
VALUES 
(NULL ,  'Income'), 
(NULL ,  'Expense');

INSERT INTO `angularcode_task`.`transactions` 
(`id`, `type`, `productName`, `amount`, `date`, `month`, `year`) 
VALUES 
('1', '1', 'Prasad''s salary', '50000', CURRENT_TIMESTAMP, '9', '2016'), 
('2', '1', 'Aparna''s salary', '35000', CURRENT_TIMESTAMP, '9', '2016');

ALTER TABLE  `transactions` CHANGE  `id`  `id` INT( 8 ) NOT NULL AUTO_INCREMENT

INSERT INTO `angularcode_task`.`transactions` 
(`id`, `type`, `productName`, `amount`, `date`, `month`, `year`) 
VALUES 
('', '2', 'Grocery', '5000', CURRENT_TIMESTAMP, '9', '2016'), 
('', '2', 'Shopping', '3500', CURRENT_TIMESTAMP, '9', '2016'),
('', '2', 'dining', '2200', CURRENT_TIMESTAMP, '9', '2016'),
('', '2', 'petrol', '1500', CURRENT_TIMESTAMP, '9', '2016');