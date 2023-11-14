package com.bookishlist.backend.book.entities;

import com.fasterxml.jackson.annotation.JsonCreator;
import java.util.stream.Stream;

public enum BookTypeName {
    HARDCOVER("HARDCOVER"),
    PAPERBACK("PAPERBACK"),
    DIGITAL("DIGITAL");

    private final String value;

    BookTypeName(String value) {
        this.value = value;
    }

    @JsonCreator
    public static BookTypeName getBookTypeNameFromValue(String value) {
        return Stream.of(BookTypeName.values())
            .filter(type -> type.value.equals(value))
            .findFirst()
            .orElseThrow(IllegalArgumentException::new);
    }

    public String value() {
        return this.value;
    }
}

