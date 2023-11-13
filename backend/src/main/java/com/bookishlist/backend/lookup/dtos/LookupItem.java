package com.bookishlist.backend.lookup.dtos;

import java.util.List;
import java.util.Objects;

public record LookupItem(
    String isbn,
    String title,
    List<String> authors,
    List<String> categories,
    String thumbnailUrl
) {
    public LookupItem {
        Objects.requireNonNull(isbn);
        Objects.requireNonNull(title);
        Objects.requireNonNull(authors);
        Objects.requireNonNull(thumbnailUrl);
    }
}
