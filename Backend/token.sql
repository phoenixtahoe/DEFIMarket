\echo 'Delete and recreate token db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE token;
CREATE DATABASE token;
\connect token

\i token-schema.sql
