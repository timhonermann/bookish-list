CREATE SCHEMA IF NOT EXISTS book;

CREATE TABLE IF NOT EXISTS book.book
(
    isbn          VARCHAR(13) PRIMARY KEY NOT NULL,
    title         VARCHAR(100)            NOT NULL,
    author        VARCHAR(255)            NOT NULL,
    category      VARCHAR(255)            NOT NULL,
    thumbnail_url VARCHAR(255)            NOT NULL,
    created_at    TIMESTAMP               NOT NULL
);

CREATE TABLE IF NOT EXISTS book.book_type
(
    id   SMALLINT PRIMARY KEY NOT NULL,
    type VARCHAR(50)          NOT NULL
);

CREATE TABLE IF NOT EXISTS book.book_status
(
    id     SMALLINT PRIMARY KEY NOT NULL,
    status VARCHAR(50)          NOT NULL
);

CREATE TABLE IF NOT EXISTS book.book_list_item
(
    id                  UUID PRIMARY KEY        NOT NULL,
    isbn                VARCHAR(13)             NOT NULL,
    user_id             VARCHAR(50)             NOT NULL,
    type                SMALLINT      DEFAULT 1 NOT NULL,
    status              SMALLINT      DEFAULT 1 NOT NULL,
    rating              NUMERIC(2, 1) DEFAULT 0 NOT NULL,
    comment             VARCHAR(1000),
    added_at            TIMESTAMP               NOT NULL,
    started_reading_at  TIMESTAMP,
    finished_reading_at TIMESTAMP,
    CONSTRAINT book_book_list_item FOREIGN KEY (isbn) REFERENCES book.book (isbn) ON DELETE CASCADE,
    CONSTRAINT book_book_list_item_book_type_id FOREIGN KEY (type) REFERENCES book.book_type (id) ON DELETE CASCADE,
    CONSTRAINT book_book_list_item_book_status_id FOREIGN KEY (status) REFERENCES book.book_status (id) ON DELETE CASCADE,
    CONSTRAINT book_book_list_item_rating_max_value CHECK (rating >= 0 AND rating <= 5)
);
