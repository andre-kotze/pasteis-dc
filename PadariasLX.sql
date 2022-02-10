SET standard_conforming_strings = OFF;
DROP TABLE IF EXISTS "pasteis"."clients" CASCADE;
DELETE FROM geometry_columns WHERE f_table_name = 'clients' AND f_table_schema = 'pasteis';
BEGIN;
--CREATE TABLE "pasteis"."clients" ( "id" SERIAL, CONSTRAINT "clients_pk" PRIMARY KEY ("id") );
CREATE TABLE "pasteis"."clients" ( "id" INTEGER, CONSTRAINT "clients_pk" PRIMARY KEY ("id") );
SELECT AddGeometryColumn('pasteis','clients','geom',4326,'POINT',2);
-- CREATE INDEX "clients_wkb_geometry_geom_idx" ON "pasteis"."clients" USING GIST ("wkb_geometry");
--ALTER TABLE "pasteis"."clients" ADD COLUMN "fid" NUMERIC(20,0);
ALTER TABLE "pasteis"."clients" ADD COLUMN "client_name" VARCHAR;
--ALTER TABLE "pasteis"."clients" ADD COLUMN "osm_node" VARCHAR;
ALTER TABLE "pasteis"."clients" ADD COLUMN "addressline2" VARCHAR;
ALTER TABLE "pasteis"."clients" ADD COLUMN "postalcode" VARCHAR;
ALTER TABLE "pasteis"."clients" ADD COLUMN "addressline1" VARCHAR;
ALTER TABLE "pasteis"."clients" ADD COLUMN "nif" VARCHAR;
ALTER TABLE "pasteis"."clients" ADD COLUMN "id" NUMERIC(10,0);
inseRT INTO "pasteis"."clients" ( geom, client_name, addressline2, postalcode, addressline1, nif, id ) VALUES
-- 6 values here are: geom, name, addr2, postal, addr1, nif, id
('0101000020E610000038AC5F9FEF4122C0B2570EE3245B4340'  , 'Pastelaria Alfama Doce'  , '39-39A'  , '1170'  , 'Rua da Regueria'  ,1 ),
('0101000020E6100000743D76BC6E4222C0DBF74D06EC5B4340'  , 'A Padaria Portuguesa'  , '14'  , NULL  , 'Rua da Graça'  ,2 ),
('0101000020E6100000AA40D24C9C5522C0096D3997E25C4340'  , 'Padaria Pao Duro'  , NULL  , NULL  , NULL  ,3 ),
('0101000020E6100000A0B3BBF6BB4E22C0AD99C640E85D4340'  , 'Eric Kayser'  , NULL  , NULL  , NULL  ,4 ),
('0101000020E6100000C9642772775422C0BD8BF7E3F65C4340'  , 'Grão a Grão'  , '1C'  , NULL  , NULL  ,5 ),
('0101000020E6100000CB434BC3954422C005B28D2E255F4340'  , 'Rosalinda'  , '9C'  , NULL  , 'Avenida Padre Manuel da Nobrega'  ,6 ),
('0101000020E6100000DFD1109F854A22C0F80B87EF0E5B4340'  , 'Paneficação das Mercês'  , NULL  , NULL  , NULL  ,7 ),
('0101000020E6100000E5AB2EF1914222C0E26D4A1EF45B4340'  , 'Banco Popular'  , '131'  , '1170'  , 'Rua da Graça'  ,8 ),
('0101000020E6100000C579933A5C4622C097B4988EEF5A4340'  , 'São Nicolau'  , '110'  , NULL  , 'Rua Augusta'  ,9 ),
('0101000020E61000009BD9F85D224422C07B2C222F105E4340'  , 'Padaria do Mercado'  , '32c'  , NULL  , 'Rua Carlos Mardel'  ,10 ),
('0101000020E61000004EAB329DE74522C0C3BC2253995D4340'  , 'Padaria Portuguesa'  , '15 A'  , '1000-059'  , 'Rua Pascoal de Melo'  ,11 ),
('0101000020E6100000DA3DD4111B4322C0DC5328C1D15D4340'  , 'Padaria'  , NULL  , NULL  , NULL  ,12 ),
('0101000020E6100000A82FF081C24922C02117E64EFA5A4340'  , 'Manteigaria - Fábrica de Pastéis de Nata'  , '2'  , '1200-242'  , 'Rua do Loreto'  ,13 ),
('0101000020E6100000C24769DBD54C22C0AF754E58875E4340'  , 'O Padeiro'  , '137'  , '1050-053'  , 'Avenida Elias Garcia'  ,14 ),
('0101000020E61000008BE83290C24422C06FEAA80FC95A4340'  , 'Raina D. Amelia'  , '28'  , NULL  , 'Rua dos Bacalhoeiros'  ,15 ),
('0101000020E6100000E60BB501334222C04BB0389CF95A4340'  , 'Delícia do Pão'  , NULL  , NULL  , NULL  ,16 ),
('0101000020E6100000A2E58A9CCF4A22C059DE550F985B4340'  , 'S. Roque'  , NULL  , NULL  , NULL  ,17 ),
('0101000020E61000001B5B199EA84A22C0E68CCD339B5C4340'  , 'Pastelaria Fórum'  , NULL  , NULL  , NULL  ,18 ),
('0101000020E6100000566DED331D4422C0F6741A0EF05C4340'  , 'Paderia Saudade'  , '23B'  , NULL  , 'Rua de Moçambique'  ,19 ),
('0101000020E610000042B5C189E84722C02A221EE4505F4340'  , 'Padaria Pao e Bolos Quentes'  , NULL  , NULL  , NULL  ,20 ),
('0101000020E6100000CA856F06244A22C0EE015F76F45A4340'  , 'Chiado Caffé'  , '45/47'  , NULL  , 'Rua do Loreto'  ,21 ),
('0101000020E6100000AAEC6069854622C0FD2C3B69865D4340'  , 'Pastelaria Aloma'  , NULL  , '1150-201'  , 'Rua José Estevão'  ,22 ),
('0101000020E6100000AD4D637B2D4822C021FB6A589D5D4340'  , 'Confeitaria Vitória'  , NULL  , '1000-156'  , NULL  ,23 ),
('0101000020E6100000730F09DFFB4722C0DED15A2CA05D4340'  , 'Padaria do Bairro'  , NULL  , NULL  , NULL  ,24 ),
('0101000020E610000092031B7C064522C0E02582829C5D4340'  , 'Monte Castelo'  , '38'  , NULL  , 'Rua Pascoal de Melo'  ,25 ),
('0101000020E610000093DF47DA324522C01B248E869D5D4340'  , 'Pastelaria Monte Rei'  , '56'  , NULL  , 'Rua Pascoal de Melo'  ,26 ),
('0101000020E610000083948E28A34422C0162708686C5E4340'  , 'Pastelaria Pão de Açúcar'  , '70 A-B'  , NULL  , 'Alameda Afonso Henriques'  ,27 ),
('0101000020E6100000DBA09BA2C84B22C04A9E46B5E35C4340'  , 'Pastelaria Balcão do Marquês'  , '117/9'  , NULL  , 'Avenida Duque de Loulé'  ,28 ),
('0101000020E6100000203DEA549E4522C0DF9DC607875B4340'  , 'A Padaria Portuguesa'  , '6'  , '1100-034'  , 'Rua Arco Marques do Alegrete'  ,29 ),
('0101000020E6100000E35DE454214C22C089BBD5CE8B5B4340'  , 'Padaria Peniche'  , NULL  , NULL  , NULL  ,30 ),
('0101000020E6100000F399A2128D4822C02B792B01E75A4340'  , 'Tartine'  , '15'  , NULL  , 'Rua Serpa Pinto'  ,31 ),
('0101000020E61000005B8D36D8E54522C09C20A0B1E55A4340'  , 'Nata Lisboa'  , '78'  , NULL  , 'Rua da Prata'  ,32 ),
('0101000020E61000003166A60FB84122C05B0FBADFFC5A4340'  , 'Pastelería Guadalupe d Alfama'  , '32'  , NULL  , 'Rua do Terreiro do Trigo'  ,33 ),
('0101000020E61000005407D4F60A4622C0FC0681F0FC5A4340'  , 'A Padaria Portuguesa'  , '134'  , NULL  , 'Rua da Prata'  ,34 ),
('0101000020E610000053646314BA4D22C0C03A3366B75D4340'  , 'A Padaria Portuguesa'  , NULL  , NULL  , 'Avenida António Augusto Aguiar'  ,35 ),
('0101000020E61000005130630AD64422C03F7DBA70D65D4340'  , 'Fábrica dos bolos'  , '149-A'  , NULL  , 'Avenida Almirante Reis'  ,36 ),
('0101000020E6100000D18B248B454522C09785C0DBCD5D4340'  , 'Pastelaria Docel'  , '57 A'  , '1000-184'  , 'Rua José Falcão'  ,37 ),
('0101000020E6100000F01F668A944522C060C2B2E3D05D4340'  , 'Padaria Pao Fresco'  , NULL  , NULL  , NULL  ,38 ),
('0101000020E61000001220F939F44422C0CBE08332E85D4340'  , 'Padaria do Chile'  , '1-A'  , NULL  , 'Rua António Pereira Carrilho'  ,39 ),
('0101000020E610000041953F845D4522C061B5E8537D5C4340'  , 'A Padaria Portuguesa'  , '29'  , NULL  , NULL  ,40 ),
('0101000020E6100000B2C92B21694522C0CCD24ECDE55A4340'  , 'Cheese shop'  , NULL  , NULL  , NULL  ,41 ),
('0101000020E6100000422E2757674322C084E27D0BA15C4340'  , 'Pastelaria Tebas'  , '2E'  , NULL  , 'Rua Heliodoro Salgado'  ,42 ),
('0101000020E6100000CC931051F14822C009BE0E417A5A4340'  , 'Pasteleria Zarzuela'  , '23-25'  , NULL  , 'Rua Bernardino Costa'  ,43 ),
('0101000020E61000008E999F76534522C0B6C65686275F4340'  , 'Padaria Rodrigues Pérez e CA'  , NULL  , NULL  , NULL  ,44 ),
('0101000020E610000031EAFFC12C4922C00E935FF5365D4340'  , 'A Padaria Portuguesa'  , '193'  , NULL  , 'Rua Gomes Freire'  ,45 ),
('0101000020E61000002EC324010F4922C0B933B852745A4340'  , 'Sama Sama Crepe and Juice Bar'  , NULL  , NULL  , NULL  ,46 ),
('0101000020E61000001CC8C4F70F4322C00FA6176B6E5C4340'  , 'Micro Padaria'  , '35A'  , '1170-221 Lisboa'  , 'Rua Angelina Vidal'  ,47 ),
('0101000020E6100000555BA093944A22C0871AE0DD255E4340'  , 'Pastelaria Versailles'  , '15A'  , NULL  , 'Avenida da República'  ,48 ),
('0101000020E6100000B6B86BAE3F4A22C0D878550CFC5A4340'  , 'pastelaria camoes'  , NULL  , NULL  , NULL  ,49 ),
('0101000020E610000081D48107614522C0F73878CB7A5C4340'  , 'Pastelaria Delta'  , NULL  , NULL  , NULL  ,50 ),
('0101000020E6100000B4498FF0074522C03086CD5BD05C4340'  , 'Lisbboa'  , NULL  , NULL  , NULL  ,51 ),
('0101000020E61000008689AB6F054522C09434DA05DE5C4340'  , 'Lenita'  , NULL  , NULL  , NULL  ,52 ),
('0101000020E6100000E1D4624BEA4B22C0402A6AD5535C4340'  , 'Picasso Cafeteria'  , NULL  , NULL  , NULL  ,53 ),
('0101000020E61000000A48A066ED4B22C05F2FA8CA525C4340'  , 'Picasso Cafeteria'  , NULL  , NULL  , NULL  ,54 ),
('0101000020E6100000B1CEE792604422C05F605628D25C4340'  , 'Moko Veggie Cafe'  , '29'  , NULL  , 'Rua Forno do Tijolo'  ,55 ),
('0101000020E61000004CC1BFAD604C22C01DA55C2BEB5C4340'  , 'A Padaria Portuguesa'  , NULL  , NULL  , NULL  ,56 ),
('0101000020E6100000D2C034B1655622C08BFCFA21365A4340'  , 'Padaria Manaus'  , NULL  , NULL  , NULL  ,57 ),
('0101000020E6100000DA9255116E5622C00EAD0441365A4340'  , 'Baguettes & Cornets 1'  , NULL  , NULL  , NULL  ,58 ),
('0101000020E61000007BF07FEC9A4922C04C9FC2B6EA5A4340'  , 'Pasteleria Batalha'  , NULL  , NULL  , NULL  ,59 ),
('0101000020E61000008CCE43B7A84422C05A16A7B5C45A4340'  , 'Nata LX'  , NULL  , NULL  , NULL  ,60 ),
('0101000020E610000034AC9800B25222C05FA5715E525A4340'  , 'La Boulangerie'  , NULL  , NULL  , NULL  ,61 ),
('0101000020E6100000B1EDFEC23C4922C0A532C51C045B4340'  , 'Padaria do Bairro'  , '13'  , '1200-270'  , 'Rua da Misericórdia'  ,62 ),
('0101000020E6100000DF84E74AA94822C05FF64608EA5A4340'  , 'Sacolinha pasteleira padaria'  , NULL  , NULL  , NULL  ,63 ),
('0101000020E6100000C4C25AC6974222C0ABE6DE686C5B4340'  , 'Padariaiam'  , NULL  , NULL  , NULL  ,64 ),
('0101000020E61000003C003D68D14222C0C727092EFB5B4340'  , 'Estrela da Graça'  , NULL  , NULL  , NULL  ,65 ),
('0101000020E6100000724573AE725222C027A9A7EA795C4340'  , 'Eric Kayser Campolide'  , NULL  , NULL  , NULL  ,66 ),
('0101000020E6100000F8962831BE4622C0CA7BE6F6DC5A4340'  , 'A Padaria Portuguesa'  , '94'  , NULL  , 'Rua Áurea'  ,67 ),
('0101000020E610000092ABFD42345322C026FB8CB04D5D4340'  , 'Padaria Que Sim Existe'  , NULL  , NULL  , NULL  ,68 ),
('0101000020E61000005831A6AA1A4E22C0FE91335E045B4340'  , 'Ceres Boulangerie'  , '78'  , NULL  , 'Rua de São Bento'  ,69 ),
('0101000020E61000005F9DBEF9685822C074D3669C865A4340'  , 'Gleba Moagem & Padaria'  , NULL  , NULL  , NULL  ,70 ),
('0101000020E6100000A08B868C474922C0D2E1218C9F5E4340'  , 'Padaria'  , NULL  , NULL  , NULL  ,71 ),
('0101000020E61000007A62E7B7F95422C00B47904AB15B4340'  , 'Moço - Croissants'  , NULL  , NULL  , NULL  ,72 ),
('0101000020E6100000AEA12F18B75422C0C87FDCD9B25B4340'  , 'Kiosk'  , NULL  , NULL  , NULL  ,73 ),
('0101000020E6100000F97DA42D535422C01BB39190ED5B4340'  , 'A Padaria Portuguesa'  , NULL  , NULL  , NULL  ,74 ),
('0101000020E6100000E3D17C84505422C0424DE3CDD05B4340'  , 'Trigo D''aldeia'  , NULL  , NULL  , NULL  ,75 ),
('0101000020E6100000C17DD3AA4C5322C00C5A48C0E85C4340'  , 'Padaria Filho do Pao'  , NULL  , NULL  , NULL  ,76 ),
('0101000020E610000007C20424504722C0BBD97AE1295B4340'  , 'Nataria Nacional'  , NULL  , NULL  , NULL  ,77 ),
('0101000020E61000008B8862F2065422C0B026AA12C05B4340'  , 'Baguettes & Cornets'  , '65'  , NULL  , 'Rua Ferreira Borges'  ,78 ),
('0101000020E6100000D7039C94384D22C0D554BBCBEA5A4340'  , 'Forninho do Sao Roque'  , '74'  , NULL  , 'Rua do Poço dos Negros'  ,79 ),
('0101000020E6100000F661BD512B4022C0BF6B2B51515B4340'  , 'Pastelaria Alfacinha'  , NULL  , NULL  , NULL  , 80 );