package com.bookishlist.backend.book.entities;

import com.fasterxml.jackson.annotation.JsonCreator;
import java.util.stream.Stream;

public enum BookStatusName {
    TO_BE_READ("TO_BE_READ"),
    READING("READING"),
    FINISHED("FINISHED"),
    DID_NOT_FINISH("DID_NOT_FINISH"),
    RE_READING("RE_READING"),
    RE_READ("RE_READ");

    private final String value;

    BookStatusName(String value) {
        this.value = value;
    }

    @JsonCreator
    public static BookStatusName getBookStatusNameFromValue(String value) {
        return Stream.of(BookStatusName.values())
            .filter(status -> status.value().equals(value))
            .findFirst()
            .orElseThrow(IllegalArgumentException::new);
    }

    public String value() {
        return value;
    }
}

