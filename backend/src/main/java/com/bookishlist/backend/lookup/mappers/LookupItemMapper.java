package com.bookishlist.backend.lookup.mappers;

import com.bookishlist.backend.lookup.dtos.IndustryIdentifier;
import com.bookishlist.backend.lookup.dtos.IndustryIdentifierType;
import com.bookishlist.backend.lookup.dtos.LookupItem;
import com.bookishlist.backend.lookup.dtos.LookupItemResponse;
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

        return new LookupItem(
            isbn,
            itemResponse.volumeInfo().title(),
            itemResponse.volumeInfo().authors(),
            itemResponse.volumeInfo().categories(),
            itemResponse.volumeInfo().imageLinks().thumbnail()
        );
    }
}
