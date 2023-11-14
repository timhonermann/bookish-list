package com.bookishlist.backend.book.dtos;

import java.time.LocalDateTime;
import java.util.UUID;

public record BookListItemDTO(
    UUID id,
    BookDTO book,
    String type,
    String status,
    Float rating,
    String comment,
    LocalDateTime addedAt,
    LocalDateTime startedReadingAt,
    LocalDateTime finishedReadingAt
) {
}
