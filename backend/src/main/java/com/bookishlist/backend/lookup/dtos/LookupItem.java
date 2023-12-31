package com.bookishlist.backend.lookup.dtos;

import java.util.List;
import java.util.Objects;

public record LookupItem(
    String isbn,
    String title,
    String author,
    String category,
    String thumbnailUrl
) {
    public LookupItem {
        Objects.requireNonNull(isbn);
        Objects.requireNonNull(title);
        Objects.requireNonNull(author);
        Objects.requireNonNull(thumbnailUrl);
    }
}
