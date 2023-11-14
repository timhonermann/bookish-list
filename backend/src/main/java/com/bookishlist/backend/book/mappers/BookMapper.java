package com.bookishlist.backend.book.mappers;

import com.bookishlist.backend.book.dtos.BookDTO;
import com.bookishlist.backend.book.dtos.BookListItemDTO;
import com.bookishlist.backend.book.entities.Book;
import com.bookishlist.backend.book.entities.BookListItem;
import com.bookishlist.backend.book.entities.BookStatus;
import com.bookishlist.backend.book.entities.BookType;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class BookMapper {

    public BookDTO bookToDto(Book book) {
        return new BookDTO(
            book.getIsbn(),
            book.getTitle(),
            book.getAuthor(),
            book.getCategory(),
            book.getThumbnailUrl()
        );
    }

    public Book bookFromDto(BookDTO bookDTO) {
        var book = new Book();
        book.setIsbn(bookDTO.isbn());
        book.setTitle(bookDTO.title());
        book.setAuthor(bookDTO.author());
        book.setCategory(bookDTO.category());
        book.setThumbnailUrl(bookDTO.thumbnailUrl());

        return book;
    }

    public BookListItemDTO bookListItemToDto(BookListItem bookListItem) {
        var bookDto = bookToDto(bookListItem.getBook());

        return new BookListItemDTO(
            bookListItem.getId(),
            bookDto,
            bookListItem.getType().getTypeName().value(),
            bookListItem.getStatus().getStatusName().value(),
            bookListItem.getRating(),
            bookListItem.getComment(),
            bookListItem.getAddedAt(),
            bookListItem.getStartedReadingAt(),
            bookListItem.getFinishedReadingAt()
        );
    }

    public BookListItem bookListItemFromDto(BookListItemDTO bookListItemDto,
                                                  BookType type,
                                                  BookStatus status,
                                                  String userId) {
        var book = bookFromDto(bookListItemDto.book());

        var bookishListItem = new BookListItem();
        bookishListItem.setId(bookListItemDto.id());
        bookishListItem.setBook(book);
        bookishListItem.setUserId(userId);
        bookishListItem.setType(type);
        bookishListItem.setStatus(status);
        bookishListItem.setRating(bookListItemDto.rating());
        bookishListItem.setComment(bookListItemDto.comment());
        bookishListItem.setAddedAt(bookListItemDto.addedAt());
        bookishListItem.setStartedReadingAt(bookListItemDto.startedReadingAt());
        bookishListItem.setFinishedReadingAt(bookListItemDto.finishedReadingAt());

        return bookishListItem;
    }

    public List<BookListItemDTO> bookListToDto(List<BookListItem> bookListItems) {
        return bookListItems
            .stream()
            .map(this::bookListItemToDto)
            .toList();
    }

}
