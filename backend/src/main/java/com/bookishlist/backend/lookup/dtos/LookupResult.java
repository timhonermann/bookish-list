package com.bookishlist.backend.lookup.dtos;

import java.util.List;

public record LookupResult(
    String kind,
    Integer totalItems,
    List<LookupItemResponse> items
) {
}
