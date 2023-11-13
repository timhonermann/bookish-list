package com.bookishlist.backend.lookup.services;

import com.bookishlist.backend.lookup.dtos.IndustryIdentifier;
import com.bookishlist.backend.lookup.dtos.IndustryIdentifierType;
import com.bookishlist.backend.lookup.dtos.LookupItemResponse;
import com.bookishlist.backend.lookup.dtos.LookupResult;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class LookupService {

    private final ObjectMapper objectMapper;

    private final HttpClient httpClient;

    @Value("${book.lookup.url}")
    private String bookLookupUrl;

    @Autowired
    public LookupService(ObjectMapper objectMapper, HttpClient httpClient) {
        this.objectMapper = objectMapper;
        this.httpClient = httpClient;
    }

    public List<LookupItemResponse> lookup(String searchValue)
        throws IOException, InterruptedException {
        var searchRequest = createSearchRequest(searchValue);
        var bodyHandler = HttpResponse.BodyHandlers.ofString();

        HttpResponse<String> response = httpClient.send(searchRequest, bodyHandler);

        var lookupResult = objectMapper.readValue(response.body(), LookupResult.class);

        return lookupResult.items().stream()
            .filter(item -> item.volumeInfo().imageLinks() != null)
            .filter(item -> item.volumeInfo().authors() != null)
            .filter(item -> item.volumeInfo().industryIdentifiers() != null)
            .filter(
                item -> industryIdentifiersContainsIban(item.volumeInfo().industryIdentifiers()))
            .toList();
    }

    private HttpRequest createSearchRequest(String searchValue) {
        var uri = getLookupUri(searchValue);

        return HttpRequest.newBuilder()
            .uri(uri)
            .GET()
            .build();
    }

    private URI getLookupUri(String searchValue) {
        return UriComponentsBuilder
            .fromUriString(bookLookupUrl)
            .queryParam("q", searchValue)
            .queryParam("langRestrict", "en")
            .build()
            .toUri();
    }

    private boolean industryIdentifiersContainsIban(List<IndustryIdentifier> industryIdentifiers) {
        return industryIdentifiers
            .stream()
            .anyMatch(
                identifier -> identifier.type() == IndustryIdentifierType.ISBN_10 ||
                    identifier.type() == IndustryIdentifierType.ISBN_13
            );
    }

}
