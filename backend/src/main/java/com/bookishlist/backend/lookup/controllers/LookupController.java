package com.bookishlist.backend.lookup.controllers;

import com.bookishlist.backend.lookup.dtos.LookupItem;
import com.bookishlist.backend.lookup.mappers.LookupItemMapper;
import com.bookishlist.backend.lookup.services.LookupService;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/v1/lookup")
public class LookupController {

    private final LookupService lookupService;

    private final LookupItemMapper lookupItemMapper;

    @Autowired
    public LookupController(LookupService lookupService, LookupItemMapper lookupItemMapper) {
        this.lookupService = lookupService;
        this.lookupItemMapper = lookupItemMapper;
    }

    @GetMapping
    public ResponseEntity<List<LookupItem>> lookup(@RequestParam String searchValue)
        throws IOException, InterruptedException {
        var lookupItems = lookupService.lookup(searchValue).stream().map(lookupItemMapper).toList();

        return ResponseEntity.ok(lookupItems);
    }

}
