package com.bookishlist.backend.lookup.mappers;

import com.bookishlist.backend.lookup.dtos.IndustryIdentifier;
import com.bookishlist.backend.lookup.dtos.IndustryIdentifierType;
import com.bookishlist.backend.lookup.dtos.LookupItem;
import com.bookishlist.backend.lookup.dtos.LookupItemResponse;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;
import org.springframework.stereotype.Component;

@Component
public class LookupItemMapper implements Function<LookupItemResponse, LookupItem> {
    @Override
    public LookupItem apply(LookupItemResponse itemResponse) {
        var isbn = itemResponse
            .volumeInfo()
            .industryIdentifiers()
            .stream()
            .filter(identifier -> identifier.type() != IndustryIdentifierType.OTHER)
            .map(IndustryIdentifier::identifier)
            .findFirst()
            .orElseThrow(() -> new IllegalArgumentException("No ISBN found"));

        var category =
            Objects.requireNonNullElse(itemResponse.volumeInfo().categories(), List.of(""));

        return new LookupItem(
            isbn,
            itemResponse.volumeInfo().title(),
            String.join(", ", itemResponse.volumeInfo().authors()),
            String.join(", ", category),
            itemResponse.volumeInfo().imageLinks().thumbnail()
        );
    }
}
