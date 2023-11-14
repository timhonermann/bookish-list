package com.bookishlist.backend.book.services;

import com.bookishlist.backend.book.entities.Book;
import com.bookishlist.backend.book.repositories.BookRepository;
import com.bookishlist.backend.common.exceptions.NotFoundException;
import io.swagger.v3.oas.annotations.servers.Server;
import java.time.LocalDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    private final Logger logger = LoggerFactory.getLogger(BookService.class);

    private final BookRepository bookRepository;

    BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Book add(Book book) {
        if (bookRepository.existsByIsbn(book.getIsbn())) {
            return getBookByIsbn(book.getIsbn());
        }

        book.setCreatedAt(LocalDateTime.now());
        var savedBook = bookRepository.save(book);

        logger.info("Book with ISBN {} was added", savedBook.getIsbn());

        return savedBook;
    }

    private Book getBookByIsbn(String isbn) {
        return bookRepository
            .findById(isbn)
            .orElseThrow(
                () -> new NotFoundException("Book with ISBN " + isbn + "not found"));
    }
}
