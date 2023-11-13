package com.bookishlist.backend.unit.lookup;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.bookishlist.backend.lookup.dtos.LookupResult;
import com.bookishlist.backend.lookup.services.LookupService;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.net.http.HttpClient;
import java.net.http.HttpResponse;
import java.util.Collections;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

@ExtendWith(MockitoExtension.class)
class LookupServiceTest {

    @Mock
    ObjectMapper objectMapper;
    @Mock
    HttpClient httpClient;
    @InjectMocks
    private LookupService testee;

    @BeforeEach
    public void setUp() {
        ReflectionTestUtils.setField(testee, "bookLookupUrl", "https://empty.ch");
    }

    @Test
    void shouldLookupBooks() throws IOException, InterruptedException {
        // arrange
        var searchValue = "test";

        var lookupResult = new LookupResult(
            "test",
            1234,
            Collections.emptyList()
        );

        String json = "my json";

        var response = Mockito.mock(HttpResponse.class);
        Mockito.when(response.body()).thenReturn(json);

        Mockito.when(httpClient.send(Mockito.any(), Mockito.any()))
            .thenReturn(response);
        Mockito.when(objectMapper.readValue(json, LookupResult.class)).thenReturn(lookupResult);

        // act
        var result = testee.lookup(searchValue);

        // assert
        Mockito.verify(httpClient).send(Mockito.any(), Mockito.any());
        Mockito.verify(objectMapper).readValue(json, LookupResult.class);
        assertEquals(lookupResult.items(), result);
    }
}
