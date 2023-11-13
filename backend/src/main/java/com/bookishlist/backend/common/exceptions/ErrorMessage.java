package com.bookishlist.backend.common.exceptions;

public record ErrorMessage(
    String status,
    String message,
    String description
) {
}
