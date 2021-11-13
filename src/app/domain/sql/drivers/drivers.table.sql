CREATE TABLE public.drivers (
	id int NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar NOT NULL,
	cpf varchar NOT NULL,
	clientid int NOT NULL,
	CONSTRAINT drivers_pk PRIMARY KEY (id),
	CONSTRAINT drivers_un UNIQUE (cpf)
);
