BEGIN;

CREATE TABLE IF NOT EXISTS public.cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);


-- create place category types
CREATE TYPE type AS ENUM ('castle', 'historical object', 'park', 'amusement_park', 'theme_park', 'museum' );

CREATE TABLE IF NOT EXISTS public.places (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    place_type type NOT NULL,
    description TEXT,
    image_url TEXT,
    address VARCHAR(100) NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 0 AND rating <= 5),
    is_free BOOLEAN NOT NULL,
    city_id INTEGER NOT NULL,

    CONSTRAINT fk_city
        FOREIGN KEY (city_id)
        REFERENCES public.cities(id)
        ON DELETE CASCADE
);

COMMIT;