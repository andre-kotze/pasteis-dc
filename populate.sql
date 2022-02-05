-- Insert into warehouses tables
INSERT INTO warehouses (
<<<<<<< HEAD
    id, name, addressline1, addressline2, postalcode, stock) 
VALUES ('1', 'Armazem das Docas Locas', 'Rua da Cintura do Porto de Lisboa, 230', 'Lisboa - Portugal', '1950-323', 400000);


SET standard_conforming_strings = OFF;
DROP TABLE IF EXISTS "public"."hqdenata" CASCADE;
DELETE FROM geometry_columns WHERE f_table_name = 'hqdenata' AND f_table_schema = 'public';
BEGIN;
CREATE TABLE "public"."hqdenata" ( "ogc_fid" SERIAL, CONSTRAINT "hqdenata_pk" PRIMARY KEY ("ogc_fid") );
SELECT AddGeometryColumn('public','hqdenata','wkb_geometry',4326,'POINT',2);
CREATE INDEX "hqdenata_wkb_geometry_geom_idx" ON "public"."hqdenata" USING GIST ("wkb_geometry");
ALTER TABLE "public"."hqdenata" ADD COLUMN "id" NUMERIC(10,0);
ALTER TABLE "public"."hqdenata" ADD COLUMN "hq_number" NUMERIC(10,0);
ALTER TABLE "public"."hqdenata" ADD COLUMN "vehiclesqt" NUMERIC(10,0);
INSERT INTO "public"."hqdenata" ("wkb_geometry" , "id", "hq_number", "vehiclesqt") 
VALUES ('0101000020E6100000CE54D13C5F3822C0DC321BEBEF5C4340', 1, NULL, NULL);
COMMIT;
=======
    id, name, addressline1, addressline2, city, country, postalcode, geom, stock) 
VALUES ('1', 'Armazem das Docas Locas', 'Rua da Cintura do Porto de Lisboa, 230', ,'Lisboa', 'Portugal', '1950-323', '',400000);
>>>>>>> a71c83c6ee40c6f899b4230f935cab2d508511b1
