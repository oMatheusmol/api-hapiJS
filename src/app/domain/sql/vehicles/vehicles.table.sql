CREATE TABLE public.vehicles (
	id int NOT NULL GENERATED ALWAYS AS IDENTITY,
	licenseplate varchar NOT NULL,
	clientid int NOT NULL
);