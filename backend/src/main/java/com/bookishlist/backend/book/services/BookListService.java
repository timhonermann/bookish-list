package com.bookishlist.backend.book.services;

import com.bookishlist.backend.book.entities.Book;
import com.bookishlist.backend.book.entities.BookListItem;
import com.bookishlist.backend.book.entities.BookStatus;
import com.bookishlist.backend.book.entities.BookStatusName;
import com.bookishlist.backend.book.entities.BookType;
import com.bookishlist.backend.book.entities.BookTypeName;
import com.bookishlist.backend.book.repositories.BookListItemRepository;
import com.bookishlist.backend.book.repositories.BookStatusRepository;
import com.bookishlist.backend.book.repositories.BookTypeRepository;
import com.bookishlist.backend.common.exceptions.NotFoundException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookListService {

    private final Logger logger = LoggerFactory.getLogger(BookListService.class);

    private final BookListItemRepository bookListItemRepository;

    private final BookTypeRepository bookTypeRepository;

    private final BookStatusRepository bookStatusRepository;

    private final BookService bookService;

    @Autowired
    BookListService(BookListItemRepository bookishListItemRepository,
                       BookTypeRepository bookTypeRepository,
                       BookStatusRepository bookStatusRepository,
                       BookService bookService) {
        this.bookListItemRepository = bookishListItemRepository;
        this.bookTypeRepository = bookTypeRepository;
        this.bookStatusRepository = bookStatusRepository;
        this.bookService = bookService;
    }

    public List<BookListItem> addItem(BookListItem bookListItem) {
        bookListItem.setId(UUID.randomUUID());
        bookListItem.setAddedAt(LocalDateTime.now());

        Book book = bookService.add(bookListItem.getBook());

        bookListItem.setBook(book);

        bookListItemRepository.save(bookListItem);

        logger.info(
            "Added book with ISBN {} to bookish list of user {}",
            book.getIsbn(),
            bookListItem.getUserId());

        return bookListItemRepository.findAllByUserId(bookListItem.getUserId());
    }

    public List<BookListItem> getAllByUser(String userId) {
        return bookListItemRepository.findAllByUserId(userId);
    }

    public BookType getBookType(BookTypeName type) {
        return bookTypeRepository
            .findByType(type)
            .orElseThrow(() -> new NotFoundException("Book Type " + type.value() + " not found"));
    }

    public BookStatus getBookStatus(BookStatusName status) {
        return bookStatusRepository
            .findByStatus(status)
            .orElseThrow(
                () -> new NotFoundException("Book Status " + status.value() + " not found"));
    }
}
