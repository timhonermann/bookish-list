package com.bookishlist.backend.lookup.dtos;

import java.util.List;

public record VolumeInfo(
    String title,
    List<String> authors,
    List<IndustryIdentifier> industryIdentifiers,
    List<String> categories,
    ImageLink imageLinks
) {
}
