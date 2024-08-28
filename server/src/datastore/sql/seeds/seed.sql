
-- Insert users
INSERT INTO users (id, email, password, userName, firstName, lastName) VALUES
('user-bel-gebna', 'user-bel-gebna@mail.com', '123456', 'gebna', 'User', 'Bel-Gebna'),
('7amada-elgenn-id', '7amada-elgenn@mail.com', '123456', '7amada', 'Hamada', 'Elgenn'),
('bolbol-7ayran', 'bolbol@mail.com', '123456', 'bolbol', 'Bolbol', 'Hayran'),
('isma3een-yaseen', 'bororom@mail.com', '123456', 'isma3een', 'Isma3een', 'Yaseen');

-- Insert posts
INSERT INTO posts (id, title, url, userId, postedAt) VALUES
('post1-id', 'FauxPilot - an open source Github Copilot server', 'http://github.com/moyix', 'user-bel-gebna', FROM_UNIXTIME(1665583003)),
('post2-id', 'Y Combinator narrows current cohort size by 40%, citing downturn and funding', 'http://techcrunch.com', '7amada-elgenn-id', FROM_UNIXTIME(1665496603)),
('post3-id', 'Nonprofit markups.org is exposing the most egregious new car prices', 'http://themanual.com', 'bolbol-7ayran', FROM_UNIXTIME(1665141003)),
('post4-id', 'RTEMS real time operating system', 'http://rtems.org', 'isma3een-yaseen', FROM_UNIXTIME(1664968203)),
('post5-id', 'I used DALL-E 2 to generate a logo', 'http://jacobmartins.com', '7amada-elgenn-id', FROM_UNIXTIME(1664719003));
