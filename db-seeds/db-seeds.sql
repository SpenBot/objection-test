-- Drop Database ------------------------------

DROP DATABASE IF EXISTS objection_test_db;


-- Create Database and Connect -----------------

CREATE DATABASE objection_test_db;
\c objection_test_db;


-- Add UUID Extension ----------------------

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";



-- Create Schema and Alter Owner -----------------

CREATE SCHEMA obj_schema;
ALTER SCHEMA obj_schema OWNER TO postgres;



-- Students Table and Insert -----------------

CREATE TABLE obj_schema.students (
  student_id uuid NOT NULL DEFAULT uuid_generate_v4(),
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  grade INTEGER NOT NULL,
  email VARCHAR NOT NULL UNIQUE
);

INSERT INTO obj_schema.students (first_name, last_name, grade, email) VALUES
  ('Eric', 'Cartman', 4, 'eric@mail.com'),
  ('Kenny', 'McCormick', 4, 'kenny@mail.com'),
  ('Kyle', 'Broflovski', 4, 'kyle@mail.com'),
  ('Stan', 'Marsh', 4, 'stan@mail.com'),
  ('Luke', 'Skywalker', 4, 'luke@mail.com'),
  ('Darth', 'Vader', 4, 'anakin@mail.com'),
  ('Liea', 'Organa', 4, 'liea@mail.com'),
  ('Han', 'Solo', 4, 'han@mail.com'),
  ('Lando', 'Calrissian', 4, 'lando@mail.com'),
  ('Jabba', 'Hut', 4, 'jabba@mail.com'),
  ('Boba', 'Fett', 4, 'boba@mail.com'),
  ('Obi-Wan', 'Kenobi', 4, 'obi@mail.com');


-- Courses Table and Insert -----------------

CREATE TABLE obj_schema.courses (
  course_id uuid NOT NULL DEFAULT uuid_generate_v4(),
  title VARCHAR NOT NULL,
  room VARCHAR NOT NULL,
  course_time VARCHAR NOT NULL,
  teacher_id INTEGER
);

INSERT INTO obj_schema.courses (title, room, course_time) VALUES
  ('English', '1A', '8:00'),
  ('Chemistry', '1B', '12:15'),
  ('History', '1C', '13:00'),
  ('Statistics', '1D', '10:30'),
  ('Algebra', '2A', '9:20'),
  ('Literature', '2B', '10:30'),
  ('Social Studies', '2C', '8:00'),
  ('Biology', '2D', '9:20');


-- Teachers Table and Insert -----------------

CREATE TABLE obj_schema.teachers (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL
);

INSERT INTO obj_schema.teachers (name) VALUES
  ('Mr Garrison'),
  ('Mr Hand'),
  ('Mr Mackey');


-- Students-Courses-Join Table -----------------

CREATE TABLE obj_schema.students_courses_join (
  students_courses_id uuid NOT NULL DEFAULT uuid_generate_v4(),
  course_id INT NOT NULL,
  student_id INT NOT NULL
);
