BEGIN;

CREATE TABLE IF NOT EXISTS public.cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.places (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    description TEXT,
    image_url TEXT,
    address TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 0 AND rating <= 5),
    is_free BOOLEAN NOT NULL DEFAULT false,
    city_id INTEGER NOT NULL,

    CONSTRAINT fk_city
        FOREIGN KEY (city_id)
        REFERENCES public.cities(id)
        ON DELETE CASCADE
);

COMMIT;