CREATE TABLE public.accidents (
	id int NOT NULL GENERATED ALWAYS AS IDENTITY,
	driverid int NOT NULL,
	vehicleid int NOT NULL,
	CONSTRAINT accidents_pk PRIMARY KEY (id)
);
