CREATE TABLE public.clients (
	id int NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar NOT NULL,
	cpf varchar NOT NULL,
	CONSTRAINT clients_pk PRIMARY KEY (id),
	CONSTRAINT clients_un UNIQUE (cpf)
);