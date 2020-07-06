CREATE TABLE users(
    email VARCHAR(255) PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (email) VALUES
('Katie34@yahoo.com'), ('Tunde@gmail.com');

-- Find earliest user created
SELECT DATE_FORMAT(created_at, '%b %D %Y') 
FROM users ORDER BY created_at ASC LIMIT 1;

-- Find the email of the earliest user (through subqueries) 
SELECT email FROM users WHERE created_at=(SELECT created_at FROM users ORDER BY created_at ASC LIMIT 1);

-- Group users by month alone then order by the highest count for each month
SELECT 
    MONTHNAME(created_at) AS month, 
    COUNT(*) AS count
FROM users GROUP BY month 
ORDER BY count DESC;

-- Find all the users with a specific email (yahoo)
SELECT
    COUNT(*) as yahoo_users
FROM users
WHERE email LIKE '%yahoo.com';
--  Here's the dynamic version for each email type
SELECT
    CASE
        WHEN email LIKE '%yahoo.com' THEN 'Yahoo'
        WHEN email LIKE '%gmail.com' THEN 'Gmail'
        WHEN email LIKE '%hotmail.com' THEN 'Hotmail'
        ELSE 'Other'
    END AS provider,
    COUNT(*) AS amount_of_users
FROM users
GROUP BY provider
ORDER BY amount_of_users DESC;

