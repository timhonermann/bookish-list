package com.bookishlist.backend.book.controllers;

import com.bookishlist.backend.book.dtos.BookListItemDTO;
import com.bookishlist.backend.book.entities.BookStatusName;
import com.bookishlist.backend.book.entities.BookTypeName;
import com.bookishlist.backend.book.mappers.BookMapper;
import com.bookishlist.backend.book.services.BookListService;
import com.bookishlist.backend.common.httpheaders.CustomHttpHeaders;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api/v1/book-list")
public class BookListController {

    private final BookListService bookListService;

    private final BookMapper bookMapper;

    @Autowired
    public BookListController(BookListService bookListService, BookMapper bookMapper) {
        this.bookListService = bookListService;
        this.bookMapper = bookMapper;
    }

    @PostMapping
    public ResponseEntity<List<BookListItemDTO>> addItem(
        @RequestBody BookListItemDTO bookishListItemDto,
        @RequestHeader(CustomHttpHeaders.USER_ID) String userId) {
        var type = bookListService
            .getBookType(BookTypeName.getBookTypeNameFromValue(bookishListItemDto.type()));
        var status = bookListService
            .getBookStatus(BookStatusName.getBookStatusNameFromValue(bookishListItemDto.status()));

        var bookishListItem =
            bookMapper.bookListItemFromDto(bookishListItemDto, type, status, userId);

        var bookishList = bookListService.addItem(bookishListItem);

        var uri = ServletUriComponentsBuilder
            .fromCurrentRequestUri()
            .path("/{id}")
            .buildAndExpand(bookishListItem.getId())
            .toUri();

        return ResponseEntity.created(uri).body(bookMapper.bookListToDto(bookishList));
    }

    @GetMapping
    public ResponseEntity<List<BookListItemDTO>> getAll(@RequestHeader(CustomHttpHeaders.USER_ID) String userId) {
        var bookListItems = bookListService.getAllByUser(userId);

        return ResponseEntity.ok(bookMapper.bookListToDto(bookListItems));
    }
}
