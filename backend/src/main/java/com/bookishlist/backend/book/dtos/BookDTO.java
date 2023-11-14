package com.bookishlist.backend.book.dtos;

import java.util.Objects;

public record BookDTO(
    String isbn,
    String title,
    String author,
    String category,
    String thumbnailUrl
) {
    public BookDTO {
        Objects.requireNonNull(isbn);
        Objects.requireNonNull(title);
        Objects.requireNonNull(author);
        Objects.requireNonNull(thumbnailUrl);
    }
}
