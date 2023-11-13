package com.bookishlist.backend.lookup.dtos;

public record IndustryIdentifier(
    IndustryIdentifierType type,
    String identifier
) {
}
