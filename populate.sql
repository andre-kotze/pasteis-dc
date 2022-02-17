-- Insert into warehouses table
INSERT INTO pasteis.warehouses ("geom" , "id", "name", "addressline1", "city", "country", "postalcode", "stock") 
VALUES ('0101000020E6100000CE54D13C5F3822C0DC321BEBEF5C4340', '1', 'Armazem das Docas Locas', 'Rua da Cintura do Porto de Lisboa, 230','Lisboa', 'Portugal', '1950-323',400000);
COMMIT;

INSERT INTO pasteis.warehouses ("geom" , "id", "name", "addressline1", "city", "country", "postalcode", "stock") 
VALUES ('0101000020E61000006150611C0A4D22C0564647F6FE5A4340', '1', 'Casa do Convento do Carmo', 'Rua das Poiais do San Bento, 21','Lisboa', 'Portugal', '1200-348',400000);
COMMIT;

-- Insert into vehicles table
INSERT INTO pasteis.vehicles ("id", "type", "warehouse", "capacity", "avg_velocity") 
VALUES ('3', 'limousine', 0, 160, 30);
COMMIT;