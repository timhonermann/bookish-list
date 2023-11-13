package com.bookishlist.backend.lookup.dtos;

public record LookupItemResponse(
    String id,
    String kind,
    VolumeInfo volumeInfo
) {
}
