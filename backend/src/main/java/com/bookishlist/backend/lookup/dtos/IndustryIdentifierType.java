package com.bookishlist.backend.lookup.dtos;

import com.fasterxml.jackson.annotation.JsonValue;

public enum IndustryIdentifierType {
    ISBN_10("ISBN_10"),
    ISBN_13("ISBN_13"),
    OTHER("OTHER");

    private final String value;

    IndustryIdentifierType(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
